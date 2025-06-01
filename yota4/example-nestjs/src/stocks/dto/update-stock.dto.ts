import { PartialType } from '@nestjs/mapped-types';
import { CreateTariffDto } from './create-stock.dto';

export class UpdateTariffDto extends PartialType(CreateTariffDto) {}
