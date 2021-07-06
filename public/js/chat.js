document.querySelector("#start_chat").addEventListener("click", (event) => {
  const socket = io();

  let chat_help = document.querySelector('#chat_help');
  chat_help.style.display = 'none';

  let chat_in_support = document.querySelector('#chat_in_support');
  chat_in_support.style.display = 'block';

  let email = document.querySelector('#email').value;
  let text = document.querySelector('#txt_help').value;

  // Invoking the socket event using emit

  socket.on('connect', () => {
    const params = {
      email,
      text
    }

    socket.emit('client_first_access', params, (call, err) => {
      // Check for errors
      if(err){
        console.error(err);
      }else {
        console.log(call);
      }
    });

    socket.on('client_list_all_messages', messages => {
      let template_client = document.querySelector('#message-user-template').innerHTML;
      let template_admin = document.querySelector('#admin-template').innerHTML;

      messages.map(message => {
        if(message.admin_id === null){
          const rendered = Mustache.render(template_client, {
            message: message.text,
            email
          });

          document.querySelector('#messages').innerHTML += rendered;
        } else {
          const rendered = Mustache.render(template_admin, {
            message_admin: message.text
          });

          document.querySelector('#messages').innerHTML += rendered;
        }
      });

    });

  });

  socket.on('admin_send_to_client', message => {
    console.log(message);
    
  });

});
