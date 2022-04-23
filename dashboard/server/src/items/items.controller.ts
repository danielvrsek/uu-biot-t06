import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateTemperatureDto } from './dto/create-temperature.dto';
import { ItemsService } from './items.service';
import { Temperature } from './interfaces/temperature.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): Promise<Temperature[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Temperature> {
    return this.itemsService.findOne(id);
  }

  @Post()
  create(@Body() createItemDto: CreateTemperatureDto): Promise<Temperature> {
    return this.itemsService.create(createItemDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Temperature> {
    return this.itemsService.delete(id);
  }

  @Put(':id')
  update(
    @Body() updateItemDto: CreateTemperatureDto,
    @Param('id') id,
  ): Promise<Temperature> {
    return this.itemsService.update(id, updateItemDto);
  }
}
