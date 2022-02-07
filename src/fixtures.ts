import { AtemState } from 'atem-connection'
import { Model, ProtocolVersion, TransitionStyle, VideoMode } from 'atem-connection/dist/enums'

const defaultAtemState: AtemState = {
  video: {
    mixEffects: [],
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

export const atemState1: AtemState = {
  ...defaultAtemState,
  video: {
    ...defaultAtemState.video,
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
    ]
  }
}
