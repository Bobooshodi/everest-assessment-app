import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
import { remove } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OfferService {
  offers: Offer[] = [];
  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    try {
      const offer = new Offer();
      offer.id = uuidv4();
      offer.name = createOfferDto.name;
      offer.code = createOfferDto.code;
      offer.description = createOfferDto.description;
      offer.discount = createOfferDto.discount || 0;
      offer.minDistance = createOfferDto.minDistance;
      offer.maxDistance = createOfferDto.maxDistance;
      offer.minWeight = createOfferDto.minWeight;
      offer.maxWeight = createOfferDto.maxWeight;
      this.offers.push(offer);
      return offer;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findAll(): Promise<Offer[]> {
    try {
      return this.offers;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findOne(id: string): Promise<Offer> {
    try {
      return this.offers.find((offer) => offer.id === id);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  update(id: string, updateOfferDto: UpdateOfferDto): Promise<Offer> {
    try {
      const offerIndex = this.offers.findIndex((offer) => offer.id === id);
      const offer = this.offers[offerIndex];
      offer.name = updateOfferDto.name;
      offer.description = updateOfferDto.description;
      offer.minDistance = updateOfferDto.minDistance;
      offer.maxDistance = updateOfferDto.maxDistance;
      offer.minWeight = updateOfferDto.minWeight;
      offer.maxWeight = updateOfferDto.maxWeight;
      this.offers[offerIndex] = offer;

      return new Promise((resolve) => resolve(offer));
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      remove(this.offers, (offer) => offer.id === id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async seed(): Promise<boolean> {
    try {
      const dummyOffers = [
        {
          discount: 10,
          minWeight: 70,
          maxWeight: 200,
          minDistance: 0,
          maxDistance: 200,
          code: 'OFR001',
          description: '10% off for weight > 70kg and distance < 200km',
          name: 'Offer 1',
        },
        {
          discount: 7,
          minWeight: 100,
          maxWeight: 250,
          minDistance: 50,
          maxDistance: 150,
          code: 'OFR002',
          description: '7% off for weight > 100kg and distance < 150km',
          name: 'Offer 2',
        },
        {
          discount: 5,
          minWeight: 10,
          maxWeight: 150,
          minDistance: 50,
          maxDistance: 250,
          code: 'OFR003',
          description: '5% off for weight > 10kg and distance < 250km',
          name: 'Offer 3',
        },
      ];

      for (const offer of dummyOffers) {
        const newOffer = new CreateOfferDto();
        newOffer.discount = offer.discount;
        newOffer.minWeight = offer.minWeight;
        newOffer.maxWeight = offer.maxWeight;
        newOffer.minDistance = offer.minDistance;
        newOffer.maxDistance = offer.maxDistance;
        newOffer.code = offer.code;

        await this.create(newOffer);
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
