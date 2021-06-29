import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    //Pegar os dados do usuario
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // Deletar a informação do password de dentro do usuário, porém ela existe no banco.
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      update_at: user.update_at,
    };

    return response.json(userWithoutPassword);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// Utiliza-se o patch quando é necessario alterar apenas uma informação da column
usersRouter.patch('/avatar', ensureAuthenticated, async (request, response) => {
  return response.json({ok: true});
});

export default usersRouter;
