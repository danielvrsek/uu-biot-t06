import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemHumidityDto } from './dto/create-item-humidity.dto';
import { UpdateItemHumidityDto } from './dto/update-item-humidity.dto';
import { ItemHumidity } from 'src/interface/itemHumidity.interface';
import { Model } from 'mongoose';

@Injectable()
export class ItemHumidityService {
  constructor(
    @InjectModel('ItemHumidity')
    private readonly itemHumidity: Model<ItemHumidity>,
  ) {}
  async create(
    createItemHumidityDto: CreateItemHumidityDto,
  ): Promise<ItemHumidity> {
    const newItem = new this.itemHumidity(createItemHumidityDto);
    return await newItem.save();
  }

  async findAll(): Promise<ItemHumidity[]> {
    return await this.itemHumidity.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} itemHumidity`;
  }

  update(id: number, updateItemHumidityDto: UpdateItemHumidityDto) {
    return `This action updates a #${id} itemHumidity`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemHumidity`;
  }
}
