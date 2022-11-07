const Car = require("../models/CarModel");

const getAllCars = async (req, res) => {
  try {
    const data = await Car.find();

    return res.send(data);
  } catch {
    return res.sendStatus(500);
  }
};

const addCar = async (req, res) => {
  try {
    const car = new Car({ ...req.body, date: new Date().getTime() });

    await car.save();

    return res.sendStatus(201);
  } catch {
    return res.sendStatus(500);
  }
};

const updateCar = async (req, res) => {
  try {
    const { id, body } = req.body;

    await Car.findByIdAndUpdate(id, body);

    return res.sendStatus(204);
  } catch {
    return res.sendStatus(500);
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.body;

    await Car.findByIdAndDelete(id);

    return res.sendStatus(204);
  } catch {
    return res.sendStatus(500);
  }
};

module.exports = {
  getAllCars,
  addCar,
  updateCar,
  deleteCar,
};
