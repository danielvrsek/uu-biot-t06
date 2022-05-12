import { Injectable } from '@nestjs/common';
import { CreateItemTemperatureDto } from './dto/create-item-temperature.dto';
import { UpdateItemTemperatureDto } from './dto/update-item-temperature.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ItemTemperature } from 'src/interface/itemTemperature.interface';

@Injectable()
export class ItemTemperatureService {
  constructor(
    @InjectModel('ItemTemperature')
    private readonly itemTemperature: Model<ItemTemperature>,
  ) {}

  async create(
    createItemTemperatureDto: CreateItemTemperatureDto,
  ): Promise<ItemTemperature> {
    const newItem = new this.itemTemperature(createItemTemperatureDto);
    return await newItem.save();
  }

  async findAll(): Promise<ItemTemperature[]> {
    return await this.itemTemperature.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} itemTemperature`;
  }

  update(id: number, updateItemTemperatureDto: UpdateItemTemperatureDto) {
    return `This action updates a #${id} itemTemperature`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemTemperature`;
  }
}
