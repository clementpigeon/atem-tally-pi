import { Gpio } from 'pigpio'
import { handleNewAtemState, setupAtemConnection } from './atem'
import { getRandomState, defaultAtemState } from './fixtures'

import { setupLights } from './lights'

// console.log('run1')

setupLights()
// console.log('run2')

setupAtemConnection()
// console.log('run3')

// test code

// let state = getRandomState(defaultAtemState)

// function getState() {
//     state = getRandomState(state)
//     handleNewAtemState(state)
// }

// setInterval(() => {
//     getState()
// }, 2000)

// Gpio.cleanup()