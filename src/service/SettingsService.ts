import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService {
  
  create = async ({ chat, username } : ISettingsCreate ) => {

    const settingsRepository = getCustomRepository(SettingsRepository);

    const userAlreadyExists = await settingsRepository.findOne({ username });

    const settings = settingsRepository.create({
      username,
      chat
    });

    if(userAlreadyExists)
      throw new Error('Username already exists');

    await settingsRepository.save(settings);

    return settings;

  }

}

export { SettingsService }