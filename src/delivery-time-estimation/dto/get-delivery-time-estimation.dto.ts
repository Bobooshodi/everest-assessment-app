import { PackageDetails } from '../entity/delivery.entity';

export class GetDeliveryTimeEstimationDto {
  vehicleCount: number;
  maxWeight: number;
  maxSpeed: number;
  packages: PackageDetails[];
}
