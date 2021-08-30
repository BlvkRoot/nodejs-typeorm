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
routes.get('/settings/:username', settingsController.findByUsername);
routes.put('/settings/:username', settingsController.update);

// Users route
routes.post('/users', usersController.create);

// Messages route
routes.post('/messages', messagesController.create);
routes.get('/messages/:id', messagesController.showByUser);


// View routes
routes.get('/pages/client', (request, response) => {
    return response.render('html/client.html')
});
  
routes.get('/pages/admin', (request, response) => {
return response.render('html/admin.html')
});

export { routes };

