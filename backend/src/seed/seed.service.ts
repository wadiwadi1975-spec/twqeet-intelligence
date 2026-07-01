import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.model';
import { Company } from '../companies/company.model';
import { Branch } from '../branches/branch.model';
import { Product } from '../products/product.model';
import { Customer } from '../customers/customer.model';
import { Supplier } from '../suppliers/supplier.model';
import { InventoryItem } from '../inventory/inventory.model';
import { Sale } from '../sales/sale.model';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @InjectModel(Supplier.name) private supplierModel: Model<Supplier>,
    @InjectModel(InventoryItem.name) private inventoryModel: Model<InventoryItem>,
    @InjectModel(Sale.name) private saleModel: Model<Sale>,
  ) {}

  async onModuleInit() {
    const userCount = await this.userModel.countDocuments();
    if (userCount > 0) return;

    console.log('🌱 Seeding database...');

    // Company
    const company = await this.companyModel.create({
      name: 'مجوهرات الخليج',
      email: 'admin@twqeet.com',
      phone: '+965-12345678',
    });

    // User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await this.userModel.create({
      email: 'admin@twqeet.com',
      password: hashedPassword,
      role: 'SuperAdmin',
      name: 'المدير العام',
    });

    // Branches
    const branches = await this.branchModel.insertMany([
      { name: 'السالمية', companyId: company._id, address: 'السالمية', phone: '+965-22222222' },
      { name: 'حولي', companyId: company._id, address: 'حولي', phone: '+965-33333333' },
      { name: 'الأحمدي', companyId: company._id, address: 'الأحمدي', phone: '+965-44444444' },
    ]);

    // Products
    const products = await this.productModel.insertMany([
      { name: 'خاتم 21K', category: 'خواتم', weight: 5, purity: '21K', price: 150, branchId: branches[0]._id, companyId: company._id, quantity: 50 },
      { name: 'خاتم 18K', category: 'خواتم', weight: 4, purity: '18K', price: 120, branchId: branches[0]._id, companyId: company._id, quantity: 30 },
      { name: 'سلسلة 21K', category: 'سلاسل', weight: 15, purity: '21K', price: 450, branchId: branches[0]._id, companyId: company._id, quantity: 25 },
      { name: 'سلسلة 18K', category: 'سلاسل', weight: 12, purity: '18K', price: 360, branchId: branches[1]._id, companyId: company._id, quantity: 20 },
      { name: 'سوار 22K', category: 'أساور', weight: 20, purity: '22K', price: 600, branchId: branches[1]._id, companyId: company._id, quantity: 15 },
      { name: 'سوار 21K', category: 'أساور', weight: 18, purity: '21K', price: 540, branchId: branches[2]._id, companyId: company._id, quantity: 18 },
      { name: 'قلادة 21K', category: 'قلائد', weight: 25, purity: '21K', price: 750, branchId: branches[0]._id, companyId: company._id, quantity: 12 },
      { name: 'قلادة 18K', category: 'قلائد', weight: 20, purity: '18K', price: 600, branchId: branches[2]._id, companyId: company._id, quantity: 10 },
      { name: 'سبكة 24K', category: 'سبائك', weight: 50, purity: '24K', price: 1500, branchId: branches[1]._id, companyId: company._id, quantity: 8 },
      { name: 'خاتم ألماس', category: 'خواتم', weight: 6, purity: '21K', price: 800, branchId: branches[0]._id, companyId: company._id, quantity: 5 },
    ]);

    // Customers
    await this.customerModel.insertMany([
      { name: 'أحمد محمد', phone: '55512345', email: 'ahmed@example.com', totalPurchases: 4500, loyaltyPoints: 450, favoriteCategory: 'خواتم', companyId: company._id },
      { name: 'سارة العلي', phone: '55567890', email: 'sara@example.com', totalPurchases: 3200, loyaltyPoints: 320, favoriteCategory: 'سلاسل', companyId: company._id },
      { name: 'محمد الخالدي', phone: '55598765', email: 'mohammed@example.com', totalPurchases: 6800, loyaltyPoints: 680, favoriteCategory: 'أساور', companyId: company._id },
      { name: 'فاطمة الزهراء', phone: '55511111', email: 'fatima@example.com', totalPurchases: 2100, loyaltyPoints: 210, favoriteCategory: 'قلائد', companyId: company._id },
      { name: 'عبدالله السالم', phone: '55522222', email: 'abdullah@example.com', totalPurchases: 8500, loyaltyPoints: 850, favoriteCategory: 'سبائك', companyId: company._id },
    ]);

    // Suppliers
    await this.supplierModel.insertMany([
      { name: 'شركة الذهب العالمية', phone: '55511111', email: 'gold@example.com', totalOrders: 24, rating: 4.5, companyId: company._id },
      { name: 'مجوهرات الشرق', phone: '55522222', email: 'east@example.com', totalOrders: 18, rating: 3.8, companyId: company._id },
      { name: 'مجموعة الكويت للمجوهرات', phone: '55533333', email: 'kuwait@example.com', totalOrders: 32, rating: 4.8, companyId: company._id },
    ]);

    // Inventory
    const categories = ['خواتم', 'سلاسل', 'أساور', 'قلائد', 'سبائك'];
    const karats = ['18K', '21K', '22K', '24K'];
    for (const cat of categories) {
      for (const karat of karats) {
        await this.inventoryModel.create({
          name: `${cat} ${karat}`,
          category: cat,
          karat: karat,
          quantity: Math.floor(Math.random() * 50) + 10,
          purchasePrice: Math.floor(Math.random() * 500) + 100,
          salePrice: Math.floor(Math.random() * 800) + 200,
          branchId: branches[Math.floor(Math.random() * 3)]._id,
          companyId: company._id,
          minStock: 5,
        });
      }
    }

    // Sales
    const salesData = [];
    for (let i = 0; i < 50; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const qty = Math.floor(Math.random() * 3) + 1;
      salesData.push({
        productId: product._id,
        employeeId: `emp${Math.floor(Math.random() * 5) + 1}`,
        branchId: branches[Math.floor(Math.random() * 3)]._id,
        companyId: company._id,
        quantity: qty,
        unitPrice: product.price,
        totalAmount: product.price * qty,
        customerName: ['أحمد', 'سارة', 'محمد', 'فاطمة', 'عبدالله'][Math.floor(Math.random() * 5)],
        status: 'paid',
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      });
    }
    await this.saleModel.insertMany(salesData);

    console.log('✅ Database seeded successfully!');
    console.log('📧 Email: admin@twqeet.com');
    console.log('🔑 Password: admin123');
  }
}
