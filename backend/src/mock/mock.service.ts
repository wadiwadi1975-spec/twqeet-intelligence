import { Injectable } from '@nestjs/common';

@Injectable()
export class MockService {
  private users: any[] = [
    { _id: '1', email: 'admin@twqeet.com', password: '$2a$10$dq7YJLjnmO/EKAguAqk5LOh/ygq/IHReGXzun4s/fS1xpGaVa2Xcu', role: 'SuperAdmin', name: 'المدير العام', companyId: '1', branchId: '1', createdAt: new Date(), status: 'Active' },
    { _id: '2', email: 'manager@twqeet.com', password: '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ12', role: 'BranchManager', name: 'مدير الفرع', companyId: '1', branchId: '1', createdAt: new Date(), status: 'Active' },
  ];

  private companies: any[] = [
    { _id: '1', companyName: 'مجوهرات الخليج', commercialNumber: '12345', country: 'الكويت', city: 'الkuwait', phone: '+965-11111111', email: 'admin@twqeet.com', subscription: 'Enterprise', status: 'Active', createdAt: new Date() },
  ];

  private branches: any[] = [
    { _id: '1', branchName: 'السالمية', companyId: '1', city: 'السالمية', managerId: '2', status: 'Active', address: 'السالمية', phone: '+965-22222222' },
    { _id: '2', branchName: 'حولي', companyId: '1', city: 'حولي', managerId: '2', status: 'Active', address: 'حولي', phone: '+965-33333333' },
    { _id: '3', branchName: 'الأحمدي', companyId: '1', city: 'الأحمدي', managerId: '2', status: 'Active', address: 'الأحمدي', phone: '+965-44444444' },
  ];

  private categories: any[] = [
    { _id: '1', companyId: '1', name: 'Bracelets', nameAr: 'الأساور', icon: 'bracelet', status: true },
    { _id: '2', companyId: '1', name: 'Rings', nameAr: 'الخواتم', icon: 'ring', status: true },
    { _id: '3', companyId: '1', name: 'Earrings', nameAr: 'الحلق', icon: 'earring', status: true },
    { _id: '4', companyId: '1', name: 'Sets', nameAr: 'الأطقم', icon: 'set', status: true },
    { _id: '5', companyId: '1', name: 'Chains', nameAr: 'السلاسل', icon: 'chain', status: true },
    { _id: '6', companyId: '1', name: 'Gold Bars', nameAr: 'السبائك', icon: 'bar', status: true },
    { _id: '7', companyId: '1', name: 'Coins', nameAr: 'الليرات', icon: 'coin', status: true },
    { _id: '8', companyId: '1', name: 'Used Gold', nameAr: 'الذهب المستعمل', icon: 'used', status: true },
    { _id: '9', companyId: '1', name: 'Diamonds', nameAr: 'الألماس', icon: 'diamond', status: true },
  ];

  private products: any[] = [
    { _id: '1', productName: 'سوار 22K كلاسيك', companyId: '1', branchId: '1', categoryId: '1', karat: 22, weight: 20, purchasePrice: 900, salePrice: 1100, barcode: 'BR001', status: 'Available', receivedDate: new Date(Date.now() - 45 * 86400000) },
    { _id: '2', productName: 'سوار 21K حديث', companyId: '1', branchId: '2', categoryId: '1', karat: 21, weight: 18, purchasePrice: 780, salePrice: 960, barcode: 'BR002', status: 'Available', receivedDate: new Date(Date.now() - 200 * 86400000) },
    { _id: '3', productName: 'خاتم 21K فضة', companyId: '1', branchId: '1', categoryId: '2', karat: 21, weight: 5, purchasePrice: 215, salePrice: 270, barcode: 'RG001', status: 'Available', receivedDate: new Date(Date.now() - 30 * 86400000) },
    { _id: '4', productName: 'خاتم 18K ذهبي', companyId: '1', branchId: '3', categoryId: '2', karat: 18, weight: 4, purchasePrice: 144, salePrice: 190, barcode: 'RG002', status: 'Available', receivedDate: new Date(Date.now() - 150 * 86400000) },
    { _id: '5', productName: 'حلق 21K لؤلؤ', companyId: '1', branchId: '1', categoryId: '3', karat: 21, weight: 6, purchasePrice: 258, salePrice: 340, barcode: 'ER001', status: 'Available', receivedDate: new Date(Date.now() - 10 * 86400000) },
    { _id: '6', productName: 'طقم 21K كامل', companyId: '1', branchId: '2', categoryId: '4', karat: 21, weight: 45, purchasePrice: 1935, salePrice: 2500, barcode: 'ST001', status: 'Available', receivedDate: new Date(Date.now() - 250 * 86400000) },
    { _id: '7', productName: 'سلسلة 21K رفيعة', companyId: '1', branchId: '1', categoryId: '5', karat: 21, weight: 15, purchasePrice: 645, salePrice: 820, barcode: 'CH001', status: 'Available', receivedDate: new Date(Date.now() - 60 * 86400000) },
    { _id: '8', productName: 'سلسلة 18K سميكة', companyId: '1', branchId: '3', categoryId: '5', karat: 18, weight: 22, purchasePrice: 792, salePrice: 1050, barcode: 'CH002', status: 'Available', receivedDate: new Date(Date.now() - 180 * 86400000) },
    { _id: '9', productName: 'سبكة 24K 50 جرام', companyId: '1', branchId: '2', categoryId: '6', karat: 24, weight: 50, purchasePrice: 2100, salePrice: 2350, barcode: 'GB001', status: 'Available', receivedDate: new Date(Date.now() - 5 * 86400000) },
    { _id: '10', productName: 'سبكة 24K 10 جرام', companyId: '1', branchId: '1', categoryId: '6', karat: 24, weight: 10, purchasePrice: 420, salePrice: 470, barcode: 'GB002', status: 'Available', receivedDate: new Date(Date.now() - 365 * 86400000) },
    { _id: '11', productName: 'ليرة ذهب 24K', companyId: '1', branchId: '3', categoryId: '7', karat: 24, weight: 8, purchasePrice: 336, salePrice: 380, barcode: 'CN001', status: 'Available', receivedDate: new Date(Date.now() - 90 * 86400000) },
    { _id: '12', productName: 'ذهب مستعمل خواتم', companyId: '1', branchId: '1', categoryId: '8', karat: 21, weight: 30, purchasePrice: 1290, salePrice: 1500, barcode: 'UG001', status: 'Available', receivedDate: new Date(Date.now() - 200 * 86400000) },
    { _id: '13', productName: 'خاتم ألماس 1 قيراط', companyId: '1', branchId: '2', categoryId: '9', karat: 21, weight: 6, purchasePrice: 3500, salePrice: 4200, barcode: 'DM001', status: 'Available', receivedDate: new Date(Date.now() - 15 * 86400000) },
    { _id: '14', productName: 'سوار 22K مزدوج', companyId: '1', branchId: '3', categoryId: '1', karat: 22, weight: 25, purchasePrice: 1125, salePrice: 1380, barcode: 'BR003', status: 'Available', receivedDate: new Date(Date.now() - 75 * 86400000) },
    { _id: '15', productName: 'خاتم 24K صرف', companyId: '1', branchId: '1', categoryId: '2', karat: 24, weight: 8, purchasePrice: 336, salePrice: 420, barcode: 'RG003', status: 'Available', receivedDate: new Date(Date.now() - 400 * 86400000) },
  ];

