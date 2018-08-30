const fs = require("fs");
const gm = require("gm").subClass({ imageMagick: true });
const pLimit = require("p-limit");
const getHueForDate = require("../../client/src/helpers/hueConversion.js")
    .getHueForDate;
const rootDir = __dirname + "/../../";
const layers = rootDir + "/client/artlayers";
const out = rootDir + "/client/build/2009";
const db = require("../../db-config");
const SongModel = require("../models/song");
const limit = pLimit(1);
const path = require("path");

const compositeImage = (buffer, image) => {
    return new Promise((resolve, reject) => {
        gm(buffer)
            .composite(image)
            .toBuffer("PNG", function(err, newBuffer) {
                if (err) console.log(err);
                //console.log('done! ' + image);
                resolve(newBuffer);
            });
    });
};

const imagePath = path => {
    return layers + path;
};

const slugify = text => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
};

as = SongModel.Song.find()
    .populate("instruments")
    .populate("beard")
    .populate("topic")
    .populate("location")
    .populate("mood")
    .populate("mainInstrument")
    .populate("secondaryInstrument")
    .then(results => {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        results
            .reduce(function(promise, song) {
                return promise.then(function(result) {
                    const slug = `${out}${slugify(song.title)}.png`;
                    return Promise.all([
                        delay(2500),
                        createImage(song, creatImagePathArray(song))
                    ]);
                });
            }, Promise.resolve())
            .catch(err => {
                console.log(song.title);
                console.log(err);
            })
            .then(() => {
                console.log("finished");
                process.exit(0);
            });
    });

const creatImagePathArray = r => {
    let array = [];
    array.push(layers + "/" + r.location.image);
    array.push(layers + "/mood_" + r.mood.name.toLowerCase() + ".png");
    beardPath = r.beard
        ? imagePath(
              `/beard_${r.beard.name.toLowerCase().replace(/\//g, "")}.png`
          )
        : imagePath("/beard_na.png");
    array.push(beardPath);
    addTopic(r, array);
    addInstrumentLayers(r, array);
    console.log(array);
    return array;
};

const addTopic = (song, array) => {
    const basicTopicName = song.topic.name.toLowerCase().replace(/\s/g, "");
    if (song.topic.name == "Poetic") {
        array.push(
            imagePath(`/topic_${basicTopicName}${song.date.getDay() + 1}.png`)
        );
        return;
    }
    if (
        (song.secondaryInstrument.name == "baritone uke" ||
            song.secondaryInstrument.name == "uke") &&
        fs.existsSync(imagePath(`/topic_${basicTopicName}-uke.png`))
    ) {
        array.push(imagePath(`/topic_${basicTopicName}-uke.png`));
        return;
    }
    array.push(imagePath(`/topic_${basicTopicName}.png`));
};

const addInstrumentLayers = (song, array) => {
    if (song.topic.name.toLowerCase() == "instrumental") {
        array.push(
            layers +
                "/instrument_" +
                song.mainInstrument.name.toLowerCase().replace(/\s/g, "") +
                ".png"
        );
    }
    if (
        [
            "congas",
            "drum machine",
            "harpsichord",
            "keyboard",
            "organ",
            "piano"
        ].includes(song.secondaryInstrument.name.toLowerCase())
    ) {
        array.push(layers + "/instrument_vocals_no_hands.png");
        array.push(
            layers +
                "/instrument_" +
                song.secondaryInstrument.name.toLowerCase().replace(/\s/g, "") +
                ".png"
        );
        return;
    }
    if (
        song.secondaryInstrument &&
        song.mainInstrument.name.toLowerCase() == "vocals"
    ) {
        array.push(
            layers +
                "/instrument_" +
                song.secondaryInstrument.name.toLowerCase().replace(/\s/g, "") +
                ".png"
        );
        array.push(layers + "/instrument_vocals_no_hands.png");
        return;
    }
    array.push(
        layers +
            "/instrument_" +
            song.mainInstrument.name.toLowerCase().replace(/\s/g, "") +
            ".png"
    );
};

const createImage = (song, array) => {
    console.log(song.imagePath);
    bg = getHueForDate(song.date);
    if (bg.match("hsl")) {
        graphic = gm(1792, 768, bg);
    } else {
        graphic = gm(bg);
    }
    // Find the background
    graphic.toBuffer("PNG", function(err, buffer) {
        if (err) return console.log(err);
        Promise.resolve(buffer)
            .then(buffer => {
                const reducer = (promise, currentValue) =>
                    promise.then(b => {
                        return compositeImage(b, currentValue);
                    });
                return array.reduce(reducer, Promise.resolve(buffer));
            })
            .then(buffer => {
                largeImage = path.join("client/build", song.imagePath);
                gm(buffer).write(largeImage, function(err) {
                    if (err) return console.dir(arguments);
                    console.log(this.outname + " created  ::  " + arguments[3]);
                    gm(largeImage)
                        .resize(null, 400)
                        .crop(400, 400, 280, 0)
                        .autoOrient()
                        .write(
                            path.join("client/build", song.imagePathSmall),
                            function(err) {
                                if (!err) console.log("hooray! ");
                            }
                        );
                });
            })
            .catch(err => {
                console.log(song.title);
                console.log(err);
            })
            .then(console.log(song.title));
    });
};
