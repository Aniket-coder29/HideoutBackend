const { getAuth } = require('firebase-admin')

getAuth()
    .verifyIdToken(idToken)
    .then((decodedToken)=>{
        const uid = decodedToken.uid;
    })
    .catch((error)=>{
        console.log(error);
    })