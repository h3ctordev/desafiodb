const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const Chat = require('./model/chat');
const Products = require('./model/products');

const port = 8080;

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

app.get('/', async (req, res) => {
  try {
    const products = await Products.findAll({ raw: true });
    return res.render('pages/index.ejs', { products, title: 'Productos' });
  } catch (error) {
    console.error(error);
    throw error;
  }
});

io.on('connection', (channel) => {
  emitChat();
  emitProduct();
  try {
    channel.on('incomingMessage', async (message) => {
      await Chat.create({ ...message, timestamp: new Date() });
      await emitChat();
    });
    channel.on('addProduct', async (product) => {
      await Products.create({ ...product });
      await emitProduct();
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const emitChat = async () => {
  try {
    const chat = await Chat.findAll({ raw: true });
    io.sockets.emit('chat', chat);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const emitProduct = async () => {
  try {
    const products = await Products.findAll({
      raw: true,
    });
    io.sockets.emit('products-inner', products);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

server.listen(port, () => {
  console.log(`Escuchando el puerto http://localhost:${port}`);
});
