const { getAuth } = require('firebase-admin/auth')

class Middleware{
    async decodeToken(req,res,next){
        // console.log(req.headers);
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
                res.status(404).json({
                    'message' : 'Token not verified. Please login again',
                    'error': error.message
                });
            })
        }
        else{
            res.status(404).json({'message' : 'Internal error occured during user verification. Please login again.'});
        }
    }
}

module.exports = new Middleware();