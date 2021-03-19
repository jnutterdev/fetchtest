const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const axios = require('axios');


app.get('/', function (req, res) {
const sendGetRequest = async () => {
    try {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/posts');
        res.send(resp.data[0].title);
    } catch (err) {
        res.status(404).send('Not found')
    }
};
sendGetRequest();
})


app.listen(PORT)
