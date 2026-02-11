const JWT = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    //token uthao header se
    const token = req.headers.authorization?.split(" ")[1];

    //token nhi mila
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token missing",
      });
    }
    //token mil gya toh verify kro
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized user",
        });
      } else {
        req.user = decoded;//jis user ne access liya hai uski id store kr rhe hai taaki baad me eske liye routes de ske jo esi user ke ho like-->eski profile,esko koi upsate krna ho, eska cart, etc...
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in auth API",
    });
  }
};
module.exports = { authMiddleware };
