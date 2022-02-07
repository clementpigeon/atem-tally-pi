import { Gpio } from 'pigpio'

import { CONFIG } from './config'
import { VideoIndex, VideoState, VideoStatus } from './types'

type LightPins = {
  powerPin: Gpio
  colorPin: Gpio
}

const lights: LightPins[] = []

export function setupLights() {
  ;[0, 1, 2].forEach(setupVideo)
}

function setupVideo(videoIndex: VideoIndex): void {
  const pins = {
    powerPin: new Gpio(CONFIG.lights[videoIndex].powerPin, { mode: Gpio.OUTPUT }),
    colorPin: new Gpio(CONFIG.lights[videoIndex].colorPin, { mode: Gpio.OUTPUT })
  }
  lights.push(pins)
}

function turnGreenLightOn(videoIndex: VideoIndex): void {
  lights[videoIndex].powerPin.digitalWrite(1)
  lights[videoIndex].colorPin.digitalWrite(0)
}

function turnRedLightOn(videoIndex: VideoIndex): void {
  lights[videoIndex].powerPin.digitalWrite(1)
  lights[videoIndex].colorPin.digitalWrite(1)
}

function turnLightOff(videoIndex: VideoIndex): void {
  lights[videoIndex].powerPin.digitalWrite(0)
  lights[videoIndex].colorPin.digitalWrite(0)
}

export function updateLights(videoState: VideoState): void {
  videoState.forEach((videoStatus: VideoStatus, index) => {
    if (videoStatus.status === 'program') {
      console.log(`tally ${index}: red`)
      turnRedLightOn(videoStatus.index)
      return
    } else if (videoStatus.status === 'preview') {
      console.log(`tally ${index}: green`)
      turnGreenLightOn(videoStatus.index)
      return
    }
    console.log(`tally ${index}: off`)
    turnLightOff(videoStatus.index)
  })
}
