import { Gpio } from 'pigpio'

import { CONFIG } from './config'
import { VideoIndex, VideoState, VideoStatus } from './types'

type LightPins = {
  greenLedPin: Gpio
  redLedPin: Gpio
}

const lights: LightPins[] = []

export function setupLights() {
  ;[0, 1, 2].forEach(setupVideo)
}

function setupVideo(videoIndex: VideoIndex): void {
  const pins = {
    greenLedPin: new Gpio(CONFIG.lights[videoIndex].greenLedPin, { mode: Gpio.OUTPUT }),
    redLedPin: new Gpio(CONFIG.lights[videoIndex].redLedPin, { mode: Gpio.OUTPUT })
  }
  lights.push(pins)
}

function turnGreenLightOn(videoIndex: VideoIndex): void {
  lights[videoIndex].greenLedPin.digitalWrite(1)
  lights[videoIndex].redLedPin.digitalWrite(0)
}

function turnRedLightOn(videoIndex: VideoIndex): void {
  lights[videoIndex].greenLedPin.digitalWrite(0)
  lights[videoIndex].redLedPin.digitalWrite(1)
}

function turnLightOff(videoIndex: VideoIndex): void {
  lights[videoIndex].greenLedPin.digitalWrite(0)
  lights[videoIndex].redLedPin.digitalWrite(0)
}

export function updateLights(videoState: VideoState): void {
  lights.forEach((light, index_) => {
    console.log(index_)
    const index = index_ + 1
    if (videoState.programVideoIndex === index) {
      console.log(`tally ${index}: red`)
      turnRedLightOn(index_)
      return
    } else if (videoState.previewVideoIndex === index) {
      console.log(`tally ${index}: green`)
      turnGreenLightOn(index_)
      return
    }
    console.log(`tally ${index}: off`)
    turnLightOff(index_)
  })
}
