const express = require("express");
const router = express.Router();
const usersData = require("../netlify/store/users.json");

router.get("/", async (req, res) => {
  return res.json({ data: usersData, message: "Users List" });
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const userDetails = usersData.find((user) => user.id == userId);
  res.cookie("netlify_functions", "with-expressjs", {
    expires: new Date(Date.now() + 300000),
    httpOnly: true,
  });
  return res.json(userDetails);
});

router.post("/", async (req, res) => {
  const body = req.body;
  return res.status(201).json({
    data: "User Added Successfully (Simulation)",
    payload: body,
  });
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  const userDetails = usersData.find((user) => user.id == userId);
  return res.json({
    data: userDetails,
    message: "User Deleted Successfully (Simulation)",
  });
});

module.exports = router;
