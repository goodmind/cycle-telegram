import * as t from 'tcomb';
export declare const PhotoSize: t.Struct<TcombPhotoSize>;
export interface TcombPhotoSize {
    file_id: string;
    width: number;
    height: number;
    file_size?: number;
}
export declare const Audio: t.Struct<TcombAudio>;
export interface TcombAudio {
    file_id: string;
    duration: number;
    performer?: string;
    title: string;
    mime_type?: string;
    file_size?: number;
}
export declare const Document: t.Struct<TcombDocument>;
export interface TcombDocument {
    file_id: string;
    thumb?: TcombPhotoSize;
    file_name?: string;
    mime_type?: string;
    file_size?: number;
}
export declare const Animation: t.Struct<TcombAnimation>;
export interface TcombAnimation {
    file_id: string;
    thumb?: TcombPhotoSize;
    file_name?: string;
    mime_type?: string;
    file_size?: number;
}
export declare const Sticker: t.Struct<TcombSticker>;
export interface TcombSticker {
    file_id: string;
    width: number;
    height: number;
    thumb?: TcombPhotoSize;
    emoji?: string;
    file_size?: number;
}
export declare const Video: t.Struct<TcombVideo>;
export interface TcombVideo {
    file_id: string;
    width: number;
    height: number;
    duration: number;
    thumb?: TcombPhotoSize;
    mime_type?: string;
    file_size?: number;
}
export declare const Voice: t.Struct<TcombVoice>;
export interface TcombVoice {
    file_id: string;
    duration: number;
    mime_type?: string;
    file_size?: number;
}
export declare const Contact: t.Struct<TcombContact>;
export interface TcombContact {
    phone_number: string;
    first_name: string;
    last_name?: string;
    user_id?: number;
}
export declare const Location: t.Struct<TcombLocation>;
export interface TcombLocation {
    longitude: number;
    latitude: number;
}
export declare const Venue: t.Struct<TcombVenue>;
export interface TcombVenue {
    location: TcombLocation;
    title: string;
    address: string;
    foursquare_id?: string;
}
export declare const UserProfilePhotos: t.Struct<TcombUserProfilePhotos>;
export interface TcombUserProfilePhotos {
    total_count: number;
    photos: TcombPhotoSize[][];
}
export declare const File: t.Struct<TcombFile>;
export interface TcombFile {
    file_id: string;
    file_size?: number;
    file_path?: string;
}
