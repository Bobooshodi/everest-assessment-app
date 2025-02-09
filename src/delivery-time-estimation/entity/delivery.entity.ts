export interface PackageDetails {
  id: string;
  weight: number;
  distance: number;
  offerCode?: string;
}

export class Delivery {
  vehicleCount: number;
  totalWeight: number;
  maxDistance: number;
  packages: PackageDetails[];
}
