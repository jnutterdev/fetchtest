const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = router;

router.get('/', function (req, res) {
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get('https://jsonplaceholder.typicode.com/posts');
            res.render('../views/index', {data: resp.data[0].title});
        } catch (err) {
            res.status(404).send('Not found');
        }
    };
    sendGetRequest();
    })