const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todoRoutes');
const connectDatabase = require('./db/connect');

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/todo', todoRouter);

const start = async () => {
  try {
    await connectDatabase(process.env.MANGO_URI);
    app.listen(5000, () => {
      console.log('server is running');
    });
  } catch (error) {
    console.log(error);
  }
};

start();

// connectDatabase(process.env.MANGO_URI)
//   .then(() => {
//     console.log('connected to db');
//   })
//   .catch((err) => console.log(err));

// app.listen(5173, () => {
//   console.log('server is running');
// });

