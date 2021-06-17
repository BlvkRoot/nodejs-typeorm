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
}

export { SettingsController };