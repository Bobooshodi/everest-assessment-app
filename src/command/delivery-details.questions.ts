import { QuestionSet, Question } from 'nest-commander';

@QuestionSet({ name: 'EstimateDelivery' })
export class EstimateDeliveryQuestions {
  @Question({
    name: 'estimateDelivery',
    type: 'confirm',
    message: 'Would you like to get the delivery time estimate?',
    default: false,
  })
  parseEstimateDelivery(choice: boolean): boolean {
    return choice;
  }
}

@QuestionSet({ name: 'VehicleDetails' })
export class DeliveryVehicleDetailsQuestions {
  @Question({
    name: 'vehicleDetails',
    type: 'string',
    parse: parseInt,
    message:
      'Enter delivery vehicle details (space delimited). Format: No. of Vehicles Max Speed Max Weight (Eg. Eg. 2 70 200)',
  })
  parseVehicleDetails(details: string): string {
    return details;
  }
}
