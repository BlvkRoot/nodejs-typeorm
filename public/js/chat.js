let socket_admin_id = null;
let userEmail = null;
let socket = null;

document.querySelector("#start_chat").addEventListener("click", (event) => {
  socket = io();

  let chat_help = document.querySelector('#chat_help');
  chat_help.style.display = 'none';

  let chat_in_support = document.querySelector('#chat_in_support');
  chat_in_support.style.display = 'block';

  let email = document.querySelector('#email').value;
  userEmail = email;

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
        // Check messages belong to client or admin attendent
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

  // Listen for admin messages sent to client
  socket.on('admin_send_to_client', message => {
    socket_admin_id = message.socket_id;

    const template_admin = document.querySelector(`#admin-template`).innerHTML;
    
    const rendered = Mustache.render(template_admin, {
      message_admin: message.text,
    });

    document.querySelector(`#messages`).innerHTML += rendered;

  });

});

document.querySelector(`#send_message_button`).addEventListener('click', function(){
  const text = document.querySelector('#message_user').value;

  const params = {
    text,
    socket_admin_id
  }
  
  socket.emit('client_send_to_admin', params, (call, err) => {
    if(err)
      console.log('Error responding to admin');
    else
      console.log('Success responding to admin', call)
  });

  const template_client = document.querySelector(`#message-user-template`).innerHTML;

  const rendered = Mustache.render(template_client, {
    message: text,
    email: userEmail
  });

  document.querySelector(`#messages`).innerHTML += rendered;

  // Clear text sent
  text = ''; 
});
