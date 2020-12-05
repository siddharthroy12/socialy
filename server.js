const path = require('path')
const express = require('express');
const { ApolloServer, PubSub } = require('apollo-server-express');
const mongoose = require('mongoose')
require('dotenv').config()

const typeDefs = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')

const pubsub = new PubSub()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
})


const app = express();
server.applyMiddleware({ app });

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
} else {
    app.get('/' , (req, res) => {
        res.send('GraphQL Api is at /graphql not here')
    })
}

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database Connected!')
        app.listen({ port: PORT}, () =>
            console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
        );
    })

