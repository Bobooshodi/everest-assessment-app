import { QuestionSet, Question } from 'nest-commander';

@QuestionSet({ name: 'BaseDetails' })
export class BaseDetailsQuestions {
  @Question({
    type: 'number',
    name: 'packageCount',
    message: 'How many packages would you like to have delivered?',
  })
  parsePackageCount(count: number): number {
    return count;
  }

  @Question({
    type: 'number',
    name: 'baseDeliveryCost',
    message: 'What is the base delivery cost?',
  })
  parseBaseDeliveryCost(baseCost: number): number {
    return baseCost;
  }
}
