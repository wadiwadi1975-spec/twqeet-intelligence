import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MockModule } from '../mock/mock.module';

@Module({
  imports: [MockModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
