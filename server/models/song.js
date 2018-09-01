/**
 * Song Model module.
 * @module models/song
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Models = require('./index.js');
const TagModel = require('./tag.js');
const Fawn = require('fawn');
const path = require('path');

const tagSchema = new Schema({
  image: String,
  name: String,
});

const slugify = text =>
  text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
;

const songSchema = new Schema({
  number: Number,
  title: String,
  date: Date,
  length: Number,
  inkey: { type: Schema.Types.ObjectId, ref: 'Inkey' },
  tempo: Number,
  topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
  location: { type: Schema.Types.ObjectId, ref: 'Location' },
  instruments: [{ type: Schema.Types.ObjectId, ref: 'Instrument' }],
  beard: { type: Schema.Types.ObjectId, ref: 'Beard' },
  videoid: String,
  description: String,
  acousticproduced: String,
  firsts: String,
  comments: String,
  press: String,
  tagNames: [String],
  tags: [tagSchema],
  itunes: String,
  spotify: String,
  bandcamp: String,
  mainInstrument: { type: Schema.Types.ObjectId, ref: 'Instrument' },
  secondaryInstrument: { type: Schema.Types.ObjectId, ref: 'Instrument' },
  mood: { type: Schema.Types.ObjectId, ref: 'Mood' },
}, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

songSchema.virtual('year').get(function () {
  return this.date.getFullYear();
});

songSchema.virtual('slug').get(function () {
  return `${this.date.getTime() / 1000}-${slugify(this.title)}`;
});

songSchema.virtual('imagePathSmall').get(function () {
  return path.join(this.year.toString(), `${this.slug}-small.png`);
});

songSchema.virtual('imagePath').get(function () {
  return path.join(this.year.toString(), `${this.slug}.png`);
});

const Song = mongoose.model('Song', songSchema);

const getLength = (mins, secs) => {
  if (mins && secs) {
    return Number.parseInt(mins) * 60 + Number.parseInt(secs);
  } else if (mins) {
    return Number.parseInt(mins) * 60;
  } else if (secs) {
    return Number.parseInt(secs);
  }
  return undefined;
};

const cleanObj = (obj) => {
  obj = obj.toObject();
  for (const key in obj) {
    if (obj[key] === undefined || obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
};

/**
* Get a song by the given song number.
* @param {number} number - The song number.
* @return {object} The song object populated with object names and images from these collections:
* instruments, beard, topic, song key, location, mood, and main instrument (depicted in generated art)
*/
module.exports.getSongByNumber = number => new Promise((resolve, reject) => {
  Song.find({ number })
    .populate('instruments')
    .populate('beard')
    .populate('topic')
    .populate('inkey')
    .populate('location')
    .populate('mood')
    .populate('mainInstrument')
    .populate('secondaryInstrument')
    .then((results) => {
      const song = results[0];
      resolve(song);
    });
});
/**
* Get a song by the given song number along with all possible tag options for selectable categories. This
* method returns the same song info as the getSongByNumber method.
* @param {number} number - The song number.
* @return {object} An object with arrays for each taggable category used to populate dropdown selectors.
* @see module:models/song.getSongByNumber
*/
module.exports.getSongByNumberWithAllPossibleTags = number => new Promise((resolve, reject) => {
  Song.find({ number })
    .populate('instruments')
    .populate('beard')
    .populate('topic')
    .populate('inkey')
    .populate('location')
    .populate('mood')
    .populate('mainInstrument')
    .populate('secondaryInstrument')
    .then((song) => {
      song = cleanObj(song[0]);
      (async function getAllTags() {
        const instrument = await Models.Instrument.find();
        const beard = await Models.Beard.find();
        const location = await Models.Location.find();
        const topic = await Models.Topic.find();
        const inkey = await Models.Inkey.find();
        const tag = await Models.Tag.find().select('_id name image');
        const mood = await Models.Mood.find();
        resolve({
          instrument, beard, location, topic, inkey, song, mood, tag,
        });
      }());
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
    });
});

const assignIDsToTags = (data) => {
  const songData = Object.assign({}, data);
  const TAGS = ['beard', 'location', 'topic', 'inkey', 'mood'];
  TAGS.forEach((tag) => {
    if (typeof songData[tag] === 'object' && songData[tag]._id) {
      songData[tag] = songData[tag]._id;
    }
  });
  return songData;
};

