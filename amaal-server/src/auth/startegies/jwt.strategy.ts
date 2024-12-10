import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import configuration from 'src/configuration/configuration';
/* https://docs.nestjs.com/recipes/passport#jwt-functionality
jwt-strategy: Passport first verifies the JWT's signature and decodes the JSON. It then invokes our validate() passing decoded JSON 
* as its single parameter.
* Passport will build a user object based on the return value of our validate() method, and attach it as a property on the Request object.
*/
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration().jwt.secret,
    });    
  }
  /**
   *
   * @param payload
   * @returns
   */
  async validate(payload: any) {
    console.log(`Payload in Jwt Strategy extracted by parsing jwtToken: ${JSON.stringify(payload)}`);
    // find user by emailId return id if it exists if it doesnt then create a new one and return    
    return payload;
  }

  
}
