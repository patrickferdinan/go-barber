import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';


import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);


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
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({
    user_id: request.user.id!,
    avatarFilename: request.file?.filename!,
  });

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    update_at: user.update_at,
    avatarFilename: user.avatar,
  };
  return response.json(userWithoutPassword);
});

export default usersRouter;
