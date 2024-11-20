const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ error: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Decodifique o ID do usuário ou qualquer dado presente no payload do token
        next();
    } catch (err) {
        return res.status(401).send({ error: 'Token inválido.' });
    }
};

module.exports = authMiddleware;
