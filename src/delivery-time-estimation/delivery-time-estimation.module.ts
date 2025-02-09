import { Module } from '@nestjs/common';
import { DeliveryTimeEstimationService } from './delivery-time-estimation.service';
import { DeliveryTimeEstimationController } from './delivery-time-estimation.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [DeliveryTimeEstimationController],
  providers: [DeliveryTimeEstimationService, AppService],
})
export class DeliveryTimeEstimationModule {}
