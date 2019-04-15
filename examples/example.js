/* eslint-disable no-console */
const defaultAwesomeFunction = require('../lib').default;
const { awesomeFunction } = require('../lib');

const defaultVal = defaultAwesomeFunction('CCAvenue');
const val = awesomeFunction();

console.log(defaultVal);
console.log(val);
