const Camp = require('../models/Camp');

exports.scheduleCamp = async (req, res) => {
  try {
    const newCamp = new Camp(req.body);
    await newCamp.save();
    res.status(201).json({ message: 'Camp scheduled successfully' , camp: newCamp});
  } catch (error) {
    res.status(500).json({ message: 'Failed to schedule camp' });
  }
};
