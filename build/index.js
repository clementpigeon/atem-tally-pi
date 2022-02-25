"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atem_1 = require("./atem");
const lights_1 = require("./lights");
console.log('run1');
(0, lights_1.setupLights)();
console.log('run2');
(0, atem_1.setupAtemConnection)();
console.log('run3');
// test code
// let state = getRandomState(defaultAtemState)
// setInterval(() => {
//     state = getRandomState(state)
//     handleNewAtemState(state)
// }, 2000)
