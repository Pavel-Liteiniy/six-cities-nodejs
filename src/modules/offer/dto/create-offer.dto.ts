import {
  OfferLocation,
  OfferPhotos,
  OfferType,
  OfferRating,
  OfferRooms,
  OfferGuests,
  OfferFeature,
  OfferCoordinates,
} from '../../../types/offer.type.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public cityName!: OfferLocation;
  public previewImage!: string;
  public photos!: OfferPhotos;
  public isPremium!: boolean;
  public rating!: OfferRating;
  public type!: OfferType;
  public rooms!: OfferRooms;
  public guests!: OfferGuests;
  public price!: number;
  public features!: OfferFeature[];
  public author!: string;
  public commentsCount!: number;
  public coordinates!: OfferCoordinates;
}
