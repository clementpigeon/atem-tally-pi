"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomState = exports.defaultAtemState = void 0;
const enums_1 = require("atem-connection/dist/enums");
exports.defaultAtemState = {
    video: {
        mixEffects: [
            {
                previewInput: 0,
                programInput: 1,
                index: 0,
                transitionPreview: false,
                transitionPosition: { inTransition: false, remainingFrames: 0, handlePosition: 0 },
                transitionProperties: {
                    style: enums_1.TransitionStyle.DIP,
                    selection: 0,
                    nextStyle: enums_1.TransitionStyle.DIP,
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
        apiVersion: enums_1.ProtocolVersion.V8_1_1,
        model: enums_1.Model.PS4K,
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
    settings: { multiViewers: [], videoMode: enums_1.VideoMode.N4KHDp24 }
};
function getRandomState(previousState) {
    var _a;
    const previousPreview = previousState && ((_a = previousState.video.mixEffects[0]) === null || _a === void 0 ? void 0 : _a.previewInput);
    const state = Object.assign({}, exports.defaultAtemState);
    if (previousPreview) {
        ;
        state.video.mixEffects[0].programInput = previousPreview;
    }
    ;
    state.video.mixEffects[0].previewInput = Math.floor(Math.random() * 3);
    console.log(state);
    return state;
}
exports.getRandomState = getRandomState;
