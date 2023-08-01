const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  clientId: '{yourClientId}'
});

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // If there's no token, return 401 status (Unauthorized)
  }

  try {
    const jwt = await oktaJwtVerifier.verifyAccessToken(token, 'api://default');
    req.user = jwt.claims;
    next();
  } catch (err) {
    return res.sendStatus(403); // If the token can't be verified, return 403 status (Forbidden)
  }
}

module.exports = authenticateToken;
