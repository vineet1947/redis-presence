const express = require('express');
const router = express.Router();

const { monitor } = require("@colyseus/monitor");
const { playground } = require("@colyseus/playground");

const { handleToken } = require('../services/acs.service')

router.get('/health', (req, res) => {
    res.status(200).json({ status: 'RUNNING' });
});

router.get('/playground', playground);

router.get('/monitor', monitor());

router.get('/getToken', async (req, res) => {
    let token = await handleToken();
    console.log(`ACS Token: ${token}`);
    res.status(200).json(token);
});

module.exports = router;

// This file is not in use right now, but has to be used later