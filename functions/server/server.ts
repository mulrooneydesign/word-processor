import express from 'express';

const server = express();

const PORT = 4000;

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
