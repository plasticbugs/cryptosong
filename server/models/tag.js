import mongoose, { Model } from 'mongoose';
import Fawn from 'fawn';

const Schema = mongoose.Schema;
const SongModel = require('./song')

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
  itunes: String,
  spotify: String,
  bandcamp: String,
  mood: String,
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

const getSongsForTag = (name) => {
  return new Promise((resolve, reject) => {
    Tag.find({name})
    .then(results => {
      resolve(results[0])
    })
  })
}

const addOrInsertTags = (tagArray, forSongId, task) => {
  return new Promise((resolve, reject) => {
    const number = forSongId;
    let counter = tagArray.length;
    // const recurse = (array) => {
    //   if (!array.length) {
    //       resolve(task);
    //       return;
    //   }
    // console.log(tagArray)
    for (let tag of tagArray) {
      // let tag = array.shift();
      // if (!tag._id) {
      //   console.log(tag)
      // }
      let num = tag._id.toString();
      // console.log(num, tag.name)
      if (num.match(/^[0-9a-fA-F]{24}$/)) {
        SongModel.Song.findOne({number})
        .then(song => {
          Tag.findById(tag._id)
          .then(tagDoc => {
            task.update("Song", {number}, {$push: {tags: tagDoc}})
            const hasSong = tagDoc.songs.id(song._id);
            if (!hasSong) {
              task.update("Tag", {_id: tag._id}, {$push: {songs: song}});
            }
            counter -= 1;
            if (counter === 0) {
              resolve(task);
              return;
            }
          })
        })
      } else {
        if (tag.name.length) {
          let newTag = new Tag({name: tag.name, image: tag.image})
          SongModel.Song.findOne({number})
          .then(song => {
            newTag.save()
            .then(savedTag => {
              task.update("Song", {number}, {$push: {tags: savedTag}})
              task.update("Tag", {_id: savedTag._id}, {$push: {songs: song}})
              counter -=1;
              if (counter === 0) {
                resolve(task);
                return;
              }
            })
          })
        } else {
          counter -=1;
          if (counter === 0) {
            resolve(task);
            return;
          }
        }
      }
    }
    // }
    // recurse(tagArray);
  })
}


const insertTag = (tagData, forSongId) => {
  return new Promise((resolve, reject) => {
    console.log(tagData, forSongId)
    if (forSongId) {
      let song = SongModel.Song.findOne({number: Number.parseInt(forSongId)})
      .then(song => {
        return song;
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
    .select('_id name image')
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

const deleteTags = (tags) => {
  return new Promise((resolve, reject) => {
    Tag.remove({_id: {$in: tags}})
    .then( success => {
      console.log(success)
      resolve()
    })
    .catch(err => {
      if (err) {
        console.log(err);
        reject(err);
      }
    })
  })
}

const deleteMany = (tags, cb) => {
  const recurse = (array) => {
    let task = new Fawn.Task();
    if (!array.length) {
      cb(null);
      return;
    }
    let tag = array.shift();
    Tag.findOne({_id: tag})
    .then(tagDoc => {
      console.log(tagDoc.name)
      task.update("Song", {"tags.name": tagDoc.name}, { $pull: { tags: { name: tagDoc.name}}}, { multi: true })
      task.remove("Tag", {_id: tag} );
      task.run({useMongoose: true})
      .then(success => {
        recurse(array);
      })
    })
  }
  recurse(tags.slice());
}

const updateAll = (tags) => {
  return new Promise((resolve, reject) => {
    const recurse = (array) => {
      if (!array.length) {
        Tag.find({})
        .select('_id name image')
        .sort([['_id', -1]])
        .then(tags => {
          resolve(tags);
        })
      } else {
        let tag = array.shift();
        if (tag._id.match(/^[0-9a-fA-F]{24}$/)) {
          let task = new Fawn.Task();
          task.update('Tag', {_id: tag._id}, tag)
          SongModel.updateTagsOnSongs(tag, task)
          .then(task => {
            task.run({useMongoose: true})
            .then(success => {
              recurse(array)
            })
          })
        } else {
          if (tag.name.length) {
            console.log('making new! ', tag.name, tag._id)
            let newTag = new Tag({name: tag.name, image: tag.image})
            newTag.save(err => {
              recurse(array)
            })
          } else {
            recurse(array)
          }
        }
      }
    }
    recurse(tags.slice())
  })
}

module.exports = {
  Tag,
  tagSchema,
  insertTag,
  addOrInsertTags,
  getAll,
  updateAll,
  deleteMany,
  getSongsForTag,
}
