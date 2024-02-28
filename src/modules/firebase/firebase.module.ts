import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseRepository } from 'src/services/firebase/FirebaseRepository';
import * as serviceAccount from '../../private/planify-firebase-adminsdk.json';
import { admin } from 'src/main';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: `https://${configService.get<string>('PROJECT_ID')}.firebaseio.com`,
      storageBucket: `${configService.get<string>('PROJECT_ID')}.appspot.com`,
    });
  },
};

@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider, FirebaseRepository],
  exports: [FirebaseRepository],
})
export class FirebaseModule {}
