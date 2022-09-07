import {CityName} from './city.type.js';
import {UserId} from './user.type.js';

export enum OfferType {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel',
}

export type OfferPhotos = [string, string, string, string, string, string];
export type OfferRating = 1 | 2 | 3 | 4 | 5;
export type OfferRooms = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type OfferGuests = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type OfferFeature = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';
export type Coordinates = [number, number];

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  cityName: CityName;
  previewImage: string;
  photos: OfferPhotos;
  isPremium: boolean;
  rating: OfferRating;
  type: OfferType;
  rooms: OfferRooms;
  guests: OfferGuests;
  price: number;
  features: OfferFeature[];
  author: UserId;
  commentsCount: number;
  coordinates: Coordinates;
};
