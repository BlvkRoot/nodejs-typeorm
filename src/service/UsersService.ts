import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUsersCreate {
  name: string;
  email: string;
}

class UsersService {

  create = async ({name, email} : IUsersCreate ) => {
    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if(userAlreadyExists) 
      throw new Error('User Already Exists');

    const user = usersRepository.create({ name, email });

    await usersRepository.save(user);

    return user;
  }

}

export { UsersService }