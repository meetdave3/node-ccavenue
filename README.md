# Node CCAvenue

Node Module for integrating CCAvenue Payment gateway in Node.js

## Prerequisite

Before using this module, please make sure you have your **merchant_id** and **working_key** for test and production environment from CCAVenue payment gateway.

## Installation
```console
$ npm install node-ccavenue --save
```
or 
```console
$ yarn add node-ccavenue
```

## Initialization

Make sure your test / production merchantId and workingKey are stored as environment variables (best practice)

```javascript
const nodeCCAvenue = require('node-ccavenue');
const ccav = new nodeCCAvenue({
  merchant_id: process.env.test_merchant_id || process.env.prod_merchant_id,
  working_key: process.env.test_working_key || process.env.prod_working_key,
});
```

## Usage

You are free to use the encryption and decryption methods from the package. Which are exported as is. 

### Encryption

```javascript
const encryptedData = ccav.encrypt('Just plain text to encrypt or uri encoded order information');
console.log(encryptedData); // Proceed further
```

### Decryption

```javascript
const decryptedData = ccav.decrypt(encryptedData);
console.log(decryptedData); // Proceed further
```

### Creating encrypted text for generating an order 

No need to use the **encrypt** function in this case.

```javascript
const orderParams = {
  order_id: 8765432,
  currency: 'INR',
  amount: '100',
  redirect_url: encodeURIComponent(`http://localhost:3000/api/redirect_url/`)
  billing_name: 'Name of the customer',
  // etc etc
};

const encryptedOrderData = ccav.getEncryptedOrder(orderParams);
console.log(encryptedOrderData); // Proceed further
```

### Decrypting the response from CCAvenue to a JSON output

```javascript
// Considering this is your redirect_url
router.post('/api/redirect_url', (req, res) => {
  const { encResp } = req.body;
  const decryptedJsonResponse = ccav.redirectResponseToJson(encResp);
  // To check order_status: - 
  console.log(decryptedJsonResponse.order_status);
});

```

## Contributing 

Feel free to open issues if you find any, or simply fork and create a pull request
