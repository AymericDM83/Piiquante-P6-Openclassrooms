// // Importation package JSONWEBTOKEN
const jwt = require('jsonwebtoken');

// Exportation module de vérification du token
module.exports = (req,res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'UkFORE9NX1RPS0VOX1NFQ1JFVA==');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error });
    }
};