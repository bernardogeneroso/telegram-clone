const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).send('JWT token is missing')

  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const { user_id } = decoded

    req.user = { id: user_id }

    return next()
  } catch {
    res.status(401).send('Invalid JWT token')
  }
}

module.exports = authenticateToken