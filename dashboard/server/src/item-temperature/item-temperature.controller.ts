import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemTemperatureService } from './item-temperature.service';
import { CreateItemTemperatureDto } from './dto/create-item-temperature.dto';
import { UpdateItemTemperatureDto } from './dto/update-item-temperature.dto';
import { Public } from 'src/auth/decorator/jwt.decorator';
import { ItemTemperature } from 'src/interface/itemTemperature.interface';

@Controller('item-temperature')
export class ItemTemperatureController {
  constructor(
    private readonly itemTemperatureService: ItemTemperatureService,
  ) {}

  @Public()
  @Post()
  create(
    @Body() createItemTemperatureDto: CreateItemTemperatureDto,
  ): Promise<ItemTemperature> {
    return this.itemTemperatureService.create(createItemTemperatureDto);
  }
  @Public()
  @Get()
  findAll(): Promise<ItemTemperature[]> {
    return this.itemTemperatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemTemperatureService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemTemperatureDto: UpdateItemTemperatureDto,
  ) {
    return this.itemTemperatureService.update(+id, updateItemTemperatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemTemperatureService.remove(+id);
  }
}
