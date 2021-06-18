import { getCustomRepository, Repository } from "typeorm";
import { Connections } from "../entities/Connections";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository"

interface IConnectionsCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionsService {
  private connectionsRepository: Repository<Connections>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  create = async ({socket_id, user_id, admin_id, id }: IConnectionsCreate) => {


    const connection = this.connectionsRepository.create({
      socket_id,
      user_id, 
      admin_id, 
      id
    });

    await this.connectionsRepository.save(connection);

    return connection;

  }

  findUserById = async (user_id: string) => {
    const connection = await this.connectionsRepository.findOne({user_id});

    return connection;
  }
}

export { ConnectionsService }