import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTariffDto } from './dto/create-stock.dto';
import { UpdateTariffDto } from './dto/update-stock.dto';
import { Tariff } from './entities/stock.entity';

@Injectable()
export class TariffsService {
  constructor(
    @InjectRepository(Tariff)
    private tariffsRepository: Repository<Tariff>
  ) {}

  async create(createTariffDto: CreateTariffDto): Promise<Tariff> {
    const tariff = this.tariffsRepository.create(createTariffDto);
    return this.tariffsRepository.save(tariff);
  }

  async findAll(name?: string): Promise<Tariff[]> {
    if (name) {
      return this.tariffsRepository.find({ where: { name } });
    }
    return this.tariffsRepository.find();
  }

  async findOne(id: number): Promise<Tariff> {
    const tariff = await this.tariffsRepository.findOne({ where: { id } });
    if (!tariff) {
      throw new NotFoundException(`Tariff with ID ${id} not found`);
    }
    return tariff;
  }

  async update(id: number, updateTariffDto: UpdateTariffDto): Promise<Tariff> {
    const tariff = await this.findOne(id);
    Object.assign(tariff, updateTariffDto);
    return this.tariffsRepository.save(tariff);
  }

  async remove(id: number): Promise<void> {
    const tariff = await this.findOne(id);
    await this.tariffsRepository.remove(tariff);
  }
}
