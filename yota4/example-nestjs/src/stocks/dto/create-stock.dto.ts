export class CreateTariffDto {
    name: string;
    price: number;
    internet_gb: number;
    minutes: number;
    description: string;
    unlimited_apps: string[];
    additional_features: Record<string, any>;
}
