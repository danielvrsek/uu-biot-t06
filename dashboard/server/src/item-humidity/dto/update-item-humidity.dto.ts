import { PartialType } from '@nestjs/mapped-types';
import { CreateItemHumidityDto } from './create-item-humidity.dto';

export class UpdateItemHumidityDto extends PartialType(CreateItemHumidityDto) {}
