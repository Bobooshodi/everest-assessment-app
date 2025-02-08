import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeliveryTimeEstimationService } from './delivery-time-estimation.service';

@Controller()
export class DeliveryTimeEstimationController {
  constructor(
    private readonly deliveryTimeEstimationService: DeliveryTimeEstimationService,
  ) {}

  @MessagePattern('createDeliveryTimeEstimation')
  create(@Payload() createDeliveryTimeEstimationDto: any) {
    return this.deliveryTimeEstimationService.create(
      createDeliveryTimeEstimationDto,
    );
  }
}
