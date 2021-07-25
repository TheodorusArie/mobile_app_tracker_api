const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send({ error: "YOU MUST BE LOGGED IN" });
    } else {
        const token = authorization.replace('Bearer ', "");
        jwt.verify(token, 'mysecretkey', async (err, payload) => {
            if (err) {
                return res.status(401).send({ error: "YOU MUST BE LOGGED IN" });
            }

            const { userId } = payload;
            const user = await User.findById(userId);
            req.user = user;
            next();
        });
    }
}