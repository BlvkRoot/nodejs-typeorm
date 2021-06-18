import 'reflect-metadata';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import  { resolve }  from 'path';

import './database';
import { routes } from './routes';

const app = express();

app.use(express.static(resolve('public')));
app.set('views', resolve('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/pages/client', (request, response) => {
  return response.render('html/client.html')
});

const http = createServer(app); // Criando protocolo http
const io = new Server(http); // Criando protocolo ws(websocket)

//Creating socket.io connection
io.on('connection', (socket: Socket) => {
  console.log('Connected to socket ', socket.id);
  
});

const PORT = 3333;

app.use(express.json());

app.use(routes);

export { http, PORT,  io};