import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  async findAll(@Query('companyId') companyId: string) {
    return this.customersService.findAll(companyId);
  }

  @Get('top')
  async getTopCustomers(
    @Query('companyId') companyId: string,
    @Query('limit') limit: number,
  ) {
    return this.customersService.getTopCustomers(companyId, limit);
  }

  @Post()
  async create(@Body() data: any) {
    return this.customersService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.customersService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.customersService.delete(id);
  }
}
