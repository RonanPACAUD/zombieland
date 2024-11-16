const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;
const authMiddleware = {
    createToken (id, role) {
        try{
        const payload = {id, role};
        const options = {expiresIn: 60 * 60 * 4};
        const token = jwt.sign(payload, secret, options);
        return token;
        }catch (error){
        res.status(500).send(`Une erreur est survénue avec la base de données :
        ${error.message}`);
        }
    },

    checkToken(req, res, next){
        try{
        if(!req.headers.authorization){
            return res.status(401).json({message:"Connexion Nécessaire"});
        }
        const token = req.headers.authorization;
        jwt.verify(token, secret, (error, decoded)=> {
            if(error) return res.status(401).json({message:'Token Non Valide'});
            req.user = decoded;
            next();
        })
        }catch (error){
        res.status(500).send(`Une erreur est survénue avec la base de données :
        ${error.message}`);
        }
    },
    
    checkRole(req, res, next){
        console.log("hello")
        const {role} = req.user;
        return role === "admin" ? next() : res.status(401).json({message:'Connexion Admin Nécessaire'});
    }
}

module.exports = authMiddleware;