type LightConfig = {
  powerPin: number
  colorPin: number
}

type Config = {
  switcherIpAddress: string
  lights: LightConfig[]
}

export const CONFIG: Config = {
  switcherIpAddress: '192.168.1.25',
  lights: [
    {
      powerPin: 16,
      colorPin: 13
    },
    {
      powerPin: 20,
      colorPin: 19
    },
    {
      powerPin: 21,
      colorPin: 26
    }
  ]
}
