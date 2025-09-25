import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token gerekli" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Geçersiz token" });
    req.user = user;
    next();
  });
}

export function authenticateAdmin(req, res, next) {
  authenticate(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin yetkisi gerekli" });
    }
    next();
  });
}
