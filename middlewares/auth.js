const jwt = require("jsonwebtoken");

const verifyUserToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token)
    return res
      .status(401)
      .json({
        status: "error",
        message: "Access Denied / Unauthorized request",
      });

  try {
    token = token.split(" ")[1]; // Remove Bearer from string

    if (token === "null" || !token)
      return res
        .status(401)
        .json({
          status: "error",
          message: "Access Denied / Unauthorized request",
        });

    let verifiedUser = jwt.verify(token, process.env.SECRET_TOKEN);
    if (!verifiedUser)
      return res
        .status(401)
        .json({
          status: "error",
          message: "Access Denied / Unauthorized request",
        });

    req.user = verifiedUser;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = {
  verifyUserToken,
};