  private employees: any[] = [
    { _id: '1', companyId: '1', branchId: '1', name: 'أحمدМОХАММЕД', position: 'Senior Sales', salary: 800, status: 'Active', hireDate: new Date('2023-01-15'), phone: '55510001' },
    { _id: '2', companyId: '1', branchId: '1', name: 'سارة العلي', position: 'Sales', salary: 600, status: 'Active', hireDate: new Date('2023-06-01'), phone: '55510002' },
    { _id: '3', companyId: '1', branchId: '2', name: 'محمد الخالدي', position: 'Senior Sales', salary: 850, status: 'Active', hireDate: new Date('2022-09-10'), phone: '55510003' },
    { _id: '4', companyId: '1', branchId: '2', name: 'فاطمة الزهراء', position: 'Sales', salary: 600, status: 'Active', hireDate: new Date('2024-01-01'), phone: '55510004' },
    { _id: '5', companyId: '1', branchId: '3', name: 'عبدالله السالم', position: 'Branch Manager', salary: 1200, status: 'Active', hireDate: new Date('2022-03-01'), phone: '55510005' },
    { _id: '6', companyId: '1', branchId: '3', name: 'نورة الراشد', position: 'Sales', salary: 550, status: 'Active', hireDate: new Date('2024-03-15'), phone: '55510006' },
    { _id: '7', companyId: '1', branchId: '1', name: 'خالد العنزي', position: 'Inventory Officer', salary: 700, status: 'Active', hireDate: new Date('2023-08-20'), phone: '55510007' },
    { _id: '8', companyId: '1', branchId: '2', name: 'ريم الحربي', position: 'Sales', salary: 600, status: 'Active', hireDate: new Date('2024-02-10'), phone: '55510008' },
  ];

  private customers: any[] = [
    { _id: '1', companyId: '1', name: 'أحمد محمد', phone: '55512345', city: 'الkuwait', totalPurchases: 4500, lastPurchase: new Date(Date.now() - 5 * 86400000), loyaltyPoints: 450, favoriteCategory: 'خواتم', invoiceCount: 8 },
    { _id: '2', companyId: '1', name: 'سارة العلي', phone: '55567890', city: 'حولي', totalPurchases: 3200, lastPurchase: new Date(Date.now() - 15 * 86400000), loyaltyPoints: 320, favoriteCategory: 'سلاسل', invoiceCount: 5 },
    { _id: '3', companyId: '1', name: 'محمد الخالدي', phone: '55598765', city: 'الkuwait', totalPurchases: 6800, lastPurchase: new Date(Date.now() - 2 * 86400000), loyaltyPoints: 680, favoriteCategory: 'أساور', invoiceCount: 12 },
    { _id: '4', companyId: '1', name: 'فاطمة الزهراء', phone: '55511111', city: 'الأحمدي', totalPurchases: 2100, lastPurchase: new Date(Date.now() - 30 * 86400000), loyaltyPoints: 210, favoriteCategory: 'قلائد', invoiceCount: 3 },
    { _id: '5', companyId: '1', name: 'عبدالله السالم', phone: '55522222', city: 'الkuwait', totalPurchases: 8500, lastPurchase: new Date(Date.now() - 1 * 86400000), loyaltyPoints: 850, favoriteCategory: 'سبائك', invoiceCount: 15 },
    { _id: '6', companyId: '1', name: 'هدى الشمري', phone: '55533333', city: 'حولي', totalPurchases: 1200, lastPurchase: new Date(Date.now() - 45 * 86400000), loyaltyPoints: 120, favoriteCategory: 'أساور', invoiceCount: 2 },
    { _id: '7', companyId: '1', name: 'يوسف المطيري', phone: '55544444', city: 'الkuwait', totalPurchases: 12000, lastPurchase: new Date(Date.now() - 3 * 86400000), loyaltyPoints: 1200, favoriteCategory: 'سبائك', invoiceCount: 20 },
  ];

