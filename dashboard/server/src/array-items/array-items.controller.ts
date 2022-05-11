import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { Public } from 'src/auth/decorator/jwt.decorator';
import { ArrayItemsService } from './array-items.service';
import { CreateArrayItemDto } from './dto/create-array-item.dto';
import { UpdateArrayItemDto } from './dto/update-array-item.dto';
import { ItemsArray } from './interfaces/ItemsArray.interface';

@Controller('array-items')
export class ArrayItemsController {
  constructor(private readonly arrayItemsService: ArrayItemsService) {}

  @Public()
  @Post()
  create(@Body() createArrayItemDdto: CreateArrayItemDto): Promise<ItemsArray> {
    return this.arrayItemsService.create(createArrayItemDdto);
  }
  @Public()
  @Get()
  findAll(): Promise<ItemsArray[]> {
    return this.arrayItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arrayItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArrayItemDto: UpdateArrayItemDto,
  ) {
    return this.arrayItemsService.update(+id, updateArrayItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.arrayItemsService.remove(+id);
  }
}
