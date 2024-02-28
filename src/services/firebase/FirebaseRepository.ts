import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseRepository {
  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {}
}
