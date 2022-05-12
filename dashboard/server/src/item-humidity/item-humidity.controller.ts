import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemHumidityService } from './item-humidity.service';
import { CreateItemHumidityDto } from './dto/create-item-humidity.dto';
import { UpdateItemHumidityDto } from './dto/update-item-humidity.dto';
import { Public } from 'src/auth/decorator/jwt.decorator';
import { ItemHumidity } from '../interface/itemHumidity.interface';

@Controller('item-humidity')
export class ItemHumidityController {
  constructor(private readonly itemHumidityService: ItemHumidityService) {}

  @Public()
  @Post()
  create(
    @Body() createItemHumidityDto: CreateItemHumidityDto,
  ): Promise<ItemHumidity> {
    return this.itemHumidityService.create(createItemHumidityDto);
  }
  @Public()
  @Get()
  findAll(): Promise<ItemHumidity[]> {
    return this.itemHumidityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemHumidityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemHumidityDto: UpdateItemHumidityDto,
  ) {
    return this.itemHumidityService.update(+id, updateItemHumidityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemHumidityService.remove(+id);
  }
}
