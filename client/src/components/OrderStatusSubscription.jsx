import React, { useEffect, useState } from 'react';
import { gql, useSubscription, useQuery, useMutation } from '@apollo/client';

const ORDERS_QUERY = gql`
  query {
    orders {
      id
      status
    }
  }
`;

const ORDER_STATUS_UPDATED = gql`
  subscription {
    orderStatusUpdated {
      id
      status
    }
  }
`;

const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: ID!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

export default function OrderStatusSubscription() {
  const { data, loading } = useQuery(ORDERS_QUERY);
  const { data: subData } = useSubscription(ORDER_STATUS_UPDATED);
  const [orders, setOrders] = useState([]);
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS);

  useEffect(() => {
    if (data && data.orders) setOrders(data.orders);
  }, [data]);

  useEffect(() => {
    if (subData && subData.orderStatusUpdated) {
      setOrders(prev =>
        prev.map(order =>
          order.id === subData.orderStatusUpdated.id
            ? { ...order, status: subData.orderStatusUpdated.status }
            : order
        )
      );
    }
  }, [subData]);

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h2>Order Status (Real-Time)</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order #{order.id}: <b>{order.status}</b>
            <button
              onClick={() =>
                updateOrderStatus({ variables: { id: order.id, status: 'Shipped' } })
              }
              style={{ marginLeft: 10 }}
            >
              Mark as Shipped
            </button>
            <button
              onClick={() =>
                updateOrderStatus({ variables: { id: order.id, status: 'Delivered' } })
              }
              style={{ marginLeft: 10 }}
            >
              Mark as Delivered
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 