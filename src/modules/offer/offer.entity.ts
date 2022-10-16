import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';

import isURL from 'validator/lib/isURL.js';
import isDecimal from 'validator/lib/isDecimal.js';
import isLatLong from 'validator/lib/isLatLong.js';

import { isNil } from '../../utils/common.js';

import {
  Offer,
  OfferLocation,
  OfferCoordinates,
  OfferFeature,
  OfferGuests,
  OfferPhotos,
  OfferRating,
  OfferRooms,
  OfferType,
  CityName,
  Placement,
  Feature,
} from '../../types/offer.type.js';
import {UserEntity} from '../user/user.entity.js';

const OFFER_PHOTO_AMOUNT = 6;

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  constructor(data: Offer) {
    super();

    this.title = data.title;
    this.description = data.description;
    this.postDate = data.postDate;
    this.cityName = data.cityName;
    this.previewImage = data.previewImage;
    this.photos = data.photos;
    this.isPremium = data.isPremium;
    this.rating = data.rating;
    this.type = data.type;
    this.rooms = data.rooms;
    this.guests = data.guests;
    this.price = data.price;
    this.features = data.features;
    this.author = data.author as unknown as Ref<UserEntity>;
    this.commentsCount = data.commentsCount;
    this.coordinates = data.coordinates;
  }

  @prop({required: true, trim: true, minlength: 10, maxlength: 100})
  public title: string;

  @prop({required: true, trim: true, minlength: 20, maxlength: 1024})
  public description: string;

  @prop({required: true, type: Date})
  public postDate: Date;

  @prop({
    required: true,
    validate: {
      validator: (cityName: OfferLocation) => !isNil(CityName[cityName]),
      message: 'incorrect city name format',
    }
  })
  public cityName: OfferLocation;

  @prop({
    required: true,
    validate: {
      validator: isURL,
      message: 'incorrect link format',
    }
  })
  public previewImage: string;

  @prop({
    required: true,
    validate: {
      validator: (photos: OfferPhotos[]) => (
        photos?.length === OFFER_PHOTO_AMOUNT && photos.every((photo) => isURL(photo as unknown as string))
      ),
      message: 'incorrect number of photos or incorrect link format',
    }
  })
  public photos: OfferPhotos;

  @prop({required: true})
  public isPremium: boolean;

  @prop({
    required: true,
    min: 1,
    max: 5,
    validate: {
      // eslint-disable-next-line camelcase
      validator: (rating: OfferRating) => isDecimal(String(rating), {decimal_digits: '0,1'}),
      message: 'incorrect rating',
    }
  })
  public rating: OfferRating;

  @prop({
    required: true,
    validate: {
      validator: (placement: OfferType) => !isNil(Placement[placement]),
      message: 'incorrect offer type',
    }
  })
  public type: OfferType;

  @prop({required: true, min: 1, max: 8})
  public rooms: OfferRooms;

  @prop({required: true, min: 1, max: 10})
  public guests: OfferGuests;

  @prop({required: true, min: 100, max: 100000})
  public price: number;

  @prop({
    required: true,
    validate: {
      validator: (features: OfferFeature[]) => features.every((feature) => {
        console.log('feature -->', feature);

        return !isNil(Feature[feature]);
      }),
      message: 'incorrect features',
    }
  })
  public features: OfferFeature[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public author: Ref<UserEntity>;

  @prop({default: 0})
  public commentsCount: number;

  @prop({
    required: true,
    validate: {
      validator: (coordinates: OfferCoordinates) => isLatLong(coordinates.join(',')),
      message: 'incorrect coordinates format',
    }
  })
  public coordinates: OfferCoordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
