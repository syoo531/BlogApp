import jwt from "jsonwebtoken";

//authentication > [Decoded: 1.header 2.payload 3.verify signature]
const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization; //req.headers can get all headers

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  //verify method returns payload after verifying
  //decoded method returns the payload without verifying token's signature
  //! jwt.verify is async > You can remove the callback and use try...catch instead
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "invalid token" });
    req.user = decoded;
    next();
  });
};

export default verifyJWT;

/*
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Access Denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send('Invalid Token.');
  }
};
*/
