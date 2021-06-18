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

  });

});
