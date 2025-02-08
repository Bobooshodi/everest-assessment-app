export class CreateOfferDto {
  name: string;
  code: string;
  description: string;
  discount: number;
  minDistance: number;
  maxDistance: number;
  minWeight: number;
  maxWeight: number;
}
