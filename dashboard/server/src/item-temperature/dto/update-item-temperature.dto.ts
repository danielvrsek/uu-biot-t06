import { PartialType } from '@nestjs/mapped-types';
import { CreateItemTemperatureDto } from './create-item-temperature.dto';

export class UpdateItemTemperatureDto extends PartialType(CreateItemTemperatureDto) {}
