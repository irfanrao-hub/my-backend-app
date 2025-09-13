import { Module } from '@nestjs/common';
// import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.LOCAL_DB_HOST,
      port: 5432,
      username: process.env.LOCAL_DB_USERNAME,
      password: process.env.LOCAL_DB_PASSWORD,
      database: process.env.LOCAL_DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // only for dev
    }),
    // UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
