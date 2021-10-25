const express = require('express');
const app = express();
const route = require('./routes');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

route(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}!`);
});
