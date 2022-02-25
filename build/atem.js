"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNewAtemState = exports.setupAtemConnection = void 0;
const atem_connection_1 = require("atem-connection");
const config_1 = require("./config");
const lights_1 = require("./lights");
function setupAtemConnection() {
    const myAtem = new atem_connection_1.Atem();
    myAtem.on('info', console.log);
    myAtem.on('debug', console.log);
    myAtem.on('error', console.error);
    console.log('atem run');
    myAtem.connect(config_1.CONFIG.switcherIpAddress);
    myAtem.on('connected', () => {
        console.log('Connected to ATEM');
    });
    myAtem.on('disconnected', () => {
        console.log('Disconnection from ATEM');
    });
    myAtem.on('stateChanged', handleNewAtemState);
}
exports.setupAtemConnection = setupAtemConnection;
function handleNewAtemState(state) {
    console.log('New ATEM state');
    console.log(state);
    // State does not always contain ME video data; Return if necessary data is missing.
    if (!state || !state.video || !state.video.mixEffects || !state.video.mixEffects[0])
        return;
    const previewVideoIndex = state.video.mixEffects[0].previewInput;
    const programVideoIndex = state.video.mixEffects[0].programInput;
    console.log(`Video ${programVideoIndex} is PROGRAM`);
    console.log(`Video ${previewVideoIndex} is PREVIEW`);
    const newVideoState = getNewVideosState(state);
    (0, lights_1.updateLights)(newVideoState);
}
exports.handleNewAtemState = handleNewAtemState;
function getNewVideosState(atemState) {
    if (!atemState.video.mixEffects[0]) {
        return {
            previewVideoIndex: null,
            programVideoIndex: null,
        };
    }
    const previewVideoIndex = atemState.video.mixEffects[0].previewInput;
    const programVideoIndex = atemState.video.mixEffects[0].programInput;
    return {
        previewVideoIndex,
        programVideoIndex,
    };
}
function getVideoStatus(videoIndex, previewVideoIndex, programVideoIndex) {
    if (videoIndex === previewVideoIndex) {
        return 'preview';
    }
    else if (videoIndex === programVideoIndex) {
        return 'program';
    }
    return 'inactive';
}
