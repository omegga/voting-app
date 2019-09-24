const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, '../build')))

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('listening on port ' + PORT));
