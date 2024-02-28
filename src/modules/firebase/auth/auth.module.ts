import { AuthController } from 'src/controllers/firebase/auth/auth.controller';
import { AuthService } from 'src/services/firebase/auth/auth.service';
import { Module } from 'src/main';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
