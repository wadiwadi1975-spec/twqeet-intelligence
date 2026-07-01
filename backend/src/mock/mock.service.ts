import { Injectable } from '@nestjs/common';

@Injectable()
export class MockService {
  private users: any[] = [
    {
      _id: '1',
      email: 'admin@twqeet.com',
      password: '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ12', // admin123
      role: 'SuperAdmin',
      name: 'المدير العام',
      createdAt: new Date(),
    },
  ];

  private companies: any[] = [
    { _id: '1', name: 'مجوهرات الخليج', email: 'admin@twqeet.com', createdAt: new Date() },
  ];

  private branches: any[] = [
    { _id: '1', name: 'السالمية', companyId: '1', address: 'السالمية', phone: '+965-22222222' },
    { _id: '2', name: 'حولي', companyId: '1', address: 'حولي', phone: '+965-33333333' },
    { _id: '3', name: 'الأحمدي', companyId: '1', address: 'الأحمدي', phone: '+965-44444444' },
  ];

  private products: any[] = [
    { _id: '1', name: 'خاتم 21K', category: 'خواتم', weight: 5, purity: '21K', price: 150, branchId: '1', companyId: '1', quantity: 50 },
    { _id: '2', name: 'خاتم 18K', category: 'خواتم', weight: 4, purity: '18K', price: 120, branchId: '1', companyId: '1', quantity: 30 },
    { _id: '3', name: 'سلسلة 21K', category: 'سلاسل', weight: 15, purity: '21K', price: 450, branchId: '1', companyId: '1', quantity: 25 },
    { _id: '4', name: 'سلسلة 18K', category: 'سلاسل', weight: 12, purity: '18K', price: 360, branchId: '2', companyId: '1', quantity: 20 },
    { _id: '5', name: 'سوار 22K', category: 'أساور', weight: 20, purity: '22K', price: 600, branchId: '2', companyId: '1', quantity: 15 },
    { _id: '6', name: 'سوار 21K', category: 'أساور', weight: 18, purity: '21K', price: 540, branchId: '3', companyId: '1', quantity: 18 },
    { _id: '7', name: 'قلادة 21K', category: 'قلائد', weight: 25, purity: '21K', price: 750, branchId: '1', companyId: '1', quantity: 12 },
    { _id: '8', name: 'قلادة 18K', category: 'قلائد', weight: 20, purity: '18K', price: 600, branchId: '3', companyId: '1', quantity: 10 },
    { _id: '9', name: 'سبكة 24K', category: 'سبائك', weight: 50, purity: '24K', price: 1500, branchId: '2', companyId: '1', quantity: 8 },
    { _id: '10', name: 'خاتم ألماس', category: 'خواتم', weight: 6, purity: '21K', price: 800, branchId: '1', companyId: '1', quantity: 5 },
  ];

  private customers: any[] = [
    { _id: '1', name: 'أحمد محمد', phone: '55512345', email: 'ahmed@example.com', totalPurchases: 4500, loyaltyPoints: 450, favoriteCategory: 'خواتم', companyId: '1' },
    { _id: '2', name: 'سارة العلي', phone: '55567890', email: 'sara@example.com', totalPurchases: 3200, loyaltyPoints: 320, favoriteCategory: 'سلاسل', companyId: '1' },
    { _id: '3', name: 'محمد الخالدي', phone: '55598765', email: 'mohammed@example.com', totalPurchases: 6800, loyaltyPoints: 680, favoriteCategory: 'أساور', companyId: '1' },
    { _id: '4', name: 'فاطمة الزهراء', phone: '55511111', email: 'fatima@example.com', totalPurchases: 2100, loyaltyPoints: 210, favoriteCategory: 'قلائد', companyId: '1' },
    { _id: '5', name: 'عبدالله السالم', phone: '55522222', email: 'abdullah@example.com', totalPurchases: 8500, loyaltyPoints: 850, favoriteCategory: 'سبائك', companyId: '1' },
  ];

