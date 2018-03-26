const Models = require('../models/index');

module.exports.getAllOptions = async (req,res) => {
  let instrument = await Models.Instrument.find();
  let beard = await Models.Beard.find();
  let location = await Models.Location.find();
  let topic = await Models.Topic.find();
  let inkey = await Models.Inkey.find();
  res.send({instrument, beard, location, topic, inkey})
}