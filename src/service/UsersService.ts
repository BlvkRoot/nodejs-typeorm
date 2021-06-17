import { getCustomRepository, Repository } from "typeorm";
import { Users } from "../entities/Users";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUsersCreate {
  name: string;
  email: string;
}

class UsersService {
  private usersRepository: Repository<Users>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  create = async ({name, email} : IUsersCreate ) => {

    const userAlreadyExists = await this.usersRepository.findOne({ email });

    if(userAlreadyExists) 
      throw new Error('User Already Exists');

    const user = this.usersRepository.create({ name, email });

    await this.usersRepository.save(user);

    return user;
  }

}

export { UsersService }