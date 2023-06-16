import { jwt } from 'jsonwebtoken';
import { getAuthConfig } from 'src/configuration';
import { ResponseCode } from 'src/shared/types/Api';

const AuthMiddleware = {
  async verifyJWTToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, getAuthConfig().secret, (err, user) => {
        if (err) {
          return res.sendStatus(ResponseCode.RESPONSE_CODE_Unauthorized);
        }
        req.user = user;
        return next();
      });
    }
    return res.sendStatus(ResponseCode.RESPONSE_CODE_Unauthorized);
  },
};

export default AuthMiddleware;