const deleteTagsForSong = (forSongId, task) => new Promise((resolve, reject) => {
  task.update('Song', { number: forSongId }, { tags: [] });
  resolve(task);
});


/**
* A promise that updates a song based on the updated data sent from the client.
* On success, this promise resolves the updated song object.
* @param {object} songData - JSON data representing an updated song with modified fields.
* @return {promise} A promise that, on success, resolves with an updated song object.
*/
module.exports.updateSong = (songData) => {
  const task = new Fawn.Task();
  return new Promise((resolve, reject) => {
    songData = assignIDsToTags(songData);

    if (songData.instruments.length > 0) {
      songData.instruments = songData.instruments.map((instrument, index) => {
        const num = instrument._id.toString();
        if (!num.match(/^[0-9a-fA-F]{24}$/)) {
          const newInstrument = new Models.Instrument({ name: instrument.name });
          return newInstrument.save((err, savedInstrument) => {
            if (index === 0) {
              songData.mainInstrument = savedInstrument._id;
            }
            if (index === 1) {
              songData.secondaryInstrument = savedInstrument._id;
            }
            return savedInstrument._id;
            // if (doc) {
            //   console.log(doc)
            //   return null;
            // } else {
            //   return saved._id
            // }
          });
        }
        if (index === 0) {
          console.log(instrument, index);
          songData.mainInstrument = instrument._id;
        }
        if (index === 1) {
          console.log(instrument, index);
          songData.secondaryInstrument = instrument._id;
        }
        return instrument._id;
      });
    }
    if (!songData.instruments[0]) {
      songData.mainInstrument = undefined;
    }
    if (!songData.instruments[1]) {
      songData.secondaryInstrument = undefined;
    }
    deleteTagsForSong(Number.parseInt(songData.number, 10), task)
      .then((task) => {
        if (songData.tags.length) {
          TagModel.addOrInsertTags(songData.tags, Number.parseInt(songData.number, 10), task)
            .then((task) => {
              delete songData.tags;
              songData.length = getLength(songData.mins, songData.secs);
              task.update('Song', { _id: songData._id }, songData);
              task.run({ useMongoose: true })
                .then((success) => {
                  console.log('saved?');
                  Song.findById(songData._id)
                    .then((song) => {
                      console.log(song.title);
                      resolve(song);
                    });
                })
                .catch((err) => {
                  console.log('oh snamp:', err);
                });
            });
        } else {
          songData.length = getLength(songData.mins, songData.secs);
          task.update('Song', { _id: songData._id }, songData);
          task.run({ useMongoose: true });
        }
      });
  });
};

/**
* A promise that inserts a new song into the database based on the data sent from the client.
* On success, this promise resolves the updated song object
* @param {object} songData - JSON data representing an updated song with modified fields.
* @return {promise} A promise that resolves with the newly inserted song object.
*/
module.exports.insertSong = (newSong) => {
  const task = new Fawn.Task();
  return new Promise((resolve, reject) => {
    newSong = assignIDsToTags(newSong);

    if (newSong.instruments.length > 0) {
      newSong.instruments = newSong.instruments.map((instrument, index) => {
        const num = instrument._id.toString();
        if (!num.match(/^[0-9a-fA-F]{24}$/)) {
          const newInstrument = new Models.Instrument({ name: instrument.name });
          return newInstrument.save((err, savedInstrument) => {
            console.log(savedInstrument.name);
            if (index === 0) {
              newSong.mainInstrument = savedInstrument._id;
            }
            if (index === 1) {
              newSong.secondaryInstrument = savedInstrument._id;
            }
            return savedInstrument._id;
            // if (doc) {
            //   console.log(doc)
            //   return null;
            // } else {
            //   return saved._id
            // }
          });
        }
        if (index === 0) {
          newSong.mainInstrument = instrument._id;
        }
        if (index === 1) {
          newSong.secondaryInstrument = instrument._id;
        }
        return instrument._id;
      });
    }


    // newSong.instruments = newSong.instruments.map(instrument => {
    //   return instrument._id;
    // })

    newSong.length = getLength(newSong.mins, newSong.secs);
    const tagArray = Object.assign([], newSong.tags);
    delete newSong.tags;

    const song = new Song(newSong);
    song.save((err, savedSong) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }

      if (tagArray.length) {
        TagModel.addOrInsertTags(tagArray, Number.parseInt(savedSong.number, 10), task)
          .then((task) => {
          // task.update("Song", {_id: songData._id}, songData);
            task.run({ useMongoose: true })
              .then((success) => {
                console.log('saved');
                Song.findById(savedSong._id)
                  .then((song) => {
                    console.log(song.title);
                    resolve(song);
                  });
              })
              .catch((err) => {
                console.log('oh snap:', err);
                reject(err);
              });
          });
      } else {
        songData.length = getLength(songData.mins, songData.secs);
        task.update('Song', { _id: songData._id }, songData);
        task.run({ useMongoose: true });
      }
      console.log('it saved');
      resolve('OK');
    });
  });
};

