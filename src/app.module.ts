import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { ReservationModule } from './reservation/reservation.module';
import { MasterModule } from './master/master.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    ReservationModule,
    MasterModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
