import { PartialType } from '@nestjs/mapped-types';
import { CreateArrayItemDto } from './create-array-item.dto';

export class UpdateArrayItemDto extends PartialType(CreateArrayItemDto) {}
