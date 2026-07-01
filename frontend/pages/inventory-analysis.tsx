import React, { useState, useEffect } from 'react';

export default function InventoryAnalysisPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/products?companyId=1').then(r => r.json()),
      fetch('http://localhost:4000/categories/intelligence?companyId=1').then(r => r.json()),
    ]).then(([p, c]) => {
      setProducts(p.products || p || []);
      setCategories(c);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const getAgeBadge = (age: string) => {
    switch(age) {
      case 'new': return { label: 'جديد', color: 'badge-green' };
      case 'slow': return { label: 'بطيء', color: 'badge-yellow' };
      case 'medium': return { label: 'متوسط', color: 'badge-gold' };
      case 'fast': return { label: 'سريع', color: 'badge-green' };
      default: return { label: age, color: 'badge-red' };
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-gold text-lg">جاري تحميل البيانات...</div></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">تحليل المخزون</h1>
        <p className="text-gold mt-1">تحليل ذكي للمخزون وحركة المنتجات</p>
      </div>

      {/* Category Intelligence */}
      <div className="card">
        <h3 className="text-gold font-bold mb-4">تحليل الفئات</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {categories.slice(0, 6).map((cat: any) => (
            <div key={cat._id} className="p-4 rounded-xl" style={{ backgroundColor: '#0d1628', border: '1px solid #1c2d4a' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">{cat.name}</span>
                <span className="badge badge-gold">{cat.productCount} منتج</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-400">مبيعات</p>
                  <p className="text-white font-bold">{cat.salesGrowth}%</p>
                </div>
                <div>
                  <p className="text-gray-400">هامش</p>
                  <p className="text-white font-bold">{cat.profitMargin}%</p>
                </div>
                <div>
                  <p className="text-gray-400">الأكثر مبيعاً</p>
                  <p className="text-gold font-bold">{cat.bestSeller}</p>
                </div>
                <div>
                  <p className="text-gray-400">Opportunity</p>
                  <p className="text-white font-bold">{cat.opportunityScore}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="card">
        <h3 className="text-gold font-bold mb-4">جميع المنتجات</h3>
        <div className="table-container overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>المنتج</th>
                <th>الفئة</th>
                <th>العيار</th>
                <th>الكمية</th>
                <th>السعر</th>
                <th>الأيام في المخزون</th>
                <th>التصنيف</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => {
                const ageBadge = getAgeBadge(product.ageClassification || 'new');
                return (
                  <tr key={product._id}>
                    <td className="text-white">{product.name}</td>
                    <td className="text-gold">{product.category}</td>
                    <td>{product.karat}</td>
                    <td className="font-bold">{product.quantity}</td>
                    <td>{product.price?.toLocaleString()} د.ك</td>
                    <td>{product.daysInStock || 0} يوم</td>
                    <td><span className={`badge ${ageBadge.color}`}>{ageBadge.label}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
