import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { admin, Injectable, Request, Response } from 'src/main';

@Injectable()
export class FirebaseMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - Missing Firebase ID Token' });
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['user'] = decodedToken; // Attach user info to the request
      next();
    } catch (error) {
      console.error('Firebase ID Token verification failed:', error);
      return res
        .status(401)
        .json({ message: 'Unauthorized - Invalid Firebase ID Token' });
    }
  }
}
