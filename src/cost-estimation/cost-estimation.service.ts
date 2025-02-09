import { Injectable } from '@nestjs/common';
import { PackageDetails } from 'src/delivery-time-estimation/entity/delivery.entity';
import { Offer } from 'src/offer/entities/offer.entity';
import { OfferService } from 'src/offer/offer.service';

@Injectable()
export class CostEstimationService {
  constructor(private readonly offerService: OfferService) {}

  /**
   * This function takes in a base delivery cost and an array of package details.
   * It iterates through the array, finds the offer that matches the package detail's offer code,
   * and calculates the final cost for each package using the offer.
   * If no offer is found, it calculates the cost using the base cost and package details.
   * The function returns an array of objects with the package id, delivery cost, and discount.
   * If an error occurs, it logs the error and returns null.
   * @param baseDeliveryCost The base cost of delivery.
   * @param packageDetails An array of package details.
   * @returns An array of objects with the package id, delivery cost, and discount or null if an error occurs.
   */
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
