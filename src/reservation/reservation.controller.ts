import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateRegistrationDto } from 'src/libs/dto';
import { TCreateReservationRequest } from 'src/libs/entities';

@ApiTags('Reservation')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly registrationService: ReservationService) {}

  @Post('reservation')
  @ApiBody({ type: CreateRegistrationDto })
  createReservation(@Body() createRegistrationDto: TCreateReservationRequest) {
    return this.registrationService.createReservation(createRegistrationDto);
  }

  @Get()
  findAll() {
    return this.registrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegistrationDto: TCreateReservationRequest,
  ) {
    return this.registrationService.update(+id, updateRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationService.remove(+id);
  }
}
