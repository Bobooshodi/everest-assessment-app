import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { CostEstimationService } from 'src/cost-estimation/cost-estimation.service';
import { DeliveryTimeEstimationService } from 'src/delivery-time-estimation/delivery-time-estimation.service';
import { GetDeliveryTimeEstimationDto } from 'src/delivery-time-estimation/dto/get-delivery-time-estimation.dto';
import { PackageDetails } from 'src/delivery-time-estimation/entity/delivery.entity';
import { OfferService } from 'src/offer/offer.service';

@Command({ name: 'app-command', options: { isDefault: true } })
export class AppCommand extends CommandRunner {
  constructor(
    private readonly inquirerService: InquirerService,
    private readonly offerService: OfferService,
    private readonly coseEstimateService: CostEstimationService,
    private readonly deliveryTimeEstimationService: DeliveryTimeEstimationService,
  ) {
    super();
  }

  async run(inputs: string[], options?: Record<string, any>) {
    await this.offerService.seed();
    console.log(this.offerService.offers);
    const packageDetails: PackageDetails[] = [];

    const { packageCount, baseDeliveryCost } =
      await this.inquirerService.prompt('BaseDetails', options);

    for (let i = 0; i < parseInt(packageCount); i++) {
      const resp = await this.inquirerService.prompt('PackageDetails', options);
      const details = resp.deliveryDetails.split(' ');
      packageDetails.push({
        id: details[0],
        weight: parseInt(details[1]),
        distance: parseInt(details[2]),
        offerCode: details[3] || null,
      } as PackageDetails);
    }

    const estimates = await this.coseEstimateService.estimateCost(
      baseDeliveryCost,
      packageDetails,
    );
    console.log(estimates);

    const { estimateDelivery } = await this.inquirerService.prompt(
      'EstimateDelivery',
      options,
    );

    if (estimateDelivery) {
      const { vehicleDetails } = await this.inquirerService.prompt(
        'VehicleDetails',
        options,
      );

      const details = vehicleDetails.split(' ');

      const deliveryEstimationDTO = new GetDeliveryTimeEstimationDto();
      deliveryEstimationDTO.costEstimates = estimates;
      deliveryEstimationDTO.packages = packageDetails;
      deliveryEstimationDTO.vehicleCount = parseInt(details[0]);
      deliveryEstimationDTO.maxWeight = parseInt(details[2]);
      deliveryEstimationDTO.maxSpeed = parseInt(details[1]);
      const deliveryEstimation =
        await this.deliveryTimeEstimationService.create(deliveryEstimationDTO);
      console.log(deliveryEstimation);
    }
  }
}
