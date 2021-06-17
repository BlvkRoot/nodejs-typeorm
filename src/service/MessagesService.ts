import { getCustomRepository } from "typeorm"
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessagesCreate {
  admin_id?: string;
  text: string;
  user_id: string;
}

class MessagesService {

  create = async ({admin_id, text, user_id}: IMessagesCreate) => {

    const messagesRepository = getCustomRepository(MessagesRepository);

    const message = messagesRepository.create({
      admin_id,
      text,
      user_id
    });

    await messagesRepository.save(message);

    return message;
  }

  listByUser = async (user_id: string) => {
    const messagesRepository = getCustomRepository(MessagesRepository);

    const list = messagesRepository.find({
      where: { user_id },
      relations: ["user"]
    });

    return list;
  }

}

export { MessagesService }