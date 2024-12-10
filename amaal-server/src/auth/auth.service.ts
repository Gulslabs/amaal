import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createJwt(req) {    
    console.log(`Creating a JWT Token for the User after it was redirected successfully Request: ${JSON.stringify(req.user)}`);
    return {
      access_token: this.jwtService.sign(req.user),
    };
  }
}
