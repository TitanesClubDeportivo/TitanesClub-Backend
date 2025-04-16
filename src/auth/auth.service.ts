import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    login() {
        return { message: 'Login successful' };
    }

    // Add more authentication methods as needed
}
