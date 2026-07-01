import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll(@Query('companyId') companyId: string) {
    return this.categoriesService.findAll(companyId || '1');
  }

  @Get('intelligence')
  async getIntelligence(@Query('companyId') companyId: string) {
    return this.categoriesService.getIntelligence(companyId || '1');
  }
}
