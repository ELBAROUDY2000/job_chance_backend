const jwt = require('jsonwebtoken');
const requireAuth = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(404).json({errors: [{msg: 'NO Token ,authorization denied '}]});
    }
    try {
        const user = await jwt.verify(token, "secret secret");
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({errors: [{msg: 'Token is not valied'}]});
    }
};


module.exports = {
    requireAuth
};

