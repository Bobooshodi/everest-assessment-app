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

  calculateDiscount(deliveryCost: number): number {
    return (this.discount / 100) * deliveryCost;
  }

  calculateFinalCost(baseCost: number, distance: number, weight: number): any {
    const cost = baseCost + weight * 10 + distance * 5;
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
