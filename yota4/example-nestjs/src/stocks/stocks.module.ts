import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TariffsService } from './stocks.service';
import { TariffsController } from './stocks.controller';
import { Tariff } from './entities/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tariff])],
  controllers: [TariffsController],
  providers: [TariffsService],
})
export class TariffsModule {}