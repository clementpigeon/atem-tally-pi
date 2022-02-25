type LightConfig = {
  greenLedPin: number
  redLedPin: number
}

type Config = {
  switcherIpAddress: string
  lights: LightConfig[]
}

export const CONFIG: Config = {
  switcherIpAddress: '169.254.1.178',
  lights: [
    {
      greenLedPin: 16,
      redLedPin: 13
    },
    {
      greenLedPin: 20,
      redLedPin: 19
    },
    {
      greenLedPin: 21,
      redLedPin: 26
    }
  ]
}
