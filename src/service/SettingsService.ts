import { getCustomRepository, Repository } from "typeorm";
import { Settings } from "../entities/Settings";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: Repository<Settings>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }
  
  create = async ({ chat, username } : ISettingsCreate ) => {

    const userAlreadyExists = await this.settingsRepository.findOne({ username });

    const settings = this.settingsRepository.create({
      username,
      chat
    });

    if(userAlreadyExists)
      throw new Error('Username already exists');

    await this.settingsRepository.save(settings);

    return settings;

  }

  findByUsername = async (username: string) => {
    const settings = this.settingsRepository.findOne({
      username
    });

    return settings;
  }

  update = async (username: string, chat: boolean) => {
    await this.settingsRepository.createQueryBuilder()
      .update(Settings)
      .set({ chat })
      .where('username = :username', { username })
      .execute();
  }

}

export { SettingsService }