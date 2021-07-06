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
    console.log('User messages: ', messages);
  });

}