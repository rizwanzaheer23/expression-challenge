const express = require("express");

const {
  getAllMakers,
  addMaker,
  updateMaker,
  deleteMaker,
  getStaticMakes,
} = require("../controllers/MakerController");

const router = express.Router();

router.get("/", getAllMakers);
router.get("/static", getStaticMakes);
router.post("/add", addMaker);
router.put("/update", updateMaker);
router.delete("/delete", deleteMaker);

module.exports = router;
