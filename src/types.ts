export type VideoStatusValue = 'program' | 'preview' | 'inactive' | 'not-connected'

export type VideoStatus = {
  index: number
  status: VideoStatusValue
}

export type VideoState = {
  previewVideoIndex: number | null
  programVideoIndex: number | null
}

export type VideoIndex = number
