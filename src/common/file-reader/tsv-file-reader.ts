import { readFileSync } from 'fs';

import {CityName} from '../../types/city.type.js';
import {
  Offer,
  OfferType,
  OfferPhotos,
  OfferRating,
  OfferRooms,
  OfferGuests,
  OfferFeature,
  Coordinates,
} from '../../types/offer.type.js';

import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split(/\s\s|\t/))
      .map(([
        title,
        description,
        postDate,
        cityName,
        previewImage,
        photos,
        isPremium,
        rating,
        type,
        rooms,
        guests,
        price,
        features,
        author,
        commentsCount,
        coordinates,
      ]): Offer => ({
        title,
        description,
        postDate: new Date(postDate),
        cityName: cityName as CityName,
        previewImage,
        photos: photos.split(';') as OfferPhotos,
        isPremium: Boolean(isPremium),
        rating: Number(rating) as OfferRating,
        type: type as OfferType,
        rooms: Number(rooms) as OfferRooms,
        guests: Number(guests) as OfferGuests,
        price: Number(price),
        features: features.split(';') as OfferFeature[],
        author,
        commentsCount: Number(commentsCount),
        coordinates: coordinates.split(';').map(Number) as Coordinates,
      }));
  }
}
