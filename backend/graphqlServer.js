import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';
import cors from 'cors';
import bodyParser from 'body-parser';

const pubsub = new PubSub();
const ORDER_UPDATED = 'ORDER_UPDATED';

// Mock data
let orders = [
  { id: '1', status: 'Processing' },
  { id: '2', status: 'Packed' },
];

// GraphQL schema
const typeDefs = `#graphql
  type Order {
    id: ID!
    status: String!
  }
  type Query {
    orders: [Order!]!
  }
  type Mutation {
    updateOrderStatus(id: ID!, status: String!): Order!
  }
  type Subscription {
    orderStatusUpdated: Order!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    orders: () => orders,
  },
  Mutation: {
    updateOrderStatus: (_, { id, status }) => {
      const order = orders.find(o => o.id === id);
      if (!order) throw new Error('Order not found');
      order.status = status;
      pubsub.publish(ORDER_UPDATED, { orderStatusUpdated: order });
      return order;
    },
  },
  Subscription: {
    orderStatusUpdated: {
      subscribe: () => pubsub.asyncIterator([ORDER_UPDATED]),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  schema,
});

async function startServer() {
  await server.start();
  
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server)
  );

  // Set up WebSocket server for subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  useServer({ schema }, wsServer);

  const PORT = process.env.PORT || 5000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
}); 