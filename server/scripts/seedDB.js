
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/cryptosong', {
  promiseLibrary: global.Promise
});
const db = mongoose.connection;
db.dropDatabase();

// const Instrument = require('../models/instrument.js');
// const Song = require('../models/song.js');
// "number": 1,
//       "date": "2009-01-01T05:00:00.000Z",
//       "title": "In the Time of the Gods",
//       "length": "2:36",
//       "inkey": "c",
//       "tempo": 61,
//       "topic": "Poetic",
//       "location": "Los Angeles",
//       "instruments": "Vocals, Baritone Uke",
//       "beard": "N/A",
//       "videoid": "https://youtu.be/v6Lk_OP4ZKc",
//       "description": "First song for Fun A Day! It’s called “In The Time of the Gods”. I wish I had better guitars. I’m using a baritone ukulele that won’t stay in tune!",
//       "acousticproduced": "Produced",
//       "firsts": "First song."

const songList = [
  {
      "number": 1,
      "date": "2009-01-01T05:00:00.000Z",
      "title": "In the Time of the Gods",
      "length": "2:36",
      "inkey": "c",
      "tempo": 61,
      "topic": "Poetic",
      "location": "Los Angeles",
      "instruments": "Vocals, Baritone Uke",
      "beard": "N/A",
      "videoid": "https://youtu.be/v6Lk_OP4ZKc",
      "description": "First song for Fun A Day! It’s called “In The Time of the Gods”. I wish I had better guitars. I’m using a baritone ukulele that won’t stay in tune!",
      "acousticproduced": "Produced",
      "firsts": "First song."
  },
  {
      "number": 2,
      "date": "2009-01-02T05:00:00.000Z",
      "title": "Hands (Oh No!)",
      "length": "3:09",
      "inkey": "F",
      "tempo": 100,
      "topic": "Poetic",
      "location": "Los Angeles",
      "instruments": "Vocals, Baritone Uke",
      "beard": "N/A",
      "videoid": "https://youtu.be/ojUAssDIqic",
      "description": "Song two for Fun A Day! It’s called “Hands (Oh No!)” I wish I was better at whistling. It sounds kind of creepy though.",
      "acousticproduced": "Produced"
  },
  {
      "number": 3,
      "date": "2009-01-03T05:00:00.000Z",
      "title": "Who Do You Think You Are",
      "length": "2:12",
      "inkey": "Am",
      "tempo": 110,
      "topic": "Anxiety",
      "location": "Los Angeles",
      "instruments": "Vocals, Baritone Uke",
      "beard": "N/A",
      "videoid": "https://youtu.be/tRrTEB50cCE",
      "description": "3rd song for Fun A Day! It’s called “Who Do You Think You Are?”. It’s pretty weird. It’s kind of like my worst nightmare. Judgement.",
      "acousticproduced": "Produced"
  },
  {
      "number": 4,
      "date": "2009-01-04T05:00:00.000Z",
      "title": "Elegy for industry",
      "length": "2:20",
      "inkey": "Em",
      "tempo": 130,
      "topic": "Poetic",
      "location": "Los Angeles",
      "instruments": "Vocals, Synths, Drum Machine",
      "beard": "N/A",
      "videoid": "https://youtu.be/57gN8EZJE2A",
      "description": "Song 4! Elegy For Industry. Strange. Kind of cheesy. Let me know what you think!",
      "acousticproduced": "Produced",
      "comments": "Songfight song."
  },
  {
      "number": 5,
      "date": "2009-01-05T05:00:00.000Z",
      "title": "The Airport Song",
      "length": "1:13",
      "inkey": "D",
      "tempo": 59,
      "topic": "Airport",
      "location": "Los Angeles",
      "instruments": "Vocals, Synths, Drum Machine",
      "beard": "Stubble",
      "videoid": "https://www.youtube.com/watch?v=kLzFYvZkX7c",
      "description": "Song #5 for Song A Day! I made it at LAX. In 20 min. While trying to not make too big a scene. Also got some time lapse of the gate I was waiting at. Yay!",
      "acousticproduced": "Produced",
      "firsts": "First video.",
      "comments": "Made in an airport."
  },
  {
      "number": 6,
      "date": "2009-01-06T05:00:00.000Z",
      "title": "It Must Be the Weather",
      "length": "3:50",
      "inkey": "Gm",
      "tempo": 65,
      "topic": "Life",
      "location": "New York",
      "instruments": "Vocals, Baritone Uke",
      "beard": "N/A",
      "videoid": "https://youtu.be/n3ckq1Pa64g",
      "description": "N/A",
      "acousticproduced": "Acoustic",
      "firsts": "First song in New York.",
      "comments": "Recorded in the bathroom."
  },
  {
      "number": 7,
      "date": "2009-01-07T05:00:00.000Z",
      "title": "EGM, 1up, Goodbye",
      "length": "2:37",
      "inkey": "Em",
      "tempo": 96,
      "topic": "Video Games",
      "location": "New York",
      "instruments": "Vocals, Baritone Uke",
      "beard": "Stubble",
      "videoid": "https://www.youtube.com/watch?v=mzFyM0SCpOs",
      "description": "A song I wrote today for Ryan and Matt and everyone else at 1up and EGM that lost their jobs yesterday. It's made me so unbelievably sad. First, they're my friends, and what they created and worked on, the 1up Show, was far and away the best gaming content anywhere, period. I'm going to miss my weekly dose of 1up Yours, 1up FM and The 1up Show, and boy am I going to miss getting EGM in the mail! Love! On to bigger and better things! All of you!",
      "acousticproduced": "Acoustic",
      "firsts": "First stairwell song.",
      "comments": "Written for the closing of EGM."
  },
  {
      "number": 8,
      "date": "2009-01-08T05:00:00.000Z",
      "title": "Boy for Boy's Sake",
      "length": "2:23",
      "inkey": "D",
      "tempo": 50,
      "topic": "Poetic",
      "location": "New York",
      "instruments": "Vocals, Baritone Uke",
      "beard": "Clean",
      "videoid": "https://www.youtube.com/watch?v=qLjYVzYGg-M",
      "description": "Song # 8 for Song A Day! It’s called “Boy For Boy’s Sake”. Yay!",
      "acousticproduced": "Acoustic"
  },
  {
      "number": 9,
      "date": "2009-01-09T05:00:00.000Z",
      "title": "The Deutsch Positivity Anthem",
      "length": "2:59",
      "inkey": "Bb",
      "tempo": 170,
      "topic": "Commission",
      "location": "New York",
      "instruments": "Vocals, Baritone Uke",
      "beard": "N/A",
      "videoid": "https://youtu.be/pvweusx-cAk",
      "description": "Song # 9! This one is called “The Deutsch Positivity Anthem”. It was written for Ivory’s mom’s boss, who sent out an email to everyone in the creative group at Deutsch (an ad agency) saying that he wanted to be inundated with “positivity” ideas on Monday, the 12th. So I wrote this Positivity Anthem for her to present to him.",
      "acousticproduced": "Produced",
      "firsts": "First commission",
      "comments": "My ex's mom commissioned a \nsong for the company she worked at."
  },
  {
      "number": 10,
      "date": "2009-01-10T05:00:00.000Z",
      "title": "The Three Rules of the internet",
      "length": "3:07",
      "inkey": "D",
      "tempo": 100,
      "topic": "Internet",
      "location": "New York",
      "instruments": "Vocals, Synths, Drum Machine",
      "beard": "Clean",
      "videoid": "https://www.youtube.com/watch?v=GWSP2c9J8CQ",
      "description": "This goes out to all you haters!!",
      "acousticproduced": "Acoustic",
      "firsts": "First viral song.",
      "comments": "Viral",
      "press": "https://boingboing.net/2009/01/11/folk-song-containing.html"
  },
  {
      "number": 11,
      "date": "2009-01-11T05:00:00.000Z",
      "title": "Song a Day Anthem",
      "length": "3:09",
      "inkey": "D",
      "tempo": 85,
      "topic": "Song A Day",
      "location": "New York",
      "instruments": "Vocals, Baritone Uke, Snaps",
      "beard": "Clean",
      "videoid": "https://www.youtube.com/watch?v=OfAITTY-CCU",
      "description": "While riding on the train from CT to NYC, I wrote this song about writing a song a day. Very meta. It's the anthem for anyone wanting to be creative! It feels good to feel inspired.",
      "acousticproduced": "Acoustic",
      "comments": "Written on a train."
  },
  {
      "number": 12,
      "date": "2009-01-12T05:00:00.000Z",
      "title": "Everyone's a Little Bit Queer",
      "length": "5:03",
      "inkey": "B",
      "tempo": 80,
      "topic": "Social Justice",
      "location": "New York",
      "instruments": "Vocals, Baritone Uke",
      "beard": "Shadow",
      "videoid": "https://www.youtube.com/watch?v=D5TMZc9gzt4",
      "description": "Song # 12 for Song-A-Day! It's pretty self explanatory.",
      "acousticproduced": "Acoustic",
      "firsts": "First social justice song."
  },
  {
      "number": 13,
      "date": "2009-01-13T05:00:00.000Z",
      "title": "What Does It Mean to Love a Machine?",
      "length": "4:45",
      "inkey": "Bm",
      "tempo": 102,
      "topic": "Sex",
      "location": "New York",
      "instruments": "Vocals, Baritone Uke",
      "beard": "Shadow",
      "videoid": "https://vimeo.com/2819199",
      "description": "If you like sci-fi, robots, and sex, this is the song for you. Originally written for Monochrom's Arse Elektronika, I appropriated it for my Song-A-Day project. Contains lines like: \"There was Data, there was Troi, in a sexual position called the Spock-McCoy.\"",
      "acousticproduced": "Produced",
      "comments": "Rejected from YouTube for being very NSFW."
  },
  {
      "number": 14,
      "date": "2009-01-14T05:00:00.000Z",
      "title": "I'm Drunk Because the Economy Sucks",
      "length": "2:44",
      "inkey": "F#",
      "tempo": 35,
      "topic": "Politics",
      "location": "New York",
      "instruments": "Vocals, Baritone Uke, Snaps",
      "beard": "Shadow",
      "videoid": "https://www.youtube.com/watch?v=tzAz5HzjBsw",
      "description": "# 14! “I’m Drunk Because The Economy Sucks”. Wrote it after having drinks with a bar full of Ivory’s mom’s coworkers who’ve just been laid off. It’s happening.",
      "acousticproduced": "Acoustic",
      "firsts": "First politics song."
  },
  {
      "number": 15,
      "date": "2009-01-15T05:00:00.000Z",
      "title": "Get Well, Steve Jobs",
      "length": "3:58",
      "inkey": "F#",
      "tempo": 95,
      "topic": "Apple",
      "location": "New York",
      "instruments": "Vocals, Baritone Uke",
      "beard": "Stubble",
      "videoid": "https://www.youtube.com/watch?v=NMw-E7tz2hM",
      "description": "This one's about Steve Jobs. I have a weird internal relationship with Mac's in general, and Steve in particular. I follow Mac stuff obsessively, reading blogs, watching keynotes, the whole nine. But at the same time, I feel ashamed of myself for buying into the uber-super-duper consumerism of it. I mean, it's consumerism ULTRA. Then, with Steve, it's this feeling that, based on everything that I've read of him, based on all of the speeches I've read of his (and I've read most, I think), it just seems to me that someone of his intelligence and sensitivity must also see the raw, unyielding consumerism that he's the King of, and I wonder, does he care? Does he ever question what he's throwing his obvious talent behind? I wonder. Anyway, he's sick and it's really sad imagining a world without Steve Jobs. I hope he gets better. I'd be so curious to know what his inner life is like.",
      "acousticproduced": "Produced",
      "firsts": "First Apple song."
  },
  {
      "number": 16,
      "date": "2009-01-16T05:00:00.000Z",
      "title": "Riding the Subway",
      "length": "1:51",
      "tempo": 105,
      "topic": "Poetic",
      "location": "New York",
      "instruments": "Vocals, Baritone Uke",
      "beard": "Stubble",
      "videoid": "https://www.youtube.com/watch?v=ChcyufiBFOg",
      "description": "N/A",
      "acousticproduced": "Produced"
  },
  {
      "number": 17,
      "date": "2009-01-17T05:00:00.000Z",
      "title": "I'm So Tired of Capitalism",
      "length": "2:06",
      "inkey": "D#m",
      "tempo": 112,
      "topic": "Politics",
      "location": "New York",
      "instruments": "Vocals, Baritone Uke",
      "beard": "Stubble",
      "videoid": "https://www.youtube.com/watch?v=2fVvJkn-S9s",
      "description": "# 17! “I’m So Tired of Capitalism” Inspired by watching how the 24 news channels, and the commercials, etc, are packaging up Barack Obama and selling him. It’s what our culture is good at. Ugh.",
      "acousticproduced": "Acoustic"
  },
  {
      "number": 18,
      "date": "2009-01-18T05:00:00.000Z",
      "title": "The Marks Sisters",
      "length": "1:16",
      "inkey": "F",
      "tempo": 120,
      "topic": "Friend",
      "location": "Baltimore",
      "instruments": "Vocals, Baritone Uke",
      "beard": "Clean",
      "videoid": "https://www.youtube.com/watch?v=betnMsatQYA",
      "description": "Song # 18. I saw an old friend of mine yesterday, and she’s starting a 3 person acapella group with two other gals. They sang me a song. It was awesome. This song is about them, and if they like and/or could do anything with it, it’s theirs!",
      "acousticproduced": "Acoustic",
      "firsts": "First song in Baltimore.",
      "comments": "Written for my friend's band."
  },
  {
      "number": 19,
      "date": "2009-01-19T05:00:00.000Z",
      "title": "Snow Day",
      "length": "2:15",
      "inkey": "D",
      "tempo": 140,
      "topic": "Life",
      "location": "Baltimore",
      "instruments": "Vocals, Baritone Uke",
      "beard": "Clean",
      "videoid": "https://www.youtube.com/watch?v=rsZx9KBeVow",
      "description": "Song # 19! Written with Thomas, age 11, and Michael, age 8. They did most of the lyrics, I helped with the music. That’s Thomas singing with me.",
      "acousticproduced": "Produced",
      "firsts": "First collaboration.",
      "comments": "Written with an 8 and 11 year old."
  },
  {
      "number": 20,
      "date": "2009-01-20T05:00:00.000Z",
      "title": "Stars in Our Eyes",
      "length": "2:31",
      "inkey": "C",
      "tempo": 131,
      "topic": "Politics",
      "location": "Baltimore",
      "instruments": "Vocals, Baritone Uke, Organ, Drums",
      "beard": "Clean",
      "videoid": "https://www.youtube.com/watch?v=K_qfUkUFc4E",
      "description": "#20. I went to the inauguration today. I’m too tired to write something coherent. Here’s this instead!",
      "acousticproduced": "Acoustic"
  },
  {
      "number": 21,
      "date": "2009-01-21T05:00:00.000Z",
      "title": "Stay Out of My Body",
      "length": "3:13",
      "inkey": "Bbm",
      "tempo": 88,
      "topic": "Sick",
      "location": "New York",
      "instruments": "Vocals, Organ",
      "beard": "Clean",
      "videoid": "https://www.youtube.com/watch?v=Nf3bMujYhOU",
      "description": "#21 “Stay Out of My Body! A warning to colds and flus.",
      "acousticproduced": "Acoustic"
  },
  {
      "number": 22,
      "date": "2009-01-22T05:00:00.000Z",
      "title": "Obama Makes Me Smile",
      "length": "0:59",
      "inkey": "G",
      "tempo": "n/a",
      "topic": "Politics",
      "location": "New York",
      "instruments": "Vocals, Baritone Uke",
      "beard": "N/A",
      "videoid": "https://www.youtube.com/watch?v=pEg-XLfxURQ",
      "description": "#22! “Obama Makes Me Smile!” Written and performed by Sydney, age 8.",
      "acousticproduced": "Produced",
      "comments": "Written wtih a 9 year old. Footage from \nObama inauguration."
  },
  {
      "number": 23,
      "date": "2009-01-23T05:00:00.000Z",
      "title": "Barack Obama",
      "length": "1:56",
      "inkey": "A",
      "tempo": 104,
      "topic": "Politics",
      "location": "New York",
      "instruments": "Vocals, Baritone Uke",
      "beard": "Shadow",
      "videoid": "https://www.youtube.com/watch?v=35rk9q3Z0N0",
      "description": "#24! Wow! 24! That’s a lot. 6 more to go? 7? “Barack Obama!” That’s what this one is called!",
      "acousticproduced": "Produced"
  },
  {
      "number": 24,
      "date": "2009-01-24T05:00:00.000Z",
      "title": "Hello, Hello",
      "length": "1:00",
      "inkey": "C",
      "tempo": 120,
      "topic": "Poetic",
      "location": "Southingon,CT",
      "instruments": "Vocals, Electric Guitar",
      "beard": "Shadow",
      "videoid": "https://www.youtube.com/watch?v=7zekFoBg12I",
      "description": "#24! I think yesterday was actually 23, and it was after midnight when I did the song. So this is 24, and that was 23.I got confused. Sorry!",
      "acousticproduced": "Produced",
      "firsts": "First song in Connecticut.",
      "comments": "Made at my brother's house."
  },
  {
      "number": 25,
      "date": "2009-01-25T05:00:00.000Z",
      "title": "Love Me a Little Bit More",
      "length": "4:10",
      "inkey": "Bm",
      "tempo": 70,
      "topic": "Love",
      "location": "Jupiter, FL",
      "instruments": "Vocals, Synths, Samples, Drum Machine",
      "beard": "Shadow",
      "videoid": "https://www.youtube.com/watch?v=Mn1In11VTRs",
      "description": "#25! Yay! “Love Me A Little Bit More!” True story. Sort of.",
      "acousticproduced": "Produced",
      "firsts": "First song in Florida.",
      "comments": "Made at my parent’s house."
  },
  {
      "number": 26,
      "date": "2009-01-26T05:00:00.000Z",
      "title": "Speaking Electricity",
      "length": "3:45",
      "inkey": "D",
      "tempo": 86,
      "topic": "Poetic",
      "location": "Jupiter, FL",
      "instruments": "Vocals, Baritone Uke, Synths, \nDrum Machine",
      "beard": "Shadow",
      "videoid": "https://www.youtube.com/watch?v=uc-lNhjlOAA",
      "description": "#26!! “Speaking Electricity!” About my lack of language skills. And other things too.",
      "acousticproduced": "Produced"
  },
  {
      "number": 27,
      "date": "2009-01-27T05:00:00.000Z",
      "title": "Up on the Mountain Top",
      "length": "3:53",
      "inkey": "D",
      "tempo": 110,
      "topic": "Poetic",
      "location": "Jupiter, FL",
      "instruments": "Vocals, Baritone Uke, Synths, \nDrum Machine",
      "beard": "Shadow",
      "videoid": "https://www.youtube.com/watch?v=1lsfUAe8IGg",
      "description": "#27! “Up On The Mountaintop” Feeling a litte depressed about the state of the economy, etc. So many people losing their jobs. Almost unfathomable amounts. Ugh.",
      "acousticproduced": "Produced"
  },
  {
      "number": 28,
      "date": "2009-01-28T05:00:00.000Z",
      "title": "The Fox and the Hen",
      "length": "1:41",
      "inkey": "A",
      "tempo": 114,
      "topic": "Animals",
      "location": "Jupiter, FL",
      "instruments": "Vocals, Baritone Uke, Synths, \nDrum Machine",
      "beard": "Clean",
      "videoid": "https://www.youtube.com/watch?v=0Sfg1VGZggw",
      "description": "#28! A silly song about farm animals feelings sleepy. Have you ever read Animal Farm?",
      "acousticproduced": "Produced"
  },
  {
      "number": 29,
      "date": "2009-01-29T05:00:00.000Z",
      "title": "You Know Yourself",
      "length": "2:35",
      "inkey": "G",
      "tempo": 100,
      "topic": "Poetic",
      "location": "Jupiter, FL",
      "instruments": "Vocals, Baritone Uke, Synths, \nDrum Machine",
      "beard": "Clean",
      "videoid": "https://www.youtube.com/watch?v=5VScsEbZw7k",
      "description": "Song #29 for song a day! We’re getting so close. “You Know Yourself”. Had fun writing and performing this one.",
      "acousticproduced": "Produced"
  },
  {
      "number": 30,
      "date": "2009-01-30T05:00:00.000Z",
      "title": "Dark Days",
      "length": "2:12",
      "inkey": "Bbm",
      "tempo": 106,
      "topic": "Animals",
      "location": "Jupiter, FL",
      "instruments": "Vocals, Baritone Uke, Synths, \nDrum Machine",
      "beard": "Clean",
      "videoid": "https://www.youtube.com/watch?v=rPAbyLll7xM",
      "description": "#30!! Wow. Just…wow. I want to keep going… Can I?!",
      "acousticproduced": "Produced"
  },
  {
      "number": 31,
      "date": "2009-01-31T05:00:00.000Z",
      "title": "The Day That Google Crashed the internet",
      "length": "3:15",
      "videoid": "https://www.youtube.com/watch?v=3nH7RmupP8M"
  },
  {
      "number": 32,
      "date": "2009-02-01T05:00:00.000Z",
      "title": "Go to Sleep",
      "length": "3:58",
      "videoid": "https://www.youtube.com/watch?v=W-ZnTEK_uos"
  },
  {
      "number": 33,
      "date": "2009-02-02T05:00:00.000Z",
      "title": "I Love Battlestar Galactica",
      "length": "2:56",
      "videoid": "https://www.youtube.com/watch?v=xaStl18xyBc"
  },
  {
      "number": 34,
      "date": "2009-02-03T05:00:00.000Z",
      "title": "(Just Sing) a Happy Song",
      "length": "1:53",
      "videoid": "https://www.youtube.com/watch?v=uJ_zAYuFeAs"
  },
  {
      "number": 35,
      "date": "2009-02-04T05:00:00.000Z",
      "title": "Come Down Where You Ought to Be",
      "length": "2:29",
      "videoid": "https://www.youtube.com/watch?v=ZikADYAT0y8"
  },
  {
      "number": 36,
      "date": "2009-02-05T05:00:00.000Z",
      "title": "Scarlett Thomas",
      "length": "2:35",
      "videoid": "https://www.youtube.com/watch?v=-cU3FfI8k2s"
  },
  {
      "number": 37,
      "date": "2009-02-06T05:00:00.000Z",
      "title": "Water",
      "length": "0:41",
      "videoid": "https://www.youtube.com/watch?v=txF8ZlqJ6SI"
  },
  {
      "number": 38,
      "date": "2009-02-07T05:00:00.000Z",
      "title": "Little Pink Boom Box",
      "length": "0:43",
      "videoid": "https://www.youtube.com/watch?v=uQCKB77Q0sg"
  },
  {
      "number": 39,
      "date": "2009-02-08T05:00:00.000Z",
      "title": "Changing the Color of My Walls",
      "length": "0:50",
      "videoid": "https://www.youtube.com/watch?v=1go4XooMVu4"
  },
  {
      "number": 40,
      "date": "2009-02-09T05:00:00.000Z",
      "title": "The Ballad of Stimulus Jones",
      "length": "1:02",
      "videoid": "https://www.youtube.com/watch?v=0bA0ZAGpmfc"
  },
  {
      "number": 41,
      "date": "2009-02-10T05:00:00.000Z",
      "title": "Wolf of the Battlefield",
      "length": "1:59",
      "videoid": "https://www.youtube.com/watch?v=yoAZEsEvSoM"
  },
  {
      "number": 42,
      "date": "2009-02-11T05:00:00.000Z",
      "title": 42,
      "length": "0:46",
      "videoid": "https://www.youtube.com/watch?v=hzH4198ShGU"
  },
  {
      "number": 43,
      "date": "2009-02-12T05:00:00.000Z",
      "title": "Sanae's Birthday Song",
      "length": "0:56",
      "videoid": "https://www.youtube.com/watch?v=wHBVLYJ8N44"
  },
  {
      "number": 44,
      "date": "2009-02-13T05:00:00.000Z",
      "title": "Rock and Roll Cats",
      "length": "1:51",
      "videoid": "https://www.youtube.com/watch?v=kfVH3veC7-s"
  },
  {
      "number": 45,
      "date": "2009-02-14T05:00:00.000Z",
      "title": "The Rain Returned",
      "length": "2:12",
      "videoid": "https://www.youtube.com/watch?v=ZPeqoThRlPg"
  },
  {
      "number": 46,
      "date": "2009-02-15T05:00:00.000Z",
      "title": "The Legend of Zelda: Overworld",
      "length": "2:59",
      "videoid": "https://www.youtube.com/watch?v=Xg7_pvCbp8g"
  },
  {
      "number": 47,
      "date": "2009-02-16T05:00:00.000Z",
      "title": "Life Force",
      "length": "1:40",
      "videoid": "https://www.youtube.com/watch?v=FTtnC_PFBf8"
  },
  {
      "number": 48,
      "date": "2009-02-17T05:00:00.000Z",
      "title": "Mummy's on Campus",
      "length": "3:52",
      "videoid": "https://www.youtube.com/watch?v=QxIin3LKmKc"
  },
  {
      "number": 49,
      "date": "2009-02-18T05:00:00.000Z",
      "title": "Get Up off of Your Ass (And Just Do Something)",
      "length": "2:26",
      "videoid": "https://www.youtube.com/watch?v=GUTFXxi1TEw"
  },
  {
      "number": 50,
      "date": "2009-02-19T05:00:00.000Z",
      "title": "One of the Lucky Ones",
      "length": "2:32",
      "videoid": "https://www.youtube.com/watch?v=W12UsLNacJE"
  },
  {
      "number": 51,
      "date": "2009-02-20T05:00:00.000Z",
      "title": "Your Mother Doesn't Love You Anymore (An Extrasolar Anthem)",
      "length": "2:30",
      "videoid": "https://www.youtube.com/watch?v=mr_Nb4zzsXQ"
  },
  {
      "number": 52,
      "date": "2009-02-21T05:00:00.000Z",
      "title": "Zombie Ponies",
      "length": "0:54",
      "videoid": "https://www.youtube.com/watch?v=qycQVQEWpqQ"
  },
  {
      "number": 53,
      "date": "2009-02-22T05:00:00.000Z",
      "title": "Geriatrics in Drag",
      "length": "1:00",
      "videoid": "https://www.youtube.com/watch?v=rEI2bO4t_wU"
  },
  {
      "number": 54,
      "date": "2009-02-23T05:00:00.000Z",
      "title": "Let's All Go to the Lobby (Fuck That!)",
      "length": "2:30",
      "videoid": "https://www.youtube.com/watch?v=aTaQTcm2jqk"
  },
  {
      "number": 55,
      "date": "2009-02-24T05:00:00.000Z",
      "title": "BigFaceSmallFace",
      "length": "1:11",
      "videoid": "https://www.youtube.com/watch?v=_Xn-77ao7zA"
  },
  {
      "number": 56,
      "date": "2009-02-25T05:00:00.000Z",
      "title": "Co-op Theme Song",
      "length": "1:53",
      "videoid": "https://www.youtube.com/watch?v=NoSjW9H7bZo"
  },
  {
      "number": 57,
      "date": "2009-02-26T05:00:00.000Z",
      "title": "All My Friends Are Dinosaurs",
      "length": "4:40",
      "videoid": "https://www.youtube.com/watch?v=VXju0WFRpyA"
  },
  {
      "number": 58,
      "date": "2009-02-27T05:00:00.000Z",
      "title": "Marilyn Langois",
      "length": "1:10",
      "videoid": "https://www.youtube.com/watch?v=87LQ-ShXf6Q"
  },
  {
      "number": 59,
      "date": "2009-02-28T05:00:00.000Z",
      "title": "Shamus and Precious",
      "length": "1:08",
      "videoid": "https://www.youtube.com/watch?v=LMFfytNSRDU"
  },
  {
      "number": 60,
      "date": "2009-03-01T05:00:00.000Z",
      "title": "2100 California St.",
      "length": "1:16",
      "videoid": "https://www.youtube.com/watch?v=FmxAGQ1ioyc"
  },
  {
      "number": 61,
      "date": "2009-03-02T05:00:00.000Z",
      "title": "Knock Knock",
      "length": "0:58",
      "videoid": "https://www.youtube.com/watch?v=m_A-rD7txSQ"
  },
  {
      "number": 62,
      "date": "2009-03-03T05:00:00.000Z",
      "title": "I'm the Same As I Ever Was",
      "length": "0:39",
      "videoid": "https://www.youtube.com/watch?v=ZrR53d-OuQQ"
  },
  {
      "number": 63,
      "date": "2009-03-04T05:00:00.000Z",
      "title": "Teddy Bear Revolution",
      "length": "1:30",
      "videoid": "https://www.youtube.com/watch?v=oFS4CSnL2uU"
  },
  {
      "number": 64,
      "date": "2009-03-05T05:00:00.000Z",
      "title": "The Spyders",
      "length": "1:30",
      "videoid": "https://www.youtube.com/watch?v=rmWP7D7BHoM"
  },
  {
      "number": 65,
      "date": "2009-03-06T05:00:00.000Z",
      "title": "Teris: a History in Song",
      "length": "3:41",
      "videoid": "https://www.youtube.com/watch?v=34bYJDNS6Zo"
  },
  {
      "number": 66,
      "date": "2009-03-07T05:00:00.000Z",
      "title": "Night",
      "length": "2:19",
      "videoid": "https://www.youtube.com/watch?v=BMobOOV0928"
  },
  {
      "number": 67,
      "date": "2009-03-08T05:00:00.000Z",
      "title": "Zombie Rights, Zombie Dance",
      "length": "1:25",
      "videoid": "https://www.youtube.com/watch?v=40rCqT_v3hU"
  },
  {
      "number": 68,
      "date": "2009-03-09T04:00:00.000Z",
      "title": "A Ringtone for Ivory King",
      "length": "0:30",
      "videoid": "https://www.youtube.com/watch?v=zszgC2VeVBA"
  },
  {
      "number": 69,
      "date": "2009-03-10T04:00:00.000Z",
      "title": "Oh, It's Probably Time",
      "length": "0:48",
      "videoid": "https://www.youtube.com/watch?v=VVoVAyXEJ68"
  },
  {
      "number": 70,
      "date": "2009-03-11T04:00:00.000Z",
      "title": "Can We Kick It With Kikkoman (Of Course We Can!)",
      "length": "1:01",
      "videoid": "https://www.youtube.com/watch?v=60-83hmpjDw"
  },
  {
      "number": 71,
      "date": "2009-03-12T04:00:00.000Z",
      "title": "And They Call It Natural",
      "length": "1:59",
      "videoid": "https://www.youtube.com/watch?v=c23PUpoZ9hE"
  },
  {
      "number": 72,
      "date": "2009-03-13T04:00:00.000Z",
      "title": "Penguins Having a Party (2009)",
      "length": "1:44",
      "videoid": "https://www.youtube.com/watch?v=QGTEGVtoXyA"
  },
  {
      "number": 73,
      "date": "2009-03-14T04:00:00.000Z",
      "title": "Nano Nano Nightmare",
      "length": "1:47",
      "videoid": "https://www.youtube.com/watch?v=Pwf3dZSwjuk"
  },
  {
      "number": 74,
      "date": "2009-03-15T04:00:00.000Z",
      "title": "The Number Nine",
      "length": "1:34",
      "videoid": "https://www.youtube.com/watch?v=p2Cvn2hULws"
  },
  {
      "number": 75,
      "date": "2009-03-16T04:00:00.000Z",
      "title": "Don't Give Up, Chrissy",
      "length": "1:30",
      "videoid": "https://www.youtube.com/watch?v=HfVFsU-aQ90"
  },
  {
      "number": 76,
      "date": "2009-03-17T04:00:00.000Z",
      "title": "Hey, Paul Krugman",
      "length": "1:41",
      "videoid": "https://www.youtube.com/watch?v=XOYAuk809fY"
  },
  {
      "number": 77,
      "date": "2009-03-18T04:00:00.000Z",
      "title": "Copying isn't Theft",
      "length": "1:09",
      "videoid": "https://www.youtube.com/watch?v=zMP3QOlWV64"
  },
  {
      "number": 78,
      "date": "2009-03-19T04:00:00.000Z",
      "title": "Saving Newspapers",
      "length": "2:41",
      "videoid": "https://www.youtube.com/watch?v=52VdW8qFJ6Q"
  },
  {
      "number": 79,
      "date": "2009-03-20T04:00:00.000Z",
      "title": "Spring Equinox",
      "length": "1:10",
      "videoid": "https://www.youtube.com/watch?v=9TJ6kXDHtsU"
  },
  {
      "number": 80,
      "date": "2009-03-21T04:00:00.000Z",
      "title": "Out My Front Door",
      "length": "1:42",
      "videoid": "https://www.youtube.com/watch?v=Zov56wnlYUw"
  },
  {
      "number": 81,
      "date": "2009-03-22T04:00:00.000Z",
      "title": "Come On, Nouriel",
      "length": "1:26",
      "videoid": "https://www.youtube.com/watch?v=vMapa6591M4"
  },
  {
      "number": 82,
      "date": "2009-03-23T04:00:00.000Z",
      "title": "A Long Time Coming (EFCA)",
      "length": "1:59",
      "videoid": "https://www.youtube.com/watch?v=F36rY4VMRPE"
  },
  {
      "number": 83,
      "date": "2009-03-24T04:00:00.000Z",
      "title": "My Obama Neurosis",
      "length": "1:49",
      "videoid": "https://www.youtube.com/watch?v=BeTV3eIkzp0"
  },
  {
      "number": 84,
      "date": "2009-03-25T04:00:00.000Z",
      "title": "1600 Pennsylvania Ave.",
      "length": "1:26",
      "videoid": "https://www.youtube.com/watch?v=Zm_XoG1BqSY"
  },
  {
      "number": 85,
      "date": "2009-03-26T04:00:00.000Z",
      "title": "Fun a Day Anthem",
      "length": "2:30",
      "videoid": "https://www.youtube.com/watch?v=TJ9Z4DgFJ0w"
  },
  {
      "number": 86,
      "date": "2009-03-27T04:00:00.000Z",
      "title": "You're Doing It Right, Jon Stewart",
      "length": "1:40",
      "videoid": "https://www.youtube.com/watch?v=QtL5hvWKcvk"
  },
  {
      "number": 87,
      "date": "2009-03-28T04:00:00.000Z",
      "title": "I am Just a Little Post-It Note",
      "length": "1:18",
      "videoid": "https://www.youtube.com/watch?v=dw2ZL2eFDfU"
  },
  {
      "number": 88,
      "date": "2009-03-29T04:00:00.000Z",
      "title": "Soren's Song",
      "length": "2:09",
      "videoid": "https://www.youtube.com/watch?v=2yo3LbC4KbI"
  },
  {
      "number": 89,
      "date": "2009-03-30T04:00:00.000Z",
      "title": "Jerry Springer",
      "length": "1:43",
      "videoid": "https://www.youtube.com/watch?v=PG2WBfwooAk"
  },
  {
      "number": 90,
      "date": "2009-03-31T04:00:00.000Z",
      "title": "The Close",
      "length": "0:57",
      "videoid": "https://www.youtube.com/watch?v=OI-m2H_8q_c"
  },
  {
      "number": 91,
      "date": "2009-04-01T04:00:00.000Z",
      "title": "Ringtone for Mike Trash",
      "length": "0:42",
      "videoid": "https://www.youtube.com/watch?v=xJMK1M9ICsg"
  },
  {
      "number": 92,
      "date": "2009-04-02T04:00:00.000Z",
      "title": "Ivory is in the Caribbean (And I Miss Her)",
      "length": "1:33",
      "videoid": "https://www.youtube.com/watch?v=e8RAqe0Qkf4"
  },
  {
      "number": 93,
      "date": "2009-04-03T04:00:00.000Z",
      "title": "Tumblr",
      "length": "1:41",
      "videoid": "https://www.youtube.com/watch?v=wiUuuL87OH4"
  },
  {
      "number": 94,
      "date": "2009-04-04T04:00:00.000Z",
      "title": "The Ten Plagues",
      "length": "2:10",
      "videoid": "https://www.youtube.com/watch?v=x7Jv5hcE5jM"
  },
  {
      "number": 95,
      "date": "2009-04-05T04:00:00.000Z",
      "title": "Pieces",
      "length": "2:15",
      "videoid": "https://www.youtube.com/watch?v=MJmH-0J5Wpk"
  },
  {
      "number": 96,
      "date": "2009-04-06T04:00:00.000Z",
      "title": "My Baritone Uke and I",
      "length": "0:56",
      "videoid": "https://www.youtube.com/watch?v=KjtpzSMuusw"
  },
  {
      "number": 97,
      "date": "2009-04-07T04:00:00.000Z",
      "title": "1 Week, 5 Days",
      "length": "2:01",
      "videoid": "https://www.youtube.com/watch?v=l2GNCegRzFU"
  },
  {
      "number": 98,
      "date": "2009-04-08T04:00:00.000Z",
      "title": "Ringtone for Shelly",
      "length": "0:42",
      "videoid": "https://www.youtube.com/watch?v=CMYuGzBgX4o"
  },
  {
      "number": 99,
      "date": "2009-04-09T04:00:00.000Z",
      "title": "When I Was Born",
      "length": "1:17",
      "videoid": "https://www.youtube.com/watch?v=aexHE2DueBA"
  },
  {
      "number": 100,
      "date": "2009-04-10T04:00:00.000Z",
      "title": "When the Lighthouse Went Dark",
      "length": "1:29",
      "videoid": "https://www.youtube.com/watch?v=ySnfNdfESBE"
  },
  {
      "number": 101,
      "date": "2009-04-11T04:00:00.000Z",
      "title": "Zombie Banks",
      "length": "1:14",
      "videoid": "https://www.youtube.com/watch?v=aCAPzJEpuCA"
  },
  {
      "number": 102,
      "date": "2009-04-12T04:00:00.000Z",
      "title": "Ringtone for Casey",
      "length": "0:43",
      "videoid": "https://www.youtube.com/watch?v=mwBq8u7Fvx8"
  },
  {
      "number": 103,
      "date": "2009-04-13T04:00:00.000Z",
      "title": "Oreo Love",
      "length": "1:34",
      "videoid": "https://www.youtube.com/watch?v=BiI1lus4NGk"
  },
  {
      "number": 104,
      "date": "2009-04-14T04:00:00.000Z",
      "title": "Ringtone for Jackie",
      "length": "0:33",
      "videoid": "https://www.youtube.com/watch?v=5B450Qpzuec"
  },
  {
      "number": 105,
      "date": "2009-04-15T04:00:00.000Z",
      "title": "It's Like Trying to Fill a Styrofoam Cup With a Hole in the Bottom",
      "length": "2:21",
      "videoid": "https://www.youtube.com/watch?v=7CiTRHrA3vM"
  },
  {
      "number": 106,
      "date": "2009-04-16T04:00:00.000Z",
      "title": "Keyboard Shortcuts",
      "length": "0:24",
      "videoid": "https://www.youtube.com/watch?v=gVT9SToJsMI"
  },
  {
      "number": 107,
      "date": "2009-04-17T04:00:00.000Z",
      "title": "Ringtone for Michaela",
      "length": "0:54",
      "videoid": "https://www.youtube.com/watch?v=EY9vn2mXIsc"
  },
  {
      "number": 108,
      "date": "2009-04-18T04:00:00.000Z",
      "title": "Torture Memos: Waterboarding",
      "length": "2:08",
      "videoid": "https://www.youtube.com/watch?v=sJSXbA9j0Js"
  },
  {
      "number": 109,
      "date": "2009-04-19T04:00:00.000Z",
      "title": "I am israel, I am Palestine",
      "length": "3:54",
      "videoid": "https://www.youtube.com/watch?v=paFtzERJ8hM"
  },
  {
      "number": 110,
      "date": "2009-04-20T04:00:00.000Z",
      "title": "Cannabis Criminalization: a Short History in Song",
      "length": "3:42",
      "videoid": "https://www.youtube.com/watch?v=cNYbrO9OWP4"
  },
  {
      "number": 111,
      "date": "2009-04-21T04:00:00.000Z",
      "title": "Wren the Polyamorous Polar Bear and His Story of Redemtion",
      "length": "2:49",
      "videoid": "https://www.youtube.com/watch?v=ivfyckWwbww"
  },
  {
      "number": 112,
      "date": "2009-04-22T04:00:00.000Z",
      "title": "Fire Engine Red",
      "length": "2:23",
      "videoid": "https://www.youtube.com/watch?v=_ekL68m7fMw"
  },
  {
      "number": 113,
      "date": "2009-04-23T04:00:00.000Z",
      "title": "Spintown",
      "length": "1:40",
      "videoid": "https://www.youtube.com/my_videos?o=U&pi=78"
  },
  {
      "number": 114,
      "date": "2009-04-24T04:00:00.000Z",
      "title": "Lindsay McCove",
      "length": "0:35",
      "videoid": "https://www.youtube.com/watch?v=dvBDbdhCi4E"
  },
  {
      "number": 115,
      "date": "2009-04-25T04:00:00.000Z",
      "title": "Steve, the Hippo With Multiple Personalities",
      "length": "2:34",
      "videoid": "https://www.youtube.com/watch?v=QHwckqyrza4"
  },
  {
      "number": 116,
      "date": "2009-04-26T04:00:00.000Z",
      "title": "Ringtone for Liam and Keane's Dad!",
      "length": "0:33",
      "videoid": "https://www.youtube.com/watch?v=WpQ4KyQE0aI"
  },
  {
      "number": 117,
      "date": "2009-04-27T04:00:00.000Z",
      "title": "Don't Let Your Ovaries Get You Down",
      "length": "1:03",
      "videoid": "https://www.youtube.com/watch?v=PgQY-8RETeE"
  },
  {
      "number": 118,
      "date": "2009-04-28T04:00:00.000Z",
      "title": "Swine Flu: the Musical",
      "length": "1:58",
      "videoid": "https://www.youtube.com/watch?v=sgBm8jvg-bs"
  },
  {
      "number": 119,
      "date": "2009-04-29T04:00:00.000Z",
      "title": "Lost in the Tubes! a PSA in Song",
      "length": "1:44",
      "videoid": "https://www.youtube.com/watch?v=YNB5kZkvLP8"
  },
  {
      "number": 120,
      "date": "2009-04-30T04:00:00.000Z",
      "title": "The Continuing Adventures of Bulldog and the Dude",
      "length": "1:41",
      "videoid": "https://www.youtube.com/watch?v=Mj1XlFVUURk"
  },
  {
      "number": 121,
      "date": "2009-05-01T04:00:00.000Z",
      "title": "To: Sarah and Mike From: Meredith \nand Adam re: Sorry About your bikes",
      "length": "1:11",
      "videoid": "https://www.youtube.com/watch?v=AHafu9FjIcE"
  },
  {
      "number": 122,
      "date": "2009-05-02T04:00:00.000Z",
      "title": "Happy Birthday Shaista",
      "length": "2:23",
      "videoid": "https://www.youtube.com/watch?v=7hMjEwUcceg"
  },
  {
      "number": 123,
      "date": "2009-05-03T04:00:00.000Z",
      "title": "We Are Pattern Machines",
      "length": "2:18",
      "videoid": "https://www.youtube.com/watch?v=6oYXzpkRJME"
  },
  {
      "number": 124,
      "date": "2009-05-04T04:00:00.000Z",
      "title": "Hey, Miss California",
      "length": "2:34",
      "videoid": "https://www.youtube.com/watch?v=G-wKnV_ZTbo"
  },
  {
      "number": 125,
      "date": "2009-05-05T04:00:00.000Z",
      "title": "You Deserve a Bank Like This",
      "length": "1:12",
      "videoid": "https://www.youtube.com/watch?v=C2a1UfbV7G0"
  },
  {
      "number": 126,
      "date": "2009-05-06T04:00:00.000Z",
      "title": "BIrthday Song for Mimi Hughes",
      "length": "1:46",
      "videoid": "https://www.youtube.com/watch?v=5XcB67lzAMM"
  },
  {
      "number": 127,
      "date": "2009-05-07T04:00:00.000Z",
      "title": "Don't Give in to Madness",
      "length": "2:39",
      "videoid": "https://www.youtube.com/watch?v=eXYrUSMJlrw"
  },
  {
      "number": 128,
      "date": "2009-05-08T04:00:00.000Z",
      "title": "The Pitch",
      "length": "2:12",
      "videoid": "https://www.youtube.com/watch?v=-AxfNHQd-sY"
  },
  {
      "number": 129,
      "date": "2009-05-09T04:00:00.000Z",
      "title": "Roll My Kroalnos Home",
      "length": "2:16",
      "videoid": "https://www.youtube.com/watch?v=NpAd2uG6CHk"
  },
  {
      "number": 130,
      "date": "2009-05-10T04:00:00.000Z",
      "title": "Flying to Vienna Pt 1",
      "length": "0:59",
      "videoid": "https://www.youtube.com/watch?v=07uO6bEpbWc"
  },
  {
      "number": 131,
      "date": "2009-05-11T04:00:00.000Z",
      "title": "Flying to Vienna Pt 2",
      "length": "0:56",
      "videoid": "https://www.youtube.com/watch?v=waMjI15_USw"
  },
  {
      "number": 132,
      "date": "2009-05-12T04:00:00.000Z",
      "title": "GameDeals Theme",
      "length": "0:36",
      "videoid": "https://www.youtube.com/watch?v=g_7zrWaN3oc"
  },
  {
      "number": 133,
      "date": "2009-05-13T04:00:00.000Z",
      "title": "Springtime in Vienna",
      "length": "2:49",
      "videoid": "https://www.youtube.com/watch?v=bh7qn8hBpeo"
  },
  {
      "number": 134,
      "date": "2009-05-14T04:00:00.000Z",
      "title": "Why Do Potatoes Argue?",
      "length": "1:05",
      "videoid": "https://www.youtube.com/watch?v=aZoUK8jtgbo"
  },
  {
      "number": 135,
      "date": "2009-05-15T04:00:00.000Z",
      "title": "If You're Gonna Do It (Do It Yourself)",
      "length": "2:36",
      "videoid": "https://www.youtube.com/watch?v=2qNC7kadXHk"
  },
  {
      "number": 136,
      "date": "2009-05-16T04:00:00.000Z",
      "title": "Old Man Sleeping By the Side of the Road",
      "length": "2:04",
      "videoid": "https://www.youtube.com/watch?v=UIIzeUAE5ds"
  },
  {
      "number": 137,
      "date": "2009-05-17T04:00:00.000Z",
      "title": "There's a Hole in His Hat",
      "length": "1:45",
      "videoid": "https://www.youtube.com/watch?v=txSXoLerzRc"
  },
  {
      "number": 138,
      "date": "2009-05-18T04:00:00.000Z",
      "title": "Who Will Remain (2009)",
      "length": "3:34",
      "videoid": "https://www.youtube.com/watch?v=DNUs-sJYsDc"
  },
  {
      "number": 139,
      "date": "2009-05-19T04:00:00.000Z",
      "title": "The Botanical Gardens of the Univeristy of Vienna",
      "length": "2:29",
      "videoid": "https://www.youtube.com/watch?v=g5M2Vm58r0w"
  },
  {
      "number": 140,
      "date": "2009-05-20T04:00:00.000Z",
      "title": "Frodo Uses the Hobbit ATM",
      "length": "2:15",
      "videoid": "https://www.youtube.com/watch?v=_jotZWp0398"
  },
  {
      "number": 141,
      "date": "2009-05-21T04:00:00.000Z",
      "title": "A Sleepy German Train Ride",
      "length": "1:11",
      "videoid": "https://www.youtube.com/watch?v=vG38JS5SVj0"
  },
  {
      "number": 142,
      "date": "2009-05-22T04:00:00.000Z",
      "title": "What Are They Gonna Do?",
      "length": "3:54",
      "videoid": "https://www.youtube.com/watch?v=jVQovH2QTAQ"
  },
  {
      "number": 143,
      "date": "2009-05-23T04:00:00.000Z",
      "title": "The CCC Anthem",
      "length": "1:11",
      "videoid": "https://www.youtube.com/watch?v=EgHtBA-h5xo"
  },
  {
      "number": 144,
      "date": "2009-05-24T04:00:00.000Z",
      "title": "Tarsiers Are My Friends",
      "length": "3:34",
      "videoid": "https://www.youtube.com/watch?v=skAWxChA2HU"
  },
  {
      "number": 145,
      "date": "2009-05-25T04:00:00.000Z",
      "title": "Meditation on Friends in the Key of G",
      "length": "3:19",
      "videoid": "https://www.youtube.com/watch?v=Ordtl30Vd7s"
  },
  {
      "number": 146,
      "date": "2009-05-26T04:00:00.000Z",
      "title": "Floating Orb in Flame",
      "length": "1:11",
      "videoid": "https://www.youtube.com/watch?v=SWwBDvRUhfo"
  },
  {
      "number": 147,
      "date": "2009-05-27T04:00:00.000Z",
      "title": "Goodbye Vodka, Voddy",
      "length": "2:12",
      "videoid": "https://www.youtube.com/watch?v=QMliaYkuKv0"
  },
  {
      "number": 148,
      "date": "2009-05-28T04:00:00.000Z",
      "title": "The Smog Gets Thicker",
      "length": "1:48",
      "videoid": "https://www.youtube.com/watch?v=fNDbEnetYuw"
  },
  {
      "number": 149,
      "date": "2009-05-29T04:00:00.000Z",
      "title": "Terror at Arkham (Arkham Horror: a True Story)",
      "length": "3:45",
      "videoid": "https://www.youtube.com/watch?v=ATiFGv3rJdQ"
  },
  {
      "number": 150,
      "date": "2009-05-30T04:00:00.000Z",
      "title": "Gladiator Meow",
      "length": "3:36",
      "videoid": "https://www.youtube.com/watch?v=kN6Q-UEPQe0"
  },
  {
      "number": 151,
      "date": "2009-05-31T04:00:00.000Z",
      "title": "A Letter to the Killer of George Tiller",
      "length": "2:39",
      "videoid": "https://www.youtube.com/watch?v=jYnggj-E92k"
  },
  {
      "number": 152,
      "date": "2009-06-01T04:00:00.000Z",
      "title": "Bandcamp.com Anthem",
      "length": "2:13",
      "videoid": "https://www.youtube.com/watch?v=B-KvxhEA6yA"
  },
  {
      "number": 153,
      "date": "2009-06-02T04:00:00.000Z",
      "title": "Half Drunk Mugs of Tea",
      "length": "2:29",
      "videoid": "https://www.youtube.com/watch?v=K2pWG8dkWys"
  },
  {
      "number": 154,
      "date": "2009-06-03T04:00:00.000Z",
      "title": "Saved By the Bell Again",
      "length": "1:55",
      "videoid": "https://www.youtube.com/watch?v=LOyW9H60n4Q"
  },
  {
      "number": 155,
      "date": "2009-06-04T04:00:00.000Z",
      "title": "Don't Throw My Shoe at Me",
      "length": "3:08",
      "videoid": "https://www.youtube.com/watch?v=r5YKhCp9VM8"
  },
  {
      "number": 156,
      "date": "2009-06-05T04:00:00.000Z",
      "title": "This Here is a Subscribe Drive",
      "length": "3:17",
      "videoid": "https://www.youtube.com/watch?v=9PdVmitdUXU"
  },
  {
      "number": 157,
      "date": "2009-06-06T04:00:00.000Z",
      "title": "Whiskey the Cat (And Other Songs)",
      "length": "4:23",
      "videoid": "https://www.youtube.com/watch?v=0auEaoEbfJ4"
  },
  {
      "number": 158,
      "date": "2009-06-07T04:00:00.000Z",
      "title": "Living My Life",
      "length": "2:04",
      "videoid": "https://www.youtube.com/watch?v=DtmgYhxoQAE"
  },
  {
      "number": 159,
      "date": "2009-06-08T04:00:00.000Z",
      "title": "Beautiful Way to Live",
      "length": "2:31",
      "videoid": "https://www.youtube.com/watch?v=GncGEr1I2n8"
  },
  {
      "number": 160,
      "date": "2009-06-09T04:00:00.000Z",
      "title": "I Wanna Go Where the Wild Things Are",
      "length": "2:32",
      "videoid": "https://www.youtube.com/watch?v=l1gSKUJrZU0"
  },
  {
      "number": 161,
      "date": "2009-06-10T04:00:00.000Z",
      "title": "Freakonomics",
      "length": "2:33",
      "videoid": "https://www.youtube.com/watch?v=gtaQQjadPjI"
  },
  {
      "number": 162,
      "date": "2009-06-11T04:00:00.000Z",
      "title": "Isaac Newton Was a Total Badass",
      "length": "2:40",
      "videoid": "https://www.youtube.com/watch?v=LVHNHPliBoQ"
  },
  {
      "number": 163,
      "date": "2009-06-12T04:00:00.000Z",
      "title": "Joy and Freedom",
      "length": "2:51",
      "videoid": "https://www.youtube.com/watch?v=_s8qpYYSGes"
  },
  {
      "number": 164,
      "date": "2009-06-13T04:00:00.000Z",
      "title": "We've Been Cooking All Day",
      "length": "0:50",
      "videoid": "https://www.youtube.com/watch?v=l3j8zAIxvqA"
  },
  {
      "number": 165,
      "date": "2009-06-14T04:00:00.000Z",
      "title": "I Will Follow You",
      "length": "1:50",
      "videoid": "https://www.youtube.com/watch?v=ruiLkgdPvn8"
  },
  {
      "number": 166,
      "date": "2009-06-15T04:00:00.000Z",
      "title": "Matthias Jamison-Koenig",
      "length": "1:34",
      "videoid": "https://www.youtube.com/watch?v=yM1xPZsDNcw"
  },
  {
      "number": 167,
      "date": "2009-06-16T04:00:00.000Z",
      "title": "Keep Rocking, Iran",
      "length": "2:01",
      "videoid": "https://www.youtube.com/watch?v=74vFgvJqJHE"
  },
  {
      "number": 168,
      "date": "2009-06-17T04:00:00.000Z",
      "title": "I Quit!",
      "length": "1:41",
      "videoid": "https://www.youtube.com/watch?v=RqgthhAzrlQ"
  },
  {
      "number": 169,
      "date": "2009-06-18T04:00:00.000Z",
      "title": "Vegetables",
      "length": "1:21",
      "videoid": "https://www.youtube.com/watch?v=LPQf64JTUMI"
  },
  {
      "number": 170,
      "date": "2009-06-19T04:00:00.000Z",
      "title": "The Day Kangaroos Didn't Hop",
      "length": "1:31",
      "videoid": "https://www.youtube.com/watch?v=vfe9rwlFgTY"
  },
  {
      "number": 171,
      "date": "2009-06-20T04:00:00.000Z",
      "title": "What You Think It is",
      "length": "2:31",
      "videoid": "https://www.youtube.com/watch?v=rPUsA7U3n2c"
  },
  {
      "number": 172,
      "date": "2009-06-21T04:00:00.000Z",
      "title": "We Don't Change",
      "length": "1:38",
      "videoid": "https://www.youtube.com/watch?v=zw8YWXMyUjw"
  },
  {
      "number": 173,
      "date": "2009-06-22T04:00:00.000Z",
      "title": "There's So Much to Know",
      "length": "3:33",
      "videoid": "https://www.youtube.com/watch?v=wO3RaI7wY9c"
  },
  {
      "number": 174,
      "date": "2009-06-23T04:00:00.000Z",
      "title": "The Rose of Hillside",
      "length": "3:10",
      "videoid": "https://www.youtube.com/watch?v=XOMp-GJiLpA"
  },
  {
      "number": 175,
      "date": "2009-06-24T04:00:00.000Z",
      "title": "You Stole My Money",
      "length": "1:27",
      "videoid": "https://www.youtube.com/watch?v=P15kjB-n6QI"
  },
  {
      "number": 176,
      "date": "2009-06-25T04:00:00.000Z",
      "title": "Happy Birthday, Adrian",
      "length": "1:28",
      "videoid": "https://www.youtube.com/watch?v=iQfC0XGc1Yg"
  },
  {
      "number": 177,
      "date": "2009-06-26T04:00:00.000Z",
      "title": "I Used to Worship Michael Jackson",
      "length": "2:58",
      "videoid": "https://www.youtube.com/watch?v=rK7U_iNvH18"
  },
  {
      "number": 178,
      "date": "2009-06-27T04:00:00.000Z",
      "title": "The King Has a Bottom",
      "length": "2:27",
      "videoid": "https://www.youtube.com/watch?v=eSIb-scnlwM"
  },
  {
      "number": 179,
      "date": "2009-06-28T04:00:00.000Z",
      "title": "Words Stuck",
      "length": "2:30",
      "videoid": "https://www.youtube.com/watch?v=o6TRmdmIRGQ"
  },
  {
      "number": 180,
      "date": "2009-06-29T04:00:00.000Z",
      "title": "Down, Down, Down",
      "length": "1:48",
      "videoid": "https://www.youtube.com/watch?v=-KVb0uWXuDk"
  },
  {
      "number": 181,
      "date": "2009-06-30T04:00:00.000Z",
      "title": "Take Medium Steps",
      "length": "1:45",
      "videoid": "https://www.youtube.com/watch?v=igChYNFQHNE"
  },
  {
      "number": 182,
      "date": "2009-07-01T04:00:00.000Z",
      "title": "We'll All Be Fools",
      "length": "2:28",
      "videoid": "https://www.youtube.com/watch?v=pHISoIixUPk"
  },
  {
      "number": 183,
      "date": "2009-07-02T04:00:00.000Z",
      "title": "Steve Rouse Song",
      "length": "2:11",
      "videoid": "https://www.youtube.com/watch?v=SBXkvQ350xU"
  },
  {
      "number": 184,
      "date": "2009-07-03T04:00:00.000Z",
      "title": "The Book of the New Sun",
      "length": "3:58",
      "videoid": "https://www.youtube.com/watch?v=80JrlYzUJqY"
  },
  {
      "number": 185,
      "date": "2009-07-04T04:00:00.000Z",
      "title": "I've Been Trying to Sneeze for 24 Hours",
      "length": "1:46",
      "videoid": "https://www.youtube.com/watch?v=zGPel3z-MJg"
  },
  {
      "number": 186,
      "date": "2009-07-05T04:00:00.000Z",
      "title": "Palin's Resignation Speech in Song",
      "length": "2:13",
      "videoid": "https://www.youtube.com/watch?v=1TJX310iGR8"
  },
  {
      "number": 187,
      "date": "2009-07-06T04:00:00.000Z",
      "title": "If Your Love is on Fire",
      "length": "2:18",
      "videoid": "https://www.youtube.com/watch?v=QQP598TPGPY"
  },
  {
      "number": 188,
      "date": "2009-07-07T04:00:00.000Z",
      "title": "Colors and Light",
      "length": "2:16",
      "videoid": "https://www.youtube.com/watch?v=AU8JJjmwL0w"
  },
  {
      "number": 189,
      "date": "2009-07-08T04:00:00.000Z",
      "title": "Hunchback With a Dirty Mind",
      "length": "2:33",
      "videoid": "https://www.youtube.com/watch?v=peswE5IScyc"
  },
  {
      "number": 190,
      "date": "2009-07-09T04:00:00.000Z",
      "title": "Time for Summer Now",
      "length": "3:26",
      "videoid": "https://www.youtube.com/watch?v=cCzBQkKc7-s"
  },
  {
      "number": 191,
      "date": "2009-07-10T04:00:00.000Z",
      "title": "Mint Magician",
      "length": "3:12",
      "videoid": "https://www.youtube.com/watch?v=73aLfnZ4qO8"
  },
  {
      "number": 192,
      "date": "2009-07-11T04:00:00.000Z",
      "title": "I'm From Vermont",
      "length": "2:06",
      "videoid": "https://www.youtube.com/watch?v=Ja9qJlRnug4"
  },
  {
      "number": 193,
      "date": "2009-07-12T04:00:00.000Z",
      "title": "Myspace is a Ghost Town",
      "length": "1:00",
      "videoid": "https://www.youtube.com/watch?v=Cqs081D3KqY"
  },
  {
      "number": 194,
      "date": "2009-07-13T04:00:00.000Z",
      "title": "When Harry Met Ginny",
      "length": "3:07",
      "videoid": "https://www.youtube.com/watch?v=YgAvbr9Gii0"
  },
  {
      "number": 195,
      "date": "2009-07-14T04:00:00.000Z",
      "title": "Do the Monster Dance",
      "length": "1:09",
      "videoid": "https://www.youtube.com/watch?v=Okp7xBZFJ2Q"
  },
  {
      "number": 196,
      "date": "2009-07-15T04:00:00.000Z",
      "title": "Running Through the internet",
      "length": "2:12",
      "videoid": "https://www.youtube.com/watch?v=Weka7PdYEtw"
  },
  {
      "number": 197,
      "date": "2009-07-16T04:00:00.000Z",
      "title": "Baby, It All Led to You (An Evolutionary Love Song)",
      "length": "4:08",
      "videoid": "https://www.youtube.com/watch?v=CdokrUCr7-k"
  },
  {
      "number": 198,
      "date": "2009-07-17T04:00:00.000Z",
      "title": "The LIttle Prince",
      "length": "2:16",
      "videoid": "https://www.youtube.com/watch?v=PMSflgS_Y2M"
  },
  {
      "number": 199,
      "date": "2009-07-18T04:00:00.000Z",
      "title": "200 Songs",
      "length": "0:59",
      "videoid": "https://www.youtube.com/watch?v=optclFyzDnA"
  },
  {
      "number": 200,
      "date": "2009-07-19T04:00:00.000Z",
      "title": "Pictures of Plenty",
      "length": "2:05",
      "videoid": "https://www.youtube.com/watch?v=GwjVeqKeep4"
  },
  {
      "number": 201,
      "date": "2009-07-20T04:00:00.000Z",
      "title": "Bing Goes the internet",
      "length": "1:13",
      "videoid": "https://www.youtube.com/my_videos?o=U&pi=75"
  },
  {
      "number": 202,
      "date": "2009-07-21T04:00:00.000Z",
      "title": "I am a Crazy Piccachu",
      "length": "1:35",
      "videoid": "https://www.youtube.com/watch?v=eocDr_8BW_Y"
  },
  {
      "number": 203,
      "date": "2009-07-22T04:00:00.000Z",
      "title": "Bike Love",
      "length": "1:49",
      "videoid": "https://www.youtube.com/watch?v=TAlhgKWEqWE"
  },
  {
      "number": 204,
      "date": "2009-07-23T04:00:00.000Z",
      "title": "Commondreams.org",
      "length": "1:07",
      "videoid": "https://www.youtube.com/watch?v=j7lF18vQ5HI"
  },
  {
      "number": 205,
      "date": "2009-07-24T04:00:00.000Z",
      "title": "Look at That Deer, Licking That Cat",
      "length": "2:03",
      "videoid": "https://www.youtube.com/watch?v=vR-vY5fzTeA"
  },
  {
      "number": 206,
      "date": "2009-07-25T04:00:00.000Z",
      "title": "The Robots Don't Love You Anymore",
      "length": "1:51",
      "videoid": "https://www.youtube.com/watch?v=JflvA6n86Wk"
  },
  {
      "number": 207,
      "date": "2009-07-26T04:00:00.000Z",
      "title": "Ocean",
      "length": "1:44",
      "videoid": "https://www.youtube.com/watch?v=G1YC_fTssUQ"
  },
  {
      "number": 208,
      "date": "2009-07-27T04:00:00.000Z",
      "title": "The Kind of Song You'd Hear in a 90s Noir B-Movie",
      "length": "3:30",
      "videoid": "https://www.youtube.com/watch?v=NGCO-9ziY4I"
  },
  {
      "number": 209,
      "date": "2009-07-28T04:00:00.000Z",
      "title": "Two Chords",
      "length": "1:21",
      "videoid": "https://www.youtube.com/watch?v=UY31lHRJwfY"
  },
  {
      "number": 210,
      "date": "2009-07-29T04:00:00.000Z",
      "title": "Games and Sounds",
      "length": "1:09",
      "videoid": "https://www.youtube.com/watch?v=IQDXq2zpBCI"
  },
  {
      "number": 211,
      "date": "2009-07-30T04:00:00.000Z",
      "title": "Gone Like the Dodo",
      "length": "2:17",
      "videoid": "https://www.youtube.com/watch?v=sxjkIgsppwc"
  },
  {
      "number": 212,
      "date": "2009-07-31T04:00:00.000Z",
      "title": "Time Capsule",
      "length": "1:27",
      "videoid": "https://www.youtube.com/watch?v=F02hhkUDhuI"
  },
  {
      "number": 213,
      "date": "2009-08-01T04:00:00.000Z",
      "title": "Nic Kaelin",
      "length": "1:16",
      "videoid": "https://www.youtube.com/watch?v=QHcF-qwEs_M"
  },
  {
      "number": 214,
      "date": "2009-08-02T04:00:00.000Z",
      "title": "Life With Cha Cha is in Sonic Technicolor",
      "length": "2:15",
      "videoid": "https://www.youtube.com/watch?v=012_5is488Y"
  },
  {
      "number": 215,
      "date": "2009-08-03T04:00:00.000Z",
      "title": "Let Your Ears Decide",
      "length": "1:30",
      "videoid": "https://www.youtube.com/watch?v=5jR84NTwRF4"
  },
  {
      "number": 216,
      "date": "2009-08-04T04:00:00.000Z",
      "title": "Wash Your Hands!",
      "length": "0:30",
      "videoid": "https://www.youtube.com/watch?v=bT-Ktx8Qpc0"
  },
  {
      "number": 217,
      "date": "2009-08-05T04:00:00.000Z",
      "title": "I am MG Siegler",
      "length": "0:58",
      "videoid": "https://www.youtube.com/watch?v=ybsRCQy_3xQ"
  },
  {
      "number": 218,
      "date": "2009-08-06T04:00:00.000Z",
      "title": "The Big Picture With David Shuster",
      "length": "1:46",
      "videoid": "https://www.youtube.com/watch?v=wySpD3mUx2M"
  },
  {
      "number": 219,
      "date": "2009-08-07T04:00:00.000Z",
      "title": "That Dastardly Villian, MG",
      "length": "1:29",
      "videoid": "https://www.youtube.com/watch?v=DxYlmF2NV2E"
  },
  {
      "number": 220,
      "date": "2009-08-08T04:00:00.000Z",
      "title": "I Wrote the Worst Jingle in the World",
      "length": "1:02",
      "videoid": "https://www.youtube.com/watch?v=1ikv048WI7E"
  },
  {
      "number": 221,
      "date": "2009-08-09T04:00:00.000Z",
      "title": "Do It, Screw It",
      "length": "1:14",
      "videoid": "https://www.youtube.com/watch?v=NJrFXJmCpg8"
  },
  {
      "number": 222,
      "date": "2009-08-10T04:00:00.000Z",
      "title": "SkyDiving Through Groupon.com",
      "length": "1:52",
      "videoid": "https://www.youtube.com/watch?v=YfGhZTWgD8g"
  },
  {
      "number": 223,
      "date": "2009-08-11T04:00:00.000Z",
      "title": "Courseopedia.com",
      "length": "1:14",
      "videoid": "https://www.youtube.com/watch?v=rbxTCnSAmqc"
  },
  {
      "number": 224,
      "date": "2009-08-12T04:00:00.000Z",
      "title": "Bamboo Solutions",
      "length": "1:41",
      "videoid": "https://www.youtube.com/watch?v=hfIFVV3TSzo"
  },
  {
      "number": 225,
      "date": "2009-08-13T04:00:00.000Z",
      "title": "Man Did What Some Birds Could Never Do",
      "length": "1:08",
      "videoid": "https://www.youtube.com/watch?v=wYSd19nxH8c"
  },
  {
      "number": 226,
      "date": "2009-08-14T04:00:00.000Z",
      "title": "Fox News is Bad for the Country",
      "length": "2:09",
      "videoid": "https://www.youtube.com/watch?v=6ZdUCtBd2mA"
  },
  {
      "number": 227,
      "date": "2009-08-15T04:00:00.000Z",
      "title": "InFolinks",
      "length": "1:24",
      "videoid": "https://www.youtube.com/watch?v=xNz3xpsUoX4"
  },
  {
      "number": 228,
      "date": "2009-08-16T04:00:00.000Z",
      "title": "The King of Monkeys, Gnomes and Nacho Cheese",
      "length": "0:40",
      "videoid": "https://www.youtube.com/watch?v=DqqeLoWxmYM"
  },
  {
      "number": 229,
      "date": "2009-08-17T04:00:00.000Z",
      "title": "What Are You So Angry About?",
      "length": "1:49",
      "videoid": "https://www.youtube.com/watch?v=g-LTwDqUJ4c"
  },
  {
      "number": 230,
      "date": "2009-08-18T04:00:00.000Z",
      "title": "Please Vote for Me",
      "length": "0:53",
      "videoid": "https://www.youtube.com/watch?v=_s-gegtqBEU"
  },
  {
      "number": 231,
      "date": "2009-08-19T04:00:00.000Z",
      "title": "Tiki the Puppy",
      "length": "0:40",
      "videoid": "https://www.youtube.com/watch?v=M0FSneMDbSU"
  },
  {
      "number": 232,
      "date": "2009-08-20T04:00:00.000Z",
      "title": "Funny Hat",
      "length": "0:57",
      "videoid": "https://www.youtube.com/watch?v=Dmz4NhmbMdQ"
  },
  {
      "number": 233,
      "date": "2009-08-21T04:00:00.000Z",
      "title": "Pop Music",
      "length": "2:25",
      "videoid": "https://www.youtube.com/watch?v=vKszq7olUIo"
  },
  {
      "number": 234,
      "date": "2009-08-22T04:00:00.000Z",
      "title": "Happy Anniversary the Cat Has Kidney Failure",
      "length": "2:20",
      "videoid": "https://www.youtube.com/watch?v=8Eg-uwlephE"
  },
  {
      "number": 235,
      "date": "2009-08-23T04:00:00.000Z",
      "title": "I am Just a Shadow",
      "length": "1:16",
      "videoid": "https://www.youtube.com/watch?v=vLizXeF8RIs"
  },
  {
      "number": 236,
      "date": "2009-08-24T04:00:00.000Z",
      "title": "Lucky",
      "length": "1:47",
      "videoid": "https://www.youtube.com/watch?v=vLizXeF8RIs"
  },
  {
      "number": 237,
      "date": "2009-08-25T04:00:00.000Z",
      "title": "Epuls.pl Anthem",
      "length": "1:39",
      "videoid": "https://www.youtube.com/watch?v=UxqG1HV34ag"
  },
  {
      "number": 238,
      "date": "2009-08-26T04:00:00.000Z",
      "title": "GPS With Bob Dylan",
      "length": "2:10",
      "videoid": "https://www.youtube.com/watch?v=wzbka8mwQYI"
  },
  {
      "number": 239,
      "date": "2009-08-27T04:00:00.000Z",
      "title": "I Don't Want to Compete",
      "length": "1:39",
      "videoid": "https://www.youtube.com/watch?v=QWNAUAFb3Ik"
  },
  {
      "number": 240,
      "date": "2009-08-28T04:00:00.000Z",
      "title": "TIRED",
      "length": "0:40",
      "videoid": "https://www.youtube.com/watch?v=ixlPXLHpQe4"
  },
  {
      "number": 241,
      "date": "2009-08-29T04:00:00.000Z",
      "title": "Goodbye JewFro, Hello Cleanface",
      "length": "0:36",
      "videoid": "https://www.youtube.com/watch?v=do4n1e_1jOY"
  },
  {
      "number": 242,
      "date": "2009-08-30T04:00:00.000Z",
      "title": "This is How We Do It at Bennington",
      "length": "1:15",
      "videoid": "https://www.youtube.com/watch?v=FgcDtphKZEs"
  },
  {
      "number": 243,
      "date": "2009-08-31T04:00:00.000Z",
      "title": "I Got a New Guitar",
      "length": "1:27",
      "videoid": "https://www.youtube.com/watch?v=ujWJDnOlGJQ"
  },
  {
      "number": 244,
      "date": "2009-09-01T04:00:00.000Z",
      "title": "No Judgements",
      "length": "1:54",
      "videoid": "https://www.youtube.com/watch?v=EVQmcMmd_8Q"
  },
  {
      "number": 245,
      "date": "2009-09-02T04:00:00.000Z",
      "title": "Cisco Telepresence Anthem",
      "length": "0:53",
      "videoid": "https://www.youtube.com/watch?v=qj2hZXbPBkc"
  },
  {
      "number": 246,
      "date": "2009-09-03T04:00:00.000Z",
      "title": "No Judgements v2",
      "length": "1:34",
      "videoid": "https://www.youtube.com/watch?v=1hkJRjCm824"
  },
  {
      "number": 247,
      "date": "2009-09-04T04:00:00.000Z",
      "title": "Sometimes It's Hard to Keep Yourself Moving",
      "length": "3:14",
      "videoid": "https://www.youtube.com/watch?v=6ldrFuDqcLM"
  },
  {
      "number": 248,
      "date": "2009-09-05T04:00:00.000Z",
      "title": "Heart Overflowing",
      "length": "2:46",
      "videoid": "https://www.youtube.com/watch?v=H4tY515V83Y"
  },
  {
      "number": 249,
      "date": "2009-09-06T04:00:00.000Z",
      "title": "Bicycle Blvd",
      "length": "1:49",
      "videoid": "https://www.youtube.com/watch?v=jnWcXes5pYg"
  },
  {
      "number": 250,
      "date": "2009-09-07T04:00:00.000Z",
      "title": "At the Harley Davidson Museum",
      "length": "1:13",
      "videoid": "https://www.youtube.com/watch?v=sts6uK6x_m8"
  },
  {
      "number": 251,
      "date": "2009-09-08T04:00:00.000Z",
      "title": "Truth in Advertising",
      "length": "1:01",
      "videoid": "https://www.youtube.com/watch?v=WwcUafltTf8"
  },
  {
      "number": 252,
      "date": "2009-09-09T04:00:00.000Z",
      "title": "I've Got Another Cold",
      "length": "0:10",
      "videoid": "https://www.youtube.com/watch?v=I6Rtu2NDz44"
  },
  {
      "number": 253,
      "date": "2009-09-10T04:00:00.000Z",
      "title": "Still Sick",
      "length": "0:18",
      "videoid": "https://www.youtube.com/watch?v=MkIFPdF7vng"
  },
  {
      "number": 254,
      "date": "2009-09-11T04:00:00.000Z",
      "title": "I'm a Bit Better",
      "length": "1:05",
      "videoid": "https://www.youtube.com/watch?v=GEk2Bkbkn4A"
  },
  {
      "number": 255,
      "date": "2009-09-12T04:00:00.000Z",
      "title": "We Built a Fort",
      "length": "0:20",
      "videoid": "https://www.youtube.com/watch?v=-Scd_JZq2jk"
  },
  {
      "number": 256,
      "date": "2009-09-13T04:00:00.000Z",
      "title": "I'm Jonathan",
      "length": "1:56",
      "videoid": "https://www.youtube.com/watch?v=BebDpLN-lRg"
  },
  {
      "number": 257,
      "date": "2009-09-14T04:00:00.000Z",
      "title": "First There Was No Chair",
      "length": "1:05",
      "videoid": "https://www.youtube.com/watch?v=bJf5ZgsV5Fw"
  },
  {
      "number": 258,
      "date": "2009-09-15T04:00:00.000Z",
      "title": "Mirror Revolt",
      "length": "2:12",
      "videoid": "https://www.youtube.com/watch?v=ykmpoBCnUQE"
  },
  {
      "number": 259,
      "date": "2009-09-16T04:00:00.000Z",
      "title": "Simian Space Flight",
      "length": "3:27",
      "videoid": "https://www.youtube.com/watch?v=hMIRkgop65s"
  },
  {
      "number": 260,
      "date": "2009-09-17T04:00:00.000Z",
      "title": "Link Mann",
      "length": "3:07",
      "videoid": "https://www.youtube.com/watch?v=ouiE50FVIMc"
  },
  {
      "number": 261,
      "date": "2009-09-18T04:00:00.000Z",
      "title": "The Android Who Didn't Have a Penis",
      "length": "3:37",
      "videoid": "https://www.youtube.com/watch?v=nSru178teSY"
  },
  {
      "number": 262,
      "date": "2009-09-19T04:00:00.000Z",
      "title": "You Can Do It, Sam",
      "length": "1:35",
      "videoid": "https://www.youtube.com/watch?v=o-OHmBtcH1k"
  },
  {
      "number": 263,
      "date": "2009-09-20T04:00:00.000Z",
      "title": "The Sex Machine That Couldn't Love",
      "length": "2:02",
      "videoid": "https://www.youtube.com/watch?v=3PlhMnSlk-w"
  },
  {
      "number": 264,
      "date": "2009-09-21T04:00:00.000Z",
      "title": "The Robot That Lived on the Moon and Wished It Were Human",
      "length": "2:28",
      "videoid": "https://www.youtube.com/watch?v=XDJTTRhIrSc"
  },
  {
      "number": 265,
      "date": "2009-09-22T04:00:00.000Z",
      "title": "Quantum Decoupling Transition in a One-Dimensional \nFeschbach Resonant Super Fluid",
      "length": "2:46",
      "videoid": "https://www.youtube.com/watch?v=FIXRXMMlZBM"
  },
  {
      "number": 266,
      "date": "2009-09-23T04:00:00.000Z",
      "title": "In Heaven",
      "length": "3:07",
      "videoid": "https://www.youtube.com/watch?v=33Z5uAyPF8g"
  },
  {
      "number": 267,
      "date": "2009-09-24T04:00:00.000Z",
      "title": "The Three Rules of the internet",
      "length": "1:04",
      "videoid": "https://www.youtube.com/watch?v=HS9BlNSCmw8"
  },
  {
      "number": 268,
      "date": "2009-09-25T04:00:00.000Z",
      "title": "Death in Every instant",
      "length": "1:00",
      "videoid": "https://www.youtube.com/watch?v=woCjVts5-Ug"
  },
  {
      "number": 269,
      "date": "2009-09-26T04:00:00.000Z",
      "title": "Scary Hill",
      "length": "2:34",
      "videoid": "https://www.youtube.com/watch?v=DOp7RuJggdc"
  },
  {
      "number": 270,
      "date": "2009-09-27T04:00:00.000Z",
      "title": "Popcorn",
      "length": "2:26",
      "videoid": "https://www.youtube.com/watch?v=iVt-TfittNY"
  },
  {
      "number": 271,
      "date": "2009-09-28T04:00:00.000Z",
      "title": "Big Wall Graphics From LTLPrints.com",
      "length": "1:47",
      "videoid": "https://www.youtube.com/watch?v=AiMxiAUVKgY"
  },
  {
      "number": 272,
      "date": "2009-09-29T04:00:00.000Z",
      "title": "How to Defeat the Energy Vampire: the Song",
      "length": "0:10",
      "videoid": "https://youtu.be/UNHV67O3OdU"
  },
  {
      "number": 273,
      "date": "2009-09-30T04:00:00.000Z",
      "title": "Vulcan Smile ",
      "length": "0:24",
      "videoid": "https://www.youtube.com/watch?v=oBbBTwgDBBg"
  },
  {
      "number": 274,
      "date": "2009-10-01T04:00:00.000Z",
      "title": "Downstairs Bear",
      "length": "1:15",
      "videoid": "https://www.youtube.com/watch?v=ld1PvU8c3y8"
  },
  {
      "number": 275,
      "date": "2009-10-02T04:00:00.000Z",
      "title": "Ardipithicus Ramidus",
      "length": "2:02",
      "videoid": "https://www.youtube.com/watch?v=S-DCcrLIcL4"
  },
  {
      "number": 276,
      "date": "2009-10-03T04:00:00.000Z",
      "title": "Hard Drive It Home",
      "length": "1:36",
      "videoid": "https://www.youtube.com/watch?v=0WJGGof6iQY"
  },
  {
      "number": 277,
      "date": "2009-10-04T04:00:00.000Z",
      "title": "You and Me and the Singularity",
      "length": "2:50",
      "videoid": "https://www.youtube.com/watch?v=_OoA0AZ1gr0"
  },
  {
      "number": 278,
      "date": "2009-10-05T04:00:00.000Z",
      "title": "Sex in Space",
      "length": "2:35",
      "videoid": "https://www.youtube.com/watch?v=SHyqW-fX3_Y"
  },
  {
      "number": 279,
      "date": "2009-10-06T04:00:00.000Z",
      "title": "Nasa Bombed the Moon",
      "length": "1:45",
      "videoid": "https://www.youtube.com/watch?v=GgWFVXoT71E"
  },
  {
      "number": 280,
      "date": "2009-10-07T04:00:00.000Z",
      "title": "Pants in the Middle",
      "length": "1:54",
      "videoid": "https://www.youtube.com/watch?v=1Q3Xyo166Rg"
  },
  {
      "number": 281,
      "date": "2009-10-08T04:00:00.000Z",
      "title": "Hey, Mr. Bike Thief",
      "length": "1:47",
      "videoid": "https://www.youtube.com/watch?v=QzkP2-27kj0"
  },
  {
      "number": 282,
      "date": "2009-10-09T04:00:00.000Z",
      "title": "The LARP song",
      "length": "1:29",
      "videoid": "https://www.youtube.com/watch?v=BbsYHBFLL_4"
  },
  {
      "number": 283,
      "date": "2009-10-10T04:00:00.000Z",
      "title": "Hey, It's October",
      "length": "1:47",
      "videoid": "https://www.youtube.com/watch?v=88yXZD1MILY"
  },
  {
      "number": 284,
      "date": "2009-10-11T04:00:00.000Z",
      "title": "Hey, Little insect and Spider",
      "length": "0:45",
      "videoid": "https://www.youtube.com/watch?v=7zDb-5UiDes"
  },
  {
      "number": 285,
      "date": "2009-10-12T04:00:00.000Z",
      "title": "Nextivafax.com",
      "length": "1:25",
      "videoid": "https://www.youtube.com/watch?v=0gUDa5ZWDIk"
  },
  {
      "number": 286,
      "date": "2009-10-13T04:00:00.000Z",
      "title": "Somebody Needs Your Help",
      "length": "1:56",
      "videoid": "https://www.youtube.com/watch?v=x_nsSAzmVD0"
  },
  {
      "number": 287,
      "date": "2009-10-14T04:00:00.000Z",
      "title": "Frack the Dow Jones",
      "length": "2:25",
      "videoid": "https://www.youtube.com/watch?v=fls6is7hSTo"
  },
  {
      "number": 288,
      "date": "2009-10-15T04:00:00.000Z",
      "title": "Kickstarter.com",
      "length": "1:39",
      "videoid": "https://www.youtube.com/watch?v=gJmJkLkIv3M"
  },
  {
      "number": 289,
      "date": "2009-10-16T04:00:00.000Z",
      "title": "Just a Little More Tired",
      "length": "2:35",
      "videoid": "https://www.youtube.com/watch?v=IimlrWxSeT4"
  },
  {
      "number": 290,
      "date": "2009-10-17T04:00:00.000Z",
      "title": "Treasure island",
      "length": "4:41",
      "videoid": "https://www.youtube.com/watch?v=NcZjBEX5IW8"
  },
  {
      "number": 291,
      "date": "2009-10-18T04:00:00.000Z",
      "title": "Happy Birthday, Kelly Porter",
      "length": "1:30",
      "videoid": "https://www.youtube.com/watch?v=DnuQfhP50FM"
  },
  {
      "number": 292,
      "date": "2009-10-19T04:00:00.000Z",
      "title": "Psoriasis Cure Now Walk",
      "length": "0:30",
      "videoid": "https://www.youtube.com/watch?v=68HiJSAl8GI"
  },
  {
      "number": 293,
      "date": "2009-10-20T04:00:00.000Z",
      "title": "It's This Rain",
      "length": "3:32",
      "videoid": "https://www.youtube.com/watch?v=kPpfxu-IbsI"
  },
  {
      "number": 294,
      "date": "2009-10-21T04:00:00.000Z",
      "title": "Lashes to Riches",
      "length": "2:38",
      "videoid": "https://www.youtube.com/watch?v=IULN-Ivd5P0"
  },
  {
      "number": 295,
      "date": "2009-10-22T04:00:00.000Z",
      "title": "Beer Pong",
      "length": "2:32",
      "videoid": "https://www.youtube.com/watch?v=QP_MC1slwjw"
  },
  {
      "number": 296,
      "date": "2009-10-23T04:00:00.000Z",
      "title": "Who Needs Sleep",
      "length": "2:43",
      "videoid": "https://www.youtube.com/watch?v=AxyxiJ0gC1g"
  },
  {
      "number": 297,
      "date": "2009-10-24T04:00:00.000Z",
      "title": "I'm a Bird, You're a Bird, Let's Get It On",
      "length": "0:53",
      "videoid": "https://www.youtube.com/watch?v=zNtRinamudU"
  },
  {
      "number": 298,
      "date": "2009-10-25T04:00:00.000Z",
      "title": "Jesus Said",
      "length": "2:42",
      "videoid": "https://www.youtube.com/watch?v=uiU69lxypxM"
  },
  {
      "number": 299,
      "date": "2009-10-26T04:00:00.000Z",
      "title": "NoSweatApparel.com",
      "length": "1:48",
      "videoid": "https://www.youtube.com/watch?v=Tep4EH-_BTU"
  },
  {
      "number": 300,
      "date": "2009-10-27T04:00:00.000Z",
      "title": "I Never Promised",
      "length": "1:47",
      "videoid": "https://www.youtube.com/watch?v=gUb8Idr8giU"
  },
  {
      "number": 301,
      "date": "2009-10-28T04:00:00.000Z",
      "title": "Airplane to Tomorrow",
      "length": "3:09",
      "videoid": "https://www.youtube.com/watch?v=13t6jrHQrPQ"
  },
  {
      "number": 302,
      "date": "2009-10-29T04:00:00.000Z",
      "title": "Creature of Habit",
      "length": "1:56",
      "videoid": "https://www.youtube.com/watch?v=z_IhAVoH1lQ"
  },
  {
      "number": 303,
      "date": "2009-10-30T04:00:00.000Z",
      "title": "Keith Valley Middle School",
      "length": "1:35",
      "videoid": "https://www.youtube.com/watch?v=P2OBWAgP8gA"
  },
  {
      "number": 304,
      "date": "2009-10-31T04:00:00.000Z",
      "title": "I'm Tired Halloween Weirdness",
      "length": "2:21",
      "videoid": "https://www.youtube.com/watch?v=juu6TeGh9RA"
  },
  {
      "number": 305,
      "date": "2009-11-01T04:00:00.000Z",
      "title": "To Lon Harris Who Called Me Creepy",
      "length": "2:31",
      "videoid": "https://www.youtube.com/watch?v=WPWTcLcpFYE"
  },
  {
      "number": 306,
      "date": "2009-11-02T05:00:00.000Z",
      "title": "Cloud Computing for Beginners",
      "length": "1:50",
      "videoid": "https://www.youtube.com/watch?v=n-mtkeaecN0"
  },
  {
      "number": 307,
      "date": "2009-11-03T05:00:00.000Z",
      "title": "I am Just a Messanger",
      "length": "3:19",
      "videoid": "https://www.youtube.com/watch?v=P1lLTyHfLb8"
  },
  {
      "number": 308,
      "date": "2009-11-04T05:00:00.000Z",
      "title": "Spell Or Prayer",
      "length": "3:21",
      "videoid": "https://www.youtube.com/watch?v=SJMxzXCXeVU"
  },
  {
      "number": 309,
      "date": "2009-11-05T05:00:00.000Z",
      "title": "It May Feel Like Everythings the Same",
      "length": "2:21",
      "videoid": "https://www.youtube.com/watch?v=U-dvV5K1MEo"
  },
  {
      "number": 310,
      "date": "2009-11-06T05:00:00.000Z",
      "title": "The Large Hadron Collider Still Doesn't Work",
      "length": "1:33",
      "videoid": "https://www.youtube.com/watch?v=PqBcDQn7KsA"
  },
  {
      "number": 311,
      "date": "2009-11-07T05:00:00.000Z",
      "title": "Show Me Your Dorito Face",
      "length": "0:30",
      "videoid": "https://www.youtube.com/watch?v=JyuMoXHsvvc"
  },
  {
      "number": 312,
      "date": "2009-11-08T05:00:00.000Z",
      "title": "I am All Alone",
      "length": "2:22",
      "videoid": "https://www.youtube.com/watch?v=lMZ69vndWrA"
  },
  {
      "number": 313,
      "date": "2009-11-09T05:00:00.000Z",
      "title": "Cry, oh Cry, Boo-Hoo So Sad",
      "length": "2:25",
      "videoid": "https://www.youtube.com/watch?v=5JyhYgfsejQ"
  },
  {
      "number": 314,
      "date": "2009-11-10T05:00:00.000Z",
      "title": "Winning Feels Good, Losing Feels Bad",
      "length": "0:25",
      "videoid": "https://www.youtube.com/watch?v=u0L_5Xvn8Ww"
  },
  {
      "number": 315,
      "date": "2009-11-11T05:00:00.000Z",
      "title": "20 minutes With the President",
      "length": "5:45",
      "videoid": "https://www.youtube.com/watch?v=ilB_5R6xSJA"
  },
  {
      "number": 316,
      "date": "2009-11-12T05:00:00.000Z",
      "title": "Mr. Barry Screwskull, Number Six Hundred and Twelve",
      "length": "5:46",
      "videoid": "https://www.youtube.com/watch?v=4oeaBCQYUzs"
  },
  {
      "number": 317,
      "date": "2009-11-13T05:00:00.000Z",
      "title": "The Beating of a Single Heart",
      "length": "2:57",
      "videoid": "https://www.youtube.com/watch?v=AalyJ_UvC_4"
  },
  {
      "number": 318,
      "date": "2009-11-14T05:00:00.000Z",
      "title": "Song a Day, Saturday",
      "length": "1:30",
      "videoid": "https://www.youtube.com/watch?v=yu-ZJE2tOo0"
  },
  {
      "number": 319,
      "date": "2009-11-15T05:00:00.000Z",
      "title": "Sunday Evening Sad, Slow Song",
      "length": "2:14",
      "videoid": "https://www.youtube.com/watch?v=eIzZU0k1h-Y"
  },
  {
      "number": 320,
      "date": "2009-11-16T05:00:00.000Z",
      "title": "A Wonderful Pistcachio Discovery",
      "length": "0:30",
      "videoid": "https://www.youtube.com/watch?v=gsGQLWA29a0"
  },
  {
      "number": 321,
      "date": "2009-11-17T05:00:00.000Z",
      "title": "The Story of Wandering Fall, Act 1, introdruction",
      "length": "0:46",
      "videoid": "https://www.youtube.com/watch?v=FNcjBZAvLR4"
  },
  {
      "number": 322,
      "date": "2009-11-18T05:00:00.000Z",
      "title": "Wandering the Universe",
      "length": "0:40",
      "videoid": "https://www.youtube.com/watch?v=lQhz4aonf84"
  },
  {
      "number": 323,
      "date": "2009-11-19T05:00:00.000Z",
      "title": "At the Edge of the Universe",
      "length": "0:43",
      "videoid": "https://www.youtube.com/watch?v=Sn6hfDT9FTU"
  },
  {
      "number": 324,
      "date": "2009-11-20T05:00:00.000Z",
      "title": "And With a Name...",
      "length": "0:43",
      "videoid": "https://www.youtube.com/watch?v=0_xaRMdRgS0"
  },
  {
      "number": 325,
      "date": "2009-11-21T05:00:00.000Z",
      "title": "I am Alone",
      "length": "0:46",
      "videoid": "https://www.youtube.com/watch?v=DjFt3976STY"
  },
  {
      "number": 326,
      "date": "2009-11-22T05:00:00.000Z",
      "title": "Contact",
      "length": "0:45",
      "videoid": "https://www.youtube.com/watch?v=hBsyimOgLDQ"
  },
  {
      "number": 327,
      "date": "2009-11-23T05:00:00.000Z",
      "title": "The Story of Wandering Fall, Act 1, Recap",
      "length": "2:52",
      "videoid": "https://www.youtube.com/watch?v=Fu9tgu8OULc"
  },
  {
      "number": 328,
      "date": "2009-11-24T05:00:00.000Z",
      "title": "Cold Feet",
      "length": "2:02",
      "videoid": "https://www.youtube.com/watch?v=aVIBfAvQ0bw"
  },
  {
      "number": 329,
      "date": "2009-11-25T05:00:00.000Z",
      "title": "Get Your Hand Out of the Hunny Pot",
      "length": "2:52",
      "videoid": "https://www.youtube.com/watch?v=SfHLCjzM4aQ"
  },
  {
      "number": 330,
      "date": "2009-11-26T05:00:00.000Z",
      "title": "Zombie Turkey",
      "length": "2:32",
      "videoid": "https://www.youtube.com/watch?v=fD_xNc_Wzlw"
  },
  {
      "number": 331,
      "date": "2009-11-27T05:00:00.000Z",
      "title": "Dancing Fin",
      "length": "1:23",
      "videoid": "https://www.youtube.com/watch?v=xWEAzAu-zdE"
  },
  {
      "number": 332,
      "date": "2009-11-28T05:00:00.000Z",
      "title": "The Best Day of My Life pt 1",
      "length": "2:40",
      "videoid": "https://www.youtube.com/watch?v=Ph4HApxbWvU"
  },
  {
      "number": 333,
      "date": "2009-11-29T05:00:00.000Z",
      "title": "The Best Day of My Life pt 2",
      "length": "2:42",
      "videoid": "https://www.youtube.com/watch?v=5tlkSQ1Xjis"
  },
  {
      "number": 334,
      "date": "2009-11-30T05:00:00.000Z",
      "title": "It's Good to Be Home",
      "length": "3:26",
      "videoid": "https://www.youtube.com/watch?v=dSmWIz8xCD4"
  },
  {
      "number": 335,
      "date": "2009-12-01T05:00:00.000Z",
      "title": "Coors Ad, Collaborationz",
      "length": "0:26",
      "videoid": "https://www.youtube.com/watch?v=peW1y38MmTg"
  },
  {
      "number": 336,
      "date": "2009-12-02T05:00:00.000Z",
      "title": "Seeing Clearly",
      "length": "1:08",
      "videoid": "https://www.youtube.com/watch?v=SEBHYYbWFsc"
  },
  {
      "number": 337,
      "date": "2009-12-03T05:00:00.000Z",
      "title": "Black Holes",
      "length": "3:57",
      "videoid": "https://www.youtube.com/watch?v=3O9KXyZoFFE"
  },
  {
      "number": 338,
      "date": "2009-12-04T05:00:00.000Z",
      "title": "Time to Save With VMware",
      "length": "2:19",
      "videoid": "https://www.youtube.com/watch?v=9o_JSpw0XAI"
  },
  {
      "number": 339,
      "date": "2009-12-05T05:00:00.000Z",
      "title": "Don't Want to Write My Song Today, Just \nWant to Play New Super Mario Bros. Wii",
      "length": "2:51",
      "videoid": "https://www.youtube.com/watch?v=NJDYbJklQWA"
  },
  {
      "number": 340,
      "date": "2009-12-06T05:00:00.000Z",
      "title": "Soldier",
      "length": "1:20",
      "videoid": "https://www.youtube.com/watch?v=opBydmbqnu8"
  },
  {
      "number": 341,
      "date": "2009-12-07T05:00:00.000Z",
      "title": "Gun",
      "length": "1:16",
      "videoid": "https://www.youtube.com/watch?v=vTEDsqeLBZ8"
  },
  {
      "number": 342,
      "date": "2009-12-08T05:00:00.000Z",
      "title": "Jesus Christ at Christmas Time",
      "length": "2:51",
      "videoid": "https://www.youtube.com/watch?v=eDR0hULcENs"
  },
  {
      "number": 343,
      "date": "2009-12-09T05:00:00.000Z",
      "title": "Upon Seeing the Twitpic Conversation \nBetween Demi Moore and Ashton Kutcher",
      "length": "1:43",
      "videoid": "https://www.youtube.com/watch?v=PfIi_MJTGVI"
  },
  {
      "number": 344,
      "date": "2009-12-10T05:00:00.000Z",
      "title": "AMC Technology",
      "length": "1:00",
      "videoid": "https://www.youtube.com/watch?v=cIEYj34Erls"
  },
  {
      "number": 345,
      "date": "2009-12-11T05:00:00.000Z",
      "title": "Pirates Life",
      "length": "2:51",
      "videoid": "https://www.youtube.com/watch?v=RVTlQFxumiM"
  },
  {
      "number": 346,
      "date": "2009-12-12T05:00:00.000Z",
      "title": "A Snickers Noir",
      "length": "0:30",
      "videoid": "https://www.youtube.com/watch?v=rP102gvW37M"
  },
  {
      "number": 347,
      "date": "2009-12-13T05:00:00.000Z",
      "title": "A Humble Plea for Database Security",
      "length": "1:13",
      "videoid": "https://www.youtube.com/watch?v=6XU4g6tfXOg"
  },
  {
      "number": 348,
      "date": "2009-12-14T05:00:00.000Z",
      "title": "So Obvious",
      "length": "1:44",
      "videoid": "https://www.youtube.com/watch?v=oSEj2bw0Cgc"
  },
  {
      "number": 349,
      "date": "2009-12-15T05:00:00.000Z",
      "title": "If You Piled Up Everything I Didn't Know \nWould It Be As Big As the Universe? Oh.",
      "length": "2:31",
      "videoid": "https://www.youtube.com/watch?v=jAvJHgUiclY"
  },
  {
      "number": 350,
      "date": "2009-12-16T05:00:00.000Z",
      "title": "Joseph isadore...Palpatine?",
      "length": "1:19",
      "videoid": "https://www.youtube.com/watch?v=fTAoSC9xXqw"
  },
  {
      "number": 351,
      "date": "2009-12-17T05:00:00.000Z",
      "title": "All My Mutant Homies (Say What!)",
      "length": "3:45",
      "videoid": "https://www.youtube.com/watch?v=NTMePK6auh8"
  },
  {
      "number": 352,
      "date": "2009-12-18T05:00:00.000Z",
      "title": "I'll Be Seeing You",
      "length": "0:46",
      "videoid": "https://www.youtube.com/watch?v=OXXobZgS_WI"
  },
  {
      "number": 353,
      "date": "2009-12-19T05:00:00.000Z",
      "title": "Daylight Savings",
      "length": "1:58",
      "videoid": "https://www.youtube.com/watch?v=Wb4P45uOPRg"
  },
  {
      "number": 354,
      "date": "2009-12-20T05:00:00.000Z",
      "title": "Puking My Guts",
      "length": "0:48",
      "videoid": "https://www.youtube.com/watch?v=ox_XSHIIwg4"
  },
  {
      "number": 355,
      "date": "2009-12-21T05:00:00.000Z",
      "title": "I'm Weak",
      "length": "1:39",
      "videoid": "https://www.youtube.com/watch?v=N2vWxFiiaWs"
  },
  {
      "number": 356,
      "date": "2009-12-22T05:00:00.000Z",
      "title": "Food Poisoning",
      "length": "0:56",
      "videoid": "https://www.youtube.com/watch?v=dwnny8P7oXM"
  },
  {
      "number": 357,
      "date": "2009-12-23T05:00:00.000Z",
      "title": "I Must Be Going Crazy",
      "length": "2:10",
      "videoid": "https://www.youtube.com/watch?v=zejii6xywE0"
  },
  {
      "number": 358,
      "date": "2009-12-24T05:00:00.000Z",
      "title": "Happy Christmas Adam From Melissa",
      "length": "2:15",
      "videoid": "https://www.youtube.com/watch?v=WwxaShQoIUU"
  },
  {
      "number": 359,
      "date": "2009-12-25T05:00:00.000Z",
      "title": "The Story of Wandering Fall, Act 2, Scene 1: Blue Blue Oval",
      "length": "0:50",
      "videoid": "https://www.youtube.com/watch?v=YeHG3_RnwN4"
  },
  {
      "number": 360,
      "date": "2009-12-26T05:00:00.000Z",
      "title": "The Story of Wandering Fall, Act 2, Scene 2: Monsters Rising",
      "length": "0:43",
      "videoid": "https://www.youtube.com/watch?v=vL3vYiG3swI"
  },
  {
      "number": 361,
      "date": "2009-12-27T05:00:00.000Z",
      "title": "Soldier on Blindly",
      "length": "3:02",
      "videoid": "https://www.youtube.com/watch?v=urjhYZ60GQA"
  },
  {
      "number": 362,
      "date": "2009-12-28T05:00:00.000Z",
      "title": "The Wrong Foot",
      "length": "3:06",
      "videoid": "https://www.youtube.com/watch?v=0C4SWjqNZZE"
  },
  {
      "number": 363,
      "date": "2009-12-29T05:00:00.000Z",
      "title": "Time, Time, Time",
      "length": "4:01",
      "videoid": "https://www.youtube.com/watch?v=tHoEqw_wcy0"
  },
  {
      "number": 364,
      "date": "2009-12-30T05:00:00.000Z",
      "title": "I'm Losing My Hair",
      "length": "3:03",
      "videoid": "https://www.youtube.com/watch?v=mGj4q6Q8v5Q"
  },
  {
      "number": 365,
      "date": "2009-12-31T05:00:00.000Z",
      "title": "Me, I Write a Song a Day",
      "length": "3:08",
      "videoid": "https://www.youtube.com/watch?v=XuX8Z8sxgiQ"
  }
]

