const axios = require('axios');

function isPrime(number) {
    if (number <= 1) return false;
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false;
    }
    return true;
}

function isPerfect(number) {
    let sum = 0;
    for (let i = 1; i < number; i++) {
        if (number % i === 0) sum += i;
    }
    return sum === number;
}

function digitSum(number) {
    return number.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}

function isArmstrong(number) {
    const digits = number.toString().split('');
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), digits.length), 0);
    return sum === number;
}

module.exports = async (req, res) => {
    const { number } = req.query;

    // Ensure the input is valid
    if (!number || isNaN(number)) {
        return res.status(400).json({ error: 'Invalid number' });
    }

    const num = parseInt(number);

    // Fun fact: Fetch from Numbers API
    let funFact = '';
    try {
        const response = await axios.get(`http://numbersapi.com/${num}?json`);
        funFact = response.data.text;
    } catch (error) {
        funFact = 'Could not fetch fun fact.';
    }

    // Classification and properties
    const properties = [];
    if (isArmstrong(num)) properties.push('armstrong');
    if (num % 2 !== 0) properties.push('odd');
    if (isPerfect(num)) properties.push('perfect');

    // Construct response
    const result = {
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfect(num),
        properties,
        digit_sum: digitSum(num),
        fun_fact: funFact
    };

    // CORS headers to ensure cross-origin requests are allowed
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json(result);
};
