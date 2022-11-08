const Maker = require("../models/MakerModel");

const makes = [
  { name: "Honda" },
  { name: "Suzuki" },
  { name: "Changan" },
  { name: "Toyota" },
];

const getStaticMakes = (req, res) => {
  return res.send(makes);
};

const getAllMakers = async (req, res) => {
  try {
    const data = await Maker.find();

    return res.send(data);
  } catch {
    return res.sendStatus(500);
  }
};

const addMaker = async (req, res) => {
  try {
    const maker = new Maker(req.body);

    await maker.save();

    return res.sendStatus(201);
  } catch {
    return res.sendStatus(500);
  }
};

const updateMaker = async (req, res) => {
  try {
    const { id, body } = req.body;

    await Maker.findByIdAndUpdate(id, body);

    return res.sendStatus(204);
  } catch {
    return res.sendStatus(500);
  }
};

const deleteMaker = async (req, res) => {
  try {
    const { id } = req.body;

    await Maker.findByIdAndDelete(id);

    return res.sendStatus(204);
  } catch {
    return res.sendStatus(500);
  }
};

module.exports = {
  getAllMakers,
  addMaker,
  updateMaker,
  deleteMaker,
  getStaticMakes,
};