const Instrument = mongoose.model('Instrument', {name: String, image: String});
const Inkey = mongoose.model('Inkey', {name: String, image: String});
const Topic = mongoose.model('Topic', {name: String, image: String});
const Beard = mongoose.model('Beard', {name: String, image: String});
const City = mongoose.model('Location', {name: String, image: String});

const Song = mongoose.model('Song', {
  number: Number,
  title: String,
  date: Date,
  length: Number,
  inkey: String,
  tempo: Number,
  topic: String,
  location: String,
  instruments: [String],
  beard: String,
  videoid: String,
  description: String,
  acousticproduced: String,
  firsts: String,
  comments: String,
  press: String,
});


const gatherFields = (array) => {
  return new Promise((resolve, reject) => {
    let uniques = {
      beards: {
        name: 'Beard',
        collection: []
      },
      instruments: {
        name: 'Instrument',
        collection: []
      },
      locations: {
        name: 'Location',
        collection: []
      },
      topics: {
        name: 'Topic',
        collection: []
      },
      keys: {
        name: 'Inkey',
        collection: []
      } 
    };
  
    songList.forEach(song => {
      if (song.instruments) {
        let instruments = song.instruments.toLowerCase().replace('\n', '').split(', ');
        uniques.instruments.collection = uniques.instruments.collection.concat(instruments);
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
        let upcase = song.inkey.charAt(0).toUpperCase().concat(song.inkey.slice(1));
        uniques.keys.collection.push(upcase);
      }
    })
    resolve(uniques);
  })
}

