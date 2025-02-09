import { Injectable } from '@nestjs/common';
import { GetDeliveryTimeEstimationDto } from './dto/get-delivery-time-estimation.dto';
import { Delivery, PackageDetails } from './entity/delivery.entity';
import { AppService } from 'src/app.service';

@Injectable()
export class DeliveryTimeEstimationService {
  constructor(private readonly appService: AppService) {}
  /**
   * Create a delivery time estimation for a given list of packages, vehicle count, maximum weight, and maximum speed.
   * The algorithm works as follows:
   * 1. Choose the vehicle that is available the earliest.
   * 2. Determine the best shipment from the remaining packages.
   * 3. If no valid shipment can be formed (e.g. package too heavy), schedule the first package individually.
   * 4. For each package in the selected shipment, set its delivery time.
   * 5. Update the vehicle’s next available time (round-trip based on the farthest package).
   * 6. Remove the scheduled packages from the list.
   * 7. Repeat steps 1-6 until all packages have been scheduled.
   * @param createDeliveryTimeEstimationDto The input data for the estimation.
   * @returns A log of the estimated delivery times for each package (in minutes).
   */
  async create(createDeliveryTimeEstimationDto: GetDeliveryTimeEstimationDto) {
    const { vehicleCount, maxWeight, maxSpeed, packages } =
      createDeliveryTimeEstimationDto;

    const timeLog = createDeliveryTimeEstimationDto.costEstimates || [];
    // Each vehicle’s available time (initially 0).
    const availableVehicles: number[] = Array(vehicleCount).fill(0);
    // Work on a copy of the package list.
    let remainingPackages = [...packages];

    while (remainingPackages.length > 0) {
      // Choose the vehicle that is available the earliest.
      const vehicleIndex = availableVehicles.indexOf(
        Math.min(...availableVehicles),
      );
      const vehicleAvailableTime = availableVehicles[vehicleIndex];

      // Determine the best shipment from the remaining packages.
      const shipment = this.getBestShipment(remainingPackages, maxWeight);

      // If no valid shipment can be formed (e.g. package too heavy), schedule the first package individually.
      if (shipment.packages.length === 0) {
        const pkg = remainingPackages.shift();
        if (pkg) {
          const deliveryTime =
            vehicleAvailableTime +
            this.appService.truncateTo2DP(pkg.distance / maxSpeed);

          const index = timeLog.findIndex((t) => t.package === pkg.id);
          timeLog[index].deliveryTime =
            this.appService.truncateTo2DP(deliveryTime);
        }
        continue;
      }

      // For each package in the selected shipment, set its delivery time.
      shipment.packages.forEach((pkg) => {
        const deliveryTime =
          vehicleAvailableTime +
          this.appService.truncateTo2DP(pkg.distance / maxSpeed);
        const index = timeLog.findIndex((t) => t.package === pkg.id);
        timeLog[index].deliveryTime =
          this.appService.truncateTo2DP(deliveryTime);
      });

      // Update the vehicle’s next available time (round-trip based on the farthest package).
      const roundTripTime =
        2 * this.appService.truncateTo2DP(shipment.maxDistance / maxSpeed);
      availableVehicles[vehicleIndex] = this.appService.truncateTo2DP(
        vehicleAvailableTime + roundTripTime,
      );

      // Remove the scheduled packages from the list.
      shipment.packages.forEach((pkg) => {
        remainingPackages = remainingPackages.filter((p) => p.id !== pkg.id);
      });
    }

    return timeLog;
  }

  /**
   * Finds the best shipment (a subset of packages) that fits in the given capacity.
   * The “best” shipment maximizes the number of packages. If there is a tie,
   * the shipment with the higher total weight is chosen.
   * @param packages - List of packages to choose from.
   * @param capacity - Maximum weight capacity.
   * @returns The best shipment details.
   */
  private getBestShipment(
    packages: PackageDetails[],
    capacity: number,
  ): Delivery {
    let best: Delivery = {
      packages: [],
      vehicleCount: 0,
      totalWeight: 0,
      maxDistance: 0,
    };
    const n = packages.length;

    function helper(
      index: number,
      currentSubset: PackageDetails[],
      currentWeight: number,
      currentMaxDistance: number,
    ) {
      // If all packages have been considered, check if current subset is the best.
      if (index === n) {
        if (
          currentSubset.length > best.vehicleCount ||
          (currentSubset.length === best.vehicleCount &&
            currentWeight > best.totalWeight)
        ) {
          best = {
            packages: [...currentSubset],
            vehicleCount: currentSubset.length,
            totalWeight: currentWeight,
            maxDistance: currentMaxDistance,
          };
        }
        return;
      }

      // Option 1: Skip the current package.
      helper(index + 1, currentSubset, currentWeight, currentMaxDistance);

      // Option 2: Include the package (if it fits).
      const pkg = packages[index];
      if (currentWeight + pkg.weight <= capacity) {
        currentSubset.push(pkg);
        helper(
          index + 1,
          currentSubset,
          currentWeight + pkg.weight,
          Math.max(currentMaxDistance, pkg.distance),
        );
        currentSubset.pop();
      }
    }

    helper(0, [], 0, 0);
    return best;
  }
}
