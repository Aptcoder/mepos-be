import { sign } from 'jsonwebtoken';
import * as config from 'config';
// import { JwtPayload } from '../interfaces';

export class JwtHelper {
  static async signToken(user: { id: string; role: {} }) {
    const payload = {
      sub: user.id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 1800000,
      role: user.role,
    };

    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };
    const secret = config.get<string>('jwt_secret');
    return sign(payload, secret, { header });
  }

  // static async refreshJWT(user: User) {
  //   const payload: JwtPayload = {
  //     id: user.id,
  //   };
  //   return sign(payload, JWT_REFRESH_SECRET, { expiresIn: 172800000 });
  // }
}
