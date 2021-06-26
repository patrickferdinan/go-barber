import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService { 
  public async execute({ email, password }: Request): Promise<{  user: User }> {
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
    return {
      user,
    };
  }
}

export default AuthenticateUserService;