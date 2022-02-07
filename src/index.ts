import { handleNewAtemState, setupAtemConnection } from './atem'
import { atemState1 } from './fixtures'
import { setupLights } from './lights'

console.log('run')

setupLights()
setupAtemConnection()

// test code
handleNewAtemState(atemState1)
