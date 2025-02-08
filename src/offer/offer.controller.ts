import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Controller()
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @MessagePattern('createOffer')
  create(@Payload() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @MessagePattern('findAllOffer')
  findAll() {
    return this.offerService.findAll();
  }

  @MessagePattern('findOneOffer')
  findOne(@Payload() id: string) {
    return this.offerService.findOne(id);
  }

  @MessagePattern('updateOffer')
  update(@Payload() updateOfferDto: UpdateOfferDto) {
    return this.offerService.update(updateOfferDto.id, updateOfferDto);
  }

  @MessagePattern('removeOffer')
  remove(@Payload() id: string) {
    return this.offerService.delete(id);
  }
}
