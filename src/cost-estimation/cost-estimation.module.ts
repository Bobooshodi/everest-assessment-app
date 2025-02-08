import { Module } from '@nestjs/common';
import { CostEstimationService } from './cost-estimation.service';
import { CostEstimationController } from './cost-estimation.controller';
import { OfferService } from 'src/offer/offer.service';

@Module({
  controllers: [CostEstimationController],
  providers: [CostEstimationService, OfferService],
})
export class CostEstimationModule {}
