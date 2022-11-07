const express = require("express");

const {
  getAllMakers,
  addMaker,
  updateMaker,
  deleteMaker,
} = require("../controllers/MakerController");

const router = express.Router();

router.get("/", getAllMakers);
router.post("/add", addMaker);
router.put("/update", updateMaker);
router.delete("/delete", deleteMaker);

module.exports = router;
