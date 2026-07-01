import { Module } from '@nestjs/common';
import { MockModule } from './mock/mock.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { InventoryModule } from './inventory/inventory.module';
import { CustomersModule } from './customers/customers.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { AlertsModule } from './alerts/alerts.module';
import { AiModule } from './ai/ai.module';
import { ReportsModule } from './reports/reports.module';
import { AccountingModule } from './accounting/accounting.module';
import { CashFlowModule } from './cashflow/cashflow.module';
import { BillingModule } from './billing/billing.module';
import { CategoriesModule } from './categories/categories.module';
import { EmployeesModule } from './employees/employees.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ExecutiveModule } from './executive/executive.module';
import { BudgetModule } from './budget/budget.module';

@Module({
  imports: [
    MockModule,
    AuthModule,
    UsersModule,
    SalesModule,
    InventoryModule,
    CustomersModule,
    SuppliersModule,
    AlertsModule,
    AiModule,
    ReportsModule,
    AccountingModule,
    CashFlowModule,
    BillingModule,
    CategoriesModule,
    EmployeesModule,
    DashboardModule,
    ExecutiveModule,
    BudgetModule,
  ],
})
export class AppModule {}
