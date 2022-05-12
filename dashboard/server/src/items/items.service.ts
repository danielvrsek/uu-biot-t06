import { Injectable } from '@nestjs/common';
import { Temperature } from 'src/interface/temperature.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel('Item') private readonly itemModel: Model<Temperature>,
  ) {}

  async findAll(): Promise<Temperature[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Temperature> {
    return await this.itemModel.findOne({ _id: id });
  }

  async create(item: Temperature): Promise<Temperature> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async delete(id: string): Promise<Temperature> {
    return await this.itemModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Temperature): Promise<Temperature> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