const insertUniques = (obj) => {
  return new Promise((resolve, reject) => {
    let keyArray = Object.keys(obj).slice();

    const recurse = (array) => {
      if (array.length === 0) {
        resolve();
        return;
      }
      let key = array.shift();
      let dict = {};
      let counter = 0;
      
      console.log(key, obj, obj[key])
      let arr = obj[key].collection
      let identifier = obj[key].name
      for (let i = 0; i < arr.length; i++) {
        if (!dict[arr[i]]) {
          dict[arr[i]] = `${identifier.toLowerCase()}_${counter}.png`;
          counter++;
        }
      }
      
      let objArray = [];
      for (let key in dict) {
        objArray.push({
          name: key,
          image: dict[key]
        })
      }
      const theModel = mongoose.model(identifier);
      theModel.insertMany(objArray, (err, docs) => {
        if(err) {
          reject(err);
        }
        recurse(array)
      });
    }
    recurse(keyArray);
  })
}

gatherFields(songList).then( results => {
  insertUniques(results).then( success => {
    console.log('inserted all uniques!')
    insertSongs(songList)
  })
})

const calcLength = (string) => {
  let arr = string.split(':');
  let secs = parseInt(arr[arr.length - 1]);
  let mins = parseInt(arr[0]);
  secs = secs + mins * 60;
  return secs;
}

