import { Injectable } from '@nestjs/common';
import { PackageDetails } from 'src/delivery-time-estimation/entity/delivery.entity';
import { Offer } from 'src/offer/entities/offer.entity';
import { OfferService } from 'src/offer/offer.service';

@Injectable()
export class CostEstimationService {
  constructor(private readonly offerService: OfferService) {}

  async estimateCost(
    baseDeliveryCost: number,
    packageDetails: PackageDetails[],
  ): Promise<any> {
    const estimates: any[] = [];
    try {
      for (let i = 0; i < packageDetails.length; i++) {
        const packageDetail = packageDetails[i]; //.split(' ');
        const offer = this.offerService.offers.find(
          (offer) => offer.code === packageDetail.offerCode,
        );
        if (offer) {
          const cost = offer.calculateFinalCost(
            baseDeliveryCost,
            packageDetail.weight,
            packageDetail.distance,
          );
          estimates.push({
            package: packageDetail.id,
            deliveryCost: cost.finalCost,
            discount: cost.discount,
          });
        } else {
          const cost = Offer.calculateCost(
            baseDeliveryCost,
            packageDetail.weight,
            packageDetail.distance,
          );
          estimates.push({
            package: packageDetail.id,
            deliveryCost: cost,
            discount: 0,
          });
        }
      }
      return estimates;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
