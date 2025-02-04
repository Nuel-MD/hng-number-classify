const axios = require('axios');

function isPrime(number) {
    if (number <= 1) return false;
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false;
    }
    return true;
}

function isPerfect(number) {
    if (number <= 0) return false;  // Fix: 0 should not be classified as perfect
    let sum = 0;
    for (let i = 1; i < number; i++) {
        if (number % i === 0) sum += i;
    }
    return sum === number;
}

function digitSum(number) {
    return Math.abs(number)  // Fix: Handle negative numbers by taking the absolute value
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);
}

function isArmstrong(number) {
    const digits = number.toString().split('');
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), digits.length), 0);
    return sum === number;
}

module.exports = async (req, res) => {
    const { number } = req.query;

    // Ensure the input is valid (non-negative integers only)
    if (!number || isNaN(number) || number < 0) {
        return res.status(400).json({ error: 'Invalid number', number: number });
    }

    const num = parseInt(number);

    // Fun fact: Fetch from Numbers API
    let funFact = '';
    try {
        const response = await axios.get(`http://numbersapi.com/${num}?json`);
        funFact = response.data.text;
    } catch (error) {
        funFact = 'No fun fact available for this number.';
    }

    // Classify the number
    const properties = [];
    if (isArmstrong(num)) properties.push('armstrong');
    if (num % 2 === 0) properties.push('even');
    else properties.push('odd');

    // Prepare the response
    const result = {
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfect(num),
        properties: properties,  // Fixed to include only valid properties
        digit_sum: digitSum(num),
        fun_fact: funFact
    };

    return res.status(200).json(result);
};