/**
* A promise that updates a tag subdocument on a song based on updated tag data. This
* method is used when updating a tag's name or image file information as the song stores
* a copy of its associated tags in a subdocument array.
* On success, This promise resolves the updated song object.
* @param {object} newTagData - JSON data representing a tag name  updated song with modified fields.
* @param {object} task - A Fawn task which ensures synchronicity in updating both the tag and and song documents simultaneously.
* @return {promise} A promise that resolves with the updated task object which is 'run' when all update tasks have been registered for all songs and tags being updated.
* {@link module:models/tag.insertTag}
*/
module.exports.updateTagsOnSongs = (newTagData, task) => new Promise((resolve, reject) => {
  task.update('Song', { 'tags._id': newTagData._id }, { $set: { 'tags.$.name': newTagData.name, 'tags.$.image': newTagData.image } });
  resolve(task);
});


/**
* This method removes all tags from the song that match the array of tag ids (as strings) provided.
* @param {array} tagArray - an array of tag ids (strings).
* @return {promise} A promise that resolves when all tags in the array have been removed from the song.
*/
module.exports.removeTagsFromSongs = tagArray => new Promise((resolve, reject) => {
  (function recurse(array) {
    console.log('recursing');
    if (!array.length) {
      resolve();
    } else {
      const tag = array.shift();
      Song.find({ 'tags._id': tag })
        .then((results) => {
          results.forEach((song) => {
            song.tags.pull(tag);
            song.save();
          });
          recurse(array);
        });
    }
  }(tagArray.slice()));
});

/**
* This method returns all songs matching an array of tags.
* @param {array} tagArray - an array of tag names (strings).
* @return {promise} A promise that resolves when all songs are returned in a renderable song array.
*/
module.exports.getSongsByTagNames = tags => new Promise((resolve, reject) => {
  Song.find({ tagNames: { $in: tags } })
    .then((results) => {
      resolve(results);
    });
});

/**
* This method returns all songs matching an array of song numbers.
* @param {array} numbers - an array of numbers.
* @return {promise} A promise that resolves when all songs are returned in a renderable song array.
*/
module.exports.getSongsByNumbers = numbers => new Promise((resolve, reject) => {
  Song.find({ number: { $in: numbers } })
    .then((results) => {
      resolve(results);
    });
});

/**
* This method returns all songs matching a topic id.
* @param {topic} topic - the id of one of the song topics/
* @return {promise} A promise that resolves when all songs are returned in a renderable song array.
*/
module.exports.getSongsByTopicId = topic => new Promise((resolve, reject) => {
  Song.find({})
    .then((results) => {
      let songs = results.filter(song=>{
        return song.topic.toString()===topic.toString();
      })
      resolve(songs);
  });
});

/**
* This method returns the total number of songs in the database.
* @return {promise} A promise that resolves with the total number of songs in the database.
*/
module.exports.totalSongs = () => new Promise((resolve, reject) => {
  Song.count({}, (err, number) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(number);
  });
});

/**
* This method returns all the titles of songs in the database.
* @return {promise} A promise that resolves all titles plus id and songnumber.
*/
module.exports.getTitles = () => new Promise((resolve, reject) => {
  Song.find({})
    .select('title _id number')
    .then((results) => {
      let titles = results.map(song=>{
        return { name:`${song.number}: ${song.title.toString()}`, _id:song._id, number: song.number };
      });
      resolve(titles);
    });
});

module.exports.Song = Song;
module.exports.songSchema = songSchema;
