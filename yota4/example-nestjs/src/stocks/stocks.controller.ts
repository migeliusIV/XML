import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { TariffsService } from './stocks.service';
import { CreateTariffDto } from './dto/create-stock.dto';
import { UpdateTariffDto } from './dto/update-stock.dto';
import { Tariff } from './entities/stock.entity';

@Controller('tariffs')
export class TariffsController {
  constructor(private readonly tariffsService: TariffsService) {}

  @Post()
  async create(@Body() createTariffDto: CreateTariffDto) {
    return this.tariffsService.create(createTariffDto);
  }

  @Get()
  async findAll(@Query('name') name?: string): Promise<Tariff[]> {
    return this.tariffsService.findAll(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tariffsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTariffDto: UpdateTariffDto) {
    return this.tariffsService.update(+id, updateTariffDto);
  }

  @Put(':id')
  async updatePut(@Param('id') id: string, @Body() updateTariffDto: UpdateTariffDto) {
    return this.tariffsService.update(+id, updateTariffDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tariffsService.remove(+id);
  }
}
