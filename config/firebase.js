const { credential } = require('firebase-admin');
const { initializeApp } = require('firebase-admin/app');
const serviceAccount = require("../octochat-48012-5ca6d4fab505.json");

const app = initializeApp({
    credential: credential.cert(serviceAccount)
});

module.exports = app;