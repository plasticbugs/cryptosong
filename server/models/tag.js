import { Model } from 'mongoose';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SongModel = require('./song')
// const songSchema = require('./song').songSchema

const songSchema = new Schema({
  _id: Schema.Types.ObjectId,
  number: Number,
  title: String,
  date: Date,
  length: Number,
  inkey: { type: Schema.Types.ObjectId, ref: 'Inkey' },
  tempo: Number,
  videoid: String,
  description: String,
  acousticproduced: String,
  // tags: [Models.Tag.tagSchema],
});

const tagSchema = new Schema({
  image: String,
  name: String,
  songs: [songSchema],
});

const Tag = mongoose.model('Tag', tagSchema);

const cleanObj = (obj) => {
  obj = obj.toObject();
  for (let key in obj) {
    if (obj[key] === undefined || obj[key] === null) {
      delete obj[key]
    }
  }
  return obj;
}

const saveTagsAndSongs = (number, tag) => {
  return new Promise((resolve, reject) => {
    SongModel.Song.findOne({number})
    .then(song => {
      song.tags.push(tag)
      song.save((err, savedSong) => {
        tag.songs.push(song)
        tag.save((err, success) => {
          resolve()
        })
      })
    })
    .catch(err => {
      if (err) {
        reject(err);
      }
    })
  })
}

const deleteTagsForSong = (forSongId) => {
  return new Promise((resolve, reject) => {
    SongModel.Song.findOne({number: forSongId})
    .then(song => {
      song.tags = [];
      song.save((success => {
        resolve()
      }))
    })  
  })
}

const addOrInsertTags = (tagArray, forSongId) => {
  // iterate over tags, try to find in DB
  // if found, save song to tag, save tag to song
  // if not found, make new tag,
  // save song to tag, save tag to song

  return new Promise((resolve, reject) => {
    const number = forSongId;
    const recurse = (array) => {
      if (!array.length) {
        return SongModel.Song.find({number})
        .then(song => {
          resolve(song);
        })
      }
      let tag = array.shift();
      if (!tag._id) {
        console.log(tag)
      }
      let num = tag._id.toString();
      if (num.match(/^[0-9a-fA-F]{24}$/)) {
        Tag.findById(tag._id)
        .then(tagDoc => {
          saveTagsAndSongs(number, tagDoc)
          .then(success => {
            recurse(array);
          })
        })
      } else {
        if (tag.name.length) {
          let newTag = new Tag({name: tag.name, image: tag.image})
          newTag.save((err, savedTag) => {
            if (err) {
              reject(err);
              return;
            }
            saveTagsAndSongs(number, savedTag)
            .then(success => {
              recurse(array)
            })
          })
        } else {
          recurse(array);
        }
      }
    }
    recurse(tagArray);
  })
}

const insertTag = (tagData, forSongId) => {
  return new Promise((resolve, reject) => {
    console.log(tagData, forSongId)
    if (forSongId) {
      let song = SongModel.Song.findOne({number: Number.parseInt(forSongId)})
      // .populate('instruments')
      // .populate('tag')
      // .populate('topic')
      // .populate('inkey')
      // .populate('location')
      .then(song => {
        return song;
        // return cleanObj(song);
        // (async function getAllTags() {
        //   let instrument = await Models.Instrument.find();
        //   let tag = await Models.Tag.find();
        //   let location = await Models.Location.find();
        //   let topic = await Models.Topic.find();
        //   let inkey = await Models.Inkey.find();
        //   resolve({instrument, tag, location, topic, inkey, song});
        // })();
  
      })
      .then(song => {
        let tag = new Tag(tagData);

        tag.songs.push(cleanObj(song));
        tag.save((err, newTag) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          let tagForSong = cleanObj(newTag);
          delete tagForSong.songs;

          song.tags.push(tagForSong)
          song.save((err, updatedSong) => {
            console.log('it saved', newTag, updatedSong);
            resolve({newTag, updatedSong});
          })
        })
      })
    } else {
      let tag = new Tag(tagData);
      tag.save((err, newTag) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(newTag)
      })
    }
    
  })
}




const getAll = () => {
  return new Promise((resolve, reject) => {
    Tag.find({})
    .sort([['_id', -1]])
    .then(results => {
      resolve(results);
    })
    .catch(err => {
      if (err) {
        reject(err);
      }
    })
  })
}

const deleteMany = (tags) => {
  console.log(tags)
  return new Promise((resolve, reject) => {
    Tag.remove({_id: {$in: tags}})
    .then( success => {
      "removed a bunch"
    })
    .catch(err => {
      if (err) {
        console.log(err);
      }
    })
  })
}

const updateAll = (tags) => {
  return new Promise((resolve, reject) => {
    const recurse = (array) => {
      if (!array.length) {
        return Tag.find({})
        .sort([['_id', -1]])
        .then(tags => {
          resolve(tags);
          return;
        })
      }
      let tag = array.shift();
      if (!tag._id) {
        console.log(tag)
      }
      let num = tag._id.toString();
      if (num.match(/^[0-9a-fA-F]{24}$/)) {
        Tag.findById(tag._id)
        .then(doc => {
          doc.name = tag.name;
          doc.image = tag.image;
          doc.save((err, updated) => {
            if (err) {
              console.log(err)
              reject(err);
            } else {
              recurse(array);
            }
          })
        })
      } else {
        if (tag.name.length) {
          let newTag = new Tag({name: tag.name, image: tag.image})
          newTag.save((err, saved) => {
            if (err) {
              reject(err);
              return;
            }
            recurse(array);
          })  
        } else {
          recurse(array);
        }
      }
    }
    recurse(tags);
  })
}


module.exports = {
  Tag,
  tagSchema,
  insertTag,
  addOrInsertTags,
  deleteTagsForSong,
  getAll,
  updateAll,
  deleteMany
}
