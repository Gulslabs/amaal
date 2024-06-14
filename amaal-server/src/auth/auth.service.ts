import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  handleRedirect(req) {    
    console.log(`Redirected and Validated Request: ${JSON.stringify(req.user)}`);
    return {
      access_token: this.jwtService.sign(req.user),
    };
  }
}
