import { Request, Response } from 'express';
import { UsersService } from '../service/UsersService';

class UsersController {

  create = async (request: Request, response: Response) => {
    const { name, email } = request.body;
    const usersService = new UsersService();

    try {

      const users = await usersService.create({ name, email });

      return response.json({message: 'User created successfully.', users});
      
    } catch ({message}) {
      
      console.error(message);

      return response.json({error: message});
    }

  }
}

export { UsersController }