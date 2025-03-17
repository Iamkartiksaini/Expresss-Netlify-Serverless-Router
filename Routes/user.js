const express = require("express");
const router = express.Router();

router.get("/okk", async (req, res) => {
  try {
    res.send("Test");
  } catch (error) {
    res.status(500).json({ data: error.message, success: false });
  }
});

router.get("/hi", async (req, res) => {
  try {
    res.send("Hiii");
  } catch (error) {
    res.status(500).json({ data: error.message, success: false });
  }
});

module.exports = router;
