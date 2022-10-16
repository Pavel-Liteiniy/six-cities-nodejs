import dayjs from 'dayjs';

import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.title);
    const description = getRandomItem(this.mockData.description);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const cityName = getRandomItem(this.mockData.cityName);
    const previewImage = getRandomItem(this.mockData.previewImage);
    const photos = getRandomItem(this.mockData.photos);
    const isPremium = Boolean(generateRandomValue(0, 1));
    const rating = generateRandomValue(1, 5);
    const type = getRandomItem(this.mockData.type);
    const rooms = generateRandomValue(1, 8);
    const guests = generateRandomValue(1, 10);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const features = getRandomItems(this.mockData.features).join(';');
    const author = getRandomItem(this.mockData.author);
    const commentsCount = generateRandomValue(0, 100);
    const coordinates = getRandomItem(this.mockData.coordinates);

    return [
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
    ].join('\t');
  }
}
