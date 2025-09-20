export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log("req.user in authorizeRoles:", req.user);
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: insufficient permissions" });
    }

    next();
  };
};
