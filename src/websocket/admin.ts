import { io } from '../http';
import { ConnectionsService } from '../service//ConnectionsService';
import { MessagesService } from '../service/MessagesService';

io.on('connect', async socket => {
  const connectionService = new ConnectionsService();
  const messageService = new MessagesService();

  const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin();

  io.emit('admin_list_all_users', allConnectionsWithoutAdmin);

  socket.on('admin_list_user_messages', async (params, callback) => {
    const { user_id } = params;

    const allMessages = await messageService.listByUser(user_id);

    callback(allMessages);
  });

});