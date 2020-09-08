import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'sa',
  password: '1Nalittlewhile.',
  database: 'project_guard',
  //entities: [User],
  autoLoadEntities: true,
  synchronize: true,
};
