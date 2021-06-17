import { Router } from 'express';
import { MessagesController } from './controllers/MessagesController';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersController';

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

// Settings route
routes.post('/settings', settingsController.create);

// Users route
routes.post('/users', usersController.create);

// Messages route~
routes.post('/messages', messagesController.create);

export { routes };

