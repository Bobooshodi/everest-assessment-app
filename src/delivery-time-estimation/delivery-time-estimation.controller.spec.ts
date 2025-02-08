import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryTimeEstimationController } from './delivery-time-estimation.controller';
import { DeliveryTimeEstimationService } from './delivery-time-estimation.service';

describe('DeliveryTimeEstimationController', () => {
  let controller: DeliveryTimeEstimationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryTimeEstimationController],
      providers: [DeliveryTimeEstimationService],
    }).compile();

    controller = module.get<DeliveryTimeEstimationController>(DeliveryTimeEstimationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
