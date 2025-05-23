import React, { useEffect } from "react";
import { loadPaypalScript } from "../utils/loadPaypalScript";

const PaypalButton = ({ amount = "49.99" }) => {
  useEffect(() => {
    const clientId = import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID || import.meta.env.REACT_APP_PAYPAL_CLIENT_ID;
    if (!clientId) return;
    loadPaypalScript(clientId).then(() => {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                { amount: { value: amount } },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              alert("Transaction completed by " + details.payer.name.given_name);
              console.log(details);
            });
          },
        }).render("#paypal-button-container");
      }
    });
  }, [amount]);

  return <div id="paypal-button-container"></div>;
};

export default PaypalButton; 