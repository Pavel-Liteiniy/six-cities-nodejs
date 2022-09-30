import {Ref} from '@typegoose/typegoose';

import { UserEntity } from '../modules/user/user.entity';

export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}
export type OfferLocation = keyof typeof CityName;

export enum Placement {
  apartment = 'apartment',
  house = 'house',
  room = 'room',
  hotel = 'hotel',
}
export type OfferType = keyof typeof Placement;


type PhotoPath = string;
export type OfferPhotos = [PhotoPath, PhotoPath, PhotoPath, PhotoPath, PhotoPath, PhotoPath];
export type OfferRating = number;
export type OfferRooms = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type OfferGuests = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export enum Feature {
  Breakfast = 'Breakfast',
  'Air conditioning' = 'Air conditioning',
  'Laptop friendly workspace' = 'Air conditioning',
  'Baby seat' = 'Air conditioning',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge',
}
export type OfferFeature = keyof typeof Feature;

type latitude = number;
type longitude = number;
export type OfferCoordinates = [latitude, longitude];

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  cityName: OfferLocation;
  previewImage: string;
  photos: OfferPhotos;
  isPremium: boolean;
  rating: OfferRating;
  type: OfferType;
  rooms: OfferRooms;
  guests: OfferGuests;
  price: number;
  features: OfferFeature[];
  author: Ref<UserEntity>;
  commentsCount: number;
  coordinates: OfferCoordinates;
};
