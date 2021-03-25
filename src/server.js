const express = require('express');
const app = express();
const routes = require('./routes');

require('./database/connection');

app.use(express.json());
app.use(routes);

app.listen(3001, () => console.log('Executando na porta 3001'));