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

Make sure your test / production workingKey and merchantId are stored as environment variables (best practice)

```javascript
const nodeCCAvenue = require('node-ccavenue');
const ccav = new nodeCCAvenue.Configure({
  merchant_id: process.env.merchant_id,
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
  redirect_url: encodeURIComponent(`http://localhost:3000/api/redirect_url/`),
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
#### Sample JSON Response from CCAvenue

This is the json response output after passing the encrypted request to *redirectResponseToJson(encResp)*

```json

{
    "order_id": "9840661",
    "tracking_id": "308005007091",
    "bank_ref_no": "1555842850653",
    "order_status": "Success",
    "failure_message": "",
    "payment_mode": "Net Banking",
    "card_name": "AvenuesTest",
    "status_code": "null",
    "status_message": "Y",
    "currency": "INR",
    "amount": "1000.00",
    "billing_name": "OPTIONAL",
    "billing_address": "OPTIONAL",
    "billing_city": "OPTIONAL",
    "billing_state": "OPTIONAL",
    "billing_zip": "OPTIONAL",
    "billing_country": "India",
    "billing_tel": "99999999999",
    "billing_email": "firstname.lastname@customer.com",
    "delivery_name": "OPTIONAL",
    "delivery_address": "OPTIONAL",
    "delivery_city": "OPTIONAL",
    "delivery_state": "OPTIONAL",
    "delivery_zip": "OPTIONAL",
    "delivery_country": "India",
    "delivery_tel": "99999999999",
    "merchant_param1": "",
    "merchant_param2": "",
    "merchant_param3": "",
    "merchant_param4": "",
    "merchant_param5": "",
    "vault": "N",
    "offer_type": "null",
    "offer_code": "null",
    "discount_value": "0.0",
    "mer_amount": "1200.00",
    "eci_value": "null",
    "retry": "N",
    "response_code": "0",
    "billing_notes": "",
    "trans_date": "21/04/2019 16:04:38",
    "bin_country": ""
}

```

## Contributing 

Feel free to open issues if you find any, or simply fork and create a pull request
