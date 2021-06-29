import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService { 
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    // Procurando no repositorio um email que seja o email passado como parâmetro.
    const user = await usersRepository.findOne({ where: { email } });

    if(!user) {
      throw new Error('Incorrect email/password combination.');
    }

    // user.password - Senha criptografada, que será procurada para ser comparada com a senha não criptografada do parâmetro.
    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    // Usuário autenticado
    //Gerador de Hash - https://www.md5online.org/

    const {secret, expiresIn} = authConfig.jwt;

    //Payload
    const token = sign({}, secret, {
      subject: user.id, // É o ID do usuário que gerou este token
      expiresIn, // É o tempo que o usuário ficará logado
    });
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;

//Para descobrir se um método tem que utilizar await, basta passar o mouse sobre o método e ver o retorno do método. 

// Debugger JWT - https://jwt.io/