module.exports = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(401).send();
  }
  next();
};
