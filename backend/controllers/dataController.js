const DataFlow = require('../models/DataFlow');

// GET /api/data
exports.getData = async (req, res) => {
  try {
    const data = await DataFlow.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
};

// POST /api/data
exports.createData = async (req, res) => {
  try {
    const newData = new DataFlow(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ error: 'Error creating data' });
  }
};
