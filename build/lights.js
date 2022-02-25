"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLights = exports.setupLights = void 0;
const pigpio_1 = require("pigpio");
const config_1 = require("./config");
const lights = [];
function setupLights() {
    ;
    [0, 1, 2].forEach(setupVideo);
}
exports.setupLights = setupLights;
function setupVideo(videoIndex) {
    const pins = {
        greenLedPin: new pigpio_1.Gpio(config_1.CONFIG.lights[videoIndex].greenLedPin, { mode: pigpio_1.Gpio.OUTPUT }),
        redLedPin: new pigpio_1.Gpio(config_1.CONFIG.lights[videoIndex].redLedPin, { mode: pigpio_1.Gpio.OUTPUT })
    };
    lights.push(pins);
}
function turnGreenLightOn(videoIndex) {
    lights[videoIndex].greenLedPin.digitalWrite(1);
    lights[videoIndex].redLedPin.digitalWrite(0);
}
function turnRedLightOn(videoIndex) {
    lights[videoIndex].greenLedPin.digitalWrite(0);
    lights[videoIndex].redLedPin.digitalWrite(1);
}
function turnLightOff(videoIndex) {
    lights[videoIndex].greenLedPin.digitalWrite(0);
    lights[videoIndex].redLedPin.digitalWrite(0);
}
function updateLights(videoState) {
    console.log(videoState);
    lights.forEach((light, index) => {
        if (videoState.programVideoIndex === index) {
            console.log(`tally ${index}: red`);
            turnRedLightOn(index);
            return;
        }
        else if (videoState.previewVideoIndex === index) {
            console.log(`tally ${index}: green`);
            turnGreenLightOn(index);
            return;
        }
        console.log(`tally ${index}: off`);
        turnLightOff(index);
    });
}
exports.updateLights = updateLights;
