import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleGuard } from './guards/google.guard';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google/login')
  @UseGuards(GoogleGuard)
  login(@Req() req) {}

  @Get('/google/redirect')
  @UseGuards(GoogleGuard)
  redirect(@Req() req, @Res() resp) {
    const jwt = this.authService.createJwt(req);
    // redirect to the UI with the token.
    resp.redirect(`http://localhost:3000/api/oauth?token=${jwt.access_token}`);
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  me(@Req() req): any {
    return req.user;  
  }
}
 