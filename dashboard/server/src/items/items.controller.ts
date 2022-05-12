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
import { Temperature } from 'src/interface/temperature.interface';
import { Public } from 'src/auth/decorator/jwt.decorator';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Public()
  @Get()
  findAll(): Promise<Temperature[]> {
    return this.itemsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id): Promise<Temperature> {
    return this.itemsService.findOne(id);
  }
  @Public()
  @Post()
  create(@Body() createItemDto: CreateTemperatureDto): Promise<Temperature> {
    console.log(createItemDto);
    return this.itemsService.create(createItemDto);
  }

  @Public()
  @Post()
  createArray(): [] {
    return [];
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Temperature> {
    return this.itemsService.delete(id);
  }
  @Public()
  @Put(':id')
  update(
    @Body() updateItemDto: CreateTemperatureDto,
    @Param('id') id,
  ): Promise<Temperature> {
    return this.itemsService.update(id, updateItemDto);
  }
}
