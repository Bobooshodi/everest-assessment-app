import { Injectable } from '@nestjs/common';

@Injectable()
export class DeliveryTimeEstimationService {
  create(createDeliveryTimeEstimationDto: any) {
    return 'This action adds a new deliveryTimeEstimation';
  }
}
