require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// connect to db
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const port = 40000;

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
