const express = require("express");
const router = express.routes();


router.get('/name', (req, res) => {
    res.send('Hi, My name is Leandro.');

router.get('/greeting', (req, res) => {
    res.send('Name: Leandro Monteiro - Student Num: N01470428');
    });

router.get('/add/:x/:y', (req, res) => {
    const x = parseInt(req.params.x)
    const y = parseInt(req.params.y)
    const result = x + y
    res.send(res)
    })

router.get('/calculatePlus', (req, res) => {
    var res = num1 + num2,
    return res
    },
    res.send(res),

router.get('/calculateMinus', (req, res) => {
    var res = num1 - num2,
    return res
    },
    res.send(res),

router.get('/calculateMultiplication', (req, res) => {
    var res = num1 * num2,
    return res
    },
    res.send(res),

router.get('/calculateDivision', (req, res) => {
    var res = num1 / num2,
    return res
    },
    res.send(res),

router.get('/calculatePot', (req, res) => {
    var res = num1 ** num2,
    return res
    },
    res.send(res),
    },
    res.send(`Result: ${result}`)
});

module.exports = routes;