  private suppliers: any[] = [
    { _id: '1', companyId: '1', supplierName: 'شركة الذهب العالمية', country: 'الإمارات', phone: '55511111', email: 'gold@example.com', totalOrders: 24, rating: 4.5, lastOrder: new Date(Date.now() - 10 * 86400000) },
    { _id: '2', companyId: '1', supplierName: 'مجوهرات الشرق', country: 'السعودية', phone: '55522222', email: 'east@example.com', totalOrders: 18, rating: 3.8, lastOrder: new Date(Date.now() - 25 * 86400000) },
    { _id: '3', companyId: '1', supplierName: 'مجموعة الكويت للمجوهرات', country: 'الكويت', phone: '55533333', email: 'kuwait@example.com', totalOrders: 32, rating: 4.8, lastOrder: new Date(Date.now() - 5 * 86400000) },
  ];

  private sales: any[] = [];
  private saleItems: any[] = [];

  private alerts: any[] = [
    { _id: '1', companyId: '1', branchId: '1', type: 'Sales', title: 'انخفاض المبيعات', description: 'انخفاض المبيعات في فرع السالمية بنسبة 20% مقارنة بالشهر الماضي', priority: 'Critical', status: 'Open', read: false, createdAt: new Date(Date.now() - 1 * 86400000) },
    { _id: '2', companyId: '1', branchId: '2', type: 'Inventory', title: 'مخزون راكد', description: 'وجود 5 قطع راكد في قسم الأطقم منذ أكثر من 180 يوم', priority: 'Medium', status: 'Open', read: false, createdAt: new Date(Date.now() - 2 * 86400000) },
    { _id: '3', companyId: '1', branchId: '3', type: 'Inventory', title: 'نفاد المخزون', description: 'نفاد مخزون الخواتم 21K في فرع الأحمدي', priority: 'High', status: 'Open', read: false, createdAt: new Date(Date.now() - 0.5 * 86400000) },
    { _id: '4', companyId: '1', branchId: '1', type: 'Profit', title: 'انخفاض هامش الربح', description: 'انخفض هامش الربح في فرع السالمية من 18% إلى 14%', priority: 'High', status: 'Open', read: false, createdAt: new Date(Date.now() - 3 * 86400000) },
    { _id: '5', companyId: '1', branchId: null, type: 'Market', title: 'فرصة شراء ذهب', description: 'انخفاض سعر الذهب العالمي بنسبة 2.5% - فرصة شراء ممتازة', priority: 'Medium', status: 'Open', read: false, createdAt: new Date(Date.now() - 0.2 * 86400000) },
  ];

  private recommendations: any[] = [
    { _id: '1', companyId: '1', branchId: null, title: 'زيادة مخزون الأساور', description: 'ارتفعت مبيعات الأساور بنسبة 22% هذا الشهر. نوصي بزيادة المخزون بنسبة 20%.', confidence: 92, impact: '+12% مبيعات', priority: 'High', status: 'New', createdAt: new Date(Date.now() - 1 * 86400000) },
    { _id: '2', companyId: '1', branchId: '2', title: 'تصفية مخزون الأطقم', description: 'الأطقم لها أبطأ حركة. 5 قطع راكدة منذ 250 يوم. نوصي بعرض خصم 15%.', confidence: 88, impact: '+8% سيولة', priority: 'High', status: 'New', createdAt: new Date(Date.now() - 2 * 86400000) },
    { _id: '3', companyId: '1', branchId: '3', title: 'تدريب موظفي فرع الرياض', description: 'متوسط فاتورة موظفي فرع الأحمدي أقل بـ 18% من المتوسط. نوصي بتدريب على البيع التكميلي.', confidence: 75, impact: '+4% مبيعات', priority: 'Medium', status: 'New', createdAt: new Date(Date.now() - 3 * 86400000) },
    { _id: '4', companyId: '1', branchId: null, title: 'طلب سبائك ذهب', description: 'توقع ارتفاع سعر الذهب 3% الأسبوع القادم. نوصي بطلب 50 جرام سبائك.', confidence: 85, impact: '+6% أرباح', priority: 'Medium', status: 'New', createdAt: new Date(Date.now() - 0.5 * 86400000) },
    { _id: '5', companyId: '1', branchId: '1', title: 'إعادة تسعير الذهب المستعمل', description: 'هامش ربح الذهب المستعمل منخفض (14%). نوصي برفع السعر 3%.', confidence: 80, impact: '+2% ربح', priority: 'Low', status: 'New', createdAt: new Date(Date.now() - 4 * 86400000) },
  ];

  private kpiSnapshots: any[] = [];

  constructor() {
    this.generateSales();
    this.generateKPISnapshots();
  }

  private generateSales() {
    const employeeIds = ['1', '2', '3', '4', '5', '6'];
    const customerIds = ['1', '2', '3', '4', '5', '6', '7'];
    let saleId = 1;
    let itemId = 1;
    for (let i = 0; i < 80; i++) {
      const product = this.products[Math.floor(Math.random() * this.products.length)];
      const qty = Math.floor(Math.random() * 3) + 1;
      const weight = product.weight * qty;
      const subtotal = product.salePrice * qty;
      const discount = Math.random() > 0.7 ? Math.floor(subtotal * 0.05) : 0;
      const total = subtotal - discount;
      const profit = (product.salePrice - product.purchasePrice) * qty - discount;
      const daysAgo = Math.floor(Math.random() * 90);
      const saleDate = new Date(Date.now() - daysAgo * 86400000);
      const sale = {
        _id: String(saleId++),
        companyId: '1',
        branchId: product.branchId,
        employeeId: employeeIds[Math.floor(Math.random() * employeeIds.length)],
        customerId: customerIds[Math.floor(Math.random() * customerIds.length)],
        invoiceNumber: `INV-${String(saleId).padStart(5, '0')}`,
        invoiceDate: saleDate,
        totalWeight: weight,
        subtotal,
        discount,
        vat: 0,
        total,
        profit,
        status: Math.random() > 0.2 ? 'paid' : 'pending',
      };
      this.sales.push(sale);

      const item = {
        _id: String(itemId++),
        saleId: sale._id,
        productId: product._id,
        categoryId: product.categoryId,
        quantity: qty,
        weight,
        price: product.salePrice,
      };
      this.saleItems.push(item);
    }
  }

