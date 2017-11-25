const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

let clientPath = path.join(__dirname, '/../client');
let port = process.env.PORT || 3000;
let app = express();

app.use(bodyParser.json());

app.use(express.static(clientPath));

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});