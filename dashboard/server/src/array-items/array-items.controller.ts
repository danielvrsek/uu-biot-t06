import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Public } from 'src/auth/decorator/jwt.decorator';
import { ArrayItemsService } from './array-items.service';
import { CreateArrayItemDto } from './dto/create-array-item.dto';
import { UpdateArrayItemDto } from './dto/update-array-item.dto';

@Controller('array-items')
export class ArrayItemsController {
  constructor(private readonly arrayItemsService: ArrayItemsService) {}

  @Post()
  create(@Body() createArrayItemDto: CreateArrayItemDto) {
    return this.arrayItemsService.create(createArrayItemDto);
  }
  @Public()
  @Get()
  findAll() {
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
