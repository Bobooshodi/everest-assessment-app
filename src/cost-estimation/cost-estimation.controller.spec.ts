import { Test, TestingModule } from '@nestjs/testing';
import { CostEstimationController } from './cost-estimation.controller';
import { CostEstimationService } from './cost-estimation.service';

describe('CostEstimationController', () => {
  let controller: CostEstimationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CostEstimationController],
      providers: [CostEstimationService],
    }).compile();

    controller = module.get<CostEstimationController>(CostEstimationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
