import { Atem, AtemState } from 'atem-connection'

import { CONFIG } from './config'
import { updateLights } from './lights'
import { VideoIndex, VideoState, VideoStatus, VideoStatusValue } from './types'

export function setupAtemConnection() {
  const myAtem = new Atem()
  myAtem.on('info', console.log)
  myAtem.on('debug', console.log)
  myAtem.on('error', console.error)

  console.log('atem run')

  myAtem.connect(CONFIG.switcherIpAddress)

  myAtem.on('connected', () => {
    console.log('Connected to ATEM')
  })

  myAtem.on('disconnected', () => {
    console.log('Disconnection from ATEM')
  })

  myAtem.on('stateChanged', handleNewAtemState)
}

export function handleNewAtemState(state: AtemState) {
  console.log('New ATEM state')
  console.log(state)
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
    return []
  }

  const previewVideoIndex = atemState.video.mixEffects[0].previewInput
  const programVideoIndex = atemState.video.mixEffects[0].programInput

  return atemState.video.mixEffects.map((video, index) => {
    return {
      index: 1,
      status: getVideoStatus(index, previewVideoIndex, programVideoIndex)
    }
  })
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
