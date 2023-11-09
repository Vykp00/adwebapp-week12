const express = require("express");
const os = require("os");
const app = express();
const port = 3000;
const path = require("path")
const helloMessage = {
    msg: "Hello world",
};

const id = {
    dog: "dog",
    cat: "cat",

};

app.use(express.json()); // Middleware to parse JSON in the request body
// Serve static files from "public" directory in "/" path prefix
app.use(express.static(path.join(__dirname, "public")));

app.get("/echo/:id", (req, res) => {
    const result = req.params.id;
    res.json({id: result});
});

app.get("/hello", (req, res) => {
    res.json(helloMessage);
});

//This route takes an array of numbers from the "numbers" property of the request body, 
// and sums them and sends them back to the client.

app.post("/sum", (req, res) =>{
    // { numbers } is a destructuring assignment syntax. It's equivalent to const numbers = req.body.numbers;.
    //It extracts the numbers property from the req.body object and assigns it to the variable numbers.
    
    const { numbers } = req.body;
    // Check input is an array
    if (!numbers || !Array.isArray(numbers)) {
        return res.status(400).json({ error : 'Invalid input. Please provide an array of numbers in the "numbers" property of the request body.'});
    }

    //See JavaScript Array Reduce(): Explained With Syntax and Examples
    const sum = numbers.reduce((acc, num) => acc + num, 0);

    // {sum} = {sum : numbers}
    res.json({sum});
});

// List to store submitted text
const textList = [];

//Handle text input 
app.post("/list", (req, res) =>{
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Invalid input. Please provide a string in the "text" property of the request body.'})
    }

    textList.push(text);

    res.json({ list: textList });
});
// Start the server and catch error
app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`Example server listening to port ${port}`);
});