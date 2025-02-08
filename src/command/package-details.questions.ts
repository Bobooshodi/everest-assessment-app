import { QuestionSet, Question } from 'nest-commander';

@QuestionSet({ name: 'PackageDetails' })
export class PackageDetailsQuestions {
  @Question({
    name: 'deliveryDetails',
    type: 'string',
    parse: parseInt,
    message: 'Enter delivery details (space delimited). Format: pkg_id weight(KG) distance(KM) offer_code. Eg. PKG1 5 5 OFR001)',
  })
  parseDefault(target: number): number {
    return target;
  }
}
