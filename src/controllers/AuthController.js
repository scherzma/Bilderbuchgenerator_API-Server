import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { ResponseCode } from '../shared/types/Api';
import { getAuthConfig } from '../configuration';

const prisma = new PrismaClient();

function generateJwtToken(username, email) {
  return jwt.sign({
    username, email,
  }, getAuthConfig().secret);
}

const AuthController = {
  async login(req, res) {
    const { username } = req.body;
    const { password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      res.status(ResponseCode.RESPONSE_CODE_InternalServerError).send();
      return;
    }
    if (!bcrypt.compareSync(password, user.password)) { // compare the hashed password stored in the db with the plain text password provided by the user
      res.status(ResponseCode.RESPONSE_CODE_Unauthorized).send();
      return;
    }
    const authToken = generateJwtToken(user.username, user.email);
    res.status(ResponseCode.RESPONSE_CODE_Ok).send({
      authToken,
    });
  },

  async register(req, res) {
    const { username } = req.body;
    const { password } = req.body;
    const { email } = req.body;

    console.log(username, password, email);
    const userExist = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (userExist) {
      res.status(ResponseCode.RESPONSE_CODE_InternalServerError).send();
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        Vorname: 'Test',
        Nachname: 'Test',
        salt: 'Test',
      },
    });
    if (!user) {
      res.status(ResponseCode.RESPONSE_CODE_InternalServerError).send();
      return;
    }
    const authToken = generateJwtToken(user.username, user.email);
    res.status(ResponseCode.RESPONSE_CODE_Ok).send({ authToken });
  },
};

export default AuthController;
