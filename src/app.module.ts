import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { AuthModule } from './modules/firebase/auth/auth.module';
import { FirebaseMiddleware } from './middlewares/firebase/firebase.middleware';

@Module({
  imports: [ConfigModule.forRoot({ cache: true }), FirebaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseMiddleware).forRoutes('/auth*', '/profile*'); // Apply the middleware to /auth and /profile routes
  }
}
