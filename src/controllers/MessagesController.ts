import { Request, Response } from "express";
import { MessagesService } from "../service/MessagesService";

class MessagesController {
  
  create = async (request: Request, response: Response) => {
    const { admin_id, text, user_id } = request.body;

    const messagesService = new MessagesService();

    try {
      const message = await messagesService.create({ admin_id, text, user_id });

      return response.json({message: ['Message created successfully', message]});

    } catch (error) {
      console.error(error);
      
      return response.json(error);
    }
  }

  showByUser = async (request: Request, response: Response) => {
    const { id } = request.params;
     
    const messagesService = new MessagesService();

    const list = await messagesService.listByUser(id);
  
    return response.json(list);
  }

}

export { MessagesController }