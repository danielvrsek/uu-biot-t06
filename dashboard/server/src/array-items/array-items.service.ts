import { Injectable } from '@nestjs/common';
import { CreateArrayItemDto } from './dto/create-array-item.dto';
import { UpdateArrayItemDto } from './dto/update-array-item.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ItemsArray } from 'src/interface/itemsArray.interface';
import { ItemTemperature } from 'src/interface/itemTemperature.interface';
import { ItemHumidity } from 'src/interface/itemHumidity.interface';

@Injectable()
export class ArrayItemsService {
  constructor(
    @InjectModel('ItemsArray')
    private readonly itemModel: Model<ItemsArray>,

    @InjectModel('ItemTemperature')
    private readonly itemTemperature: Model<ItemTemperature>,
    @InjectModel('ItemHumidity')
    private readonly itemHumidity: Model<ItemHumidity>,
  ) {}

  async create(
    createArrayItemDto: CreateArrayItemDto[],
  ): Promise<ItemsArray[]> {
    await Promise.all(
      createArrayItemDto.map(async (file) => {
        const newItemTemperature = new this.itemTemperature(file);
        const newItemHumidity = new this.itemHumidity(file);
        const response =
          (await newItemTemperature.save()) && (await newItemHumidity.save());
        return response;
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

/* [{"temperature":23.8,"humidity":40,"timestamp":1652181052079},{"temperature":23.8,"humidity":30,"timestamp":1652181052079},{"temperature":23.8,"humidity":20,"timestamp":1652181052079}]  */
/* console.log(file);
        console.log(Object.keys(file));
        console.log(Object.values(file));
        console.log(Object.entries(file)); 
        //@ts-expect-error
        */
