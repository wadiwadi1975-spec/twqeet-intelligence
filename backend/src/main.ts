import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('');
  console.log('  ╔══════════════════════════════════════════╗');
  console.log('  ║     TWQEET Intelligence Platform        ║');
  console.log('  ║     ذكاء القرارات.. لزيادة الربح       ║');
  console.log('  ╚══════════════════════════════════════════╝');
  console.log('');

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  });
  
  const port = process.env.PORT || 4000;
  await app.listen(port);
  
  console.log('  ✅ Server running on port ' + port);
  console.log('  📧 Email: admin@twqeet.com');
  console.log('  🔑 Password: admin123');
  console.log('');
  console.log('  Frontend: http://localhost:3000');
  console.log('  Backend:  http://localhost:' + port);
  console.log('');
}
bootstrap();
