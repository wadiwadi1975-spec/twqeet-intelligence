import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { BranchesService } from './branches.service';

@Controller('branches')
export class BranchesController {
  constructor(private branchesService: BranchesService) {}

  @Get()
  async findAll(@Query('companyId') companyId: string) {
    return this.branchesService.findAll(companyId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.branchesService.findById(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.branchesService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.branchesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.branchesService.delete(id);
  }
}
