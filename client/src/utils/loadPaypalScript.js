export const loadPaypalScript = (clientId) => {
  return new Promise((resolve) => {
    if (document.getElementById('paypal-sdk')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'paypal-sdk';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;
    script.onload = () => resolve(true);
    document.body.appendChild(script);
  });
}; 