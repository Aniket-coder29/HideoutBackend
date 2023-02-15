const { getAuth } = require('firebase-admin/auth')



class Middleware{
    async decodeToken(req,res,next){
        console.log(req.headers);
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            getAuth()
            .verifyIdToken(token)
            .then((decodedToken)=>{
                res.locals.user=decodedToken;
                // const uid = decodedToken.uid;
                // console.log(decodedToken);
                return next();
            })
            .catch((error)=>{
                res.json({'message' : 'Token not verified. Please login again'});
            })
        }
        else{
            res.json({'message' : 'Internal error occured. Please Try again.'});
        }
    }
}

module.exports = new Middleware();