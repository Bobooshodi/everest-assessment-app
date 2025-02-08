import { Module } from '@nestjs/common';
import { DeliveryTimeEstimationService } from './delivery-time-estimation.service';
import { DeliveryTimeEstimationController } from './delivery-time-estimation.controller';

@Module({
  controllers: [DeliveryTimeEstimationController],
  providers: [DeliveryTimeEstimationService],
})
export class DeliveryTimeEstimationModule {}
