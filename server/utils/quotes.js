const quotes = require('./quotes.json');

const getRandomOne = () => {
    const totalAmount = quotes.length;
    const rand = Math.ceil(Math.random() * totalAmount);
    return quotes[rand];
};

module.exports = getRandomOne;
