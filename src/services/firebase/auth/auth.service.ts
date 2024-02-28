import { admin, Injectable } from 'src/main';

@Injectable()
export class AuthService {
  async signUp(email: string, password: string): Promise<string> {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    return userRecord.uid;
  }

  async signIn(email: string, password: string): Promise<string> {
    const userRecord = await admin.auth().getUserByEmail(email);
    // Check if the email/password combination is valid (use Firebase Authentication API)
    // If valid, you can generate and return a token
    return 'GeneratedTokenHere';
  }
}
