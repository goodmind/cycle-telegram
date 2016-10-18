import * as t from 'tcomb'

export const PhotoSize = t.struct<TcombPhotoSize>({
  file_id: t.String,
  width: t.Number,
  height: t.Number,
  file_size: t.maybe(t.Number)
})
export interface TcombPhotoSize {
  file_id: string
  width: number
  height: number
  file_size?: number
}

export const Audio = t.struct<TcombAudio>({
  file_id: t.String,
  duration: t.Number,
  performer: t.maybe(t.String),
  title: t.maybe(t.String),
  mime_type: t.maybe(t.String),
  file_size: t.maybe(t.Number)
})
export interface TcombAudio {
  file_id: string
  duration: number
  performer?: string
  title: string
  mime_type?: string
  file_size?: number
}

export const Document = t.struct<TcombDocument>({
  file_id: t.String,
  thumb: t.maybe(PhotoSize),
  file_name: t.maybe(t.String),
  mime_type: t.maybe(t.String),
  file_size: t.maybe(t.Number)
})
export interface TcombDocument {
  file_id: string
  thumb?: TcombPhotoSize
  file_name?: string
  mime_type?: string
  file_size?: number
}

export const Animation = t.struct<TcombAnimation>({
  file_id: t.String,
  thumb: t.maybe(PhotoSize),
  file_name: t.maybe(t.String),
  mime_type: t.maybe(t.String),
  file_size: t.maybe(t.Number)
})
export interface TcombAnimation {
  file_id: string
  thumb?: TcombPhotoSize
  file_name?: string
  mime_type?: string
  file_size?: number
}

export const Sticker = t.struct<TcombSticker>({
  file_id: t.String,
  width: t.Number,
  height: t.Number,
  thumb: t.maybe(PhotoSize),
  emoji: t.maybe(t.String),
  file_size: t.maybe(t.Number)
})
export interface TcombSticker {
  file_id: string
  width: number
  height: number
  thumb?: TcombPhotoSize
  emoji?: string
  file_size?: number
}

export const Video = t.struct<TcombVideo>({
  file_id: t.String,
  width: t.Number,
  height: t.Number,
  duration: t.Number,
  thumb: t.maybe(PhotoSize),
  mime_type: t.maybe(t.String),
  file_size: t.maybe(t.Number)
})
export interface TcombVideo {
  file_id: string
  width: number
  height: number
  duration: number
  thumb?: TcombPhotoSize
  mime_type?: string
  file_size?: number
}

export const Voice = t.struct<TcombVoice>({
  file_id: t.String,
  duration: t.Number,
  mime_type: t.maybe(t.String),
  file_size: t.maybe(t.Number)
})
export interface TcombVoice {
  file_id: string
  duration: number
  mime_type?: string
  file_size?: number
}

export const Contact = t.struct<TcombContact>({
  phone_number: t.String,
  first_name: t.String,
  last_name: t.maybe(t.String),
  user_id: t.maybe(t.Number)
})
export interface TcombContact {
  phone_number: string
  first_name: string
  last_name?: string
  user_id?: number
}

export const Location = t.struct<TcombLocation>({
  longitude: t.Number,
  latitude: t.Number
})
export interface TcombLocation {
  longitude: number
  latitude: number
}

export const Venue = t.struct<TcombVenue>({
  location: Location,
  title: t.String,
  address: t.String,
  foursquare_id: t.maybe(t.String)
})
export interface TcombVenue {
  location: TcombLocation
  title: string
  address: string
  foursquare_id?: string
}

export const UserProfilePhotos = t.struct<TcombUserProfilePhotos>({
  total_count: t.Number,
  photos: t.list(t.list(PhotoSize))
})
export interface TcombUserProfilePhotos {
  total_count: number
  photos: TcombPhotoSize[][]
}

export const File = t.struct<TcombFile>({
  file_id: t.String,
  file_size: t.maybe(t.Number),
  file_path: t.maybe(t.String)
})
export interface TcombFile {
  file_id: string
  file_size?: number
  file_path?: string
}
