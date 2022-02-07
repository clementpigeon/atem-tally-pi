export type VideoStatusValue = 'program' | 'preview' | 'inactive' | 'not-connected'

export type VideoStatus = {
  index: number
  status: VideoStatusValue
}

export type VideoState = VideoStatus[]

export type VideoIndex = number
