import { Injectable } from '@nestjs/common';
import { CreateArrayItemDto } from './dto/create-array-item.dto';
import { UpdateArrayItemDto } from './dto/update-array-item.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ItemsArray } from './interfaces/ItemsArray.interface';
import { fstat } from 'fs';

@Injectable()
export class ArrayItemsService {
  constructor(
    @InjectModel('ItemsArray') private readonly itemModel: Model<ItemsArray>,
  ) {}

  async create(createArrayItemDto: CreateArrayItemDto): Promise<any> {
    let data = createArrayItemDto;
    console.log(data);

    await Promise.all(
      // @ts-ignore: Unreachable code error
      data.map(async (file) => {
        console.log(file);
      }),
    );
    return;
  }

  async findAll(): Promise<ItemsArray[]> {
    return await this.itemModel.find();
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

/* [{"temperature":23.8,"humidity":40,"timestamp":1652181052079}, {"temperature":23.8,"humidity":40,"timestamp":1652181052079}] */
