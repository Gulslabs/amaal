import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import configuration from 'src/configuration/configuration';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: configuration().googole.clientId,
      clientSecret: configuration().googole.clientSecret,
      callbackURL: 'http://localhost:3001/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  /**
   * Return an error if the user(i.e. Profile) is not what we intend.
   * Validation logic can be maintained in AuthService
   * ` @Inject('AUTH_SERVICE') private readonly authService: AuthService,`
   * @param accessToken
   * @param refreshToken
   * @param profile
   * @param done
   */
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    console.log(`Validating the profile returned by Google, Google Strategy: ${JSON.stringify(profile)}`);
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastNAme: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
