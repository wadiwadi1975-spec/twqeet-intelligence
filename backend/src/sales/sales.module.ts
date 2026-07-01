import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { MockModule } from '../mock/mock.module';

@Module({
  imports: [MockModule],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
