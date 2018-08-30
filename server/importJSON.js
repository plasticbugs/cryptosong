const ProgressBar = require('progress');
const fs = require('fs');

const mongoose = require('mongoose');
const db = require('../db-config');

const gatherFields = array => new Promise((resolve, reject) => {
  const uniques = {
    beards: {
      name: 'Beard',
      collection: [],
    },
    instruments: {
      name: 'Instrument',
      collection: [],
    },
    locations: {
      name: 'Location',
      collection: [],
    },
    topics: {
      name: 'Topic',
      collection: [],
    },
    keys: {
      name: 'Inkey',
      collection: [],
    },
    tags: {
      name: 'Tag',
      collection: [],
    },
    moods: {
      name: 'Mood',
      collection: [],
    },
  };

  array.forEach((song) => {
    if (song.instruments) {
      const instruments = song.instruments.toLowerCase().replace('\n', '').split(',').map(inst => inst.trim());
      uniques.instruments.collection = uniques.instruments.collection.concat(instruments);
    }

    if (song.mood) {
      uniques.moods.collection.push(song.mood);
    }

    if (song.beard) {
      uniques.beards.collection.push(song.beard);
    }

    if (song.location) {
      uniques.locations.collection.push(song.location);
    }

    if (song.topic) {
      uniques.topics.collection.push(song.topic);
    }
    if (song.inkey) {
      const upcase = song.inkey.charAt(0).toUpperCase().concat(song.inkey.slice(1));
      uniques.keys.collection.push(upcase);
    }
    if (song.tags) {
      const tags = song.tags.toLowerCase().replace('\n', '').split(',').map(tag => tag.trim());
      uniques.tags.collection = uniques.tags.collection.concat(tags);
    }
  });
  resolve(uniques);
});

const insertUniques = obj => new Promise((resolve, reject) => {
  const keyArray = Object.keys(obj).slice();
  const uniqueBar = new ProgressBar('  inserting uniques & writing out to filenames.txt [:bar] :percent', {
    complete: '=',
    incomplete: ' ',
    width: 40,
    total: keyArray.length,
  });


  const recurse = (array) => {
    if (array.length === 0) {
      resolve();
      return;
    }
    uniqueBar.tick(1);
    const key = array.shift();
    if (key.length) {
      const dict = {};
      // let counter = 0;

      const arr = obj[key].collection;
      const identifier = obj[key].name;
      const filenamesToSort = [];

      if (identifier.toLowerCase() !== 'tag') {
        fs.appendFileSync('filenames.txt', `\n\n${identifier}\n********************\n`, 'utf8');
      }

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].trim().length) {
          let thekey;
          if (identifier === 'Mood') {
            thekey = arr[i].replace(/^\n|\n$/g, '').trim().toLowerCase();
          } else {
            thekey = arr[i].replace(/^\n|\n$/g, '').trim();
          }

          if (!dict[thekey]) {
            const filename = `${identifier.toLowerCase()}_${arr[i].replace(/[_/!., ]/g, '').replace('#', '-sharp').replace(/^\n|\n$/g, '').trim()
              .toLowerCase()}.png`;
            dict[thekey] = filename;
            filenamesToSort.push(filename);
          }
        }
      }
      if (identifier.toLowerCase() !== 'tag') {
        filenamesToSort.sort();
        for (const filename of filenamesToSort) {
          fs.appendFileSync('filenames.txt', `${filename}\n`, 'utf8');
        }
      }

      const objArray = [];
      for (const key in dict) {
        objArray.push({
          name: key,
          image: dict[key],
        });
      }

      // / write out uniques to help with spellchecking...
      let sortedArray = objArray.slice();
      sortedArray = sortedArray.map(item => item.name);
      sortedArray.sort();
      for (const name of sortedArray) {
        fs.appendFileSync('unique-tags.txt', `${name}\n`, 'utf8');
      }

      const theModel = mongoose.model(identifier);
      theModel.insertMany(objArray, (err, docs) => {
        if (err) {
          reject(err);
        }
        recurse(array);
      });
    } else {
      recurse(array);
    }
  };
  recurse(keyArray);
});

const calcLength = (string) => {
  const arr = string.split(':');
  let secs = parseInt(arr[arr.length - 1]);
  const mins = parseInt(arr[0]);
  secs += mins * 60;
  return secs;
};

const insertTagsonSongsOnTags = () => {
  const Song = require('./models/song').Song;
  const Tag = require('./models/tag').Tag;

  return new Promise((resolve, reject) => {
    Song.find({})
      .then((songs) => {
        const len = songs.length;

        const bar = new ProgressBar('  doing tag insertion [:bar] :percent', {
          complete: '=',
          incomplete: ' ',
          width: 40,
          total: len,
        });

        const recurse = (array) => {
          if (!array.length) {
            resolve();
          } else {
            bar.tick(1);
            const song = array.shift();
            const recurseOnTags = (tagArray) => {
              if (!tagArray.length) {
                recurse(array);
              } else {
                const currentTag = tagArray.shift();
                Tag.find({ name: currentTag })
                  .then((tags) => {
                    const tag = tags[0];
                    tag.songs.push(song);
                    tag.save((err) => {
                      if (err) {
                        throw new Error(err);
                        reject();
                      } else {
                        song.tags.push(tag);
                        song.save((err) => {
                          if (err) {
                            throw new Error(err);
                          } else {
                            recurseOnTags(tagArray);
                          }
                        });
                      }
                    });
                  });
              }
            };
            recurseOnTags(song.tagNames.slice());
          }
        };
        recurse(songs);
      });
  });
};

