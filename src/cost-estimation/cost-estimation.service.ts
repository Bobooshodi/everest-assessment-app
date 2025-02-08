import { Injectable } from '@nestjs/common';
import { OfferService } from 'src/offer/offer.service';

@Injectable()
export class CostEstimationService {
  constructor(private readonly offerService: OfferService) {}

  async estimateCost(
    baseDeliveryCost: number,
    packageDetails: string[],
  ): Promise<any> {
    const estimates: any[] = [];
    try {
      for (let i = 0; i < packageDetails.length; i++) {
        const packageDetail = packageDetails[i].split(' ');
        const offer = this.offerService.offers.find(
          (offer) => offer.code === packageDetail[3],
        );
        if (offer) {
          const cost = offer.calculateFinalCost(
            baseDeliveryCost,
            parseInt(packageDetail[2]),
            parseInt(packageDetail[1]),
          );
          estimates.push({
            package: packageDetail[0],
            deliveryCost: cost.finalCost,
            discount: cost.discount,
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
