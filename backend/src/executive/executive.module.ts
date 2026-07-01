import { Module } from '@nestjs/common';
import { ExecutiveService } from './executive.service';
import { ExecutiveController } from './executive.controller';
import { MockModule } from '../mock/mock.module';

@Module({
  imports: [MockModule],
  controllers: [ExecutiveController],
  providers: [ExecutiveService],
})
export class ExecutiveModule {}
