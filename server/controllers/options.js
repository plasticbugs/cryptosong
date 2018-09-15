const Models = require('../models');

module.exports.getAllOptions = async (req, res) => {
  const instrument = await Models.Instrument.find();
  const beard = await Models.Beard.find();
  const location = await Models.Location.find();
  const topic = await Models.Topic.find();
  const inkey = await Models.Inkey.find();
  const tag = await Models.Tag.find();
  const mood = await Models.Mood.find();
  res.send({
    instrument, beard, location, topic, inkey, tag, mood
  });
};