async function insertSongs(array) {
  const Song = require('./models/song').Song;
  const Instrument = require('./models/instrument').Instrument;
  const Inkey = require('./models/inkey').Inkey;
  const Beard = require('./models/beard').Beard;
  const City = require('./models/location').Location;
  const Topic = require('./models/topic').Topic;
  const Mood = require('./models/mood').Mood;

  const insertSongBar = new ProgressBar('  inserting songs [:bar] :percent', {
    complete: '=',
    incomplete: ' ',
    width: 40,
    total: array.length,
  });
  const records = [];
  let mainInstrument;
  let secondaryInstrument;
  for (let i = 0; i < array.length; i++) {
    insertSongBar.tick(1);
    const instruments = [];
    if (array[i].instruments) {
      const instrumentArray = array[i].instruments.toLowerCase().replace('\n', '').split(',').map(inst => inst.trim());

      // ignore Vocals if it's the first instrument listed among multiple
      // instrumentIndex = 0;
      // if (instrumentArray[0] === 'vocals' && instrumentArray.length > 1) {
      //   instrumentIndex = 1;
      // }

      const firstInstQuery = await Instrument.findOne({ name: instrumentArray[0] }).exec();
      if (instrumentArray[1]) {
        const secondInstQuery = await Instrument.findOne({ name: instrumentArray[1] });
        secondaryInstrument = secondInstQuery._id;
      }
      mainInstrument = firstInstQuery._id;

      const query = await Instrument.find({ name: { $in: instrumentArray } }).exec();

      query.forEach((item) => {
        instruments.push(item._id);
      });
    }

    let tempo = 0;
    if (typeof array[i].tempo === 'number') {
      tempo = array[i].tempo;
    }
    let upcasedKey;
    if (array[i].inkey) {
      upcasedKey = array[i].inkey.charAt(0).toUpperCase().concat(array[i].inkey.slice(1));
      const query = await Inkey.find({ name: upcasedKey }).exec();
      upcasedKey = query[0].id;
    }

    let beard;
    if (array[i].beard) {
      const query = await Beard.find({ name: array[i].beard.replace(/^\n|\n$/g, '').trim() }).exec();
      beard = query[0].id;
    }

    let location;
    if (array[i].location) {
      const query = await City.find({ name: array[i].location.replace(/^\n|\n$/g, '').trim() }).exec();
      location = query[0].id;
    }

    let topic;
    if (array[i].topic) {
      const query = await Topic.find({ name: array[i].topic.replace(/^\n|\n$/g, '').trim() }).exec();
      topic = query[0].id;
    }

    const date = new Date(array[i].date);
    date.setDate(date.getDate() + 1);

    let tagNames = [];
    if (array[i].tags) {
      tagNames = array[i].tags.toLowerCase().replace('\n', '').split(',').map(tag => tag.trim())
        .filter(tag => tag.length);
    }

    let mood;
    if (array[i].mood) {
      const query = await Mood.find({ name: array[i].mood.replace(/^\n|\n$/g, '').trim().toLowerCase() }).exec();
      mood = query[0].id;
    }

    const song = {
      number: array[i].number,
      title: array[i].title,
      date,
      length: calcLength(array[i].length),
      videoid: array[i].videoid.slice(-11),
      tempo,
      description: array[i].description,
      acousticproduced: array[i].acousticproduced,
      firsts: array[i].firsts,
      comments: array[i].comments,
      press: array[i].press,
      inkey: upcasedKey,
      beard,
      instruments,
      location,
      topic,
      tagNames,
      itunes: array[i].itunes,
      spotify: array[i].spotify,
      bandcamp: array[i].bandcamp,
      mood,
      mainInstrument,
      secondaryInstrument,
    };
    records.push(song);
  }
  console.log(`Inserted ${records.length} songs`);
  Song.insertMany(records, (err, docs) => {
    if (err) {
      console.log(err);
    }
    console.log('inserting songs on tags and tags on songs...');
    insertTagsonSongsOnTags()
      .then((success) => {
        console.log('done');
        // process.exit()
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
}

// gatherFields(songList).then(results => {
//     fs.writeFileSync('filenames.txt', '', 'utf8')
//     fs.writeFileSync('unique-tags.txt', '', 'utf8')
//     insertUniques(results).then(success => {
//         console.log('inserted all uniques!')
//         insertSongs(songList)
//     })
// });

module.exports.importFromJSON = (songList) => {
  db.dropDatabase();
  // let songList = JSON.parse(stringifiedJSON);
  gatherFields(songList).then((results) => {
    fs.writeFileSync('filenames.txt', '', 'utf8');
    fs.writeFileSync('unique-tags.txt', '', 'utf8');
    insertUniques(results).then((success) => {
      console.log('inserted all uniques!');
      insertSongs(songList);
    });
  });
};
