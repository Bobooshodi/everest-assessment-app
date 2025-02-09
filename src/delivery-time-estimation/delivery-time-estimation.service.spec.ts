import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryTimeEstimationService } from './delivery-time-estimation.service';

describe('DeliveryTimeEstimationService', () => {
  let service: DeliveryTimeEstimationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryTimeEstimationService],
    }).compile();

    service = module.get<DeliveryTimeEstimationService>(
      DeliveryTimeEstimationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
