import { Atem, AtemState } from 'atem-connection'

import { CONFIG } from './config'
import { updateLights } from './lights'
import { VideoIndex, VideoState, VideoStatus, VideoStatusValue } from './types'

export function setupAtemConnection() {
  console.log('setupAtemConnection')
  const myAtem = new Atem()
  myAtem.on('info', (message) => console.log('info', message))
  myAtem.on('debug', console.log)
  myAtem.on('error', console.error)

  myAtem.connect(CONFIG.switcherIpAddress)
  .then((result) => {
    console.log('success!')
    console.log(result)

  })
  .catch((err) => {
    console.log('error!')
      console.log(err)

    })

  myAtem.on('connected', () => {
    console.log('Connected to ATEM')
  })

  myAtem.on('disconnected', () => {
    console.log('Disconnection from ATEM')
  })

  myAtem.on('stateChanged', handleNewAtemState)
}

export function handleNewAtemState(state: AtemState) {
  console.log('--- New ATEM state')
  console.log(JSON.stringify(state, null, 2))
  // State does not always contain ME video data; Return if necessary data is missing.
  if (!state || !state.video || !state.video.mixEffects || !state.video.mixEffects[0]) return

  const previewVideoIndex = state.video.mixEffects[0].previewInput
  const programVideoIndex = state.video.mixEffects[0].programInput

  console.log(`Video ${programVideoIndex} is PROGRAM`)
  console.log(`Video ${previewVideoIndex} is PREVIEW`)

  const newVideoState = getNewVideosState(state)
  updateLights(newVideoState)
}

function getNewVideosState(atemState: AtemState): VideoState {
  if (!atemState.video.mixEffects[0]) {
    return {
      previewVideoIndex: null,
      programVideoIndex: null,
    }
  }

  const previewVideoIndex = atemState.video.mixEffects[0].previewInput
  const programVideoIndex = atemState.video.mixEffects[0].programInput

  return {
    previewVideoIndex,
    programVideoIndex,
  }
}

function getVideoStatus(
  videoIndex: number,
  previewVideoIndex: number,
  programVideoIndex: number
): VideoStatusValue {
  if (videoIndex === previewVideoIndex) {
    return 'preview'
  } else if (videoIndex === programVideoIndex) {
    return 'program'
  }
  return 'inactive'
}
