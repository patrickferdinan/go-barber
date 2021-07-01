import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

import AppError from '../errors/AppError';

// Inteface são criadas em classes e types em componentes.
interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
 public async execute({name, email, password}: Request): Promise<User> {
  // Criação do usuário
  const usersRepository = getRepository(User);

  // Verifica se ja existe o email criado
  const checkUserExists = await usersRepository.findOne({
    where: { email },
  });

  if (checkUserExists) {
    throw new AppError('Email address already used.');
  }

  // Criptografando o password
  const hashedPassword = await hash(password, 8);

  // Criando o usuário
  const user = usersRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  // Salvando o user no banco
  await usersRepository.save(user);

  return user;
 }
}

export default CreateUserService;