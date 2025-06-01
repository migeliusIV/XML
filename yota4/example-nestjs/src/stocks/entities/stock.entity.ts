import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tariffs' })
export class Tariff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('int')
    internet_gb: number;

    @Column('int')
    minutes: number;

    @Column('text')
    description: string;

    @Column('jsonb')
    unlimited_apps: string[];

    @Column('jsonb')
    additional_features: Record<string, any>;
} 

