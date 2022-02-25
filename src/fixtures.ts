import { AtemState } from 'atem-connection'
import { MixEffectKeyType, Model, ProtocolVersion, TransitionStyle, VideoMode } from 'atem-connection/dist/enums'
import { MixEffect } from 'atem-connection/dist/state/video'

export const defaultAtemState: AtemState = {
  video: {
    mixEffects: [
      {
        previewInput: 0,
        programInput: 1,
        index: 0,
        transitionPreview: false,
        transitionPosition: { inTransition: false, remainingFrames: 0, handlePosition: 0 },
        transitionProperties: {
          style: TransitionStyle.DIP,
          selection: 0,
          nextStyle: TransitionStyle.DIP,
          nextSelection: 0
        },
        transitionSettings: {},
        upstreamKeyers: []
      }
    ],
    downstreamKeyers: [],
    auxilliaries: [],
    superSources: []
  },
  info: {
    apiVersion: ProtocolVersion.V8_1_1,
    model: Model.PS4K,
    superSources: [],
    mixEffects: [],
    power: []
  },
  media: { stillPool: [], clipPool: [], players: [] },
  inputs: {},
  macro: {
    macroPlayer: { isRunning: false, isWaiting: false, loop: false, macroIndex: 0 },
    macroRecorder: { isRecording: false, macroIndex: 0 },
    macroProperties: []
  },
  settings: { multiViewers: [], videoMode: VideoMode.N4KHDp24 }
}

export function getRandomState(previousState: AtemState) {
  const previousPreview = previousState.video.mixEffects[0]?.previewInput as number;
  const state: AtemState = { ...defaultAtemState }
  ;(state.video.mixEffects[0] as MixEffect).programInput = previousPreview
  const randomIndex = Math.floor(Math.random() * 2)
  const availableIndices = [0, 1, 2].filter((n) => n !== previousPreview)
  ;(state.video.mixEffects[0] as MixEffect).previewInput = availableIndices[randomIndex]
  return state
}
