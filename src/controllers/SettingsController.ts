import { Request, Response} from 'express';
import { SettingsService } from '../service/SettingsService';

class SettingsController {

  create = async (request: Request, response: Response) => {
    const { username, chat } = request.body;
    const settingsService = new SettingsService();
    
    try {
      
      const settings = await settingsService.create({ chat, username});

      return response.json({message: 'Settings Created Successfully', settings});

    } catch ({message}) {
      return response.json({error: message});
    }
  }

  findByUsername = async (request: Request, response: Response) => {
    const settingsService = new SettingsService();
    const { username } = request.params;

    try {
      const setting = await settingsService.findByUsername(username);

      return response.json(setting);

    } catch (error) {
      console.error(error);
      return response.json(error);
      
    }
  }

  update = async (request: Request, response: Response) => {
    const settingsService = new SettingsService();
    const { username } = request.params;
    const { chat } = request.body;

    const settings = await settingsService.update(username, chat);

    return response.json(settings);
  }
}

export { SettingsController };