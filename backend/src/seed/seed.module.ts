import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { User, UserSchema } from '../users/user.model';
import { Company, CompanySchema } from '../companies/company.model';
import { Branch, BranchSchema } from '../branches/branch.model';
import { Product, ProductSchema } from '../products/product.model';
import { Customer, CustomerSchema } from '../customers/customer.model';
import { Supplier, SupplierSchema } from '../suppliers/supplier.model';
import { InventoryItem, InventoryItemSchema } from '../inventory/inventory.model';
import { Sale, SaleSchema } from '../sales/sale.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Company.name, schema: CompanySchema },
      { name: Branch.name, schema: BranchSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: Supplier.name, schema: SupplierSchema },
      { name: InventoryItem.name, schema: InventoryItemSchema },
      { name: Sale.name, schema: SaleSchema },
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
