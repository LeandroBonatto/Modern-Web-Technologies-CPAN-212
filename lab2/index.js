const express = require('express');
const routes = require('./routes');
const app = express();

app.use('/', routes);

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
}); 

module.exports = routes