// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';
import OrderStatusSubscription from './components/OrderStatusSubscription';
import './index.css'; // Import Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <OrderStatusSubscription />
  </ApolloProvider>
);
