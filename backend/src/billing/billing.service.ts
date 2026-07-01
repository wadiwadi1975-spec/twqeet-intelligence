import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingService {
  async createCustomer(email: string) {
    return { id: 'cus_demo', email, message: 'Stripe not configured yet' };
  }

  async createSubscription(customerId: string, priceId: string) {
    return { id: 'sub_demo', customer: customerId, price: priceId, message: 'Stripe not configured yet' };
  }

  async cancelSubscription(subscriptionId: string) {
    return { id: subscriptionId, status: 'cancelled', message: 'Stripe not configured yet' };
  }

  async getSubscription(subscriptionId: string) {
    return { id: subscriptionId, status: 'active', message: 'Stripe not configured yet' };
  }
}
