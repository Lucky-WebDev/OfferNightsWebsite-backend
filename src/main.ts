import { NestFactory } from '@nestjs/core';
const { createProxyMiddleware } = require('http-proxy-middleware');
import { AppModule } from './app.module';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({ origin: 'http://192.168.136.185:3000' }));
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://192.168.136.185:5000',
      changeOrigin: true,
    })
  );
  await app.listen(5000, '0.0.0.0');
}
bootstrap();
