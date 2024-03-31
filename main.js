// import dependencies modules
const { error } = require('console');
const express = require('express');
const app = express();

const PORT = 3000;

const path = require('path');

// create function for get path
const CreatePath = (page) => path.resolve(__dirname, `${page}.html`)

// listen server and check error
app.listen(PORT, (error) => {
    error ? console.log(error): console.log(`listening port ${PORT}`)
});

// get for server access to folders
app.use('/css', express.static(__dirname + '/css'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/pages', express.static(__dirname + '/pages'));
app.use('/scripts', express.static(__dirname + '/scripts'));

// back html file to browser
app.get('/', (req, res) => {
    console.log("Server request");
    res.sendFile(CreatePath('index'));
});

app.get('/index.html', (req, res) => {
    console.log("Server request");
    res.sendFile(CreatePath('index'));
});

app.get('/cart', (req, res) => {
    console.log("Server request");
    res.sendFile(CreatePath('pages/cart'));
});

app.use((req, res) => {
    res.statusCode = 404;

    res.sendFile(CreatePath('pages/error'));
})
