const nodeCCAvenue = require('../lib');

const ccav = new nodeCCAvenue.Configure({
  working_key: 'workingkeygoeshere',
  merchant_id: '123434'
});

// Refer https://dashboard.ccavenue.com/resources/integrationKit.do#response_parameters_doc for list of order parameters you can use here
const orderParams = {
  order_id: 8765432,
  currency: 'INR',
  amount: '100',
  billing_name: 'Name of the customer',
  // etc etc
};

const encryptedOrder = ccav.getEncryptedOrder(orderParams);
console.log(encryptedOrder);
