function logger(value) {
    console.log(value)
}

function calculate(num1, num2) {
    let sum = num1 + num2
    logger(sum)
    return sum
}

function calculateWithCallback(num1, num2, callback) {
    let sum = num1 + num2
    callback(sum)
    return sum
}

/* 
calculate(5, 10)
calculateWithCallback(5, 10, logger)
calculateWithCallback(5, 10, function(sum){
    console.log(sum * 2)
})
*/

let fs = require("fs")
const { start } = require("repl")

/*
const myPromise = new Promise(function(resolve, reject){
    //Producing
    fs.readFile("hello.txt", "utf-8", function(err, data) {
        if(err){
            reject(err)
        } else {
            resolve(data)
        }
    })
        
})

.then(val => {
    console.log(val)
    return "string"
})
.then(value => {
    console.log(value)
    return 2
})
.then(val => {
    console.log(val)
    return 3
})
.then(val => {
    console.log(val)
    throw "Error Occured"
    return 4
})
.then(val => {
    console.log(val)
    return 5
})
.then(val => {
    console.log(val)
})
.catch(err => {
    console.log(err)
})

*/

const util = require("util")
let read = util.promisify(fs.readFile)

/*
read("hello.txt", "utf8")
.then(function(value){
    console.log(value)
})
.catch(function(err) {
    console.log(err)
})
*/

/*
Promise.all([
    read("hello.txt", "utf8"),
    read("hello2.txt", "utf8"),
    read("goodbye.txt", "utf8" )
])
.then((data) => {
    [data1, data2, data3] = data
    console.log(data1)
    console.log(data2)
    console.log(data3)
})
.catch(function(err) {
    console.log(err)
})
*/

function a() {
    return Promise.resolve("a")
}

async function b() {
    return "b"
}

// console.log(a())
// console.log(b())

var run = async() => {
    read("hello.txt")
    .then(function(data) {
        console.log(data.toString())
    })
    console.log("test")

    const data = await(read("goodbye.txt", "utf-8"))
    console.log(test2)
}

// run()

var run_all = async function() {
    Promise.all([
        read("hello.txt", "utf8"),
        read("hello2.txt", "utf8"),
        read("goodbye.txt", "utf8" )
    ])
    .then((data) => {
        [data1, data2, data3] = data
        console.log(data1)
        console.log(data2)
        console.log(data3)
    })
    .catch(function(err) {
        console.log(err)
    })

    const [data1, data2, data3] = await Promise.all ([
        read("hello.txt", "utf8"),
        read("hello2.txt", "utf8"),
        read("goodbye.txt", "utf8" )
    ])

    console.log(data1)
    console.log(data2)
    console.log(data3)
}

// run_all()

function* range(start, end){
    while (start < end){
    yield start
    start += 1
    }
}

for (var i of range(1, 1000)) {
    console.log(i)
}

