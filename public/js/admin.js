const socket = io();
let connectionsUsers = [];

socket.on('admin_list_all_users', connections => {
  connectionsUsers = connections;

  document.querySelector('#list_users').innerHTML = '';
  let template = document.querySelector('#template').innerHTML;

  connections.map(connection => {
    const rendered = Mustache.render(template, {
      email: connection.user.email,
      id: connection.socket_id
    });

    document.querySelector('#list_users').innerHTML += rendered;
  });

});

const call = (id) => {
  const connection = connectionsUsers.find(connection => connection.socket_id === id);

  document.querySelector('#supports').innerHTML = '';
  const template = document.querySelector('#admin_template').innerHTML;

  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.user_id
  });

  document.querySelector('#supports').innerHTML += rendered;

  const params = {
    user_id: connection.user_id
  }

  socket.emit('admin_list_user_messages', params, messages => {
    const div_messages = document.querySelector(`#allMessages${connection.user_id}`);

    messages.map(message => {
      const create_div = document.createElement('div');

      if(message.admin_id === null){

        create_div.className = 'admin_message_client';

        create_div.innerHTML = `<span>${connection.user.email}</span>`;
        create_div.innerHTML += `<span>${message.text}</span>`;
        create_div.innerHTML += `<span class='admin_date'>${dayjs(message.created_at).format('DD/MM/YYYY HH:mm:ss')}</span>`;

      } else {
        create_div.className = 'admin_message_admin';

        create_div.innerHTML = `Atendente: <span> ${message.text}</span>`;
        create_div.innerHTML += `<span class='admin_date'>${dayjs(
            message.created_at
          ).format('DD/MM/YYYY HH:mm:ss')}</span>`;
      }

      div_messages.appendChild(create_div);

    });

  });

}

const sendMessage = (id) => {
  const text = document.querySelector(`#send_message_${id}`);

  const params ={
    text: text.value,
    user_id: id
  }

  socket.emit('admin_send_message', params);
}