  private suppliers: any[] = [
    { _id: '1', name: 'شركة الذهب العالمية', phone: '55511111', email: 'gold@example.com', totalOrders: 24, rating: 4.5, companyId: '1' },
    { _id: '2', name: 'مجوهرات الشرق', phone: '55522222', email: 'east@example.com', totalOrders: 18, rating: 3.8, companyId: '1' },
    { _id: '3', name: 'مجموعة الكويت للمجوهرات', phone: '55533333', email: 'kuwait@example.com', totalOrders: 32, rating: 4.8, companyId: '1' },
  ];

  private sales: any[] = [];

  private alerts: any[] = [
    { _id: '1', message: 'انخفاض المبيعات في فرع السالمية بنسبة 20%', priority: 'Critical', companyId: '1', read: false, createdAt: new Date() },
    { _id: '2', message: 'وجود مخزون راكد في قسم القلائد', priority: 'Medium', companyId: '1', read: false, createdAt: new Date() },
    { _id: '3', message: 'نفاد مخزون الخواتم 21K', priority: 'High', companyId: '1', read: false, createdAt: new Date() },
  ];

  constructor() {
    this.generateSales();
  }

  private generateSales() {
    const statuses = ['paid', 'pending', 'paid', 'paid'];
    const names = ['أحمد', 'سارة', 'محمد', 'فاطمة', 'عبدالله'];
    for (let i = 0; i < 50; i++) {
      const product = this.products[Math.floor(Math.random() * this.products.length)];
      const qty = Math.floor(Math.random() * 3) + 1;
      this.sales.push({
        _id: String(i + 1),
        productId: product._id,
        employeeId: `emp${Math.floor(Math.random() * 5) + 1}`,
        branchId: this.branches[Math.floor(Math.random() * 3)]._id,
        companyId: '1',
        quantity: qty,
        unitPrice: product.price,
        totalAmount: product.price * qty,
        customerName: names[Math.floor(Math.random() * 5)],
        status: statuses[Math.floor(Math.random() * 4)],
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      });
    }
  }

  getUsers() { return this.users; }
  findUserByEmail(email: string) { return this.users.find(u => u.email === email); }
  findUserById(id: string) { return this.users.find(u => u._id === id); }
  createUser(data: any) { const user = { _id: String(this.users.length + 1), ...data, createdAt: new Date() }; this.users.push(user); return user; }

  getCompanies() { return this.companies; }
  getBranches(companyId: string) { return this.branches.filter(b => b.companyId === companyId); }
  getProducts(companyId: string) { return this.products.filter(p => p.companyId === companyId); }
  getCustomers(companyId: string) { return this.customers.filter(c => c.companyId === companyId); }
  getSuppliers(companyId: string) { return this.suppliers.filter(s => s.companyId === companyId); }
  getSales(companyId: string) { return this.sales.filter(s => s.companyId === companyId); }
  getAlerts(companyId: string) { return this.alerts.filter(a => a.companyId === companyId); }

  getInventory(companyId: string) {
    const items: any[] = [];
    const categories = ['خواتم', 'سلاسل', 'أساور', 'قلائد', 'سبائك'];
    const karats = ['18K', '21K', '22K', '24K'];
    let id = 1;
    for (const cat of categories) {
      for (const karat of karats) {
        items.push({
          _id: String(id++),
          name: `${cat} ${karat}`,
          category: cat,
          karat: karat,
          quantity: Math.floor(Math.random() * 50) + 10,
          purchasePrice: Math.floor(Math.random() * 500) + 100,
          salePrice: Math.floor(Math.random() * 800) + 200,
          branchId: this.branches[Math.floor(Math.random() * 3)]._id,
          companyId,
          minStock: 5,
        });
      }
    }
    return items;
  }

  getSalesStats(companyId: string) {
    const sales = this.getSales(companyId);
    const totalSales = sales.reduce((sum, s) => sum + s.totalAmount, 0);
    const totalOrders = sales.length;
    const avgOrderValue = totalSales / (totalOrders || 1);
    return { totalSales, totalOrders, avgOrderValue };
  }

  getInventoryStats(companyId: string) {
    const items = this.getInventory(companyId);
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalValue = items.reduce((sum, i) => sum + (i.quantity * i.purchasePrice), 0);
    const lowStockCount = items.filter(i => i.quantity <= i.minStock).length;
    return { totalItems, totalValue, lowStockCount };
  }
}
