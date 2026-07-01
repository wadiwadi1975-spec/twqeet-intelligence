import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  async generate(type: string, format: string) {
    const data = this.mockData(type);
    if (format === 'csv') return this.generateCSV(data);
    return data;
  }

  private mockData(type: string) {
    const data: Record<string, any[]> = {
      sales: [
        { name: 'فرع السالمية', sales: 12000, profit: 3000 },
        { name: 'فرع حولي', sales: 8000, profit: 2000 },
        { name: 'فرع الأحمدي', sales: 10000, profit: 2500 },
      ],
      profit: [
        { product: 'خواتم 21K', profit: 5000 },
        { product: 'سلاسل 18K', profit: 3000 },
        { product: 'أساور 22K', profit: 2000 },
      ],
      inventory: [
        { category: 'خواتم', quantity: 150, value: 45000 },
        { category: 'سلاسل', quantity: 100, value: 30000 },
        { category: 'أساور', quantity: 80, value: 20000 },
      ],
      employees: [
        { name: 'أحمد', sales: 15000, invoices: 25 },
        { name: 'سارة', sales: 12000, invoices: 20 },
      ],
      branches: [
        { name: 'السالمية', sales: 12000, employees: 5 },
        { name: 'حولي', sales: 8000, employees: 3 },
      ],
    };
    return data[type] || [];
  }

  private generateCSV(data: any[]) {
    if (data.length === 0) return '';
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(d => Object.values(d).join(',')).join('\n');
    return `${header}\n${rows}`;
  }
}
