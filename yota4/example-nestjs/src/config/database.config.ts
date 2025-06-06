import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'yota',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // Только для разработки! В продакшене использовать миграции
}; 