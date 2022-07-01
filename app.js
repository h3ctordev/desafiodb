const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const db = require('./utils/Contenedor');

const port = 8080;
const chatTable = new db('chat');
const productsTable = new db('products');

// [
//   {
//     name: 'Cámara',
//     price: 199000,
//     image:
//       'https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Camera-512.png',
//   },
// ];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.set('views', './public/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index.ejs', { products: [], title: 'Productos' });
});

io.on('connection', (channel) => {
  emitChat();
  emitProduct();
  channel.on('incomingMessage', async (message) => {
    console.log(message);
    await chatTable.insert([message]);
    await emitChat();
  });
  channel.on('addProduct', async (product) => {
    console.log(product);
    await productsTable.insert([product]);
    await emitProduct();
  });
});

const emitChat = async () => {
  const chat = await chatTable.getAll();
  console.log(chat);
  io.sockets.emit('chat', chat);
};
const emitProduct = async () => {
  const products = await chatTable.getAll();
  console.log(products);
  io.sockets.emit('products-inner', products);
};

server.listen(port, () => {
  console.log(`Escuchando el puerto http://localhost:${port}`);
});
