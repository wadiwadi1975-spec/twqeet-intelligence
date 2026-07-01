function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div style={{ backgroundColor: '#0a1628', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', fontFamily: 'Cairo' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>{statusCode || 'خطأ'}</h1>
        <p style={{ color: '#9CA3AF', marginTop: '1rem' }}>
          {statusCode === 404 ? 'الصفحة غير موجودة' : 'حدث خطأ في الخادم'}
        </p>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
