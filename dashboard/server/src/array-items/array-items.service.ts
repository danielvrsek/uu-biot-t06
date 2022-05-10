import { Injectable } from '@nestjs/common';
import { CreateArrayItemDto } from './dto/create-array-item.dto';
import { UpdateArrayItemDto } from './dto/update-array-item.dto';

@Injectable()
export class ArrayItemsService {
  create(createArrayItemDto: CreateArrayItemDto) {
    return 'This action adds a new arrayItem';
  }

  findAll() {
    return `This action returns all arrayItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} arrayItem`;
  }

  update(id: number, updateArrayItemDto: UpdateArrayItemDto) {
    return `This action updates a #${id} arrayItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} arrayItem`;
  }
}
