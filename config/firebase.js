const { credential } = require('firebase-admin');
const { initializeApp } = require('firebase-admin/app');
const serviceAccount = {
  "type": process.env.FIREBASE_PROJECT_TYPE,
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PROJECT_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PROJECT_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_PROJECT_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_PROJECT_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_PROJECT_AUTH_URI,
  "token_uri": process.env.FIREBASE_PROJECT_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_PROJECT_AUTH_PROVIDER_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_PROJECT_CLIENT_CERT_URL
}

const app = initializeApp({
  credential: credential.cert(serviceAccount)
});

module.exports = app;