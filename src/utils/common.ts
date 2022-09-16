import {CityName} from '../types/city.type.js';
import {
  Offer,
  OfferType,
  OfferPhotos,
  OfferRating,
  OfferRooms,
  OfferGuests,
  OfferFeature,
  Coordinates,
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
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
