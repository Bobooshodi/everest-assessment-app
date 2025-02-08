import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { CostEstimationService } from 'src/cost-estimation/cost-estimation.service';
import { OfferService } from 'src/offer/offer.service';

@Command({ name: 'app-command', options: { isDefault: true } })
export class AppCommand extends CommandRunner {
  constructor(
    private readonly inquirerService: InquirerService,
    private readonly offerService: OfferService,
    private readonly coseEstimateService: CostEstimationService,
  ) {
    super();
  }

  async run(inputs: string[], options?: Record<string, any>) {
    await this.offerService.seed();
    console.log(this.offerService.offers);
    const packageDetails: string[] = [];

    const { packageCount, baseDeliveryCost } =
      await this.inquirerService.prompt('BaseDetails', options);

    for (let i = 0; i < parseInt(packageCount); i++) {
      const resp = await this.inquirerService.prompt('PackageDetails', options);
      packageDetails.push(resp.deliveryDetails);
    }

    console.log(packageDetails);

    const estimates = await this.coseEstimateService.estimateCost(
      baseDeliveryCost,
      packageDetails,
    );
    console.log(estimates);
  }
}
