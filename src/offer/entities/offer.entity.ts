export class Offer {
  id: string;
  code: string;
  name: string;
  description: string;
  discount: number;
  minDistance: number;
  maxDistance: number;
  minWeight: number;
  maxWeight: number;

  valid(distance: number, weight: number): boolean {
    return (
      distance >= this.minDistance &&
      distance <= this.maxDistance &&
      weight >= this.minWeight &&
      weight <= this.maxWeight
    );
  }

  static calculateCost(
    baseCost: number,
    weight: number,
    distance: number,
  ): number {
    return baseCost + weight * 10 + distance * 5;
  }

  calculateDiscount(deliveryCost: number): number {
    return (this.discount / 100) * deliveryCost;
  }

  calculateFinalCost(baseCost: number, weight: number, distance: number): any {
    // const cost = baseCost + weight * 10 + distance * 5;
    const cost = Offer.calculateCost(baseCost, weight, distance);
    let discount = 0;

    if (this.valid(distance, weight)) {
      discount = this.calculateDiscount(cost);
    }

    return {
      discount,
      finalCost: cost - discount,
    };
  }
}
