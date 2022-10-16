import crypto from 'crypto';

import {
  Offer,
  OfferType,
  OfferPhotos,
  OfferRating,
  OfferRooms,
  OfferGuests,
  OfferFeature,
  OfferCoordinates,
  OfferLocation,
} from '../types/offer.type.js';

export const createOffer = (row: string): Offer => {
  const tokens = row.replace('\n', '').split('\t');
  const [
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
  ] = tokens;
  return {
    title,
    description,
    postDate: new Date(postDate),
    cityName: cityName as OfferLocation,
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
    coordinates: coordinates.split(';').map(Number) as OfferCoordinates,
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const isNil = (value: unknown): value is null | undefined => (value === null || value === undefined);
