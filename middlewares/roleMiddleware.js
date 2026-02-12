const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    try {
      //validate user
      if (!req.user) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized: User not authenticated",
        });
      }
      const { userRole } = req.user;
      //Check if role exists in token
      if (!userRole) {
        return res.status(400).send({
          success: false,
          message: "User role not found in token",
        });
      }
      //Check if role is allowed
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).send({
          success: false,
          message: `Access denied. Required role: ${allowedRoles.join(",")}`,
        });
      }
      //if all good
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error in Role authorization",
      });
    }
  };
};
module.exports = { authorizeRoles };
