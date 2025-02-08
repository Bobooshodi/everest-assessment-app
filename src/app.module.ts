import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CostEstimationModule } from './cost-estimation/cost-estimation.module';
import { DeliveryTimeEstimationModule } from './delivery-time-estimation/delivery-time-estimation.module';
import { OfferModule } from './offer/offer.module';
import { OfferService } from './offer/offer.service';
import { AppCommand } from './command/app.command';
import { PackageDetailsQuestions } from './command/package-details.questions';
import { BaseDetailsQuestions } from './command/base-details.questions';
import { CostEstimationService } from './cost-estimation/cost-estimation.service';

@Module({
  imports: [CostEstimationModule, DeliveryTimeEstimationModule, OfferModule],
  controllers: [AppController],
  providers: [
    AppService,
    OfferService,
    AppCommand,
    PackageDetailsQuestions,
    BaseDetailsQuestions,
    CostEstimationService,
  ],
})
export class AppModule {}
