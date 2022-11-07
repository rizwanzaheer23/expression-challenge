const express = require("express");

const {
  getAllCars,
  addCar,
  updateCar,
  deleteCar,
} = require("../controllers/CarController");

const router = express.Router();

router.get("/", getAllCars);
router.post("/add", addCar);
router.put("/update", updateCar);
router.delete("/delete", deleteCar);

module.exports = router;