async function insertSongs(array) {
  let records = [];
  for (let i = 0; i < array.length; i++) {
    let instruments = [];
    if (array[i].instruments) {
      let instrumentArray = array[i].instruments.toLowerCase().replace('\n', '').split(', ');
      const query = await Instrument.find({name: { $in: instrumentArray}}).exec()
      // const result = await query1.exec()

      query.forEach(item => {
        instruments.push(item._id);
      })
      // .then(results => {
      //   results.forEach(result => {
      //     instruments.push(result._id);
      //   })
      // })
    }

    let tempo = 0;
    if (typeof array[i].tempo === 'number') {
      tempo = array[i].tempo;
    }
    let upcasedKey = undefined;
    if (array[i].inkey) {
      upcasedKey = array[i].inkey.charAt(0).toUpperCase().concat(array[i].inkey.slice(1));
      const query = await Inkey.find({name: upcasedKey}).exec()
      upcasedKey = query[0].id
    }

    let beard;
    if (array[i].beard) {
      const query = await Beard.find({name: array[i].beard}).exec()
      beard = query[0].id;
    }

    let location;
    if (array[i].location) {
      const query = await City.find({name: array[i].location}).exec()
      location = query[0].id
    }

    let topic;
    if (array[i].topic) {
      const query = await Topic.find({name: array[i].topic}).exec()
      topic = query[0].id
    }

    let date = new Date(array[i].date);
    date.setDate(date.getDate() + 1);

    let song = {
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
    }
    records.push(song);
  }
  console.log(records.length)
  Song.insertMany(records, (err, docs) => {
      if (err) {
        console.log(err);
      }
      console.log('successfully inserted all songs');
      process.exit()
  })
}
