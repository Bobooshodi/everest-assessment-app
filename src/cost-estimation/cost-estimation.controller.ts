import { Controller } from '@nestjs/common';
import { CostEstimationService } from './cost-estimation.service';

@Controller()
export class CostEstimationController {
  constructor(private readonly costEstimationService: CostEstimationService) {}
}
