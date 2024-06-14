import { AuthGuard } from '@nestjs/passport';

/**
 * This Guard invokes the Passport strategy and kicks off the steps described in the GoogleStrategy.
 * The GoogleStrategy has default name of 'google'; its used to disambiguage which strategy to apply.
 */
export class GoogleGuard extends AuthGuard('google') {
  constructor() {
    super({
      accessType: 'offline',
    });
  }
}
