const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id: id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json("Error getting users"));
  // res.json({ id: profile.id, name: profile.name, email: profile.email });
};

module.exports = {
  handleProfileGet: handleProfileGet,
};
