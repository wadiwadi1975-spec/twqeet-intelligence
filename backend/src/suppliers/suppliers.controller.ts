import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(private suppliersService: SuppliersService) {}

  @Get()
  async findAll(@Query('companyId') companyId: string) {
    return this.suppliersService.findAll(companyId);
  }

  @Post()
  async create(@Body() data: any) {
    return this.suppliersService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.suppliersService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.suppliersService.delete(id);
  }
}