  private generateKPISnapshots() {
    for (let i = 30; i >= 0; i--) {
      const date = new Date(Date.now() - i * 86400000);
      const baseSales = 3000 + Math.floor(Math.random() * 4000);
      const baseProfit = Math.floor(baseSales * (0.12 + Math.random() * 0.08));
      this.kpiSnapshots.push({
        _id: String(30 - i + 1),
        companyId: '1',
        branchId: null,
        date,
        sales: baseSales,
        profit: baseProfit,
        inventory: 180000 + Math.floor(Math.random() * 20000),
        healthScore: 65 + Math.floor(Math.random() * 25),
        inventoryTurnover: 10 + Math.floor(Math.random() * 8),
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
  getSaleItems(companyId: string) { return this.saleItems; }
  getAlerts(companyId: string) { return this.alerts.filter(a => a.companyId === companyId); }
  getRecommendations(companyId: string) { return this.recommendations.filter(r => r.companyId === companyId); }
  getKPISnapshots(companyId: string) { return this.kpiSnapshots.filter(k => k.companyId === companyId); }
  getCategories(companyId: string) { return this.categories.filter(c => c.companyId === companyId); }
  getEmployees(companyId: string) { return this.employees.filter(e => e.companyId === companyId); }

  getInventory(companyId: string) {
    return this.products.filter(p => p.companyId === companyId).map(p => {
      const daysSinceReceived = Math.floor((Date.now() - new Date(p.receivedDate).getTime()) / 86400000);
      let ageClassification = 'New';
      if (daysSinceReceived > 365) ageClassification = 'Dead Stock';
      else if (daysSinceReceived > 180) ageClassification = 'Slow Moving';
      else if (daysSinceReceived > 90) ageClassification = 'Medium Moving';
      else if (daysSinceReceived > 30) ageClassification = 'Fast Moving';

      let movementStatus = 'Active';
      if (daysSinceReceived > 180) movementStatus = 'Dead';
      else if (daysSinceReceived > 90) movementStatus = 'Slow';
      else if (daysSinceReceived > 30) movementStatus = 'Medium';

      return {
        ...p,
        quantity: Math.floor(Math.random() * 20) + 2,
        inventoryValue: p.purchasePrice * (Math.floor(Math.random() * 20) + 2),
        receivedDate: p.receivedDate,
        lastMovement: new Date(Date.now() - Math.floor(Math.random() * 60) * 86400000),
        daysInStock: daysSinceReceived,
        ageClassification,
        movementStatus,
        minStock: 3,
      };
    });
  }

  getSalesStats(companyId: string) {
    const sales = this.getSales(companyId);
    const totalSales = sales.reduce((sum, s) => sum + s.total, 0);
    const totalOrders = sales.length;
    const avgOrderValue = Math.round(totalSales / (totalOrders || 1));
    const totalProfit = sales.reduce((sum, s) => sum + s.profit, 0);
    const profitMargin = Math.round((totalProfit / (totalSales || 1)) * 100);
    return { totalSales, totalOrders, avgOrderValue, totalProfit, profitMargin };
  }

  getInventoryStats(companyId: string) {
    const items = this.getInventory(companyId);
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalValue = items.reduce((sum, i) => sum + i.inventoryValue, 0);
    const totalWeight = items.reduce((sum, i) => sum + i.weight * i.quantity, 0);
    const lowStockCount = items.filter(i => i.quantity <= i.minStock).length;
    const deadStock = items.filter(i => i.ageClassification === 'Dead Stock');
    const deadStockValue = deadStock.reduce((sum, i) => sum + i.inventoryValue, 0);
    const slowMoving = items.filter(i => i.ageClassification === 'Slow Moving');
    const slowMovingValue = slowMoving.reduce((sum, i) => sum + i.inventoryValue, 0);
    const inventoryTurnover = 12;
    return { totalItems, totalValue, totalWeight, lowStockCount, deadStockCount: deadStock.length, deadStockValue, slowMovingCount: slowMoving.length, slowMovingValue, inventoryTurnover };
  }

  getCategoryStats(companyId: string) {
    const items = this.getInventory(companyId);
    const sales = this.getSales(companyId);
    const saleItems = this.getSaleItems(companyId);
    return this.categories.filter(c => c.companyId === companyId).map(cat => {
      const catProducts = items.filter(i => i.categoryId === cat._id);
      const catSaleItems = saleItems.filter(si => si.categoryId === cat._id);
      const catSales = catSaleItems.reduce((sum, si) => sum + si.price * si.quantity, 0);
      const catProfit = Math.floor(catSales * 0.15);
      const totalSalesAll = sales.reduce((sum, s) => sum + s.total, 0);
      const salesShare = Math.round((catSales / (totalSalesAll || 1)) * 100);
      return {
        ...cat,
        totalProducts: catProducts.length,
        totalQuantity: catProducts.reduce((sum, p) => sum + p.quantity, 0),
        totalValue: catProducts.reduce((sum, p) => sum + p.inventoryValue, 0),
        totalWeight: catProducts.reduce((sum, p) => sum + p.weight * p.quantity, 0),
        sales: catSales,
        profit: catProfit,
        salesShare,
        profitMargin: catSales > 0 ? Math.round((catProfit / catSales) * 100) : 0,
        growth: Math.floor(Math.random() * 30) - 5,
        turnoverRate: Math.floor(Math.random() * 20) + 5,
        avgDaysInStock: Math.floor(Math.random() * 90) + 10,
        opportunityScore: Math.floor(Math.random() * 40) + 60,
      };
    }).sort((a, b) => b.sales - a.sales);
  }

  getEmployeeStats(companyId: string) {
    const employees = this.getEmployees(companyId);
    const sales = this.getSales(companyId);
    return employees.map(emp => {
      const empSales = sales.filter(s => s.employeeId === emp._id);
      const totalSales = empSales.reduce((sum, s) => sum + s.total, 0);
      const totalProfit = empSales.reduce((sum, s) => sum + s.profit, 0);
      const invoiceCount = empSales.length;
      const avgInvoice = invoiceCount > 0 ? Math.round(totalSales / invoiceCount) : 0;
      const target = 15000;
      const achievement = Math.round((totalSales / target) * 100);
      return {
        ...emp,
        totalSales,
        totalProfit,
        invoiceCount,
        avgInvoice,
        target,
        achievement,
        performanceScore: Math.min(100, Math.max(0, Math.round(achievement * 0.4 + (totalProfit / (totalSales || 1)) * 100 * 0.3 + invoiceCount * 3 * 0.3))),
      };
    }).sort((a, b) => b.totalSales - a.totalSales);
  }

  getDashboardSummary(companyId: string) {
    const salesStats = this.getSalesStats(companyId);
    const inventoryStats = this.getInventoryStats(companyId);
    const branches = this.getBranches(companyId);
    const customers = this.getCustomers(companyId);

    const healthScore = this.calculateHealthScore(companyId);
    const salesGrowth = 12;
    const profitGrowth = 8;

    return {
      healthScore,
      totalSales: salesStats.totalSales,
      totalProfit: salesStats.totalProfit,
      profitMargin: salesStats.profitMargin,
      inventoryValue: inventoryStats.totalValue,
      inventoryWeight: inventoryStats.totalWeight,
      inventoryTurnover: inventoryStats.inventoryTurnover,
      deadStockValue: inventoryStats.deadStockValue,
      deadStockCount: inventoryStats.deadStockCount,
      avgInvoice: salesStats.avgOrderValue,
      totalInvoices: salesStats.totalOrders,
      customerCount: customers.length,
      branchCount: branches.length,
      salesGrowth,
      profitGrowth,
      turnoverRate: 1.25,
      liquidAssets: 85000,
    };
  }

  calculateHealthScore(companyId: string) {
    const salesStats = this.getSalesStats(companyId);
    const inventoryStats = this.getInventoryStats(companyId);
    const salesScore = Math.min(100, Math.round((salesStats.totalSales / 150000) * 100));
    const profitScore = Math.min(100, Math.round(salesStats.profitMargin * 5));
    const inventoryScore = Math.min(100, Math.round(inventoryStats.inventoryTurnover * 6));
    const deadStockPenalty = inventoryStats.deadStockCount * 5;
    const score = Math.round(salesScore * 0.25 + profitScore * 0.25 + inventoryScore * 0.2 + 70 * 0.1 + 80 * 0.1 + 75 * 0.05 + Math.max(0, 100 - deadStockPenalty) * 0.05);
    return Math.min(100, Math.max(0, score));
  }

  getSmartAlerts(companyId: string) {
    const alerts = this.getAlerts(companyId);
    return alerts.map(a => ({
      ...a,
      aiAnalysis: this.generateAlertAnalysis(a),
      recommendation: this.generateAlertRecommendation(a),
    }));
  }

  private generateAlertAnalysis(alert: any) {
    const analyses: Record<string, string> = {
      'Sales': 'انخفضت المبيعات بنسبة 18% خلال آخر 5 أيام. السبب المحتمل هو انخفاض عدد الفواتير وليس انخفاض متوسط قيمة الفاتورة.',
      'Inventory': 'يوجد مخزون راكد منذ أكثر من 180 يوم. هذا يزيد تكلفة التخزين ويقلل السيولة.',
      'Profit': 'انخفض هامش الربح بسبب زيادة مبيعات المنتجات منخفضة الهامش.',
      'Market': 'فرصة شراء ممتازة بسبب انخفاض سعر الذهب العالمي.',
    };
    return analyses[alert.type] || 'يحتاج تحليل إضافي';
  }

  private generateAlertRecommendation(a: any) {
    const recs: Record<string, string> = {
      'Sales': 'إطلاق عرض ترويجي على الأساور وتدريب فريق المبيعات.',
      'Inventory': 'عرض خصم 15-20% على المخزون الراكد أو نقله لفرع آخر.',
      'Profit': 'التركيز على بيع المنتجات عالية الهامش مثل الخواتم والأساور.',
      'Market': 'الاستفادة من انخفاض السعر بشراء سبائك ذهب.',
    };
    return recs[a.type] || 'مراجعة الوضع';
  }

  getAIChatResponse(companyId: string, question: string) {
    const q = question.toLowerCase();
    
    // Get real data for context
    const sales = this.sales.filter(s => s.companyId === companyId);
    const products = this.products.filter(p => p.companyId === companyId);
    const employees = this.employees.filter(e => e.companyId === companyId);
    const categories = this.categories.filter(c => c.companyId === companyId);
    const branches = this.branches.filter(b => b.companyId === companyId);
    const alerts = this.alerts.filter(a => a.companyId === companyId);
    
    const totalSales = sales.reduce((sum, s) => sum + (s.total || 0), 0);
    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.status === 'Active').length;
    const deadStock = products.filter(p => (p.ageDays || 0) > 180).length;
    const totalEmployees = employees.length;
    const avgEmployeeSales = totalEmployees > 0 ? totalSales / totalEmployees : 0;
    
    // Category analysis
    const categoryStats = categories.map(c => {
      const catProducts = products.filter(p => p.categoryId === c._id);
      const catSales = sales.filter(s => s.categoryId === c._id);
      const catTotal = catSales.reduce((sum, s) => sum + (s.total || 0), 0);
      return { name: c.name, products: catProducts.length, sales: catTotal };
    }).sort((a, b) => b.sales - a.sales);
    
    // Branch analysis
    const branchStats = branches.map(b => {
      const brSales = sales.filter(s => s.branchId === b._id);
      const brTotal = brSales.reduce((sum, s) => sum + (s.total || 0), 0);
      return { name: b.branchName, sales: brTotal, count: brSales.length };
    }).sort((a, b) => b.sales - a.sales);
    
    // Employee analysis
    const empStats = employees.map(e => {
      const empSales = sales.filter(s => s.employeeId === e._id);
      const empTotal = empSales.reduce((sum, s) => sum + (s.total || 0), 0);
      return { name: e.name, sales: empTotal, count: empSales.length };
    }).sort((a, b) => b.sales - a.sales);
    
    // Smart keyword detection and response generation
    if (q.includes('ربح') || q.includes('margin') || q.includes('مارجن') || q.includes('هوامش')) {
      const profit = totalSales * 0.15;
      const profitGrowth = totalSales > 0 ? '+8%' : '0%';
      return { 
        answer: `📊 تحليل الأرباح:\n\n• إجمالي المبيعات: ${totalSales.toLocaleString()} د.ك\n• هامش الربح المقدر: 15.2%\n• صافي الأرباح المتوقع: ${profit.toLocaleString()} د.ك\n• نمو الأرباح: ${profitGrowth}\n\n📌 التوصية: ركّز على المنتجات عالية الهامش مثل الخواتم والأساور. تجنّب السبائك منخفضة الهامش.`,
        confidence: 88 
      };
    }
    
    if (q.includes('مخزون') || q.includes('inventory') || q.includes('stock') || q.includes('منتج')) {
      const deadStockValue = deadStock * 3000;
      return { 
        answer: `📦 تحليل المخزون:\n\n• عدد المنتجات: ${totalProducts} (${activeProducts} نشط)\n• مخزون راكد (> 180 يوم): ${deadStock} قطعة\n• قيمة المخزون الراكد: ~${deadStockValue.toLocaleString()} د.ك\n• نسبة الركود: ${totalProducts > 0 ? ((deadStock / totalProducts) * 100).toFixed(1) : 0}%\n\n⚠️ تنبيه: ${deadStock > 10 ? 'يوجد مخزون راكد كثير! نوصي بحملة تصفية' : 'المخزون في حالة جيدة'}`,
        confidence: 92 
      };
    }
    
    if (q.includes('فرع') || q.includes('branch') || q.includes('فروع')) {
      const topBranch = branchStats[0];
      const worstBranch = branchStats[branchStats.length - 1];
      return { 
        answer: `🏢 تحليل الفروع:\n\n${branchStats.map((b, i) => `${i + 1}. ${b.name}: ${b.sales.toLocaleString()} د.ك (${b.count} فاتورة)`).join('\n')}\n\n📌 أفضل فرع: ${topBranch?.name} (${topBranch?.sales.toLocaleString()} د.ك)\n⚠️ يحتاج متابعة: ${worstBranch?.name} (${worstBranch?.sales.toLocaleString()} د.ك)\n\n💡 نوصي بمراجعة أداء ${worstBranch?.name} وتطبيق أفضل الممارسات من ${topBranch?.name}`,
        confidence: 85 
      };
    }
    
    if (q.includes('فئة') || q.includes('category') || q.includes('فئات') || q.includes('نوع')) {
      return { 
        answer: `🏷️ تحليل الفئات:\n\n${categoryStats.map((c, i) => `${i + 1}. ${c.name}: ${c.sales.toLocaleString()} د.ك (${c.products} منتج)`).join('\n')}\n\n🏆 أفضل فئة: ${categoryStats[0]?.name} (${categoryStats[0]?.sales.toLocaleString()} د.ك)\n📉 أضعف فئة: ${categoryStats[categoryStats.length - 1]?.name}\n\n💡 نوصي بتركيز جهود التسويق على الفئات الأقوى`,
        confidence: 90 
      };
    }
    
    if (q.includes('موظف') || q.includes('employee') || q.includes('موظفين') || q.includes('أفضل موظف')) {
      return { 
        answer: `👥 تحليل الموظفين:\n\n${empStats.map((e, i) => `${i + 1}. ${e.name}: ${e.sales.toLocaleString()} د.ك (${e.count} فاتورة)`).join('\n')}\n\n🏆 أفضل موظف: ${empStats[0]?.name} (${empStats[0]?.sales.toLocaleString()} د.ك)\n📊 متوسط المبيعات: ${avgEmployeeSales.toLocaleString()} د.ك/موظف\n\n💡 نوصي بتدريب ${empStats[empStats.length - 1]?.name} وتقديم مكافآت للأفضل أداءً`,
        confidence: 82 
      };
    }
    
    if (q.includes('مبيعات') || q.includes('sales') || q.includes('فاتورة') || q.includes('sale')) {
      const avgSale = sales.length > 0 ? totalSales / sales.length : 0;
      return { 
        answer: `💰 تحليل المبيعات:\n\n• إجمالي المبيعات: ${totalSales.toLocaleString()} د.ك\n• عدد الفواتير: ${sales.length}\n• متوسط الفاتورة: ${avgSale.toLocaleString()} د.ك\n• أعلى فرع: ${branchStats[0]?.name} (${branchStats[0]?.sales.toLocaleString()} د.ك)\n\n📈 نمو المبيعات: +12% مقارنة بالفترة السابقة\n\n💡 نوصي بزيادة التركيز على المنتجات الأكثر مبيعاً`,
        confidence: 87 
      };
    }
    
    if (q.includes('توصية') || q.includes('recommendation') || q.includes('نصيحة') || q.includes('اقتراح')) {
      const topCat = categoryStats[0];
      const topEmp = empStats[0];
      const deadStockCount = deadStock;
      return { 
        answer: `💡 توصيات ذكية بناءً على البيانات:\n\n1. 🏆 ركّز على فئة ${topCat?.name} (أفضل أداء: ${topCat?.sales.toLocaleString()} د.ك)\n2. 👏 مكافأة ${topEmp?.name} (أفضل موظف: ${topEmp?.sales.toLocaleString()} د.ك)\n3. ⚠️ تصفّي ${deadStockCount} قطعة مخزون راكد (تجاوز 180 يوم)\n4. 📢 أطلق حملة تسويقية على الفئات الأضعف\n5. 🏢 حسّن أداء الفروع الأقل أداءً\n\n🎯 هذه التوصيات مبنية على بيانات حقيقية من متجرك`,
        confidence: 91 
      };
    }
    
    if (q.includes('تنبيه') || q.includes('alert') || q.includes('تنبيهات') || q.includes('مهم')) {
      const highAlerts = alerts.filter(a => a.severity === 'High' || a.severity === 'Critical');
      return { 
        answer: `🚨 التنبيهات المهمة:\n\n${alerts.slice(0, 5).map((a, i) => `${i + 1}. ${a.title}\n   ${a.description}\n   الخطورة: ${a.severity}`).join('\n\n')}\n\n⚠️ يوجد ${highAlerts.length} تنبيهات عالية الخطورة تحتاج إجراء فوري`,
        confidence: 88 
      };
    }
    
    if (q.includes('مرحبا') || q.includes('اهلا') || q.includes('hello') || q.includes('hi')) {
      return { 
        answer: `مرحباً! 👋 أنا مساعدك الذكي في منصتي MINASATI.\n\nيمكنني مساعدتك في:\n• 📊 تحليل المبيعات والأرباح\n• 📦 متابعة المخزون والمنتجات\n• 🏢 مراقبة أداء الفروع\n• 👥 تقييم أداء الموظفين\n• 🏷️ تحليل الفئات\n• 💡 تقديم توصيات ذكية\n\nاسألني عن أي شيء! 😊`,
        confidence: 95 
      };
    }
    
    // Default intelligent response
    const insights = [
      `📊 ملخص سريع:\n• المبيعات: ${totalSales.toLocaleString()} د.ك (${sales.length} فاتورة)\n• المنتجات: ${totalProducts} (${activeProducts} نشط)\n• الموظفين: ${totalEmployees}\n• الفروع: ${branches.length}`,
      `💡 رؤى ذكية:\n• أفضل فئة: ${categoryStats[0]?.name}\n• أفضل فرع: ${branchStats[0]?.name}\n• أفضل موظف: ${empStats[0]?.name}\n• مخزون راكد: ${deadStock} قطعة`,
    ];
    
    return { 
      answer: `🤖 لم أفهم السؤال بالضبط، لكن إليك معلومات مهمة:\n\n${insights[0]}\n\n${insights[1]}\n\n💡 حاول أسأل عن: المبيعات، المخزون، الفروع، الفئات، الموظفين، التوصيات، أو التنبيهات`,
      confidence: 70 
    };
  }

  getExecutiveBrief(companyId: string) {
    return {
      greeting: 'صباح الخير',
      date: new Date().toLocaleDateString('ar-KW'),
      salesToday: 4200,
      salesGrowth: '+9%',
      profitToday: 650,
      profitChange: '-3%',
      topBranch: 'فرع السالمية',
      worstBranch: 'فرع الأحمدي',
      topCategory: 'الأساور',
      deadStockCount: 18,
      keyInsight: 'الأساور ما زالت الفئة الأقوى. يوجد 18 قطعة راكدة تجاوز عمرها 180 يوم.',
      topRecommendation: 'ننصح بإطلاق حملة على الخواتم قبل نهاية الأسبوع.',
      marketImpact: 'سعر الذهب عالمياً: $2,350 (-0.5% اليوم)',
    };
  }

  // ==================== BUDGET ====================
  private budgets: any[] = [
    {
      _id: '1', companyId: '1', name: 'ميزانية الربع الثالث 2026', description: 'ميزانية شاملة للربع الثالث',
      duration: 3, startDate: '2026-07-01', endDate: '2026-09-30', status: 'Active',
      totalBudget: 180000, totalActual: 62000, currency: 'KWD',
      categories: [
        { name: 'الرواتب والمكافآت', budgeted: 45000, actual: 15000, icon: '💰' },
        { name: 'الإيجار والمرافق', budgeted: 30000, actual: 10000, icon: '🏢' },
        { name: 'المخزون والمشتريات', budgeted: 60000, actual: 22000, icon: '📦' },
        { name: 'التسويق والإعلانات', budgeted: 15000, actual: 4000, icon: '📢' },
        { name: 'الصيانة وال repairs', budgeted: 8000, actual: 2500, icon: '🔧' },
        { name: 'التأمين والرسوم', budgeted: 10000, actual: 3500, icon: '🛡️' },
        { name: 'التنقل والمواصلات', budgeted: 5000, actual: 1500, icon: '🚗' },
        { name: 'متنوعة وطوارئ', budgeted: 7000, actual: 3500, icon: '📋' },
      ],
      branches: [
        { branchId: '1', branchName: 'السالمية', budgeted: 70000, actual: 25000 },
        { branchId: '2', branchName: 'حولي', budgeted: 55000, actual: 18000 },
        { branchId: '3', branchName: 'الأحمدي', budgeted: 55000, actual: 19000 },
      ],
      monthlyBreakdown: [
        { month: 'يوليو 2026', budgeted: 60000, actual: 22000, status: 'partial' },
        { month: 'أغسطس 2026', budgeted: 60000, actual: 20000, status: 'partial' },
        { month: 'سبتمبر 2026', budgeted: 60000, actual: 20000, status: 'planned' },
      ],
      createdAt: new Date('2026-06-15'),
    },
    {
      _id: '2', companyId: '1', name: 'ميزانية نصف السنة', description: 'ميزانية متوسطة المدى لمدة 6 أشهر',
      duration: 6, startDate: '2026-07-01', endDate: '2026-12-31', status: 'Draft',
      totalBudget: 360000, totalActual: 0, currency: 'KWD',
      categories: [
        { name: 'الرواتب والمكافآت', budgeted: 90000, actual: 0, icon: '💰' },
        { name: 'الإيجار والمرافق', budgeted: 60000, actual: 0, icon: '🏢' },
        { name: 'المخزون والمشتريات', budgeted: 120000, actual: 0, icon: '📦' },
        { name: 'التسويق والإعلانات', budgeted: 30000, actual: 0, icon: '📢' },
        { name: 'الصيانة والrepairs', budgeted: 16000, actual: 0, icon: '🔧' },
        { name: 'التأمين والرسوم', budgeted: 20000, actual: 0, icon: '🛡️' },
        { name: 'التنقل والمواصلات', budgeted: 10000, actual: 0, icon: '🚗' },
        { name: 'متنوعة وطوارئ', budgeted: 14000, actual: 0, icon: '📋' },
      ],
      branches: [
        { branchId: '1', branchName: 'السالمية', budgeted: 140000, actual: 0 },
        { branchId: '2', branchName: 'حولي', budgeted: 110000, actual: 0 },
        { branchId: '3', branchName: 'الأحمدي', budgeted: 110000, actual: 0 },
      ],
      monthlyBreakdown: [
        { month: 'يوليو 2026', budgeted: 60000, actual: 0, status: 'planned' },
        { month: 'أغسطس 2026', budgeted: 60000, actual: 0, status: 'planned' },
        { month: 'سبتمبر 2026', budgeted: 60000, actual: 0, status: 'planned' },
        { month: 'أكتوبر 2026', budgeted: 60000, actual: 0, status: 'planned' },
        { month: 'نوفمبر 2026', budgeted: 60000, actual: 0, status: 'planned' },
        { month: 'ديسمبر 2026', budgeted: 60000, actual: 0, status: 'planned' },
      ],
      createdAt: new Date('2026-06-20'),
    },
  ];

  private nextBudgetId = 3;

  getBudgets(companyId: string) {
    return { value: this.budgets.filter(b => b.companyId === companyId), Count: this.budgets.filter(b => b.companyId === companyId).length };
  }

  getBudgetById(id: string) {
    return this.budgets.find(b => b._id === id) || null;
  }

  createBudget(data: any) {
    const budget = {
      _id: String(this.nextBudgetId++),
      ...data,
      totalActual: 0,
      status: 'Draft',
      createdAt: new Date(),
      categories: data.categories || [
        { name: 'الرواتب والمكافآت', budgeted: 0, actual: 0, icon: '💰' },
        { name: 'الإيجار والمرافق', budgeted: 0, actual: 0, icon: '🏢' },
        { name: 'المخزون والمشتريات', budgeted: 0, actual: 0, icon: '📦' },
        { name: 'التسويق والإعلانات', budgeted: 0, actual: 0, icon: '📢' },
        { name: 'الصيانة', budgeted: 0, actual: 0, icon: '🔧' },
        { name: 'التأمين والرسوم', budgeted: 0, actual: 0, icon: '🛡️' },
        { name: 'التنقل والمواصلات', budgeted: 0, actual: 0, icon: '🚗' },
        { name: 'متنوعة وطوارئ', budgeted: 0, actual: 0, icon: '📋' },
      ],
      branches: data.branches || [],
      monthlyBreakdown: data.monthlyBreakdown || [],
    };
    this.budgets.push(budget);
    return budget;
  }

  updateBudget(id: string, data: any) {
    const idx = this.budgets.findIndex(b => b._id === id);
    if (idx === -1) return null;
    this.budgets[idx] = { ...this.budgets[idx], ...data };
    return this.budgets[idx];
  }

  deleteBudget(id: string) {
    const idx = this.budgets.findIndex(b => b._id === id);
    if (idx === -1) return false;
    this.budgets.splice(idx, 1);
    return true;
  }

  getBudgetSummary(companyId: string) {
    const budgets = this.budgets.filter(b => b.companyId === companyId);
    const active = budgets.filter(b => b.status === 'Active');
    const draft = budgets.filter(b => b.status === 'Draft');
    const totalBudget = budgets.reduce((sum, b) => sum + b.totalBudget, 0);
    const totalActual = budgets.reduce((sum, b) => sum + b.totalActual, 0);
    return {
      totalBudgets: budgets.length,
      activeBudgets: active.length,
      draftBudgets: draft.length,
      totalBudget,
      totalActual,
      utilization: totalBudget > 0 ? ((totalActual / totalBudget) * 100).toFixed(1) : 0,
    };
  }
}
