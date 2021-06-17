import { getCustomRepository, Repository } from "typeorm"
import { Messages } from "../entities/Messages";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessagesCreate {
  admin_id?: string;
  text: string;
  user_id: string;
}

class MessagesService {
  private messagesRepository: Repository<Messages>;

  constructor () {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  create = async ({admin_id, text, user_id}: IMessagesCreate) => {

    const message = this.messagesRepository.create({
      admin_id,
      text,
      user_id
    });

    await this.messagesRepository.save(message);

    return message;
  }

  listByUser = async (user_id: string) => {

    const list = this.messagesRepository.find({
      where: { user_id },
      relations: ["user"]
    });

    return list;
  }

}

export { MessagesService }