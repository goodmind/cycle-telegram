import t from 'tcomb';

export const PhotoSize = t.struct({
  file_id: t.String,
  width: t.Number,
  height: t.Number,
  file_size: t.maybe(t.Number)
});

export const Audio = t.struct({
  file_id: t.String,
  duration: t.Number,
  performer: t.maybe(t.String),
  title: t.maybe(t.String),
  mime_type: t.maybe(t.String),
  file_size: t.maybe(t.Number)
});

export const Document = t.struct({
  file_id: t.String,
  thumb: t.maybe(PhotoSize),
  file_name: t.maybe(t.String),
  mime_type: t.maybe(t.String),
  file_size: t.maybe(t.Number)
});

export const Sticker = t.struct({
  file_id: t.String,
  width: t.Number,
  height: t.Number,
  thumb: t.maybe(PhotoSize),
  file_size: t.maybe(t.Number)
});

export const Video = t.struct({
  file_id: t.String,
  width: t.Number,
  height: t.Number,
  duration: t.Number,
  thumb: t.maybe(PhotoSize),
  mime_type: t.maybe(t.String),
  file_size: t.maybe(t.Number)
});

export const Voice = t.struct({
  file_id: t.String,
  duration: t.Number,
  mime_type: t.maybe(t.String),
  file_size: t.maybe(t.Number)
});

export const Contact = t.struct({
  phone_number: t.String,
  first_name: t.String,
  last_name: t.maybe(t.String),
  user_id: t.maybe(t.Number)
});

export const Location = t.struct({
  longitude: t.Number,
  latitude: t.Number
});

export const Venue = t.struct({
  location: Location,
  title: t.String,
  address: t.String,
  foursquare_id: t.maybe(t.String)
});

export const UserProfilePhotos = t.struct({
  total_count: t.Number,
  photos: t.list(t.list(PhotoSize))
});

export const File = t.struct({
  file_id: t.String,
  file_size: t.maybe(t.Number),
  file_path: t.maybe(t.String)
});

