import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private billingService: BillingService) {}

  @Post('customer')
  async createCustomer(@Body('email') email: string) {
    return this.billingService.createCustomer(email);
  }

  @Post('subscribe')
  async createSubscription(
    @Body('customerId') customerId: string,
    @Body('priceId') priceId: string,
  ) {
    return this.billingService.createSubscription(customerId, priceId);
  }

  @Post('cancel')
  async cancelSubscription(@Body('subscriptionId') subscriptionId: string) {
    return this.billingService.cancelSubscription(subscriptionId);
  }

  @Get('subscription/:id')
  async getSubscription(@Param('id') id: string) {
    return this.billingService.getSubscription(id);
  }
}
