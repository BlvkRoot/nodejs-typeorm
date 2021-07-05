import { io } from '../http';
import { ConnectionsService } from '../service/ConnectionsService';
import { UsersService } from '../service/UsersService';
import { MessagesService } from '../service/MessagesService';

interface IParams {
  text: string;
  email: string;
}

io.on("connect", socket => {
  //creating an event => name given for the event can be any
  socket.on('client_first_access', async params => {
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesService = new MessagesService();

    const socket_id = socket.id;
    const { email, text} = params as IParams;
    const name = 'Test User';
    let user_id = null;

    const userExists = await usersService.findByEmail(email);

    // Salvar a conexao com o socket_id, user_id
     
    if(!userExists){
      const user = await usersService.create({name, email});
    
      await connectionsService.create({
        socket_id,
        user_id: user.id
      });

      user_id = user.id;

    }else {

      user_id = userExists.id;

      const connection = await connectionsService.findUserById(userExists.id);

      // Check if connection already exists to avoid multiple connections created for a single user
      if(!connection){
        await connectionsService.create({
          socket_id,
          user_id: userExists.id
        });
      } else {
        connection.socket_id = socket_id;
 
        await connectionsService.create(connection);
      }

    }

    await messagesService.create({
      text,
      user_id
    });

    const allMessages = await messagesService.listByUser(user_id);

    socket.emit('client_list_all_messages', allMessages);
      
  });
});