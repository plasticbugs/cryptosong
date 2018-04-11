var ProgressBar = require('progress');

const Schema = require('mongoose').Schema;

const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/cryptosong', {
  promiseLibrary: global.Promise
});
const db = mongoose.connection;
db.dropDatabase();

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
      "firsts": "First song.",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/5M2qwk6euYPqsxXvMXFyyM",
      "itunes": "https://itunes.apple.com/ph/album/in-the-time-of-the-gods/1132700498?i=1132700609",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/in-the-time-of-the-gods",
      "tags": "Folk, Delicate, Abstract, Narrative, Myth "
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
      "acousticproduced": "Produced",
      "mood": "Sad",
      "spotify": "https://open.spotify.com/track/0Eh6pZdVIFDXj0TrZSQg9p",
      "itunes": "https://itunes.apple.com/ph/album/hands-oh-no/1132700498?i=1132700610",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/hands-oh-no",
      "tags": "Folk, Dark, Abstract"
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
      "acousticproduced": "Produced",
      "mood": "Anxious",
      "spotify": "https://open.spotify.com/track/6cHw97andNYEOE45oRVgwG",
      "itunes": "https://itunes.apple.com/ph/album/who-do-you-think-you-are/1132700498?i=1132700611",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/who-do-you-think-you-are",
      "tags": "Electro, Dark, Cheesy, Narrative, Funny"
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
      "comments": "Songfight song.",
      "mood": "Sad",
      "spotify": "https://open.spotify.com/track/4x4mPfqo9ggQD7kPfpWZ6E",
      "itunes": "https://itunes.apple.com/ph/album/elegy-for-industry/1132700498?i=1132700612",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/elegy-for-industry",
      "tags": "Electro, Dark, Abstract, Narrative"
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
      "comments": "Made in an airport.",
      "mood": "Chill",
      "spotify": "https://open.spotify.com/track/3Pq8uDm9mY6NpAEFtlMDJV",
      "itunes": "https://itunes.apple.com/ph/album/the-airport-song/1132700498?i=1132700613",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-airport-song",
      "tags": "Folk, Wistful, Personal, Travel"
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
      "comments": "Recorded in the bathroom.",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/5O2EpSTQxdafnl8sr1WDGY",
      "itunes": "https://itunes.apple.com/ph/album/it-must-be-the-weather/1132700498?i=1132700614",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/it-must-be-the-weather",
      "tags": "Blues, Dark, Personal, Weather"
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
      "comments": "Written for the closing of EGM.",
      "mood": "Sad",
      "spotify": "https://open.spotify.com/track/66GDxpCpJxR4QneLZpOdF3",
      "itunes": "https://itunes.apple.com/ph/album/egm-1up-goodbye/1132700498?i=1132700615",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/egm-1up-goodbye",
      "tags": "Folk, Dark, Personal, Topical"
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
      "acousticproduced": "Acoustic",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/4qUljFPUQX4Kyn8KCbBnq9",
      "itunes": "https://itunes.apple.com/ph/album/boy-for-boys-sake/1132700498?i=1132700616",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/boy-for-boys-sake",
      "tags": "Folk, Light, Abstract"
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
      "comments": "My ex's mom commissioned a \nsong for the company she worked at.",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/4qUljFPUQX4Kyn8KCbBnq9",
      "itunes": "https://itunes.apple.com/ph/album/the-deutsch-positivity-anthem/1132700498?i=1132700617",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-deutsch-positivity-anthem",
      "tags": "Electro, Cheesy, Topical, Motivational"
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
      "press": "https://boingboing.net/2009/01/11/folk-song-containing.html",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/2Oh81hnjKpPkLt8d6HLDt2",
      "itunes": "https://itunes.apple.com/ph/album/the-three-rules-of-the-internet/1132700498?i=1132700618",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/3-rules-of-the-internet",
      "tags": "Folk, Topical, Funny, Nerd"
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
      "comments": "Written on a train.",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/50vgw3vSnUa9s1eSnsYh7a",
      "itunes": "https://itunes.apple.com/ph/album/song-a-day-anthem/1132700498?i=1132700619",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/song-a-day-anthem",
      "tags": "Folk, Fun, Personal, Motivational"
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
      "firsts": "First social justice song.",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/6zbTmN7RK9HpxHx5iG57m4",
      "itunes": "https://itunes.apple.com/ph/album/everyones-a-little-bit-queer/1132700498?i=1132700620",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/everyones-a-little-bit-queer",
      "tags": "Folk, Fun, Topical, Funny"
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
      "comments": "Rejected from YouTube for being very NSFW.",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/4rIMBeUAPODU38HmNOOmyc",
      "itunes": "https://itunes.apple.com/ph/album/what-does-it-mean-to-love-a-machine/1132700498?i=1132700651",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/what-does-it-mean-to-love-a-machine",
      "tags": "Folk, Distortion, Narrative, Funny, Robots"
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
      "firsts": "First politics song.",
      "mood": "Drunk",
      "spotify": "https://open.spotify.com/track/0NnIXMau8xhB0M7TzTxajA",
      "itunes": "https://itunes.apple.com/ph/album/im-drunk-because-the-economy-sucks/1132700498?i=1132700652",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/im-drunk-because-the-economy-sucks",
      "tags": "Folk, Frustrated, Political, Economy"
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
      "firsts": "First Apple song.",
      "mood": "Sad",
      "spotify": "https://open.spotify.com/track/3NYJMlyBY9qfLybOVaohzh",
      "itunes": "https://itunes.apple.com/ph/album/get-well-steve-jobs/1132700498?i=1132700653",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/im-drunk-because-the-economy-sucks",
      "tags": "Folk, Topical, Nerd, Famous Person, Steve Jobs"
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
      "acousticproduced": "Produced",
      "mood": "Intense",
      "spotify": "https://open.spotify.com/track/1p6lNP6r3860StpYK3pIjU",
      "itunes": "https://itunes.apple.com/ph/album/riding-the-subway/1132700498?i=1132700654",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/riding-the-subway",
      "tags": "Folk, Dark, Travel, Abstract, Subway"
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
      "acousticproduced": "Acoustic",
      "mood": "Tired",
      "spotify": "https://open.spotify.com/track/3WMIM9QKS0CHiZuENikAco",
      "itunes": "https://itunes.apple.com/ph/album/im-so-tired-of-capitalism/1132700498?i=1132700655",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/im-so-tired-of-capitalism",
      "tags": "Folk, Frustrated, Economy, Political, Capitalism"
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
      "comments": "Written for my friend's band.",
      "mood": "Chill",
      "spotify": "https://open.spotify.com/track/3RWwRBKooQVOMfZ0r0t04I",
      "itunes": "https://itunes.apple.com/ph/album/the-marks-sisters/1132700498?i=1132700656",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-marks-sisters",
      "tags": "Jazz, Rough, Personal"
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
      "comments": "Written with an 8 and 11 year old.",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/2t0iZxtdxOiX6XOS90e2Zn",
      "itunes": "https://itunes.apple.com/ph/album/snow-day/1132700498?i=1132700657",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/snow-day",
      "tags": "Rock, Fun, Personal, Kids"
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
      "acousticproduced": "Acoustic",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/7Kmh4pvlYfn3LNlSQW88iZ",
      "itunes": "https://itunes.apple.com/ph/album/stars-in-our-eyes/1132700498?i=1132700658",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/stars-in-our-eyes",
      "tags": "Latin, Fun, Political, Famous Person, Obama"
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
      "acousticproduced": "Acoustic",
      "mood": "Tired",
      "spotify": "https://open.spotify.com/track/3n3p64g3dm3jEWh0RzhNcb",
      "itunes": "https://itunes.apple.com/ph/album/stay-out-of-my-body/1132700498?i=1132700659",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/stay-out-of-my-body",
      "tags": "Folk, Dark, Personal"
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
      "comments": "Written wtih a 9 year old. Footage from \nObama inauguration.",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/0apwQeXQPUalcbiEuzaPH0",
      "itunes": "https://itunes.apple.com/ph/album/obama-makes-me-smile/1132700498?i=1132700660",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/obama-makes-me-smile",
      "tags": "Folk, Light, Obama, Political, Kids"
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
      "acousticproduced": "Produced",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/5Ck2gu7GcOtOv4z0L2HAxC",
      "itunes": "https://itunes.apple.com/ph/album/barack-obama/1132700498?i=1132700661",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/barack-obama",
      "tags": "Rock, Distortion, Political, Famous Person, Obama"
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
      "comments": "Made at my brother's house.",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/31gl6BsZm0jxbQUlF2P1km",
      "itunes": "https://itunes.apple.com/ph/album/hello-hello/1132700498?i=1132700662",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/hello-hello",
      "tags": "Rock, Cheesy, Abstract, Silly"
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
      "comments": "Made at my parent’s house.",
      "mood": "Sad",
      "spotify": "https://open.spotify.com/track/6UicUk99TrUdqWpB5Xzmky",
      "itunes": "https://itunes.apple.com/ph/album/love-me-a-little-bit-more/1132700498?i=1132700663",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/love-me-a-little-bit-more",
      "tags": "Blues, Dark, Personal, Relationships"
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
      "acousticproduced": "Produced",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/7AmoQ12Y0gOlJ3Fk4uGuJV",
      "itunes": "https://itunes.apple.com/ph/album/speaking-electricity/1132700498?i=1132700664",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/speaking-electricity",
      "tags": "Rock, Hopeful, Abstract"
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
      "acousticproduced": "Produced",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/2j55GitKlpll3UNo6MLuIY",
      "itunes": "https://itunes.apple.com/ph/album/up-on-the-mountain-top/1132700498?i=1132700665",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/up-on-the-mountain-top",
      "tags": "Rock, Hopeful, Abstract"
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
      "acousticproduced": "Produced",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/7qwcWzQXM9CGRSGLsVAOQ9",
      "itunes": "https://itunes.apple.com/ph/album/the-fox-and-the-hen/1132700498?i=1132700666",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-fox-and-the-hen",
      "tags": "Electro, Abstract, Silly, Fox, Bird, Chicken"
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
      "acousticproduced": "Produced",
      "mood": "Intense",
      "spotify": "https://open.spotify.com/track/1FFuJ2D4vBFqaaE1a2HGNu",
      "itunes": "https://itunes.apple.com/ph/album/you-know-yourself/1132700498?i=1132700667",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/you-know-yourself",
      "tags": "Electro, Heavy, Cheesy, Abstract"
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
      "acousticproduced": "Produced",
      "mood": "Anxious",
      "spotify": "https://open.spotify.com/track/2Yz7XuljT7EhvtouFOLevL",
      "itunes": "https://itunes.apple.com/ph/album/dark-days/1132700498?i=1132700668",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/dark-days",
      "tags": "Rock, Dark, Looming, Abstract, Meerkat"
  },
  {
      "number": 31,
      "date": "2009-01-31T05:00:00.000Z",
      "title": "The Day That Google Crashed the internet",
      "length": "3:15",
      "videoid": "https://www.youtube.com/watch?v=3nH7RmupP8M",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/2xGpBwXzssdigraVnB2NBb",
      "itunes": "https://itunes.apple.com/ph/album/the-day-that-google-crashed-the-internet/1132700498?i=1132700669",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-day-that-google-crashed-the-internet",
      "tags": "Rock, Topical, Nerd, Google"
  },
  {
      "number": 32,
      "date": "2009-02-01T05:00:00.000Z",
      "title": "Go to Sleep",
      "length": "3:58",
      "videoid": "https://www.youtube.com/watch?v=W-ZnTEK_uos",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/4bNnXWhBaNkTXRMtNz2DPH",
      "itunes": "https://itunes.apple.com/ph/album/go-to-sleep/1132700498?i=1132700670",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/go-to-sleep",
      "tags": "Rock, Dark, 80s, Abstract, Dreams"
  },
  {
      "number": 33,
      "date": "2009-02-02T05:00:00.000Z",
      "title": "I Love Battlestar Galactica",
      "length": "2:56",
      "videoid": "https://www.youtube.com/watch?v=xaStl18xyBc",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/4ls7kamxzLfn9LjsTN99hf",
      "itunes": "https://itunes.apple.com/ph/album/i-love-battlestar-galactica/1132700498?i=1132700671",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-love-battlestar",
      "tags": "Electro, Fun, Catchy, Topical, TV show, Sci-Fi, Battlestar"
  },
  {
      "number": 34,
      "date": "2009-02-03T05:00:00.000Z",
      "title": "(Just Sing) a Happy Song",
      "length": "1:53",
      "videoid": "https://www.youtube.com/watch?v=uJ_zAYuFeAs",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/2nxXHizn4ZeAtfBKnfkN7E",
      "itunes": "https://itunes.apple.com/ph/album/just-sing-a-happy-song/1132700498?i=1132700672",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/just-sing-a-happy-song",
      "tags": "Rock, Cheesy, Abstract"
  },
  {
      "number": 35,
      "date": "2009-02-04T05:00:00.000Z",
      "title": "Come Down Where You Ought to Be",
      "length": "2:29",
      "videoid": "https://www.youtube.com/watch?v=ZikADYAT0y8",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/0DG05M3KlzCGAfBVcjcodJ",
      "itunes": "https://itunes.apple.com/ph/album/come-down-where-you-ought-to-be/1132700498?i=1132700676",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/come-down-where-you-ought-to-be",
      "tags": "Rock, Wistful, Astract, Narrative"
  },
  {
      "number": 36,
      "date": "2009-02-05T05:00:00.000Z",
      "title": "Scarlett Thomas",
      "length": "2:35",
      "videoid": "https://www.youtube.com/watch?v=-cU3FfI8k2s",
      "mood": "Chill",
      "spotify": "https://open.spotify.com/track/5HfhTvu6ae7NwPojTlw6um",
      "itunes": "https://itunes.apple.com/ph/album/scarlett-thomas/1132700498?i=1132700677",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/scarlett-thomas",
      "tags": "Electro, Delicate, Topical, Nerd, Book, Famous Person, Scarlett Thomas"
  },
  {
      "number": 37,
      "date": "2009-02-06T05:00:00.000Z",
      "title": "Water",
      "length": "0:41",
      "videoid": "https://www.youtube.com/watch?v=txF8ZlqJ6SI",
      "mood": "Excited",
      "spotify": "https://open.spotify.com/track/4p4ABkBcqgri3qTSJX6yLw",
      "itunes": "https://itunes.apple.com/ph/album/water/1132700498?i=1132700678",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/water",
      "tags": "Rock, Topical, Motivational, Food, Educational"
  },
  {
      "number": 38,
      "date": "2009-02-07T05:00:00.000Z",
      "title": "Little Pink Boom Box",
      "length": "0:43",
      "videoid": "https://www.youtube.com/watch?v=uQCKB77Q0sg",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/37a95RGpbFByMdfIKblcDn",
      "itunes": "https://itunes.apple.com/ph/album/little-pink-boom-box/1132700498?i=1132700679",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/little-pink-boombox",
      "tags": "Rock, Fun, Abstract, Boom box"
  },
  {
      "number": 39,
      "date": "2009-02-08T05:00:00.000Z",
      "title": "Changing the Color of My Walls",
      "length": "0:50",
      "videoid": "https://www.youtube.com/watch?v=1go4XooMVu4",
      "mood": "Tired",
      "spotify": "https://open.spotify.com/track/3DaBm6k9xxJGTVocTtCMbg",
      "itunes": "https://itunes.apple.com/ph/album/changing-the-color-of-my-walls/1132700498?i=1132700680",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/changing-the-color-of-my-walls",
      "tags": "Jazz, Fun, Personal, Moving"
  },
  {
      "number": 40,
      "date": "2009-02-09T05:00:00.000Z",
      "title": "The Ballad of Stimulus Jones",
      "length": "1:02",
      "videoid": "https://www.youtube.com/watch?v=0bA0ZAGpmfc",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/2NWXpxQPQ9tLoReC4k51xV",
      "itunes": "https://itunes.apple.com/ph/album/the-ballad-of-stimulus-jones/1132700498?i=1132700681",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-ballad-of-stimulus-jones",
      "tags": "Folk, Political, Economy, Capitialism"
  },
  {
      "number": 41,
      "date": "2009-02-10T05:00:00.000Z",
      "title": "Wolf of the Battlefield",
      "length": "1:59",
      "videoid": "https://www.youtube.com/watch?v=yoAZEsEvSoM",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/4sqbjeUOkynJlMw6ntty3x",
      "itunes": "https://itunes.apple.com/ph/album/wolf-of-the-battlefield/1132700498?i=1132700682",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/wolf-of-the-battlefield",
      "tags": "Rock, Topical, Nerd, NES"
  },
  {
      "number": 42,
      "date": "2009-02-11T05:00:00.000Z",
      "title": 42,
      "length": "0:46",
      "videoid": "https://www.youtube.com/watch?v=hzH4198ShGU",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/5pfH4wtuTKTiS3KPItlZZu",
      "itunes": "https://itunes.apple.com/ph/album/42/1132700498?i=1132700683",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/42",
      "tags": "Rock, Distortion, Topical, Nerd "
  },
  {
      "number": 43,
      "date": "2009-02-12T05:00:00.000Z",
      "title": "Sanae's Birthday Song",
      "length": "0:56",
      "videoid": "https://www.youtube.com/watch?v=wHBVLYJ8N44",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/2EkTU7LEzrDyPdUnODqQch",
      "itunes": "https://itunes.apple.com/ph/album/sanaes-birthday-song/1132700498?i=1132700684",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/sanaes-birthday-song",
      "tags": "Rock, Personal, Birthday"
  },
  {
      "number": 44,
      "date": "2009-02-13T05:00:00.000Z",
      "title": "Rock and Roll Cats",
      "length": "1:51",
      "videoid": "https://www.youtube.com/watch?v=kfVH3veC7-s",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/392rjCBI9JXf6Hsm9hQBrk",
      "itunes": "https://itunes.apple.com/ph/album/rock-and-roll-cats/1132700498?i=1132700685",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/rock-and-roll-cats-feat-spectre-of-woods",
      "tags": "Hip hop, Heavy, Topical, Silly, Cats, Collab, Ross Copeland"
  },
  {
      "number": 45,
      "date": "2009-02-14T05:00:00.000Z",
      "title": "The Rain Returned",
      "length": "2:12",
      "videoid": "https://www.youtube.com/watch?v=ZPeqoThRlPg",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/3r8jLcTFZMoEnEHk4nlays",
      "itunes": "https://itunes.apple.com/ph/album/the-rain-returned/1132700498?i=1132700686",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-rain-returned",
      "tags": "Folk, Abstract, Narrative, Nerd, Multiple Universe "
  },
  {
      "number": 46,
      "date": "2009-02-15T05:00:00.000Z",
      "title": "The Legend of Zelda: Overworld",
      "length": "2:59",
      "videoid": "https://www.youtube.com/watch?v=Xg7_pvCbp8g",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/1sq6iACRUeSdGYL0uVjvPP",
      "itunes": "https://itunes.apple.com/ph/album/the-legend-of-zelda-overworld/1132700498?i=1132700687",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-legend-of-zelda-overworld",
      "tags": "Rock, Dark, Topical, Narrative, Nerd, NES, Zelda"
  },
  {
      "number": 47,
      "date": "2009-02-16T05:00:00.000Z",
      "title": "Life Force",
      "length": "1:40",
      "videoid": "https://www.youtube.com/watch?v=FTtnC_PFBf8",
      "mood": "Excited",
      "spotify": "https://open.spotify.com/track/4zThr6E2JFuJ04mS4ZjJnL",
      "itunes": "https://itunes.apple.com/ph/album/life-force/1132700498?i=1132700688",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/lifeforce",
      "tags": "Electro, Dark, Topical, Nerd, NES, Life Force"
  },
  {
      "number": 48,
      "date": "2009-02-17T05:00:00.000Z",
      "title": "Mummy's on Campus",
      "length": "3:52",
      "videoid": "https://www.youtube.com/watch?v=QxIin3LKmKc",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/7uhftgmN8ocQJzFXDPMYFw",
      "itunes": "https://itunes.apple.com/ph/album/mummys-on-campus/1132700498?i=1132700689",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/mummys-on-campus",
      "tags": "Rock, Cheesy, 80s, Abstract"
  },
  {
      "number": 49,
      "date": "2009-02-18T05:00:00.000Z",
      "title": "Get Up off of Your Ass (And Just Do Something)",
      "length": "2:26",
      "videoid": "https://www.youtube.com/watch?v=GUTFXxi1TEw",
      "mood": "Excited",
      "spotify": "https://open.spotify.com/track/47TsZVrWUWDwA25rQTe7w4",
      "itunes": "https://itunes.apple.com/ph/album/get-up-off-of-your-ass-and-just-do-something/1132700498?i=1132700690",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/get-up-off-of-your-ass-and-just-do-something",
      "tags": "Rock, Cheesy, 80s, Abstract, Political, Motivational "
  },
  {
      "number": 50,
      "date": "2009-02-19T05:00:00.000Z",
      "title": "One of the Lucky Ones",
      "length": "2:32",
      "videoid": "https://www.youtube.com/watch?v=W12UsLNacJE",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/6wrVTZF8D1S9OIp736FvhD",
      "itunes": "https://itunes.apple.com/ph/album/one-of-the-lucky-ones/1132700498?i=1132700691",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/one-of-the-lucky-ones",
      "tags": "Rock, Wistful, Abstract, Narrative"
  },
  {
      "number": 51,
      "date": "2009-02-20T05:00:00.000Z",
      "title": "Your Mother Doesn't Love You Anymore (An Extrasolar Anthem)",
      "length": "2:30",
      "videoid": "https://www.youtube.com/watch?v=mr_Nb4zzsXQ",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/7IfbOCd48kdjsPZFPWY3El",
      "itunes": "https://itunes.apple.com/ph/album/your-mother-doesnt-love-you-anymore-an-extrasolar-anthem/1132700498?i=1132700693",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/your-mother-doesnt-love-you-anymore-an-extrasolar-anthem",
      "tags": "Rock, 80s, Topical, "
  },
  {
      "number": 52,
      "date": "2009-02-21T05:00:00.000Z",
      "title": "Zombie Ponies",
      "length": "0:54",
      "videoid": "https://www.youtube.com/watch?v=qycQVQEWpqQ",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/7Ac5TCpGEa9yDZU8poOKM5",
      "itunes": "https://itunes.apple.com/ph/album/zombie-ponies/1132700498?i=1132700694",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/zombie-ponies",
      "tags": "Rock, Fun, Topical, Nerd, Zombie, Pony"
  },
  {
      "number": 53,
      "date": "2009-02-22T05:00:00.000Z",
      "title": "Geriatrics in Drag",
      "length": "1:00",
      "videoid": "https://www.youtube.com/watch?v=rEI2bO4t_wU",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/2XQZduGWdwAreS56UY1a7Z",
      "itunes": "https://itunes.apple.com/ph/album/geriatrics-in-drag/1132700498?i=1132700695",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/geriatrics-in-drag",
      "tags": "Rock, 80s, Topical, Silly "
  },
  {
      "number": 54,
      "date": "2009-02-23T05:00:00.000Z",
      "title": "Let's All Go to the Lobby (Fuck That!)",
      "length": "2:30",
      "videoid": "https://www.youtube.com/watch?v=aTaQTcm2jqk",
      "mood": "Angry",
      "spotify": "https://open.spotify.com/track/7j9UWNSCiSx1tnBplisJtg",
      "itunes": "https://itunes.apple.com/ph/album/lets-all-go-to-the-lobby/1132700498?i=1132700696",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/lets-all-go-to-the-lobby-fuck-that",
      "tags": "Rock, Distortion, Topical, Angry, Nerd "
  },
  {
      "number": 55,
      "date": "2009-02-24T05:00:00.000Z",
      "title": "BigFaceSmallFace",
      "length": "1:11",
      "videoid": "https://www.youtube.com/watch?v=_Xn-77ao7zA",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/5W3t2XJFiUfYY6GXzDhbuF",
      "itunes": "https://itunes.apple.com/ph/album/bigfacesmallface/1132700498?i=1132700697",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/bigfacesmallface",
      "tags": "Rock, Cheesy, Abstract, Silly"
  },
  {
      "number": 56,
      "date": "2009-02-25T05:00:00.000Z",
      "title": "Co-op Theme Song",
      "length": "1:53",
      "videoid": "https://www.youtube.com/watch?v=NoSjW9H7bZo",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/37m0qsmtq1tcbHEmpUv8sS",
      "itunes": "https://itunes.apple.com/ph/album/co-op-theme-song/1132700498?i=1132700698",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/co-op-theme",
      "tags": "Rock, Topical, Motivational, Love, Nerd "
  },
  {
      "number": 57,
      "date": "2009-02-26T05:00:00.000Z",
      "title": "All My Friends Are Dinosaurs",
      "length": "4:40",
      "videoid": "https://www.youtube.com/watch?v=VXju0WFRpyA",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/25rms747SdvKvFgDXsI9B0",
      "itunes": "https://itunes.apple.com/ph/album/all-my-friends-are-dinosaurs/1132700498?i=1132700699",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/my-friends-and-i-are-dinosaurs",
      "tags": "Ambient, Dreamy, Abstract "
  },
  {
      "number": 58,
      "date": "2009-02-27T05:00:00.000Z",
      "title": "Marilyn Langois",
      "length": "1:10",
      "videoid": "https://www.youtube.com/watch?v=87LQ-ShXf6Q",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/7f5KcVsMB1M3lWaaqN4u6O",
      "itunes": "https://itunes.apple.com/ph/album/marilyn-langois/1132700498?i=1132700700",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/marilyn-langois",
      "tags": "Rock, Fun, Personal, Friend, Silly, Birthday "
  },
  {
      "number": 59,
      "date": "2009-02-28T05:00:00.000Z",
      "title": "Shamus and Precious",
      "length": "1:08",
      "videoid": "https://www.youtube.com/watch?v=LMFfytNSRDU",
      "mood": "Sad",
      "spotify": "https://open.spotify.com/track/0WMrCaIyBIHHdQ3HiCaXcx",
      "itunes": "https://itunes.apple.com/ph/album/shamus-and-precious/1132700498?i=1132700701",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/shamus-and-precious",
      "tags": "Folk, Dark, Rough, Personal, Narrative "
  },
  {
      "number": 60,
      "date": "2009-03-01T05:00:00.000Z",
      "title": "2100 California St.",
      "length": "1:16",
      "videoid": "https://www.youtube.com/watch?v=FmxAGQ1ioyc",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/2jhyUptrWWdeV6JnGQwwRC",
      "itunes": "https://itunes.apple.com/ph/album/2100-california-st/1132700498?i=1132700702",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/our-house",
      "tags": "Rock, Peronal, Silly, Nerd"
  },
  {
      "number": 61,
      "date": "2009-03-02T05:00:00.000Z",
      "title": "Knock Knock",
      "length": "0:58",
      "videoid": "https://www.youtube.com/watch?v=m_A-rD7txSQ",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/7luio2iUnY28O9yjK3yYg1",
      "itunes": "https://itunes.apple.com/ph/album/knock-knock/1132700498?i=1132700703",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/knock-knock",
      "tags": "Rock, Dark, Abstract, Silly"
  },
  {
      "number": 62,
      "date": "2009-03-03T05:00:00.000Z",
      "title": "I'm the Same As I Ever Was",
      "length": "0:39",
      "videoid": "https://www.youtube.com/watch?v=ZrR53d-OuQQ",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/6nweAyUmOXEbA26wAgaaRR",
      "itunes": "https://itunes.apple.com/ph/album/im-the-same-as-i-ever-was/1132700498?i=1132700704",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/im-the-same-as-i-ever-was",
      "tags": "Electro, Dark, Abstract"
  },
  {
      "number": 63,
      "date": "2009-03-04T05:00:00.000Z",
      "title": "Teddy Bear Revolution",
      "length": "1:30",
      "videoid": "https://www.youtube.com/watch?v=oFS4CSnL2uU",
      "mood": "Angry",
      "spotify": "https://open.spotify.com/track/11cKeWCp0P7B5YrssruCwc",
      "itunes": "https://itunes.apple.com/ph/album/teddy-bear-revolution/1132700498?i=1132700705",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/teddy-bear-revolution",
      "tags": "Rock, Anthem, Topical, Silly, Nerd, Animals, Bear, Teddy Bear"
  },
  {
      "number": 64,
      "date": "2009-03-05T05:00:00.000Z",
      "title": "The Spyders",
      "length": "1:30",
      "videoid": "https://www.youtube.com/watch?v=rmWP7D7BHoM",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/7rjkwiPv7yxhnR0cl0KC2X",
      "itunes": "https://itunes.apple.com/ph/album/the-spyders/1132700498?i=1132700706",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-spyders",
      "tags": "Rock, Friend, Silly, Personal"
  },
  {
      "number": 65,
      "date": "2009-03-06T05:00:00.000Z",
      "title": "Teris: a History in Song",
      "length": "3:41",
      "videoid": "https://www.youtube.com/watch?v=34bYJDNS6Zo",
      "mood": "Intense",
      "spotify": "https://open.spotify.com/track/35ozJdC4qITVDtK33aNeUN",
      "itunes": "https://itunes.apple.com/ph/album/teris-a-history-in-song/1132700498?i=1132700707",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/tetris-a-history-in-song",
      "tags": "Folk, Topical, Funny, Nerd, History, Educational, NES, Tetris, Famous Person, Alexey Pajitnov"
  },
  {
      "number": 66,
      "date": "2009-03-07T05:00:00.000Z",
      "title": "Night",
      "length": "2:19",
      "videoid": "https://www.youtube.com/watch?v=BMobOOV0928",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/4iT4gczTkKytl5a4ouHNeR",
      "itunes": "https://itunes.apple.com/ph/album/night/1132700498?i=1132700708",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/night",
      "tags": "Folk, Abstract, Delicate"
  },
  {
      "number": 67,
      "date": "2009-03-08T05:00:00.000Z",
      "title": "Zombie Rights, Zombie Dance",
      "length": "1:25",
      "videoid": "https://www.youtube.com/watch?v=40rCqT_v3hU",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/5ousCKL79PAy4SSaqtQbFO",
      "itunes": "https://itunes.apple.com/ph/album/zombie-rights-zombie-dance/1132700498?i=1132700709",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/zombie-rights-zombie-dance",
      "tags": "Rock, Topical, Funny, Nerd, Zombie"
  },
  {
      "number": 68,
      "date": "2009-03-09T04:00:00.000Z",
      "title": "A Ringtone for Ivory King",
      "length": "0:30",
      "videoid": "https://www.youtube.com/watch?v=zszgC2VeVBA",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/5UMdRY5J4Vr6r9ejgcYnCc",
      "itunes": "https://itunes.apple.com/ph/album/for-ivory-king/1132700498?i=1132700710",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/a-ringtone-for-ivory",
      "tags": "Rock, Personal, Ringtone"
  },
  {
      "number": 69,
      "date": "2009-03-10T04:00:00.000Z",
      "title": "Oh, It's Probably Time",
      "length": "0:48",
      "videoid": "https://www.youtube.com/watch?v=VVoVAyXEJ68",
      "mood": "Chill",
      "spotify": "https://open.spotify.com/track/6KVrzKOz7bCfvhEhOgRG0c",
      "itunes": "https://itunes.apple.com/ph/album/oh-its-probably-time/1132700498?i=1132700711",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/oh-its-probably-time",
      "tags": "Rock, Anthem, Wistful"
  },
  {
      "number": 70,
      "date": "2009-03-11T04:00:00.000Z",
      "title": "Can We Kick It With Kikkoman (Of Course We Can!)",
      "length": "1:01",
      "videoid": "https://www.youtube.com/watch?v=60-83hmpjDw",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/33bbIF0znZSsTNxU5sYYbV",
      "itunes": "https://itunes.apple.com/ph/album/can-we-kick-it-kikkoman-of-course-we-can/1132700498?i=1132700712",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/can-we-kick-it-with-kikkoman-of-course-we-can",
      "tags": "Rock, Fun, Bear, Company, Teddy Bear, Kikkoman"
  },
  {
      "number": 71,
      "date": "2009-03-12T04:00:00.000Z",
      "title": "And They Call It Natural",
      "length": "1:59",
      "videoid": "https://www.youtube.com/watch?v=c23PUpoZ9hE",
      "mood": "Sad",
      "spotify": "https://open.spotify.com/track/39nhPIWI6tO2rZ3rbE1Hno",
      "itunes": "https://itunes.apple.com/ph/album/and-they-call-it-natural/1132700498?i=1132700713",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/and-they-call-it-natural",
      "tags": "Rock, Wistful, Topical "
  },
  {
      "number": 72,
      "date": "2009-03-13T04:00:00.000Z",
      "title": "Penguins Having a Party (2009)",
      "length": "1:44",
      "videoid": "https://www.youtube.com/watch?v=QGTEGVtoXyA",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/6RC5YTY9mfoJXN0R2pjgRu",
      "itunes": "https://itunes.apple.com/ph/album/penguins-having-a-party/1132700498?i=1132700714",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/penguins-having-a-party",
      "tags": "Rock, Anthem, Topical, Silly, Nerd, Penguins"
  },
  {
      "number": 73,
      "date": "2009-03-14T04:00:00.000Z",
      "title": "Nano Nano Nightmare",
      "length": "1:47",
      "videoid": "https://www.youtube.com/watch?v=Pwf3dZSwjuk",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/6CU7KYCHdqUNfWBoVUlloG",
      "itunes": "https://itunes.apple.com/ph/album/nano-nano-nightmare/1132700498?i=1132700715",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/nano-nano-nightmare",
      "tags": "Rock, Topical, Contest, Narrative, Silly, Robots"
  },
  {
      "number": 74,
      "date": "2009-03-15T04:00:00.000Z",
      "title": "The Number Nine",
      "length": "1:34",
      "videoid": "https://www.youtube.com/watch?v=p2Cvn2hULws",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/14L8xsxQxaybZ895YL4kwD",
      "itunes": "https://itunes.apple.com/ph/album/the-number-nine/1132700498?i=1132700716",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-number-nine",
      "tags": "Electro, Topical, Fun, Nerd, Educational "
  },
  {
      "number": 75,
      "date": "2009-03-16T04:00:00.000Z",
      "title": "Don't Give Up, Chrissy",
      "length": "1:30",
      "videoid": "https://www.youtube.com/watch?v=HfVFsU-aQ90",
      "mood": "Sad",
      "spotify": "https://open.spotify.com/track/3jB8WelREyO0kKQo5OM0fE",
      "itunes": "https://itunes.apple.com/ph/album/dont-give-up-chrissy/1132700498?i=1132700717",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/dont-give-up-chrissy",
      "tags": "Rock, Motivational, Wistful"
  },
  {
      "number": 76,
      "date": "2009-03-17T04:00:00.000Z",
      "title": "Hey, Paul Krugman",
      "length": "1:41",
      "videoid": "https://www.youtube.com/watch?v=XOYAuk809fY",
      "mood": "Angry",
      "spotify": "https://open.spotify.com/track/6P70lLCvurjTIsz0S3WttR",
      "itunes": "https://itunes.apple.com/ph/album/hey-paul-krugman/1132700498?i=1132700718",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/hey-paul-krugman",
      "tags": "Rock, Heavy, Political, Economy, Famous Person, Economist, Paul Krugman"
  },
  {
      "number": 77,
      "date": "2009-03-18T04:00:00.000Z",
      "title": "Copying isn't Theft",
      "length": "1:09",
      "videoid": "https://www.youtube.com/watch?v=zMP3QOlWV64",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/01eeQJI1Z0wHyoPY8gqkrR",
      "itunes": "https://itunes.apple.com/ph/album/copying-isnt-theft/1132700498?i=1132700719",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/copying-isnt-theft",
      "tags": "Rock, Fun, Political, Internet"
  },
  {
      "number": 78,
      "date": "2009-03-19T04:00:00.000Z",
      "title": "Saving Newspapers",
      "length": "2:41",
      "videoid": "https://www.youtube.com/watch?v=52VdW8qFJ6Q",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/6L6SrW8UQWIvoQO1JWhW1C",
      "itunes": "https://itunes.apple.com/ph/album/saving-newspapers/1132700498?i=1132700720",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/saving-newspapers",
      "tags": "Rock, Fun, Political, Internet"
  },
  {
      "number": 79,
      "date": "2009-03-20T04:00:00.000Z",
      "title": "Spring Equinox",
      "length": "1:10",
      "videoid": "https://www.youtube.com/watch?v=9TJ6kXDHtsU",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/00JQjLBYSjLhcpH7idheO5",
      "itunes": "https://itunes.apple.com/ph/album/spring-equinox/1132700498?i=1132700721",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/spring-equinox",
      "tags": "Ambient, Dreamy, Abstract, Weather, Spring "
  },
  {
      "number": 80,
      "date": "2009-03-21T04:00:00.000Z",
      "title": "Out My Front Door",
      "length": "1:42",
      "videoid": "https://www.youtube.com/watch?v=Zov56wnlYUw",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/1DnriOtkZxHzgzPLscHzvj",
      "itunes": "https://itunes.apple.com/ph/album/out-my-front-door/1132700498?i=1132700722",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/out-my-front-door",
      "tags": "Rock, Wistful, Abstract, Funny"
  },
  {
      "number": 81,
      "date": "2009-03-22T04:00:00.000Z",
      "title": "Come On, Nouriel",
      "length": "1:26",
      "videoid": "https://www.youtube.com/watch?v=vMapa6591M4",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/48S7yUvS2iqxmm6TE0ejvF",
      "itunes": "https://itunes.apple.com/ph/album/come-on-nouriel/1132700498?i=1132700723",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/come-on-nouriel",
      "tags": "Rock, Political, Economy, Famous Person, Economist, Nouriel Roubini"
  },
  {
      "number": 82,
      "date": "2009-03-23T04:00:00.000Z",
      "title": "A Long Time Coming (EFCA)",
      "length": "1:59",
      "videoid": "https://www.youtube.com/watch?v=F36rY4VMRPE",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/3T7EMdR9TN3RofaYsC2irM",
      "itunes": "https://itunes.apple.com/ph/album/a-long-time-coming-efca/1132700498?i=1132700724",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/a-long-time-coming-efca",
      "tags": "Folk, Topical, Motivational, Wistful, Political, SJW"
  },
  {
      "number": 83,
      "date": "2009-03-24T04:00:00.000Z",
      "title": "My Obama Neurosis",
      "length": "1:49",
      "videoid": "https://www.youtube.com/watch?v=BeTV3eIkzp0",
      "mood": "Confused",
      "spotify": "https://open.spotify.com/track/2j3BKJ4BRWMYP7V0UqMuVL",
      "itunes": "https://itunes.apple.com/ph/album/my-obama-neurosis/1132700498?i=1132700725",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/my-obama-nuerosis",
      "tags": "Electro, Funny, Political, Famous Person, Obama"
  },
  {
      "number": 84,
      "date": "2009-03-25T04:00:00.000Z",
      "title": "1600 Pennsylvania Ave.",
      "length": "1:26",
      "videoid": "https://www.youtube.com/watch?v=Zm_XoG1BqSY",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/3XsUeJ5xJRiirobqJ6OSNX",
      "itunes": "https://itunes.apple.com/ph/album/1600-pennsylvania-ave/1132700498?i=1132700726",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/1600-pennsylvania-ave",
      "tags": "Rock, Topical, Political, TV Show, Famous Person, David Shuster"
  },
  {
      "number": 85,
      "date": "2009-03-26T04:00:00.000Z",
      "title": "Fun a Day Anthem",
      "length": "2:30",
      "videoid": "https://www.youtube.com/watch?v=TJ9Z4DgFJ0w",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/5KmgeV7qvVH7FjjShFK7ah",
      "itunes": "https://itunes.apple.com/ph/album/fun-a-day-anthem/1132700498?i=1132700727",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/fun-a-day-anthem",
      "tags": "Folk, Personal, Motivational, Redux"
  },
  {
      "number": 86,
      "date": "2009-03-27T04:00:00.000Z",
      "title": "You're Doing It Right, Jon Stewart",
      "length": "1:40",
      "videoid": "https://www.youtube.com/watch?v=QtL5hvWKcvk",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/4S4suSR4mSWbrwFERnupuc",
      "itunes": "https://itunes.apple.com/ph/album/youre-doing-it-right-jon-stewart/1132700498?i=1132700728",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/youre-doing-it-right-jon-stewart",
      "tags": "Rock, Topical, Political, TV Show, Famous Person, Jon Stewart"
  },
  {
      "number": 87,
      "date": "2009-03-28T04:00:00.000Z",
      "title": "I am Just a Little Post-It Note",
      "length": "1:18",
      "videoid": "https://www.youtube.com/watch?v=dw2ZL2eFDfU",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/0tQzHhCqmvJIZszlUXMYrx",
      "itunes": "https://itunes.apple.com/ph/album/i-am-just-a-little-post-it-note/1132700498?i=1132700729",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-am-just-a-little-post-it-note",
      "tags": "Rock, Topical, Silly, Nerd"
  },
  {
      "number": 88,
      "date": "2009-03-29T04:00:00.000Z",
      "title": "Soren's Song",
      "length": "2:09",
      "videoid": "https://www.youtube.com/watch?v=2yo3LbC4KbI",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/5yH1O9dHGnUC4mC7SWGnuA",
      "itunes": "https://itunes.apple.com/ph/album/sorens-song/1132700498?i=1132700730",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/sorens-song",
      "tags": "Folk, Person, Wistful, Political, Kids"
  },
  {
      "number": 89,
      "date": "2009-03-30T04:00:00.000Z",
      "title": "Jerry Springer",
      "length": "1:43",
      "videoid": "https://www.youtube.com/watch?v=PG2WBfwooAk",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/4tYGHtfaF2TMQgIFs7BUxW",
      "itunes": "https://itunes.apple.com/ph/album/jerry-springer/1132700498?i=1132700731",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/jerry-springer",
      "tags": "Rock, Nerd, TV Show, Famous Person, Jerry Springer"
  },
  {
      "number": 90,
      "date": "2009-03-31T04:00:00.000Z",
      "title": "The Close",
      "length": "0:57",
      "videoid": "https://www.youtube.com/watch?v=OI-m2H_8q_c",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/66yvqURs312Q1hPdYXgN2f",
      "itunes": "https://itunes.apple.com/ph/album/the-close/1132700498?i=1132700732",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-close",
      "tags": "Rock, Topical, Political, TV Show"
  },
  {
      "number": 91,
      "date": "2009-04-01T04:00:00.000Z",
      "title": "Ringtone for Mike Trash",
      "length": "0:42",
      "videoid": "https://www.youtube.com/watch?v=xJMK1M9ICsg",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/3neyMThbgoz0pOgCEll26X",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/ringtone-for-mike-trash",
      "tags": "Punk, Fun, Person, Silly "
  },
  {
      "number": 92,
      "date": "2009-04-02T04:00:00.000Z",
      "title": "Ivory is in the Caribbean (And I Miss Her)",
      "length": "1:33",
      "videoid": "https://www.youtube.com/watch?v=e8RAqe0Qkf4",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/0GPoPV2yXQARUlTufamu8N",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/ivory-is-in-the-caribbean-and-i-miss-her",
      "tags": "Folk, Personal, Relationships, Love"
  },
  {
      "number": 93,
      "date": "2009-04-03T04:00:00.000Z",
      "title": "Tumblr",
      "length": "1:41",
      "videoid": "https://www.youtube.com/watch?v=wiUuuL87OH4",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/31V6G6oflGqQPQHPsbZbA6",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/tumblr",
      "tags": "Folk, Dark, Topical, Silly, Company, Nerd"
  },
  {
      "number": 94,
      "date": "2009-04-04T04:00:00.000Z",
      "title": "The Ten Plagues",
      "length": "2:10",
      "videoid": "https://www.youtube.com/watch?v=x7Jv5hcE5jM",
      "mood": "Intense",
      "spotify": "https://open.spotify.com/track/0RQDasLRxIQl30aphODDCL",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-ten-plagues",
      "tags": "Rock, Myth, God, Heavy, Topical, Funny, Nerd, History, Educational"
  },
  {
      "number": 95,
      "date": "2009-04-05T04:00:00.000Z",
      "title": "Pieces",
      "length": "2:15",
      "videoid": "https://www.youtube.com/watch?v=MJmH-0J5Wpk",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/4ua0ukq0GmmXHbPVjxSaVr",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/pieces",
      "tags": "Folk, Personal, Wistful"
  },
  {
      "number": 96,
      "date": "2009-04-06T04:00:00.000Z",
      "title": "My Baritone Uke and I",
      "length": "0:56",
      "videoid": "https://www.youtube.com/watch?v=KjtpzSMuusw",
      "mood": "Happy",
      "spotify": "https://open.spotify.com/track/2JX1QaGLPoKWvQBcyOqJVL",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/my-baritone-uke-and-i",
      "tags": "Folk, Personal, Wistful, Nerd "
  },
  {
      "number": 97,
      "date": "2009-04-07T04:00:00.000Z",
      "title": "1 Week, 5 Days",
      "length": "2:01",
      "videoid": "https://www.youtube.com/watch?v=l2GNCegRzFU",
      "mood": "Sad",
      "spotify": "https://open.spotify.com/track/1N0Q77YizmUxtpFEQX1lCq",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/1-week-5-days-2",
      "tags": "Folk, Personal, Wistful, Relationships"
  },
  {
      "number": 98,
      "date": "2009-04-08T04:00:00.000Z",
      "title": "Ringtone for Shelly",
      "length": "0:42",
      "videoid": "https://www.youtube.com/watch?v=CMYuGzBgX4o",
      "mood": "Silly",
      "spotify": "https://open.spotify.com/track/1SEZ2K2bBCnBai7hs4Srgr",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/ringtone-for-shelly",
      "tags": "Electro, Person, Silly "
  },
  {
      "number": 99,
      "date": "2009-04-09T04:00:00.000Z",
      "title": "When I Was Born",
      "length": "1:17",
      "videoid": "https://www.youtube.com/watch?v=aexHE2DueBA",
      "mood": "Pensive",
      "spotify": "https://open.spotify.com/track/3w0E0Q9uYRUESKfYoJX7Pz",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/when-i-was-born",
      "tags": "Rock, Personal, Silly, Birthday, My Birthday"
  },
  {
      "number": 100,
      "date": "2009-04-10T04:00:00.000Z",
      "title": "When the Lighthouse Went Dark",
      "length": "1:29",
      "videoid": "https://www.youtube.com/watch?v=ySnfNdfESBE",
      "mood": "Creepy",
      "spotify": "https://open.spotify.com/track/4ZYDjZfMHwExW3BCuOvoTP",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/when-the-lighthouse-went-dark",
      "tags": "Metal, Dark, Abstract, Scary"
  },
  {
      "number": 101,
      "date": "2009-04-11T04:00:00.000Z",
      "title": "Zombie Banks",
      "length": "1:14",
      "videoid": "https://www.youtube.com/watch?v=aCAPzJEpuCA",
      "spotify": "https://open.spotify.com/track/5aXNT5oCEKCodtvUVNAtr8",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/zombie-banks",
      "tags": "Rock, Topical, Political, Funny, Zombie"
  },
  {
      "number": 102,
      "date": "2009-04-12T04:00:00.000Z",
      "title": "Ringtone for Casey",
      "length": "0:43",
      "videoid": "https://www.youtube.com/watch?v=mwBq8u7Fvx8",
      "spotify": "https://open.spotify.com/track/6Ct804mRzQfdSpVID0cXjB",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/ringtone-for-casey",
      "tags": "Electro, Person, Ringtone"
  },
  {
      "number": 103,
      "date": "2009-04-13T04:00:00.000Z",
      "title": "Oreo Love",
      "length": "1:34",
      "videoid": "https://www.youtube.com/watch?v=BiI1lus4NGk",
      "spotify": "https://open.spotify.com/track/61cEf81KDZM8oh4NlxCmFz",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/oreo-love",
      "tags": "Folk, Topical, Silly, Food, Oreo"
  },
  {
      "number": 104,
      "date": "2009-04-14T04:00:00.000Z",
      "title": "Ringtone for Jackie",
      "length": "0:33",
      "videoid": "https://www.youtube.com/watch?v=5B450Qpzuec",
      "spotify": "https://open.spotify.com/track/1sPbLxKvpCmnofzonimwrc",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/ringtone-for-jackie",
      "tags": "Folk, Person, Wistful"
  },
  {
      "number": 105,
      "date": "2009-04-15T04:00:00.000Z",
      "title": "It's Like Trying to Fill a Styrofoam Cup With a Hole in the Bottom",
      "length": "2:21",
      "videoid": "https://www.youtube.com/watch?v=7CiTRHrA3vM",
      "spotify": "https://open.spotify.com/track/0gOHtoepNQUm2zBdmxBvj9",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/its-like-trying-to-fill-a-styrofoam-cup-with-a-hole-in-the-bottom",
      "tags": "Rock, Abstract, Styrofoam Cup"
  },
  {
      "number": 106,
      "date": "2009-04-16T04:00:00.000Z",
      "title": "Keyboard Shortcuts",
      "length": "0:24",
      "videoid": "https://www.youtube.com/watch?v=gVT9SToJsMI",
      "spotify": "https://open.spotify.com/track/61ccMlrcb6RS957fyEgsTa",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/keyboard-shortcuts",
      "tags": "Ambient, Abstract, Silly "
  },
  {
      "number": 107,
      "date": "2009-04-17T04:00:00.000Z",
      "title": "Ringtone for Michaela",
      "length": "0:54",
      "videoid": "https://www.youtube.com/watch?v=EY9vn2mXIsc",
      "spotify": "https://open.spotify.com/track/6S5Duho4ZCpqhC49koKS3o",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/ringtone-for-michaela",
      "tags": "Rock, Person, Wistful "
  },
  {
      "number": 108,
      "date": "2009-04-18T04:00:00.000Z",
      "title": "Torture Memos: Waterboarding",
      "length": "2:08",
      "videoid": "https://www.youtube.com/watch?v=sJSXbA9j0Js",
      "spotify": "https://open.spotify.com/track/5ate0SZfq2pmoPfU6H7sjT",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/torture-memos-waterboarding",
      "tags": "Rock, Topical, Dark, Political, SJW"
  },
  {
      "number": 109,
      "date": "2009-04-19T04:00:00.000Z",
      "title": "I am israel, I am Palestine",
      "length": "3:54",
      "videoid": "https://www.youtube.com/watch?v=paFtzERJ8hM",
      "spotify": "https://open.spotify.com/track/3eZBzbvAddiEG0cRP8AKnt",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-am-israel-i-am-palestine",
      "tags": "Folk, Topical, Political, Middle East, Israel, Palestine"
  },
  {
      "number": 110,
      "date": "2009-04-20T04:00:00.000Z",
      "title": "Cannabis Criminalization: a Short History in Song",
      "length": "3:42",
      "videoid": "https://www.youtube.com/watch?v=cNYbrO9OWP4",
      "spotify": "https://open.spotify.com/track/4m5dwP9tuoA4XhA28yPXGT",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/cannabis-criminalization-a-short-history-in-song",
      "tags": "Country, Topical, Funny, Political, History, Educational"
  },
  {
      "number": 111,
      "date": "2009-04-21T04:00:00.000Z",
      "title": "Wren the Polyamorous Polar Bear and His Story of Redemtion",
      "length": "2:49",
      "videoid": "https://www.youtube.com/watch?v=ivfyckWwbww",
      "spotify": "https://open.spotify.com/track/7r3sjATFmkNBR4MH9YspVD",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/wren-the-polyamorous-polar-bear-and-his-story-of-redemtion",
      "tags": "Rock, Topical, Narrative, Funny, Nerd, Bear, Polar Bear"
  },
  {
      "number": 112,
      "date": "2009-04-22T04:00:00.000Z",
      "title": "Fire Engine Red",
      "length": "2:23",
      "videoid": "https://www.youtube.com/watch?v=_ekL68m7fMw",
      "spotify": "https://open.spotify.com/track/37lVGswhfZ8WDryLZN1FSv",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/fire-engine-red",
      "tags": "Rock, Heavy, Company "
  },
  {
      "number": 113,
      "date": "2009-04-23T04:00:00.000Z",
      "title": "Spintown",
      "length": "1:40",
      "videoid": "https://www.youtube.com/my_videos?o=U&pi=78",
      "spotify": "https://open.spotify.com/track/20pWu7jGTeejcNAIKXkMMY",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/spintown",
      "tags": "Rock, Heavy, Fun, Internet"
  },
  {
      "number": 114,
      "date": "2009-04-24T04:00:00.000Z",
      "title": "Lindsay McCove",
      "length": "0:35",
      "videoid": "https://www.youtube.com/watch?v=dvBDbdhCi4E",
      "spotify": "https://open.spotify.com/track/3r1WUVlDZIfGgQdv8xti3m",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/lindsay-mccove",
      "tags": "Folk, Distortion, Person, Web Series, Dating"
  },
  {
      "number": 115,
      "date": "2009-04-25T04:00:00.000Z",
      "title": "Steve, the Hippo With Multiple Personalities",
      "length": "2:34",
      "videoid": "https://www.youtube.com/watch?v=QHwckqyrza4",
      "spotify": "https://open.spotify.com/track/3yrgC4ZbdIqIoJVlDtAcNb",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/steve-the-hippo-with-multiple-personalities",
      "tags": "Rock, Fun, Topical, Narrative, Funny, Nerd, Hippo"
  },
  {
      "number": 116,
      "date": "2009-04-26T04:00:00.000Z",
      "title": "Ringtone for Liam and Keane's Dad!",
      "length": "0:33",
      "videoid": "https://www.youtube.com/watch?v=WpQ4KyQE0aI",
      "spotify": "https://open.spotify.com/track/73LpqKZdasxrw083yMtKjM",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/ringtone-for-liam-and-keanes-dad",
      "tags": "Rock, Fun, Person"
  },
  {
      "number": 117,
      "date": "2009-04-27T04:00:00.000Z",
      "title": "Don't Let Your Ovaries Get You Down",
      "length": "1:03",
      "videoid": "https://www.youtube.com/watch?v=PgQY-8RETeE",
      "spotify": "https://open.spotify.com/track/1I4xEJeySStkxvNwQBMI8f",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/dont-let-your-ovaries-get-you-down",
      "tags": "Rock, Fun, Motivational, Nerd, Health, Ivory"
  },
  {
      "number": 118,
      "date": "2009-04-28T04:00:00.000Z",
      "title": "Swine Flu: the Musical",
      "length": "1:58",
      "videoid": "https://www.youtube.com/watch?v=sgBm8jvg-bs",
      "spotify": "https://open.spotify.com/track/2H47rsxYj7kQbpJpU59Blh",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/swine-flu-the-musical",
      "tags": "Rock, Topical, Funny, Political, Health"
  },
  {
      "number": 119,
      "date": "2009-04-29T04:00:00.000Z",
      "title": "Lost in the Tubes! a PSA in Song",
      "length": "1:44",
      "videoid": "https://www.youtube.com/watch?v=YNB5kZkvLP8",
      "spotify": "https://open.spotify.com/track/5sMLiOn9YENLTqB0MRfQrc",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/lost-in-the-tubes-a-psa-in-song",
      "tags": "Electro, Fun, Topical, Motivational, Nerd, Internet"
  },
  {
      "number": 120,
      "date": "2009-04-30T04:00:00.000Z",
      "title": "The Continuing Adventures of Bulldog and the Dude",
      "length": "1:41",
      "videoid": "https://www.youtube.com/watch?v=Mj1XlFVUURk",
      "spotify": "https://open.spotify.com/track/0SK0bsCVptDw8akN3mITZm",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-continuing-adventures-of-bulldog-and-the-dude",
      "tags": "Country, Fun, Person, Silly, Famous Person, Radio"
  },
  {
      "number": 121,
      "date": "2009-05-01T04:00:00.000Z",
      "title": "To: Sarah and Mike From: Meredith \nand Adam re: Sorry About your bikes",
      "length": "1:11",
      "videoid": "https://www.youtube.com/watch?v=AHafu9FjIcE",
      "spotify": "https://open.spotify.com/track/2pJguppkp10GDj7UefOt3R",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/to-sarah-and-mike-from-meredith-and-adam-re-sorry-about-your-bikes",
      "tags": "Rock, Person, Fun, Apology"
  },
  {
      "number": 122,
      "date": "2009-05-02T04:00:00.000Z",
      "title": "Happy Birthday Shaista",
      "length": "2:23",
      "videoid": "https://www.youtube.com/watch?v=7hMjEwUcceg",
      "spotify": "https://open.spotify.com/track/5NPdts2edpSyTz9K4O9phJ",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/happy-birthday-shaista",
      "tags": "Folk, Person, Fun, Birthday"
  },
  {
      "number": 123,
      "date": "2009-05-03T04:00:00.000Z",
      "title": "We Are Pattern Machines",
      "length": "2:18",
      "videoid": "https://www.youtube.com/watch?v=6oYXzpkRJME",
      "spotify": "https://open.spotify.com/track/03QU7zsjC1UYY9i0I26hsZ",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/we-are-pattern-machines",
      "tags": "Rock, Dark, Abstract, Wistful, Nerd, Science"
  },
  {
      "number": 124,
      "date": "2009-05-04T04:00:00.000Z",
      "title": "Hey, Miss California",
      "length": "2:34",
      "videoid": "https://www.youtube.com/watch?v=G-wKnV_ZTbo",
      "spotify": "https://open.spotify.com/track/2ERqEzsNpCyeJtZ9jJEmgU",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/hey-miss-california",
      "tags": "Folk, Topical, Funny, Famous Person, Political"
  },
  {
      "number": 125,
      "date": "2009-05-05T04:00:00.000Z",
      "title": "You Deserve a Bank Like This",
      "length": "1:12",
      "videoid": "https://www.youtube.com/watch?v=C2a1UfbV7G0",
      "spotify": "https://open.spotify.com/track/0zbAeHvqvKq7TP9gR5gkiA",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/you-deserve-a-bank-like-this",
      "tags": "Rock, Topical, Political, Economy, SJW"
  },
  {
      "number": 126,
      "date": "2009-05-06T04:00:00.000Z",
      "title": "BIrthday Song for Mimi Hughes",
      "length": "1:46",
      "videoid": "https://www.youtube.com/watch?v=5XcB67lzAMM",
      "spotify": "https://open.spotify.com/track/2xSFsI1VITYjgrZmDMKOcU",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/birthday-song-for-mimi-hughes",
      "tags": "Rock, Fun, Person, Birthday"
  },
  {
      "number": 127,
      "date": "2009-05-07T04:00:00.000Z",
      "title": "Don't Give in to Madness",
      "length": "2:39",
      "videoid": "https://www.youtube.com/watch?v=eXYrUSMJlrw",
      "spotify": "https://open.spotify.com/track/7wSHC6E0yTCV0FjmYkK6ju",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/dont-give-in-to-madness",
      "tags": "Folk, Abstract, Motivational "
  },
  {
      "number": 128,
      "date": "2009-05-08T04:00:00.000Z",
      "title": "The Pitch",
      "length": "2:12",
      "videoid": "https://www.youtube.com/watch?v=-AxfNHQd-sY",
      "spotify": "https://open.spotify.com/track/2FlO5I0U4CkOLF3cGvffOX",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-pitch",
      "tags": "Folk, Topical, Narrative "
  },
  {
      "number": 129,
      "date": "2009-05-09T04:00:00.000Z",
      "title": "Roll My Kroalnos Home",
      "length": "2:16",
      "videoid": "https://www.youtube.com/watch?v=NpAd2uG6CHk",
      "spotify": "https://open.spotify.com/track/0oIIVInhGBCeb9d1hEjNHl",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/roll-my-kroalnos-home",
      "tags": "Rock, Dark, Abstract, Backyard"
  },
  {
      "number": 130,
      "date": "2009-05-10T04:00:00.000Z",
      "title": "Flying to Vienna Pt 1",
      "length": "0:59",
      "videoid": "https://www.youtube.com/watch?v=07uO6bEpbWc",
      "spotify": "https://open.spotify.com/track/4Dj4mcKw1tr24IYyGrQdyw",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/flying-to-vienna-pt-1",
      "tags": "Rock, Abstract, Narrative, Travel"
  },
  {
      "number": 131,
      "date": "2009-05-11T04:00:00.000Z",
      "title": "Flying to Vienna Pt 2",
      "length": "0:56",
      "videoid": "https://www.youtube.com/watch?v=waMjI15_USw",
      "spotify": "https://open.spotify.com/track/4wKe56XCUcaPpIfF9HFrwN",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/flying-to-vienna-pt-2",
      "tags": "Rock, Abstract, Narrative, Travel"
  },
  {
      "number": 132,
      "date": "2009-05-12T04:00:00.000Z",
      "title": "GameDeals Theme",
      "length": "0:36",
      "videoid": "https://www.youtube.com/watch?v=g_7zrWaN3oc",
      "spotify": "https://open.spotify.com/track/0vSP0bmfNNpHMP6qY0k2JV",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/gamedeals-theme",
      "tags": "Electro, Distortion, Person, Narrative, Nerd, Video Games, Web Series "
  },
  {
      "number": 133,
      "date": "2009-05-13T04:00:00.000Z",
      "title": "Springtime in Vienna",
      "length": "2:49",
      "videoid": "https://www.youtube.com/watch?v=bh7qn8hBpeo",
      "spotify": "https://open.spotify.com/track/2vWCcAtayJxNx9h07OliDq",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/springtime-in-vienna",
      "tags": "Folk, Narrative, Place, Backyard"
  },
  {
      "number": 134,
      "date": "2009-05-14T04:00:00.000Z",
      "title": "Why Do Potatoes Argue?",
      "length": "1:05",
      "videoid": "https://www.youtube.com/watch?v=aZoUK8jtgbo",
      "spotify": "https://open.spotify.com/track/4VYcczgSFwXz50Q8dJAlWN",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/why-do-potatoes-argue",
      "tags": "Rock, Narrative, Funny, Nerd, Food, Potatoes"
  },
  {
      "number": 135,
      "date": "2009-05-15T04:00:00.000Z",
      "title": "If You're Gonna Do It (Do It Yourself)",
      "length": "2:36",
      "videoid": "https://www.youtube.com/watch?v=2qNC7kadXHk",
      "spotify": "https://open.spotify.com/track/0GKf43azvLhyFVG6UxHP1t",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/if-youre-gonna-do-it-do-it-yourself",
      "tags": "Folk, Topical, Motivational "
  },
  {
      "number": 136,
      "date": "2009-05-16T04:00:00.000Z",
      "title": "Old Man Sleeping By the Side of the Road",
      "length": "2:04",
      "videoid": "https://www.youtube.com/watch?v=UIIzeUAE5ds",
      "spotify": "https://open.spotify.com/track/3lKmjz622UYsttQQ2Pjf4P",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/old-man-sleeping-by-the-side-of-the-road",
      "tags": "Folk, Dark, Abstract, Narrative "
  },
  {
      "number": 137,
      "date": "2009-05-17T04:00:00.000Z",
      "title": "There's a Hole in His Hat",
      "length": "1:45",
      "videoid": "https://www.youtube.com/watch?v=txSXoLerzRc",
      "spotify": "https://open.spotify.com/track/7zuuIZutvuOgq9fforbkKJ",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/theres-a-hole-in-his-hat",
      "tags": "Acapella, Person, Fun, Nerd"
  },
  {
      "number": 138,
      "date": "2009-05-18T04:00:00.000Z",
      "title": "Who Will Remain (2009)",
      "length": "3:34",
      "videoid": "https://www.youtube.com/watch?v=DNUs-sJYsDc",
      "spotify": "https://open.spotify.com/track/311TjLy1afbFAN7JtAS9Iv",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/who-will-remain",
      "tags": "Rock, Dark, Abstract, Political"
  },
  {
      "number": 139,
      "date": "2009-05-19T04:00:00.000Z",
      "title": "The Botanical Gardens of the Univeristy of Vienna",
      "length": "2:29",
      "videoid": "https://www.youtube.com/watch?v=g5M2Vm58r0w",
      "spotify": "https://open.spotify.com/track/5kqTXgReIcKwZGvpY4TOZk",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-botanical-gardens-of-the-univeristy-of-vienna",
      "tags": "Folk, Fun, Place, Botanical Garden"
  },
  {
      "number": 140,
      "date": "2009-05-20T04:00:00.000Z",
      "title": "Frodo Uses the Hobbit ATM",
      "length": "2:15",
      "videoid": "https://www.youtube.com/watch?v=_jotZWp0398",
      "spotify": "https://open.spotify.com/track/4RuJMOtR0yParUZvI6Mw5o",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/frodo-uses-the-hobbit-atm",
      "tags": "Rock, Dark, Topical, Narrative, Fun, Nerd, Book, Hobbit, Famous Person, Frodo, Object, ATM"
  },
  {
      "number": 141,
      "date": "2009-05-21T04:00:00.000Z",
      "title": "A Sleepy German Train Ride",
      "length": "1:11",
      "videoid": "https://www.youtube.com/watch?v=vG38JS5SVj0",
      "spotify": "https://open.spotify.com/track/2bW3gtE7fnmQmR2S3SfZK9",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/a-sleepy-german-train-ride",
      "tags": "Folk, Abstract, Travel"
  },
  {
      "number": 142,
      "date": "2009-05-22T04:00:00.000Z",
      "title": "What Are They Gonna Do?",
      "length": "3:54",
      "videoid": "https://www.youtube.com/watch?v=jVQovH2QTAQ",
      "spotify": "https://open.spotify.com/track/3liNhcB5xnLN4g1eaKWVEz",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/what-are-they-gonna-do",
      "tags": "Folk, Topical, Wistful, Nerd, Internet, Hackers"
  },
  {
      "number": 143,
      "date": "2009-05-23T04:00:00.000Z",
      "title": "The CCC Anthem",
      "length": "1:11",
      "videoid": "https://www.youtube.com/watch?v=EgHtBA-h5xo",
      "spotify": "https://open.spotify.com/track/083wALQx9qeD6srqcAGd5H",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-ccc-anthem",
      "tags": "Folk, Topical, Fun, Nerd, Inernet, Hackers"
  },
  {
      "number": 144,
      "date": "2009-05-24T04:00:00.000Z",
      "title": "Tarsiers Are My Friends",
      "length": "3:34",
      "videoid": "https://www.youtube.com/watch?v=skAWxChA2HU",
      "spotify": "https://open.spotify.com/track/3wSMKk3j5SmlYTyBI04H7g",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/tarsiers-are-my-friends",
      "tags": "Folk, Topical, Fun, Nerdy, Friend, Animals, Tarsiers"
  },
  {
      "number": 145,
      "date": "2009-05-25T04:00:00.000Z",
      "title": "Meditation on Friends in the Key of G",
      "length": "3:19",
      "videoid": "https://www.youtube.com/watch?v=Ordtl30Vd7s",
      "spotify": "https://open.spotify.com/track/7aZS6KpYDlYB1uUBqFqB2w",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/meditation-on-friends-in-the-key-of-g",
      "tags": "Folk, Person, Friend"
  },
  {
      "number": 146,
      "date": "2009-05-26T04:00:00.000Z",
      "title": "Floating Orb in Flame",
      "length": "1:11",
      "videoid": "https://www.youtube.com/watch?v=SWwBDvRUhfo",
      "spotify": "https://open.spotify.com/track/13nVR9DsVBuBRFZR90KQJq",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/floating-orb-in-flame",
      "tags": "Folk, Abstract, Dark"
  },
  {
      "number": 147,
      "date": "2009-05-27T04:00:00.000Z",
      "title": "Goodbye Vodka, Voddy",
      "length": "2:12",
      "videoid": "https://www.youtube.com/watch?v=QMliaYkuKv0",
      "spotify": "https://open.spotify.com/track/5t1e9fAOfZ3eH6vv0rHNIE",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/goodbye-vodka-voddy",
      "tags": "Electro, Dark, Friend, Cats"
  },
  {
      "number": 148,
      "date": "2009-05-28T04:00:00.000Z",
      "title": "The Smog Gets Thicker",
      "length": "1:48",
      "videoid": "https://www.youtube.com/watch?v=fNDbEnetYuw",
      "spotify": "https://open.spotify.com/track/2ujLPEAlWYusgMyC0DvEHz",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-smog-gets-thicker",
      "tags": "Folk, Abstract, Good"
  },
  {
      "number": 149,
      "date": "2009-05-29T04:00:00.000Z",
      "title": "Terror at Arkham (Arkham Horror: a True Story)",
      "length": "3:45",
      "videoid": "https://www.youtube.com/watch?v=ATiFGv3rJdQ",
      "spotify": "https://open.spotify.com/track/7zP77J95mFEk2Cjvxg9KKe",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/terror-at-arkham-arkham-horror-a-true-story"
  },
  {
      "number": 150,
      "date": "2009-05-30T04:00:00.000Z",
      "title": "Gladiator Meow",
      "length": "3:36",
      "videoid": "https://www.youtube.com/watch?v=kN6Q-UEPQe0",
      "spotify": "https://open.spotify.com/track/3hMaKHzhyMMKNGaos41vsS",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/gladiator-meow"
  },
  {
      "number": 151,
      "date": "2009-05-31T04:00:00.000Z",
      "title": "A Letter to the Killer of George Tiller",
      "length": "2:39",
      "videoid": "https://www.youtube.com/watch?v=jYnggj-E92k",
      "spotify": "https://open.spotify.com/track/7rHB8s6uaTEhq3W0a5wzIW",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/a-letter-to-the-killer-of-george-tiller"
  },
  {
      "number": 152,
      "date": "2009-06-01T04:00:00.000Z",
      "title": "Bandcamp.com Anthem",
      "length": "2:13",
      "videoid": "https://www.youtube.com/watch?v=B-KvxhEA6yA",
      "spotify": "https://open.spotify.com/track/64A4vmVpUOVfF6Rx5OZqU9",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/bandcamp-com-anthem"
  },
  {
      "number": 153,
      "date": "2009-06-02T04:00:00.000Z",
      "title": "Half Drunk Mugs of Tea",
      "length": "2:29",
      "videoid": "https://www.youtube.com/watch?v=K2pWG8dkWys",
      "spotify": "https://open.spotify.com/track/5E265yY1RuL1E3Nr5Y5M3L",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/half-drunk-mugs-of-tea"
  },
  {
      "number": 154,
      "date": "2009-06-03T04:00:00.000Z",
      "title": "Saved By the Bell Again",
      "length": "1:55",
      "videoid": "https://www.youtube.com/watch?v=LOyW9H60n4Q",
      "spotify": "https://open.spotify.com/track/5eag7VldkwsgjagrUbHPd5",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/saved-by-the-bell-again"
  },
  {
      "number": 155,
      "date": "2009-06-04T04:00:00.000Z",
      "title": "Don't Throw My Shoe at Me",
      "length": "3:08",
      "videoid": "https://www.youtube.com/watch?v=r5YKhCp9VM8",
      "spotify": "https://open.spotify.com/track/48dEbOQrJ9NxCtRsYo7VHX",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/dont-throw-my-shoe-at-me"
  },
  {
      "number": 156,
      "date": "2009-06-05T04:00:00.000Z",
      "title": "This Here is a Subscribe Drive",
      "length": "3:17",
      "videoid": "https://www.youtube.com/watch?v=9PdVmitdUXU",
      "spotify": "https://open.spotify.com/track/4yhFFR6epprSNygKYGPgoD",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/this-here-is-a-subscribe-drive"
  },
  {
      "number": 157,
      "date": "2009-06-06T04:00:00.000Z",
      "title": "Whiskey the Cat (And Other Songs)",
      "length": "4:23",
      "videoid": "https://www.youtube.com/watch?v=0auEaoEbfJ4",
      "spotify": "https://open.spotify.com/track/3twgPjWyofLXfx8GuMm4uU",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/whiskey-the-cat-and-other-songs"
  },
  {
      "number": 158,
      "date": "2009-06-07T04:00:00.000Z",
      "title": "Living My Life",
      "length": "2:04",
      "videoid": "https://www.youtube.com/watch?v=DtmgYhxoQAE",
      "spotify": "https://open.spotify.com/track/40I0sBYIN9OTkDETFh5VbQ",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/living-my-life"
  },
  {
      "number": 159,
      "date": "2009-06-08T04:00:00.000Z",
      "title": "Beautiful Way to Live",
      "length": "2:31",
      "videoid": "https://www.youtube.com/watch?v=GncGEr1I2n8",
      "spotify": "https://open.spotify.com/track/4lFtdyw72u16s5uEyA6Gjw",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/beautiful-way-to-live"
  },
  {
      "number": 160,
      "date": "2009-06-09T04:00:00.000Z",
      "title": "I Wanna Go Where the Wild Things Are",
      "length": "2:32",
      "videoid": "https://www.youtube.com/watch?v=l1gSKUJrZU0",
      "spotify": "https://open.spotify.com/track/4ji8vB6bwsJtvDKo9W744V",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-wanna-go-where-the-wild-things-are"
  },
  {
      "number": 161,
      "date": "2009-06-10T04:00:00.000Z",
      "title": "Freakonomics",
      "length": "2:33",
      "videoid": "https://www.youtube.com/watch?v=gtaQQjadPjI",
      "spotify": "https://open.spotify.com/track/5ro9ennmdNNJm1yGWonotx",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/freakonomics"
  },
  {
      "number": 162,
      "date": "2009-06-11T04:00:00.000Z",
      "title": "Isaac Newton Was a Total Badass",
      "length": "2:40",
      "videoid": "https://www.youtube.com/watch?v=LVHNHPliBoQ",
      "spotify": "https://open.spotify.com/track/6xVCx7RuIdRT4Lhif5fGuz",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/isaac-newton-was-a-total-badass"
  },
  {
      "number": 163,
      "date": "2009-06-12T04:00:00.000Z",
      "title": "Joy and Freedom",
      "length": "2:51",
      "videoid": "https://www.youtube.com/watch?v=_s8qpYYSGes",
      "spotify": "https://open.spotify.com/track/5EolimyeP1f59SkjQm36Hp",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/joy-and-freedom"
  },
  {
      "number": 164,
      "date": "2009-06-13T04:00:00.000Z",
      "title": "We've Been Cooking All Day",
      "length": "0:50",
      "videoid": "https://www.youtube.com/watch?v=l3j8zAIxvqA",
      "spotify": "https://open.spotify.com/track/0FMQsYafBXUYiQMTgWjRbr",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/weve-been-cooking-all-day"
  },
  {
      "number": 165,
      "date": "2009-06-14T04:00:00.000Z",
      "title": "I Will Follow You",
      "length": "1:50",
      "videoid": "https://www.youtube.com/watch?v=ruiLkgdPvn8",
      "spotify": "https://open.spotify.com/track/6qVQrElsCnhwyi0d2Ch1hF",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-will-follow-you"
  },
  {
      "number": 166,
      "date": "2009-06-15T04:00:00.000Z",
      "title": "Matthias Jamison-Koenig",
      "length": "1:34",
      "videoid": "https://www.youtube.com/watch?v=yM1xPZsDNcw",
      "spotify": "https://open.spotify.com/track/0593zChHD0hH4c4WefaqW9",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/matthias-jamison-koenig"
  },
  {
      "number": 167,
      "date": "2009-06-16T04:00:00.000Z",
      "title": "Keep Rocking, Iran",
      "length": "2:01",
      "videoid": "https://www.youtube.com/watch?v=74vFgvJqJHE",
      "spotify": "https://open.spotify.com/track/6cqfAqW8VT5ylRR14EFawP",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/keep-rocking-iran"
  },
  {
      "number": 168,
      "date": "2009-06-17T04:00:00.000Z",
      "title": "I Quit!",
      "length": "1:41",
      "videoid": "https://www.youtube.com/watch?v=RqgthhAzrlQ",
      "spotify": "https://open.spotify.com/track/5ExkneLNkgfwiQ35bzMWPh",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-quit"
  },
  {
      "number": 169,
      "date": "2009-06-18T04:00:00.000Z",
      "title": "Vegetables",
      "length": "1:21",
      "videoid": "https://www.youtube.com/watch?v=LPQf64JTUMI",
      "spotify": "https://open.spotify.com/track/3XqY5iy6Gh8gxX0GD4WeLT",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/vegetables"
  },
  {
      "number": 170,
      "date": "2009-06-19T04:00:00.000Z",
      "title": "The Day Kangaroos Didn't Hop",
      "length": "1:31",
      "videoid": "https://www.youtube.com/watch?v=vfe9rwlFgTY",
      "spotify": "https://open.spotify.com/track/5jm2RuBAUNNJqBgkd6SehS",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-day-kangaroos-didnt-hop"
  },
  {
      "number": 171,
      "date": "2009-06-20T04:00:00.000Z",
      "title": "What You Think It is",
      "length": "2:31",
      "videoid": "https://www.youtube.com/watch?v=rPUsA7U3n2c",
      "spotify": "https://open.spotify.com/track/61BgRnhvUgk43DbOIOVAmj",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/what-you-think-it-is"
  },
  {
      "number": 172,
      "date": "2009-06-21T04:00:00.000Z",
      "title": "We Don't Change",
      "length": "1:38",
      "videoid": "https://www.youtube.com/watch?v=zw8YWXMyUjw",
      "spotify": "https://open.spotify.com/track/1vFzexvybKeKdirzyZdXuP",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/we-dont-change"
  },
  {
      "number": 173,
      "date": "2009-06-22T04:00:00.000Z",
      "title": "There's So Much to Know",
      "length": "3:33",
      "videoid": "https://www.youtube.com/watch?v=wO3RaI7wY9c",
      "spotify": "https://open.spotify.com/track/3aS4WZhGH9ES8nZWwN6U3N",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/theres-so-much-to-know"
  },
  {
      "number": 174,
      "date": "2009-06-23T04:00:00.000Z",
      "title": "The Rose of Hillside",
      "length": "3:10",
      "videoid": "https://www.youtube.com/watch?v=XOMp-GJiLpA",
      "spotify": "https://open.spotify.com/track/66iqJEsncAahdq6XoGLMe4",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-rose-of-hillside"
  },
  {
      "number": 175,
      "date": "2009-06-24T04:00:00.000Z",
      "title": "You Stole My Money",
      "length": "1:27",
      "videoid": "https://www.youtube.com/watch?v=P15kjB-n6QI",
      "spotify": "https://open.spotify.com/track/1kbzJ4QMyze60QZ0l6dHHq",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/you-stole-my-money"
  },
  {
      "number": 176,
      "date": "2009-06-25T04:00:00.000Z",
      "title": "Happy Birthday, Adrian",
      "length": "1:28",
      "videoid": "https://www.youtube.com/watch?v=iQfC0XGc1Yg",
      "spotify": "https://open.spotify.com/track/52Sd745bqPm2q75Z8wLlc0",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/happy-birthday-adrian"
  },
  {
      "number": 177,
      "date": "2009-06-26T04:00:00.000Z",
      "title": "I Used to Worship Michael Jackson",
      "length": "2:58",
      "videoid": "https://www.youtube.com/watch?v=rK7U_iNvH18",
      "spotify": "https://open.spotify.com/track/4ymZvusvDcR6gN4zgTtzrY",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-used-to-worship-michael-jackson"
  },
  {
      "number": 178,
      "date": "2009-06-27T04:00:00.000Z",
      "title": "The King Has a Bottom",
      "length": "2:27",
      "videoid": "https://www.youtube.com/watch?v=eSIb-scnlwM",
      "spotify": "https://open.spotify.com/track/3L1YNJGAn6Xg0f2odbDV0u",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-king-has-a-bottom"
  },
  {
      "number": 179,
      "date": "2009-06-28T04:00:00.000Z",
      "title": "Words Stuck",
      "length": "2:30",
      "videoid": "https://www.youtube.com/watch?v=o6TRmdmIRGQ",
      "spotify": "https://open.spotify.com/track/5qTFWyvZ4YD5ES983XD4kP",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/words-stuck"
  },
  {
      "number": 180,
      "date": "2009-06-29T04:00:00.000Z",
      "title": "Down, Down, Down",
      "length": "1:48",
      "videoid": "https://www.youtube.com/watch?v=-KVb0uWXuDk",
      "spotify": "https://open.spotify.com/track/70yBa2OG8dzaDf0pinZYRw",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/down-down-down"
  },
  {
      "number": 181,
      "date": "2009-06-30T04:00:00.000Z",
      "title": "Take Medium Steps",
      "length": "1:45",
      "videoid": "https://www.youtube.com/watch?v=igChYNFQHNE",
      "spotify": "https://open.spotify.com/track/2noC80r4Kiy5dGYhgvJHS6",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/take-medium-steps"
  },
  {
      "number": 182,
      "date": "2009-07-01T04:00:00.000Z",
      "title": "We'll All Be Fools",
      "length": "2:28",
      "videoid": "https://www.youtube.com/watch?v=pHISoIixUPk",
      "spotify": "https://open.spotify.com/track/2qYwhtmfgayRb5bWJAiswt",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/well-all-be-fools"
  },
  {
      "number": 183,
      "date": "2009-07-02T04:00:00.000Z",
      "title": "Steve Rouse Song",
      "length": "2:11",
      "videoid": "https://www.youtube.com/watch?v=SBXkvQ350xU",
      "spotify": "https://open.spotify.com/track/0JI8TvF1XnVBSALcIyOkYi",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/steve-rouse-song"
  },
  {
      "number": 184,
      "date": "2009-07-03T04:00:00.000Z",
      "title": "The Book of the New Sun",
      "length": "3:58",
      "videoid": "https://www.youtube.com/watch?v=80JrlYzUJqY",
      "spotify": "https://open.spotify.com/track/3ZxTMjilqi4LBseMSCMON0",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-book-of-the-new-sun"
  },
  {
      "number": 185,
      "date": "2009-07-04T04:00:00.000Z",
      "title": "I've Been Trying to Sneeze for 24 Hours",
      "length": "1:46",
      "videoid": "https://www.youtube.com/watch?v=zGPel3z-MJg",
      "spotify": "https://open.spotify.com/track/6c0XUAD3Xdc7b78SSfc9sO",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/ive-been-trying-to-sneeze-for-24-hours"
  },
  {
      "number": 186,
      "date": "2009-07-05T04:00:00.000Z",
      "title": "Palin's Resignation Speech in Song",
      "length": "2:13",
      "videoid": "https://www.youtube.com/watch?v=1TJX310iGR8",
      "spotify": "https://open.spotify.com/track/0otZol0lxw0tlOEBgjkI45",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/palins-resignation-speech-in-song"
  },
  {
      "number": 187,
      "date": "2009-07-06T04:00:00.000Z",
      "title": "If Your Love is on Fire",
      "length": "2:18",
      "videoid": "https://www.youtube.com/watch?v=QQP598TPGPY",
      "spotify": "https://open.spotify.com/track/3qJR1uWfwTj8yr62aXL4DY",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/if-your-love-is-on-fire"
  },
  {
      "number": 188,
      "date": "2009-07-07T04:00:00.000Z",
      "title": "Colors and Light",
      "length": "2:16",
      "videoid": "https://www.youtube.com/watch?v=AU8JJjmwL0w",
      "spotify": "https://open.spotify.com/track/0SCK3fsOeZ8Z8lUzxQcluF",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/colors-and-light"
  },
  {
      "number": 189,
      "date": "2009-07-08T04:00:00.000Z",
      "title": "Hunchback With a Dirty Mind",
      "length": "2:33",
      "videoid": "https://www.youtube.com/watch?v=peswE5IScyc",
      "spotify": "https://open.spotify.com/track/2zWzUKUVaOK3oYhlM4KSEl",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/hunchback-with-a-dirty-mind"
  },
  {
      "number": 190,
      "date": "2009-07-09T04:00:00.000Z",
      "title": "Time for Summer Now",
      "length": "3:26",
      "videoid": "https://www.youtube.com/watch?v=cCzBQkKc7-s",
      "spotify": "https://open.spotify.com/track/5ApHhI5g1X7jc7NTdjr2eT",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/time-for-summer-now"
  },
  {
      "number": 191,
      "date": "2009-07-10T04:00:00.000Z",
      "title": "Mint Magician",
      "length": "3:12",
      "videoid": "https://www.youtube.com/watch?v=73aLfnZ4qO8",
      "spotify": "https://open.spotify.com/track/62nb7E7bhSuAWZFwnKVXbP",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/mint-magician"
  },
  {
      "number": 192,
      "date": "2009-07-11T04:00:00.000Z",
      "title": "I'm From Vermont",
      "length": "2:06",
      "videoid": "https://www.youtube.com/watch?v=Ja9qJlRnug4",
      "spotify": "https://open.spotify.com/track/1nXC6wQgBt1ckez2SUXzP4",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/im-from-vermont"
  },
  {
      "number": 193,
      "date": "2009-07-12T04:00:00.000Z",
      "title": "Myspace is a Ghost Town",
      "length": "1:00",
      "videoid": "https://www.youtube.com/watch?v=Cqs081D3KqY",
      "spotify": "https://open.spotify.com/track/7cZyDuRWeBEXtFa4KuSd5e",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/myspace-is-a-ghost-town"
  },
  {
      "number": 194,
      "date": "2009-07-13T04:00:00.000Z",
      "title": "When Harry Met Ginny",
      "length": "3:07",
      "videoid": "https://www.youtube.com/watch?v=YgAvbr9Gii0",
      "spotify": "https://open.spotify.com/track/0BdWvy6dFnLro7KcoiTXbZ",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/when-harry-met-ginny"
  },
  {
      "number": 195,
      "date": "2009-07-14T04:00:00.000Z",
      "title": "Do the Monster Dance",
      "length": "1:09",
      "videoid": "https://www.youtube.com/watch?v=Okp7xBZFJ2Q",
      "spotify": "https://open.spotify.com/track/2XEppWhbYOJGAjMt0SfAXX",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/do-the-monster-dance"
  },
  {
      "number": 196,
      "date": "2009-07-15T04:00:00.000Z",
      "title": "Running Through the internet",
      "length": "2:12",
      "videoid": "https://www.youtube.com/watch?v=Weka7PdYEtw",
      "spotify": "https://open.spotify.com/track/6xNBa2DmscLuFu5gixQywC",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/running-through-the-internet"
  },
  {
      "number": 197,
      "date": "2009-07-16T04:00:00.000Z",
      "title": "Baby, It All Led to You (An Evolutionary Love Song)",
      "length": "4:08",
      "videoid": "https://www.youtube.com/watch?v=CdokrUCr7-k",
      "spotify": "https://open.spotify.com/track/2rtgtUoO6YLndwVTQJHryR",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/baby-it-all-led-to-you-an-evolutionary-love-song"
  },
  {
      "number": 198,
      "date": "2009-07-17T04:00:00.000Z",
      "title": "The LIttle Prince",
      "length": "2:16",
      "videoid": "https://www.youtube.com/watch?v=PMSflgS_Y2M",
      "spotify": "https://open.spotify.com/track/0H8YVRngyMS6462H79W8h8",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-little-prince"
  },
  {
      "number": 199,
      "date": "2009-07-18T04:00:00.000Z",
      "title": "200 Songs",
      "length": "0:59",
      "videoid": "https://www.youtube.com/watch?v=optclFyzDnA",
      "spotify": "https://open.spotify.com/track/0sKSm4gLIQx9Czi156uNJJ",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/200-songs"
  },
  {
      "number": 200,
      "date": "2009-07-19T04:00:00.000Z",
      "title": "Pictures of Plenty",
      "length": "2:05",
      "videoid": "https://www.youtube.com/watch?v=GwjVeqKeep4",
      "spotify": "https://open.spotify.com/track/6dXoloIUVyEVfQzmJTlMnM",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/pictures-of-plenty"
  },
  {
      "number": 201,
      "date": "2009-07-20T04:00:00.000Z",
      "title": "Bing Goes the internet",
      "length": "1:13",
      "videoid": "https://www.youtube.com/my_videos?o=U&pi=75",
      "spotify": "https://open.spotify.com/track/40DEH5ltS2ynYnaY9Mfa1P",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/bing-goes-the-internet"
  },
  {
      "number": 202,
      "date": "2009-07-21T04:00:00.000Z",
      "title": "I am a Crazy Piccachu",
      "length": "1:35",
      "videoid": "https://www.youtube.com/watch?v=eocDr_8BW_Y",
      "spotify": "https://open.spotify.com/track/0p32binqfYqKfashbhexcf",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-am-a-crazy-piccachu"
  },
  {
      "number": 203,
      "date": "2009-07-22T04:00:00.000Z",
      "title": "Bike Love",
      "length": "1:49",
      "videoid": "https://www.youtube.com/watch?v=TAlhgKWEqWE",
      "spotify": "https://open.spotify.com/track/3G1NbxTvHTBXBpdCQwj994",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/bike-love"
  },
  {
      "number": 204,
      "date": "2009-07-23T04:00:00.000Z",
      "title": "Commondreams.org",
      "length": "1:07",
      "videoid": "https://www.youtube.com/watch?v=j7lF18vQ5HI",
      "spotify": "https://open.spotify.com/track/4cKLWWP1ondbaokA80Rk69",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/commondreams-org"
  },
  {
      "number": 205,
      "date": "2009-07-24T04:00:00.000Z",
      "title": "Look at That Deer, Licking That Cat",
      "length": "2:03",
      "videoid": "https://www.youtube.com/watch?v=vR-vY5fzTeA",
      "spotify": "https://open.spotify.com/track/5VYVejL1z2YhbGt62cE2XM",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/look-at-that-deer-licking-that-cat"
  },
  {
      "number": 206,
      "date": "2009-07-25T04:00:00.000Z",
      "title": "The Robots Don't Love You Anymore",
      "length": "1:51",
      "videoid": "https://www.youtube.com/watch?v=JflvA6n86Wk",
      "spotify": "https://open.spotify.com/track/6UKuT6G6SDNOdSrdlaa6fb",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-robots-dont-love-you-anymore"
  },
  {
      "number": 207,
      "date": "2009-07-26T04:00:00.000Z",
      "title": "Ocean",
      "length": "1:44",
      "videoid": "https://www.youtube.com/watch?v=G1YC_fTssUQ",
      "spotify": "https://open.spotify.com/track/54lOsB3ApDotNxsyaARC3k",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/ocean"
  },
  {
      "number": 208,
      "date": "2009-07-27T04:00:00.000Z",
      "title": "The Kind of Song You'd Hear in a 90s Noir B-Movie",
      "length": "3:30",
      "videoid": "https://www.youtube.com/watch?v=NGCO-9ziY4I",
      "spotify": "https://open.spotify.com/track/4isvL2Rb2u3Tgj7uieqG65",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-kind-of-song-youd-hear-in-a-90s-noir-b-movie"
  },
  {
      "number": 209,
      "date": "2009-07-28T04:00:00.000Z",
      "title": "Two Chords",
      "length": "1:21",
      "videoid": "https://www.youtube.com/watch?v=UY31lHRJwfY",
      "spotify": "https://open.spotify.com/track/5miQhEUl0snrVPvVx9YVjX",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/two-chords"
  },
  {
      "number": 210,
      "date": "2009-07-29T04:00:00.000Z",
      "title": "Games and Sounds",
      "length": "1:09",
      "videoid": "https://www.youtube.com/watch?v=IQDXq2zpBCI",
      "spotify": "https://open.spotify.com/track/2w8DIxzEqWW2pocqFA3ngx",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/games-and-sounds"
  },
  {
      "number": 211,
      "date": "2009-07-30T04:00:00.000Z",
      "title": "Gone Like the Dodo",
      "length": "2:17",
      "videoid": "https://www.youtube.com/watch?v=sxjkIgsppwc",
      "spotify": "https://open.spotify.com/track/1ze2ri95XexLC5jrNosR0E",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/gone-like-the-dodo"
  },
  {
      "number": 212,
      "date": "2009-07-31T04:00:00.000Z",
      "title": "Time Capsule",
      "length": "1:27",
      "videoid": "https://www.youtube.com/watch?v=F02hhkUDhuI",
      "spotify": "https://open.spotify.com/track/3xLLZcEMNYMcehRnkCZKB9",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/time-capsule"
  },
  {
      "number": 213,
      "date": "2009-08-01T04:00:00.000Z",
      "title": "Nic Kaelin",
      "length": "1:16",
      "videoid": "https://www.youtube.com/watch?v=QHcF-qwEs_M",
      "spotify": "https://open.spotify.com/track/79rKIGJDHf4TQGhwTDeyUq",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/nic-kaelin"
  },
  {
      "number": 214,
      "date": "2009-08-02T04:00:00.000Z",
      "title": "Life With Cha Cha is in Sonic Technicolor",
      "length": "2:15",
      "videoid": "https://www.youtube.com/watch?v=012_5is488Y",
      "spotify": "https://open.spotify.com/track/6Ka6LyGXPlPWPvjdM4UMIl",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/live-with-cha-cha-is-in-sonic-technicolor"
  },
  {
      "number": 215,
      "date": "2009-08-03T04:00:00.000Z",
      "title": "Let Your Ears Decide",
      "length": "1:30",
      "videoid": "https://www.youtube.com/watch?v=5jR84NTwRF4",
      "spotify": "https://open.spotify.com/track/6u05bi204mjSRqz1k1dezc",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/let-your-ears-decide"
  },
  {
      "number": 216,
      "date": "2009-08-04T04:00:00.000Z",
      "title": "Wash Your Hands!",
      "length": "0:30",
      "videoid": "https://www.youtube.com/watch?v=bT-Ktx8Qpc0",
      "spotify": "https://open.spotify.com/track/1rMJNvcKdbpIQbqBRGIfJK",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/wash-your-hands"
  },
  {
      "number": 217,
      "date": "2009-08-05T04:00:00.000Z",
      "title": "I am MG Siegler",
      "length": "0:58",
      "videoid": "https://www.youtube.com/watch?v=ybsRCQy_3xQ",
      "spotify": "https://open.spotify.com/track/515xsfOnATJxMW3Co1KTXZ",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-am-mg-siegler"
  },
  {
      "number": 218,
      "date": "2009-08-06T04:00:00.000Z",
      "title": "The Big Picture With David Shuster",
      "length": "1:46",
      "videoid": "https://www.youtube.com/watch?v=wySpD3mUx2M",
      "spotify": "https://open.spotify.com/track/00QcdhTvNiyPw06aoDcP4P",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-big-picture-with-david-shuster"
  },
  {
      "number": 219,
      "date": "2009-08-07T04:00:00.000Z",
      "title": "That Dastardly Villian, MG",
      "length": "1:29",
      "videoid": "https://www.youtube.com/watch?v=DxYlmF2NV2E",
      "spotify": "https://open.spotify.com/track/2EXbSG82woxeYn4Nketo5U",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/that-dastardly-villian-mg"
  },
  {
      "number": 220,
      "date": "2009-08-08T04:00:00.000Z",
      "title": "I Wrote the Worst Jingle in the World",
      "length": "1:02",
      "videoid": "https://www.youtube.com/watch?v=1ikv048WI7E",
      "spotify": "https://open.spotify.com/track/3qunbAdXAM9dim4SfT0h4q",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-wrote-the-worst-jingle-in-the-world"
  },
  {
      "number": 221,
      "date": "2009-08-09T04:00:00.000Z",
      "title": "Do It, Screw It",
      "length": "1:14",
      "videoid": "https://www.youtube.com/watch?v=NJrFXJmCpg8",
      "spotify": "https://open.spotify.com/track/3lkM8RUxFFysSwdPUf4pLz",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/do-it-screw-it"
  },
  {
      "number": 222,
      "date": "2009-08-10T04:00:00.000Z",
      "title": "SkyDiving Through Groupon.com",
      "length": "1:52",
      "videoid": "https://www.youtube.com/watch?v=YfGhZTWgD8g",
      "spotify": "https://open.spotify.com/track/1giJpFl8KRqKXzB6RZbeyv",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/skydiving-through-groupon-com"
  },
  {
      "number": 223,
      "date": "2009-08-11T04:00:00.000Z",
      "title": "Courseopedia.com",
      "length": "1:14",
      "videoid": "https://www.youtube.com/watch?v=rbxTCnSAmqc",
      "spotify": "https://open.spotify.com/track/5M6rFPdWfWDe3U9MEWl0Wv",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/courseopedia-com"
  },
  {
      "number": 224,
      "date": "2009-08-12T04:00:00.000Z",
      "title": "Bamboo Solutions",
      "length": "1:41",
      "videoid": "https://www.youtube.com/watch?v=hfIFVV3TSzo",
      "spotify": "https://open.spotify.com/track/5yAeZSvdzndVa97fOQnpT4",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/bamboo-solutions"
  },
  {
      "number": 225,
      "date": "2009-08-13T04:00:00.000Z",
      "title": "Man Did What Some Birds Could Never Do",
      "length": "1:08",
      "videoid": "https://www.youtube.com/watch?v=wYSd19nxH8c",
      "spotify": "https://open.spotify.com/track/0CPu2Lqos2rIEbY1ZAnFAy",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/man-did-what-some-birds-could-never-do"
  },
  {
      "number": 226,
      "date": "2009-08-14T04:00:00.000Z",
      "title": "Fox News is Bad for the Country",
      "length": "2:09",
      "videoid": "https://www.youtube.com/watch?v=6ZdUCtBd2mA",
      "spotify": "https://open.spotify.com/track/2HMeCMvm5em3jY40DR53z0",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/fox-news-is-bad-for-the-country"
  },
  {
      "number": 227,
      "date": "2009-08-15T04:00:00.000Z",
      "title": "InFolinks",
      "length": "1:24",
      "videoid": "https://www.youtube.com/watch?v=xNz3xpsUoX4",
      "spotify": "https://open.spotify.com/track/6ODwiOhOSUhuWOD4ofVPlt",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/infolinks"
  },
  {
      "number": 228,
      "date": "2009-08-16T04:00:00.000Z",
      "title": "The King of Monkeys, Gnomes and Nacho Cheese",
      "length": "0:40",
      "videoid": "https://www.youtube.com/watch?v=DqqeLoWxmYM",
      "spotify": "https://open.spotify.com/track/3x18ePTFNPtjiGEFDBmtyq",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-king-of-monkeys-gnomes-and-nacho-cheese"
  },
  {
      "number": 229,
      "date": "2009-08-17T04:00:00.000Z",
      "title": "What Are You So Angry About?",
      "length": "1:49",
      "videoid": "https://www.youtube.com/watch?v=g-LTwDqUJ4c",
      "spotify": "https://open.spotify.com/track/5giNpGIi8SUVOf5j7KTEow",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/what-are-you-so-angry-about"
  },
  {
      "number": 230,
      "date": "2009-08-18T04:00:00.000Z",
      "title": "Please Vote for Me",
      "length": "0:53",
      "videoid": "https://www.youtube.com/watch?v=_s-gegtqBEU",
      "spotify": "https://open.spotify.com/track/2Sou0W7KnpkHp84wyZ2vSC",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/please-vote-for-me"
  },
  {
      "number": 231,
      "date": "2009-08-19T04:00:00.000Z",
      "title": "Tiki the Puppy",
      "length": "0:40",
      "videoid": "https://www.youtube.com/watch?v=M0FSneMDbSU",
      "spotify": "https://open.spotify.com/track/6p30ApycALLw8kPnLwOMdA",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/tiki-the-puppy"
  },
  {
      "number": 232,
      "date": "2009-08-20T04:00:00.000Z",
      "title": "Funny Hat",
      "length": "0:57",
      "videoid": "https://www.youtube.com/watch?v=Dmz4NhmbMdQ",
      "spotify": "https://open.spotify.com/track/2RP9soezN4GPVOHFdmrEQH",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/funny-hat"
  },
  {
      "number": 233,
      "date": "2009-08-21T04:00:00.000Z",
      "title": "Pop Music",
      "length": "2:25",
      "videoid": "https://www.youtube.com/watch?v=vKszq7olUIo",
      "spotify": "https://open.spotify.com/track/4lfUUoyHp53PMkAnv9OWTO",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/pop-music"
  },
  {
      "number": 234,
      "date": "2009-08-22T04:00:00.000Z",
      "title": "Happy Anniversary the Cat Has Kidney Failure",
      "length": "2:20",
      "videoid": "https://www.youtube.com/watch?v=8Eg-uwlephE",
      "spotify": "https://open.spotify.com/track/0PGtlJsrsdBnzafyCEed4n",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/happy-anniversary-the-cat-has-kidney-failure"
  },
  {
      "number": 235,
      "date": "2009-08-23T04:00:00.000Z",
      "title": "I am Just a Shadow",
      "length": "1:16",
      "videoid": "https://www.youtube.com/watch?v=vLizXeF8RIs",
      "spotify": "https://open.spotify.com/track/3tbQLYBQbaNDQoc5VD6T7M",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-am-just-a-shadow"
  },
  {
      "number": 236,
      "date": "2009-08-24T04:00:00.000Z",
      "title": "Lucky",
      "length": "1:47",
      "videoid": "https://www.youtube.com/watch?v=vLizXeF8RIs",
      "spotify": "https://open.spotify.com/track/5NroaXvVytJgubZWn9ljNG",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/lucky"
  },
  {
      "number": 237,
      "date": "2009-08-25T04:00:00.000Z",
      "title": "Epuls.pl Anthem",
      "length": "1:39",
      "videoid": "https://www.youtube.com/watch?v=UxqG1HV34ag",
      "spotify": "https://open.spotify.com/track/0hHS1s6IX7iz7MzRorIP4K",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/epuls-pl-anthem"
  },
  {
      "number": 238,
      "date": "2009-08-26T04:00:00.000Z",
      "title": "GPS With Bob Dylan",
      "length": "2:10",
      "videoid": "https://www.youtube.com/watch?v=wzbka8mwQYI",
      "spotify": "https://open.spotify.com/track/5LU3HO5kF9ebN3YfAE9yla",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/gps-with-bob-dylan"
  },
  {
      "number": 239,
      "date": "2009-08-27T04:00:00.000Z",
      "title": "I Don't Want to Compete",
      "length": "1:39",
      "videoid": "https://www.youtube.com/watch?v=QWNAUAFb3Ik",
      "spotify": "https://open.spotify.com/track/49mPQAOm65KRYEoqFCY6zv",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-dont-want-to-compete"
  },
  {
      "number": 240,
      "date": "2009-08-28T04:00:00.000Z",
      "title": "TIRED",
      "length": "0:40",
      "videoid": "https://www.youtube.com/watch?v=ixlPXLHpQe4",
      "spotify": "https://open.spotify.com/track/0M30evngfRujH4IrRlPmpR",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/tired"
  },
  {
      "number": 241,
      "date": "2009-08-29T04:00:00.000Z",
      "title": "Goodbye JewFro, Hello Cleanface",
      "length": "0:36",
      "videoid": "https://www.youtube.com/watch?v=do4n1e_1jOY",
      "spotify": "https://open.spotify.com/track/0W7gyrpGlMVj36CbySHI1m",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/goodbye-jewfro-hello-cleanface"
  },
  {
      "number": 242,
      "date": "2009-08-30T04:00:00.000Z",
      "title": "This is How We Do It at Bennington",
      "length": "1:15",
      "videoid": "https://www.youtube.com/watch?v=FgcDtphKZEs",
      "spotify": "https://open.spotify.com/track/7kTffcRvDaoJxVdUsySQHA",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/this-is-how-we-do-it-at-bennington"
  },
  {
      "number": 243,
      "date": "2009-08-31T04:00:00.000Z",
      "title": "I Got a New Guitar",
      "length": "1:27",
      "videoid": "https://www.youtube.com/watch?v=ujWJDnOlGJQ",
      "spotify": "https://open.spotify.com/track/2p3n9tune252Qt0KbuZJZe",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-got-a-new-guitar"
  },
  {
      "number": 244,
      "date": "2009-09-01T04:00:00.000Z",
      "title": "No Judgements",
      "length": "1:54",
      "videoid": "https://www.youtube.com/watch?v=EVQmcMmd_8Q",
      "spotify": "https://open.spotify.com/track/1KVBYioPcujdeRLF9UpbUZ",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/no-judgements"
  },
  {
      "number": 245,
      "date": "2009-09-02T04:00:00.000Z",
      "title": "Cisco Telepresence Anthem",
      "length": "0:53",
      "videoid": "https://www.youtube.com/watch?v=qj2hZXbPBkc",
      "spotify": "https://open.spotify.com/track/753xJ106RQ2c2nd4DJr55i",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/cisco-telepresence-anthem"
  },
  {
      "number": 246,
      "date": "2009-09-03T04:00:00.000Z",
      "title": "No Judgements v2",
      "length": "1:34",
      "videoid": "https://www.youtube.com/watch?v=1hkJRjCm824",
      "spotify": "https://open.spotify.com/track/4FR3DAnVECpytquBou3kmU",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/no-judgements-v2"
  },
  {
      "number": 247,
      "date": "2009-09-04T04:00:00.000Z",
      "title": "Sometimes It's Hard to Keep Yourself Moving",
      "length": "3:14",
      "videoid": "https://www.youtube.com/watch?v=6ldrFuDqcLM",
      "spotify": "https://open.spotify.com/track/4VI3AHkEfa4oEE3z4y4jvj",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/sometimes-its-hard-to-keep-yourself-moving"
  },
  {
      "number": 248,
      "date": "2009-09-05T04:00:00.000Z",
      "title": "Heart Overflowing",
      "length": "2:46",
      "videoid": "https://www.youtube.com/watch?v=H4tY515V83Y",
      "spotify": "https://open.spotify.com/track/0yWA0rWXqiywnqV3ThdGEt",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/heart-overflowing"
  },
  {
      "number": 249,
      "date": "2009-09-06T04:00:00.000Z",
      "title": "Bicycle Blvd",
      "length": "1:49",
      "videoid": "https://www.youtube.com/watch?v=jnWcXes5pYg",
      "spotify": "https://open.spotify.com/track/3Ampu9Yr4OqQA78RCRAn8Q",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/bicycle-blvd"
  },
  {
      "number": 250,
      "date": "2009-09-07T04:00:00.000Z",
      "title": "At the Harley Davidson Museum",
      "length": "1:13",
      "videoid": "https://www.youtube.com/watch?v=sts6uK6x_m8",
      "spotify": "https://open.spotify.com/track/1Fp9vrKhWU3hdbDTtAKh6q",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/at-the-harley-davidson-museum"
  },
  {
      "number": 251,
      "date": "2009-09-08T04:00:00.000Z",
      "title": "Truth in Advertising",
      "length": "1:01",
      "videoid": "https://www.youtube.com/watch?v=WwcUafltTf8",
      "spotify": "https://open.spotify.com/track/0vyBbe7Jj4rtcEaYQrUZJU",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/truth-in-advertising"
  },
  {
      "number": 252,
      "date": "2009-09-09T04:00:00.000Z",
      "title": "I've Got Another Cold",
      "length": "0:10",
      "videoid": "https://www.youtube.com/watch?v=I6Rtu2NDz44",
      "spotify": "https://open.spotify.com/track/5wLbeSobgcyQnUk3AYPr0S",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/ive-got-another-cold"
  },
  {
      "number": 253,
      "date": "2009-09-10T04:00:00.000Z",
      "title": "Still Sick",
      "length": "0:18",
      "videoid": "https://www.youtube.com/watch?v=MkIFPdF7vng",
      "spotify": "https://open.spotify.com/track/0i4a5xHRYttnKcdTvkpGkK",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/still-sick"
  },
  {
      "number": 254,
      "date": "2009-09-11T04:00:00.000Z",
      "title": "I'm a Bit Better",
      "length": "1:05",
      "videoid": "https://www.youtube.com/watch?v=GEk2Bkbkn4A",
      "spotify": "https://open.spotify.com/track/2ONX4kbwX6Tn8xlBvkCbco",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/im-a-bit-better"
  },
  {
      "number": 255,
      "date": "2009-09-12T04:00:00.000Z",
      "title": "We Built a Fort",
      "length": "0:20",
      "videoid": "https://www.youtube.com/watch?v=-Scd_JZq2jk",
      "spotify": "https://open.spotify.com/track/2MI5lQIcWYUunOie8uz75u",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/we-built-a-fort"
  },
  {
      "number": 256,
      "date": "2009-09-13T04:00:00.000Z",
      "title": "I'm Jonathan",
      "length": "1:56",
      "videoid": "https://www.youtube.com/watch?v=BebDpLN-lRg",
      "spotify": "https://open.spotify.com/track/1LttlXmEpl6PWL21pl58FL",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/im-jonathan"
  },
  {
      "number": 257,
      "date": "2009-09-14T04:00:00.000Z",
      "title": "First There Was No Chair",
      "length": "1:05",
      "videoid": "https://www.youtube.com/watch?v=bJf5ZgsV5Fw",
      "spotify": "https://open.spotify.com/track/6fheUVlQVISIDHD26rYlrY",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/first-there-was-no-chair"
  },
  {
      "number": 258,
      "date": "2009-09-15T04:00:00.000Z",
      "title": "Mirror Revolt",
      "length": "2:12",
      "videoid": "https://www.youtube.com/watch?v=ykmpoBCnUQE",
      "spotify": "https://open.spotify.com/track/48U3drykYAvBR0U0RqMfTd",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/mirror-revolt"
  },
  {
      "number": 259,
      "date": "2009-09-16T04:00:00.000Z",
      "title": "Simian Space Flight",
      "length": "3:27",
      "videoid": "https://www.youtube.com/watch?v=hMIRkgop65s",
      "spotify": "https://open.spotify.com/track/56JQlAvZdBxEXfQNxc6MGw",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/simian-space-flight"
  },
  {
      "number": 260,
      "date": "2009-09-17T04:00:00.000Z",
      "title": "Link Mann",
      "length": "3:07",
      "videoid": "https://www.youtube.com/watch?v=ouiE50FVIMc",
      "spotify": "https://open.spotify.com/track/6Ckp5d02YLVlVAJRuIIvVc",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/link-mann"
  },
  {
      "number": 261,
      "date": "2009-09-18T04:00:00.000Z",
      "title": "The Android Who Didn't Have a Penis",
      "length": "3:37",
      "videoid": "https://www.youtube.com/watch?v=nSru178teSY",
      "spotify": "https://open.spotify.com/track/76Wa4SmqiwBWeb5sqvJMnW",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-android-who-didnt-have-a-penis"
  },
  {
      "number": 262,
      "date": "2009-09-19T04:00:00.000Z",
      "title": "You Can Do It, Sam",
      "length": "1:35",
      "videoid": "https://www.youtube.com/watch?v=o-OHmBtcH1k",
      "spotify": "https://open.spotify.com/track/6vmlwVVm64MxADdNTMvXVy",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/you-can-do-it-sam"
  },
  {
      "number": 263,
      "date": "2009-09-20T04:00:00.000Z",
      "title": "The Sex Machine That Couldn't Love",
      "length": "2:02",
      "videoid": "https://www.youtube.com/watch?v=3PlhMnSlk-w",
      "spotify": "https://open.spotify.com/track/1ahdoc9lR4XHI8zEy5ok5S",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-sex-machine-that-couldnt-love"
  },
  {
      "number": 264,
      "date": "2009-09-21T04:00:00.000Z",
      "title": "The Robot That Lived on the Moon and Wished It Were Human",
      "length": "2:28",
      "videoid": "https://www.youtube.com/watch?v=XDJTTRhIrSc",
      "spotify": "https://open.spotify.com/track/0PZ9tdZfh1jm37esVbq9jF",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-robot-that-lived-on-the-moon-and-wished-it-were-human"
  },
  {
      "number": 265,
      "date": "2009-09-22T04:00:00.000Z",
      "title": "Quantum Decoupling Transition in a One-Dimensional \nFeschbach Resonant Super Fluid",
      "length": "2:46",
      "videoid": "https://www.youtube.com/watch?v=FIXRXMMlZBM",
      "spotify": "https://open.spotify.com/track/5dNfGkpYiGE5j9zJJbdXtB",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/quantum-decoupling-transition-in-a-one-dimensional-feschbach-resonant-super-fluid"
  },
  {
      "number": 266,
      "date": "2009-09-23T04:00:00.000Z",
      "title": "In Heaven",
      "length": "3:07",
      "videoid": "https://www.youtube.com/watch?v=33Z5uAyPF8g",
      "spotify": "https://open.spotify.com/track/38OEidXYRIWdDKRWsYACLn",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/in-heaven"
  },
  {
      "number": 267,
      "date": "2009-09-24T04:00:00.000Z",
      "title": "The Three Rules of the internet",
      "length": "1:04",
      "videoid": "https://www.youtube.com/watch?v=HS9BlNSCmw8",
      "spotify": "https://open.spotify.com/track/4y56ts5l9wZMZCmeqSmd75",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-3-rules-of-the-internet-reprise"
  },
  {
      "number": 268,
      "date": "2009-09-25T04:00:00.000Z",
      "title": "Death in Every instant",
      "length": "1:00",
      "videoid": "https://www.youtube.com/watch?v=woCjVts5-Ug",
      "spotify": "https://open.spotify.com/track/5PXzqd1lnoTq7fHSjCToOw",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/scary-any-like-creature"
  },
  {
      "number": 269,
      "date": "2009-09-26T04:00:00.000Z",
      "title": "Scary Hill",
      "length": "2:34",
      "videoid": "https://www.youtube.com/watch?v=DOp7RuJggdc",
      "spotify": "https://open.spotify.com/track/7y55FJxnUtnr7Jtiwegaib",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/death-in-every-instant"
  },
  {
      "number": 270,
      "date": "2009-09-27T04:00:00.000Z",
      "title": "Popcorn",
      "length": "2:26",
      "videoid": "https://www.youtube.com/watch?v=iVt-TfittNY",
      "spotify": "https://open.spotify.com/track/6EuZThOVFPWg1tJPTEzeyz",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/scary-hill"
  },
  {
      "number": 271,
      "date": "2009-09-28T04:00:00.000Z",
      "title": "Big Wall Graphics From LTLPrints.com",
      "length": "1:47",
      "videoid": "https://www.youtube.com/watch?v=AiMxiAUVKgY",
      "spotify": "https://open.spotify.com/track/0LId6sJ0xOFHAnRNmP8Iy0",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/throw-a-cob-of-corn-into-the-sun-popcorn"
  },
  {
      "number": 272,
      "date": "2009-09-29T04:00:00.000Z",
      "title": "How to Defeat the Energy Vampire: the Song",
      "length": "0:10",
      "videoid": "https://youtu.be/UNHV67O3OdU",
      "spotify": "https://open.spotify.com/track/47m9kpLpeCIX9SrJtxs5LP",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/big-wall-graphics-from-ltlprints-com"
  },
  {
      "number": 273,
      "date": "2009-09-30T04:00:00.000Z",
      "title": "Vulcan Smile ",
      "length": "0:24",
      "videoid": "https://www.youtube.com/watch?v=oBbBTwgDBBg",
      "spotify": "https://open.spotify.com/track/1x0HjDS8RPODlDUM3K9Vxn",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/vulcan-smile"
  },
  {
      "number": 274,
      "date": "2009-10-01T04:00:00.000Z",
      "title": "Downstairs Bear",
      "length": "1:15",
      "videoid": "https://www.youtube.com/watch?v=ld1PvU8c3y8",
      "spotify": "https://open.spotify.com/track/3CXBTVLp7K8KbZGk6liJgW",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/how-to-defeat-the-energy-vampire-the-song"
  },
  {
      "number": 275,
      "date": "2009-10-02T04:00:00.000Z",
      "title": "Ardipithicus Ramidus",
      "length": "2:02",
      "videoid": "https://www.youtube.com/watch?v=S-DCcrLIcL4",
      "spotify": "https://open.spotify.com/track/0cZzgtYnod9i2uDOW4aIJV",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/downstairs-bear"
  },
  {
      "number": 276,
      "date": "2009-10-03T04:00:00.000Z",
      "title": "Hard Drive It Home",
      "length": "1:36",
      "videoid": "https://www.youtube.com/watch?v=0WJGGof6iQY",
      "spotify": "https://open.spotify.com/track/3qAVlafcjZGhMXk2FOAd0P",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/ardipithecus-ramidus-2"
  },
  {
      "number": 277,
      "date": "2009-10-04T04:00:00.000Z",
      "title": "You and Me and the Singularity",
      "length": "2:50",
      "videoid": "https://www.youtube.com/watch?v=_OoA0AZ1gr0",
      "spotify": "https://open.spotify.com/track/1ZgFdXu2K79lW93e4p5OVc",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/hard-drive-it-home"
  },
  {
      "number": 278,
      "date": "2009-10-05T04:00:00.000Z",
      "title": "Sex in Space",
      "length": "2:35",
      "videoid": "https://www.youtube.com/watch?v=SHyqW-fX3_Y",
      "spotify": "https://open.spotify.com/track/1jFfZdKSR1uBUutiA5qhf8",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/you-and-me-and-the-singularity"
  },
  {
      "number": 279,
      "date": "2009-10-06T04:00:00.000Z",
      "title": "Nasa Bombed the Moon",
      "length": "1:45",
      "videoid": "https://www.youtube.com/watch?v=GgWFVXoT71E",
      "spotify": "https://open.spotify.com/track/5ZuoXvvpGKqJmR5PpE27ba",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/sex-in-space"
  },
  {
      "number": 280,
      "date": "2009-10-07T04:00:00.000Z",
      "title": "Pants in the Middle",
      "length": "1:54",
      "videoid": "https://www.youtube.com/watch?v=1Q3Xyo166Rg",
      "spotify": "https://open.spotify.com/track/7fmUwlz7AyV1W6R5enVJxe",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/nasa-bombed-the-moon"
  },
  {
      "number": 281,
      "date": "2009-10-08T04:00:00.000Z",
      "title": "Hey, Mr. Bike Thief",
      "length": "1:47",
      "videoid": "https://www.youtube.com/watch?v=QzkP2-27kj0",
      "spotify": "https://open.spotify.com/track/0gyIRioqDkbre2xwmgtyyy",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/pants-in-the-middle"
  },
  {
      "number": 282,
      "date": "2009-10-09T04:00:00.000Z",
      "title": "The LARP song",
      "length": "1:29",
      "videoid": "https://www.youtube.com/watch?v=BbsYHBFLL_4",
      "spotify": "https://open.spotify.com/track/4dT2rqEdAXqruC4saCyIWk",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/hey-mr-bike-theif"
  },
  {
      "number": 283,
      "date": "2009-10-10T04:00:00.000Z",
      "title": "Hey, It's October",
      "length": "1:47",
      "videoid": "https://www.youtube.com/watch?v=88yXZD1MILY",
      "spotify": "https://open.spotify.com/track/3sdVs8CvvZr9kiep6UrhfF",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-larp-song"
  },
  {
      "number": 284,
      "date": "2009-10-11T04:00:00.000Z",
      "title": "Hey, Little insect and Spider",
      "length": "0:45",
      "videoid": "https://www.youtube.com/watch?v=7zDb-5UiDes",
      "spotify": "https://open.spotify.com/track/0Dm7yZeFjHChayvqp1cStz",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/hey-its-october"
  },
  {
      "number": 285,
      "date": "2009-10-12T04:00:00.000Z",
      "title": "Nextivafax.com",
      "length": "1:25",
      "videoid": "https://www.youtube.com/watch?v=0gUDa5ZWDIk",
      "spotify": "https://open.spotify.com/track/2qG8YP3x8fiGaLB6DqnQ5R",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/hey-little-insect-and-spider"
  },
  {
      "number": 286,
      "date": "2009-10-13T04:00:00.000Z",
      "title": "Somebody Needs Your Help",
      "length": "1:56",
      "videoid": "https://www.youtube.com/watch?v=x_nsSAzmVD0",
      "spotify": "https://open.spotify.com/track/0U3nxqFQpQmYI2LJDysdOx",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/nextivafax-com"
  },
  {
      "number": 287,
      "date": "2009-10-14T04:00:00.000Z",
      "title": "Frack the Dow Jones",
      "length": "2:25",
      "videoid": "https://www.youtube.com/watch?v=fls6is7hSTo",
      "spotify": "https://open.spotify.com/track/2GFHMQ2dswY6vdzzEX1zhO",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/somebody-needs-your-help"
  },
  {
      "number": 288,
      "date": "2009-10-15T04:00:00.000Z",
      "title": "Kickstarter.com",
      "length": "1:39",
      "videoid": "https://www.youtube.com/watch?v=gJmJkLkIv3M",
      "spotify": "https://open.spotify.com/track/15ynxZblqzOrGAPu6ftgvN",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/frack-the-dow-jones"
  },
  {
      "number": 289,
      "date": "2009-10-16T04:00:00.000Z",
      "title": "Just a Little More Tired",
      "length": "2:35",
      "videoid": "https://www.youtube.com/watch?v=IimlrWxSeT4",
      "spotify": "https://open.spotify.com/track/4z0VoIzxqzmqGqscLi5DUQ",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/kickstarter-com"
  },
  {
      "number": 290,
      "date": "2009-10-17T04:00:00.000Z",
      "title": "Treasure island",
      "length": "4:41",
      "videoid": "https://www.youtube.com/watch?v=NcZjBEX5IW8",
      "spotify": "https://open.spotify.com/track/0AFRBeVoxejrWevbS6P9pU",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/just-a-little-more-tired"
  },
  {
      "number": 291,
      "date": "2009-10-18T04:00:00.000Z",
      "title": "Happy Birthday, Kelly Porter",
      "length": "1:30",
      "videoid": "https://www.youtube.com/watch?v=DnuQfhP50FM",
      "spotify": "https://open.spotify.com/track/7akkNJqUJAxP5iXBkfqBCv",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/treasure-island"
  },
  {
      "number": 292,
      "date": "2009-10-19T04:00:00.000Z",
      "title": "Psoriasis Cure Now Walk",
      "length": "0:30",
      "videoid": "https://www.youtube.com/watch?v=68HiJSAl8GI",
      "spotify": "https://open.spotify.com/track/5ChS0DxNbgLU8oWrc8PJxM",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/happy-birthday-kelly-porter"
  },
  {
      "number": 293,
      "date": "2009-10-20T04:00:00.000Z",
      "title": "It's This Rain",
      "length": "3:32",
      "videoid": "https://www.youtube.com/watch?v=kPpfxu-IbsI",
      "spotify": "https://open.spotify.com/track/3Gbw1jqC5Kf0xv8YwnrU0u",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/psoriasis-cure-now-walk"
  },
  {
      "number": 294,
      "date": "2009-10-21T04:00:00.000Z",
      "title": "Lashes to Riches",
      "length": "2:38",
      "videoid": "https://www.youtube.com/watch?v=IULN-Ivd5P0",
      "spotify": "https://open.spotify.com/track/3RLij23YIHWzKzb1bqOyNy",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/its-this-rain"
  },
  {
      "number": 295,
      "date": "2009-10-22T04:00:00.000Z",
      "title": "Beer Pong",
      "length": "2:32",
      "videoid": "https://www.youtube.com/watch?v=QP_MC1slwjw",
      "spotify": "https://open.spotify.com/track/3gt80KAqWtBHqdVjSvah8X",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/lashes-to-riches"
  },
  {
      "number": 296,
      "date": "2009-10-23T04:00:00.000Z",
      "title": "Who Needs Sleep",
      "length": "2:43",
      "videoid": "https://www.youtube.com/watch?v=AxyxiJ0gC1g",
      "spotify": "https://open.spotify.com/track/5djUVtKnYiPYkcTrWIeL92",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/beer-pong"
  },
  {
      "number": 297,
      "date": "2009-10-24T04:00:00.000Z",
      "title": "I'm a Bird, You're a Bird, Let's Get It On",
      "length": "0:53",
      "videoid": "https://www.youtube.com/watch?v=zNtRinamudU",
      "spotify": "https://open.spotify.com/track/01xLtqvJ2W8aJNwWj4rnvv",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/who-needs-sleep"
  },
  {
      "number": 298,
      "date": "2009-10-25T04:00:00.000Z",
      "title": "Jesus Said",
      "length": "2:42",
      "videoid": "https://www.youtube.com/watch?v=uiU69lxypxM",
      "spotify": "https://open.spotify.com/track/4QNJnWJpxF5E1sdRI9SEK1",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/im-a-bird-youre-a-bird-lets-get-it-o"
  },
  {
      "number": 299,
      "date": "2009-10-26T04:00:00.000Z",
      "title": "NoSweatApparel.com",
      "length": "1:48",
      "videoid": "https://www.youtube.com/watch?v=Tep4EH-_BTU",
      "spotify": "https://open.spotify.com/track/7bK5pXv0qsaKaADLK7WOiF",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/jesus-said"
  },
  {
      "number": 300,
      "date": "2009-10-27T04:00:00.000Z",
      "title": "I Never Promised",
      "length": "1:47",
      "videoid": "https://www.youtube.com/watch?v=gUb8Idr8giU",
      "spotify": "https://open.spotify.com/track/2m87rjjn8mEnSCpy4QRlKr",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/nosweatapparel-com"
  },
  {
      "number": 301,
      "date": "2009-10-28T04:00:00.000Z",
      "title": "Airplane to Tomorrow",
      "length": "3:09",
      "videoid": "https://www.youtube.com/watch?v=13t6jrHQrPQ",
      "spotify": "https://open.spotify.com/track/5R1kYGYWfTh02P6lDo949B",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-never-promised"
  },
  {
      "number": 302,
      "date": "2009-10-29T04:00:00.000Z",
      "title": "Creature of Habit",
      "length": "1:56",
      "videoid": "https://www.youtube.com/watch?v=z_IhAVoH1lQ",
      "spotify": "https://open.spotify.com/track/4EicUifJluYNpuT6a34NCJ",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/airplane-to-tomorrow"
  },
  {
      "number": 303,
      "date": "2009-10-30T04:00:00.000Z",
      "title": "Keith Valley Middle School",
      "length": "1:35",
      "videoid": "https://www.youtube.com/watch?v=P2OBWAgP8gA",
      "spotify": "https://open.spotify.com/track/4rEc8bGoekiwXpMmuNY5UC",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/creature-of-habit"
  },
  {
      "number": 304,
      "date": "2009-10-31T04:00:00.000Z",
      "title": "I'm Tired Halloween Weirdness",
      "length": "2:21",
      "videoid": "https://www.youtube.com/watch?v=juu6TeGh9RA",
      "spotify": "https://open.spotify.com/track/7sIVLC9UUUrj4AxYPTyObB",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/keith-valley-middle-school"
  },
  {
      "number": 305,
      "date": "2009-11-01T04:00:00.000Z",
      "title": "To Lon Harris Who Called Me Creepy",
      "length": "2:31",
      "videoid": "https://www.youtube.com/watch?v=WPWTcLcpFYE",
      "spotify": "https://open.spotify.com/track/2pI9BDcCCT4PNkVkJDeRi6",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/im-tired-halloween-weirdness"
  },
  {
      "number": 306,
      "date": "2009-11-02T05:00:00.000Z",
      "title": "Cloud Computing for Beginners",
      "length": "1:50",
      "videoid": "https://www.youtube.com/watch?v=n-mtkeaecN0",
      "spotify": "https://open.spotify.com/track/2LKtGFe2wCLlOcEfMwgX92",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/to-lon-harris-who-called-me-creepy"
  },
  {
      "number": 307,
      "date": "2009-11-03T05:00:00.000Z",
      "title": "I am Just a Messanger",
      "length": "3:19",
      "videoid": "https://www.youtube.com/watch?v=P1lLTyHfLb8",
      "spotify": "https://open.spotify.com/track/6DiuyUVOKdYmb2K8Bge0ZN",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/cloud-computing-for-beginners"
  },
  {
      "number": 308,
      "date": "2009-11-04T05:00:00.000Z",
      "title": "Spell Or Prayer",
      "length": "3:21",
      "videoid": "https://www.youtube.com/watch?v=SJMxzXCXeVU",
      "spotify": "https://open.spotify.com/track/7IODFT6FJDMTtrL6qgfsgj",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-am-just-a-messanger"
  },
  {
      "number": 309,
      "date": "2009-11-05T05:00:00.000Z",
      "title": "It May Feel Like Everythings the Same",
      "length": "2:21",
      "videoid": "https://www.youtube.com/watch?v=U-dvV5K1MEo",
      "spotify": "https://open.spotify.com/track/2lZH428V8XX9MSzrPTVg37",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/spell-or-prayer"
  },
  {
      "number": 310,
      "date": "2009-11-06T05:00:00.000Z",
      "title": "The Large Hadron Collider Still Doesn't Work",
      "length": "1:33",
      "videoid": "https://www.youtube.com/watch?v=PqBcDQn7KsA",
      "spotify": "https://open.spotify.com/track/4oo6i7cXU5joNXGFwSHeGm",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/it-may-feel-like-everythings-the-same"
  },
  {
      "number": 311,
      "date": "2009-11-07T05:00:00.000Z",
      "title": "Show Me Your Dorito Face",
      "length": "0:30",
      "videoid": "https://www.youtube.com/watch?v=JyuMoXHsvvc",
      "spotify": "https://open.spotify.com/track/2HCz10nCwhu7uU8IssFzpz",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-large-hadron-collider-still-doesnt-work"
  },
  {
      "number": 312,
      "date": "2009-11-08T05:00:00.000Z",
      "title": "I am All Alone",
      "length": "2:22",
      "videoid": "https://www.youtube.com/watch?v=lMZ69vndWrA",
      "spotify": "https://open.spotify.com/track/0ZHLm2k9uqkzto7qp8okZi",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/show-me-your-dorito-face"
  },
  {
      "number": 313,
      "date": "2009-11-09T05:00:00.000Z",
      "title": "Cry, oh Cry, Boo-Hoo So Sad",
      "length": "2:25",
      "videoid": "https://www.youtube.com/watch?v=5JyhYgfsejQ",
      "spotify": "https://open.spotify.com/track/03H1fMqWebjp1SarcTXT7w",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-am-all-alone"
  },
  {
      "number": 314,
      "date": "2009-11-10T05:00:00.000Z",
      "title": "Winning Feels Good, Losing Feels Bad",
      "length": "0:25",
      "videoid": "https://www.youtube.com/watch?v=u0L_5Xvn8Ww",
      "spotify": "https://open.spotify.com/track/53vvjxnDdQpOVdYqqUeMEp",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/cry-oh-cry-boo-hoo-so-sad"
  },
  {
      "number": 315,
      "date": "2009-11-11T05:00:00.000Z",
      "title": "20 minutes With the President",
      "length": "5:45",
      "videoid": "https://www.youtube.com/watch?v=ilB_5R6xSJA",
      "spotify": "https://open.spotify.com/track/3kt2uxHEl2F5wdhKHGdj3c",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/winning-feels-good-losing-feels-bad"
  },
  {
      "number": 316,
      "date": "2009-11-12T05:00:00.000Z",
      "title": "Mr. Barry Screwskull, Number Six Hundred and Twelve",
      "length": "5:46",
      "videoid": "https://www.youtube.com/watch?v=4oeaBCQYUzs",
      "spotify": "https://open.spotify.com/track/4eVC7QPZxDXADGrbK7L3lu",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/20-minutes-with-the-president"
  },
  {
      "number": 317,
      "date": "2009-11-13T05:00:00.000Z",
      "title": "The Beating of a Single Heart",
      "length": "2:57",
      "videoid": "https://www.youtube.com/watch?v=AalyJ_UvC_4",
      "spotify": "https://open.spotify.com/track/2u8dRVNyfiaWkBuJ55npJw",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/mr-barry-screwskull-number-six-hundred-and-twelve"
  },
  {
      "number": 318,
      "date": "2009-11-14T05:00:00.000Z",
      "title": "Song a Day, Saturday",
      "length": "1:30",
      "videoid": "https://www.youtube.com/watch?v=yu-ZJE2tOo0",
      "spotify": "https://open.spotify.com/track/7MoMBv4Z21iE4jsYmmbwkf",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-beating-of-a-single-heart"
  },
  {
      "number": 319,
      "date": "2009-11-15T05:00:00.000Z",
      "title": "Sunday Evening Sad, Slow Song",
      "length": "2:14",
      "videoid": "https://www.youtube.com/watch?v=eIzZU0k1h-Y",
      "spotify": "https://open.spotify.com/track/5QJqcku6zCeSZytdalV137",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/song-a-day-saturday"
  },
  {
      "number": 320,
      "date": "2009-11-16T05:00:00.000Z",
      "title": "A Wonderful Pistcachio Discovery",
      "length": "0:30",
      "videoid": "https://www.youtube.com/watch?v=gsGQLWA29a0",
      "spotify": "https://open.spotify.com/track/1sqYPgr5lNrAPgkV2jkfH2",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/sunday-evening-sad-slow-song"
  },
  {
      "number": 321,
      "date": "2009-11-17T05:00:00.000Z",
      "title": "The Story of Wandering Fall, Act 1, introdruction",
      "length": "0:46",
      "videoid": "https://www.youtube.com/watch?v=FNcjBZAvLR4",
      "spotify": "https://open.spotify.com/track/1nXP3GEwN7IM7tl49dFQXQ",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/a-wonderful-pistcachio-discovery"
  },
  {
      "number": 322,
      "date": "2009-11-18T05:00:00.000Z",
      "title": "Wandering the Universe",
      "length": "0:40",
      "videoid": "https://www.youtube.com/watch?v=lQhz4aonf84",
      "spotify": "https://open.spotify.com/track/0xeqcitPL1SUd7kTuNKUtW",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-story-of-wandering-fall-act-1-introdruction"
  },
  {
      "number": 323,
      "date": "2009-11-19T05:00:00.000Z",
      "title": "At the Edge of the Universe",
      "length": "0:43",
      "videoid": "https://www.youtube.com/watch?v=Sn6hfDT9FTU",
      "spotify": "https://open.spotify.com/track/36MLs0sU5VgTqW31aenCAd",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/wandering-the-universe"
  },
  {
      "number": 324,
      "date": "2009-11-20T05:00:00.000Z",
      "title": "And With a Name...",
      "length": "0:43",
      "videoid": "https://www.youtube.com/watch?v=0_xaRMdRgS0",
      "spotify": "https://open.spotify.com/track/4ugvYThmKyjmlTCXzPWs4h",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/at-the-edge-of-the-universe"
  },
  {
      "number": 325,
      "date": "2009-11-21T05:00:00.000Z",
      "title": "I am Alone",
      "length": "0:46",
      "videoid": "https://www.youtube.com/watch?v=DjFt3976STY",
      "spotify": "https://open.spotify.com/track/6czAK9iPtjyhXUTNXHCLT0",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/and-with-a-name"
  },
  {
      "number": 326,
      "date": "2009-11-22T05:00:00.000Z",
      "title": "Contact",
      "length": "0:45",
      "videoid": "https://www.youtube.com/watch?v=hBsyimOgLDQ",
      "spotify": "https://open.spotify.com/track/5Fu7Wl9bhI8zmI5zAyGFIN",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-am-alone"
  },
  {
      "number": 327,
      "date": "2009-11-23T05:00:00.000Z",
      "title": "The Story of Wandering Fall, Act 1, Recap",
      "length": "2:52",
      "videoid": "https://www.youtube.com/watch?v=Fu9tgu8OULc",
      "spotify": "https://open.spotify.com/track/62dsIxJl5LwjgXBWafZvbI",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/contact"
  },
  {
      "number": 328,
      "date": "2009-11-24T05:00:00.000Z",
      "title": "Cold Feet",
      "length": "2:02",
      "videoid": "https://www.youtube.com/watch?v=aVIBfAvQ0bw",
      "spotify": "https://open.spotify.com/track/0npuHqH31sQVpJuNQIPtni",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-story-of-wandering-fall-act-1-recap"
  },
  {
      "number": 329,
      "date": "2009-11-25T05:00:00.000Z",
      "title": "Get Your Hand Out of the Hunny Pot",
      "length": "2:52",
      "videoid": "https://www.youtube.com/watch?v=SfHLCjzM4aQ",
      "spotify": "https://open.spotify.com/track/58oYpWLjkrTG3MBFCiby1Z",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/cold-feet"
  },
  {
      "number": 330,
      "date": "2009-11-26T05:00:00.000Z",
      "title": "Zombie Turkey",
      "length": "2:32",
      "videoid": "https://www.youtube.com/watch?v=fD_xNc_Wzlw",
      "spotify": "https://open.spotify.com/track/2XsRPISfUMYUwSf35e164p",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/get-your-hand-out-of-the-hunny-pot"
  },
  {
      "number": 331,
      "date": "2009-11-27T05:00:00.000Z",
      "title": "Dancing Fin",
      "length": "1:23",
      "videoid": "https://www.youtube.com/watch?v=xWEAzAu-zdE",
      "spotify": "https://open.spotify.com/track/2QrA6aAg5uNgNrR0pyIZhy",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/zombie-turkey"
  },
  {
      "number": 332,
      "date": "2009-11-28T05:00:00.000Z",
      "title": "The Best Day of My Life pt 1",
      "length": "2:40",
      "videoid": "https://www.youtube.com/watch?v=Ph4HApxbWvU",
      "spotify": "https://open.spotify.com/track/5Fe98JTAGGLCNxBgmgEchW",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/dancing-fin"
  },
  {
      "number": 333,
      "date": "2009-11-29T05:00:00.000Z",
      "title": "The Best Day of My Life pt 2",
      "length": "2:42",
      "videoid": "https://www.youtube.com/watch?v=5tlkSQ1Xjis",
      "spotify": "https://open.spotify.com/track/6s5lPm5SJHhlqxbYEv7Tql",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-best-day-of-my-life-pt"
  },
  {
      "number": 334,
      "date": "2009-11-30T05:00:00.000Z",
      "title": "It's Good to Be Home",
      "length": "3:26",
      "videoid": "https://www.youtube.com/watch?v=dSmWIz8xCD4",
      "spotify": "https://open.spotify.com/track/2BYmzDkiygaeaE9JjsjmVs",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-best-day-of-my-life-pt-2"
  },
  {
      "number": 335,
      "date": "2009-12-01T05:00:00.000Z",
      "title": "Coors Ad, Collaborationz",
      "length": "0:26",
      "videoid": "https://www.youtube.com/watch?v=peW1y38MmTg",
      "spotify": "https://open.spotify.com/track/1oTka73PHs7OXoaSYUnMwm",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/its-good-to-be-home"
  },
  {
      "number": 336,
      "date": "2009-12-02T05:00:00.000Z",
      "title": "Seeing Clearly",
      "length": "1:08",
      "videoid": "https://www.youtube.com/watch?v=SEBHYYbWFsc",
      "spotify": "https://open.spotify.com/track/7e7s0VeZlRFkGjgal5uGSS",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/coors-ad-collaborationz"
  },
  {
      "number": 337,
      "date": "2009-12-03T05:00:00.000Z",
      "title": "Black Holes",
      "length": "3:57",
      "videoid": "https://www.youtube.com/watch?v=3O9KXyZoFFE",
      "spotify": "https://open.spotify.com/track/0T2YmismoXIy7n4wesIdTS",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/seeing-clearly"
  },
  {
      "number": 338,
      "date": "2009-12-04T05:00:00.000Z",
      "title": "Time to Save With VMware",
      "length": "2:19",
      "videoid": "https://www.youtube.com/watch?v=9o_JSpw0XAI",
      "spotify": "https://open.spotify.com/track/7olLvR4MeAflxscRjnBrFj",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/black-holes"
  },
  {
      "number": 339,
      "date": "2009-12-05T05:00:00.000Z",
      "title": "Don't Want to Write My Song Today, Just \nWant to Play New Super Mario Bros. Wii",
      "length": "2:51",
      "videoid": "https://www.youtube.com/watch?v=NJDYbJklQWA",
      "spotify": "https://open.spotify.com/track/0oYNOKfmNH7Xpiwv0IDepy",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/time-to-save-with-vmware"
  },
  {
      "number": 340,
      "date": "2009-12-06T05:00:00.000Z",
      "title": "Soldier",
      "length": "1:20",
      "videoid": "https://www.youtube.com/watch?v=opBydmbqnu8",
      "spotify": "https://open.spotify.com/track/2UNWuwELot7DnTSklHSZV0",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/dont-want-to-write-my-song-today-just-want-to-play-new-super-mario-bros-wii"
  },
  {
      "number": 341,
      "date": "2009-12-07T05:00:00.000Z",
      "title": "Gun",
      "length": "1:16",
      "videoid": "https://www.youtube.com/watch?v=vTEDsqeLBZ8",
      "spotify": "https://open.spotify.com/track/2prkKlBnq1HFVVLFUw1aA1",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/soldier"
  },
  {
      "number": 342,
      "date": "2009-12-08T05:00:00.000Z",
      "title": "Jesus Christ at Christmas Time",
      "length": "2:51",
      "videoid": "https://www.youtube.com/watch?v=eDR0hULcENs",
      "spotify": "https://open.spotify.com/track/1gkm4XXt1vcg70qFRSWzPU",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/gun"
  },
  {
      "number": 343,
      "date": "2009-12-09T05:00:00.000Z",
      "title": "Upon Seeing the Twitpic Conversation \nBetween Demi Moore and Ashton Kutcher",
      "length": "1:43",
      "videoid": "https://www.youtube.com/watch?v=PfIi_MJTGVI",
      "spotify": "https://open.spotify.com/track/23KdhIaHUNdgynP3pgpgX4",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/jesus-christ-at-christmas-time"
  },
  {
      "number": 344,
      "date": "2009-12-10T05:00:00.000Z",
      "title": "AMC Technology",
      "length": "1:00",
      "videoid": "https://www.youtube.com/watch?v=cIEYj34Erls",
      "spotify": "https://open.spotify.com/track/3oU3hVGV71FQQvrE8bwtHj",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/upon-seeing-the-twitpic-conversation-between-demi-moore-and-ashton-kutcher"
  },
  {
      "number": 345,
      "date": "2009-12-11T05:00:00.000Z",
      "title": "Pirates Life",
      "length": "2:51",
      "videoid": "https://www.youtube.com/watch?v=RVTlQFxumiM",
      "spotify": "https://open.spotify.com/track/571RfTvLdghKc9dzwhG70I",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/amc-technology"
  },
  {
      "number": 346,
      "date": "2009-12-12T05:00:00.000Z",
      "title": "A Snickers Noir",
      "length": "0:30",
      "videoid": "https://www.youtube.com/watch?v=rP102gvW37M",
      "spotify": "https://open.spotify.com/track/050xtq392yrhZeGhOs0yjn",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/pirates-life"
  },
  {
      "number": 347,
      "date": "2009-12-13T05:00:00.000Z",
      "title": "A Humble Plea for Database Security",
      "length": "1:13",
      "videoid": "https://www.youtube.com/watch?v=6XU4g6tfXOg",
      "spotify": "https://open.spotify.com/track/6C5w0DmO9RJhFtrXvmjklC",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/a-snickers-noir"
  },
  {
      "number": 348,
      "date": "2009-12-14T05:00:00.000Z",
      "title": "So Obvious",
      "length": "1:44",
      "videoid": "https://www.youtube.com/watch?v=oSEj2bw0Cgc",
      "spotify": "https://open.spotify.com/track/3xqkUuxeeKRn47o6vpv1v1",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/a-humble-plea-for-database-security"
  },
  {
      "number": 349,
      "date": "2009-12-15T05:00:00.000Z",
      "title": "If You Piled Up Everything I Didn't Know \nWould It Be As Big As the Universe? Oh.",
      "length": "2:31",
      "videoid": "https://www.youtube.com/watch?v=jAvJHgUiclY",
      "spotify": "https://open.spotify.com/track/4Ki5iWunPBj6py4lBXv3xa",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/so-obvious"
  },
  {
      "number": 350,
      "date": "2009-12-16T05:00:00.000Z",
      "title": "Joseph isadore...Palpatine?",
      "length": "1:19",
      "videoid": "https://www.youtube.com/watch?v=fTAoSC9xXqw",
      "spotify": "https://open.spotify.com/track/29RpuCi6PHJF4xY5doliss",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/if-you-piled-up-everything-i-didnt-know-would-it-be-as-big-as-the-universe-oh"
  },
  {
      "number": 351,
      "date": "2009-12-17T05:00:00.000Z",
      "title": "All My Mutant Homies (Say What!)",
      "length": "3:45",
      "videoid": "https://www.youtube.com/watch?v=NTMePK6auh8",
      "spotify": "https://open.spotify.com/track/2ZOmdFNP9EUIaKTMJlofo7",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/joseph-isadore-palpatine"
  },
  {
      "number": 352,
      "date": "2009-12-18T05:00:00.000Z",
      "title": "I'll Be Seeing You",
      "length": "0:46",
      "videoid": "https://www.youtube.com/watch?v=OXXobZgS_WI",
      "spotify": "https://open.spotify.com/track/3me3BPbk4FJ8ivvetQOJhx",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/all-my-mutant-homies-say-what"
  },
  {
      "number": 353,
      "date": "2009-12-19T05:00:00.000Z",
      "title": "Daylight Savings",
      "length": "1:58",
      "videoid": "https://www.youtube.com/watch?v=Wb4P45uOPRg",
      "spotify": "https://open.spotify.com/track/08cKJiBMGLTaKGZIt7az0H",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/ill-be-seeing-you"
  },
  {
      "number": 354,
      "date": "2009-12-20T05:00:00.000Z",
      "title": "Puking My Guts",
      "length": "0:48",
      "videoid": "https://www.youtube.com/watch?v=ox_XSHIIwg4",
      "spotify": "https://open.spotify.com/track/5a2HKrc51fkFPwHLtKmqq6",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/daylight-savings"
  },
  {
      "number": 355,
      "date": "2009-12-21T05:00:00.000Z",
      "title": "I'm Weak",
      "length": "1:39",
      "videoid": "https://www.youtube.com/watch?v=N2vWxFiiaWs",
      "spotify": "https://open.spotify.com/track/5KwpfAsz3IUikodctZEfYE",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/puking-my-guts"
  },
  {
      "number": 356,
      "date": "2009-12-22T05:00:00.000Z",
      "title": "Food Poisoning",
      "length": "0:56",
      "videoid": "https://www.youtube.com/watch?v=dwnny8P7oXM",
      "spotify": "https://open.spotify.com/track/0iHCf6mBLZcZaVE6b9szb7",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/food-poisoning"
  },
  {
      "number": 357,
      "date": "2009-12-23T05:00:00.000Z",
      "title": "I Must Be Going Crazy",
      "length": "2:10",
      "videoid": "https://www.youtube.com/watch?v=zejii6xywE0",
      "spotify": "https://open.spotify.com/track/0ejUus9CdTdEC8V5QB25BY",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/i-must-be-going-crazy"
  },
  {
      "number": 358,
      "date": "2009-12-24T05:00:00.000Z",
      "title": "Happy Christmas Adam From Melissa",
      "length": "2:15",
      "videoid": "https://www.youtube.com/watch?v=WwxaShQoIUU",
      "spotify": "https://open.spotify.com/track/5EkhY32iQ2nbskjzi1hqQT",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/happy-christmas-adam-from-melissa"
  },
  {
      "number": 359,
      "date": "2009-12-25T05:00:00.000Z",
      "title": "The Story of Wandering Fall, Act 2, Scene 1: Blue Blue Oval",
      "length": "0:50",
      "videoid": "https://www.youtube.com/watch?v=YeHG3_RnwN4",
      "spotify": "https://open.spotify.com/track/7DIuExAWig3Tg6zH0PPcXr",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-story-of-wandering-fall-act-2-scene-1-blue-blue-oval"
  },
  {
      "number": 360,
      "date": "2009-12-26T05:00:00.000Z",
      "title": "The Story of Wandering Fall, Act 2, Scene 2: Monsters Rising",
      "length": "0:43",
      "videoid": "https://www.youtube.com/watch?v=vL3vYiG3swI",
      "spotify": "https://open.spotify.com/track/0ZTT5dlz59eoONhfpUduzZ",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-story-of-wandering-fall-act-2-scene-2-monsters-rising"
  },
  {
      "number": 361,
      "date": "2009-12-27T05:00:00.000Z",
      "title": "Soldier on Blindly",
      "length": "3:02",
      "videoid": "https://www.youtube.com/watch?v=urjhYZ60GQA",
      "spotify": "https://open.spotify.com/track/1skmOf2fXTSE8B79nKVrR8",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/soldier-on-blindly"
  },
  {
      "number": 362,
      "date": "2009-12-28T05:00:00.000Z",
      "title": "The Wrong Foot",
      "length": "3:06",
      "videoid": "https://www.youtube.com/watch?v=0C4SWjqNZZE",
      "spotify": "https://open.spotify.com/track/20C1Dgh8wY4Pk7hIAKyOQC",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/the-wrong-foot"
  },
  {
      "number": 363,
      "date": "2009-12-29T05:00:00.000Z",
      "title": "Time, Time, Time",
      "length": "4:01",
      "videoid": "https://www.youtube.com/watch?v=tHoEqw_wcy0",
      "spotify": "https://open.spotify.com/track/6C87sK1PpxTg9B6tb2fCu6",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/time-time-time"
  },
  {
      "number": 364,
      "date": "2009-12-30T05:00:00.000Z",
      "title": "I'm Losing My Hair",
      "length": "3:03",
      "videoid": "https://www.youtube.com/watch?v=mGj4q6Q8v5Q",
      "spotify": "https://open.spotify.com/track/0di888WmxpD9iawlXMbuWz",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/im-losing-my-hair"
  },
  {
      "number": 365,
      "date": "2009-12-31T05:00:00.000Z",
      "title": "Me, I Write a Song a Day",
      "length": "3:08",
      "videoid": "https://www.youtube.com/watch?v=XuX8Z8sxgiQ",
      "spotify": "https://open.spotify.com/track/2iAR7mw4iiajhqhj0nxR8R",
      "bandcamp": "https://jonathanmann.bandcamp.com/track/me-i-write-a-song-a-day"
  }
]

const Instrument = mongoose.model('Instrument', {name: String, image: String});
const Inkey = mongoose.model('Inkey', {name: String, image: String});
const Topic = mongoose.model('Topic', {name: String, image: String});
const Beard = mongoose.model('Beard', {name: String, image: String});
const City = mongoose.model('Location', {name: String, image: String});

const songTagSchema = new Schema({
  image: String,
  name: String,
})

const tagSongSchema = new Schema({
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
  tagNames: [String],
  tags: [songTagSchema]
});

const Tag = mongoose.model('Tag', {
  image: String,
  name: String,
  songs: [tagSongSchema],
})

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
      },
      tags: {
        name: 'Tag',
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
      if (song.tags) {
        let tags = song.tags.toLowerCase().replace('\n', '').split(', ').map(tag => tag.trim())
        uniques.tags.collection = uniques.tags.collection.concat(tags)
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
      if (key.length) {
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
      } else {
        recurse(array)
      }
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

const insertTagsonSongsOnTags = () => {

  return new Promise((resolve, reject) => {
    Song.find({})
    .then(songs => {
      const len = songs.length;
      
      var bar = new ProgressBar('  doing tag insertion [:bar] :percent', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: len
      });

      const recurse = (array) => {
        if (!array.length) {
          resolve()
        } else {
          bar.tick(1);
          let song = array.shift();
          const recurseOnTags = (tagArray) => {
            if (!tagArray.length) {
              recurse(array)
            } else {
              let currentTag = tagArray.shift();
              Tag.find({name: currentTag})
              .then(tags => {
                const tag = tags[0];
                tag.songs.push(song);
                tag.save(err => {
                  if (err) {
                    throw new Error(err);
                    reject()
                  } else {
                    song.tags.push(tag);
                    song.save(err => {
                      if (err) {
                        throw new Error(err)
                      } else {
                        recurseOnTags(tagArray)
                      }
                    })
                  }
                })
              })
            }
          }
          recurseOnTags(song.tagNames.slice());
        }
      }
      recurse(songs)
    })
  })
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
    
    let tagNames = [];
    if (array[i].tags) {
      tagNames =  array[i].tags.toLowerCase().replace('\n', '').split(', ').map(tag => tag.trim())
    }

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
      tagNames,
    }
    records.push(song);
  }
  console.log(records.length)
  Song.insertMany(records, (err, docs) => {
    if (err) {
      console.log(err);
    }
    console.log('inserting songs on tags and tags on songs...');
    insertTagsonSongsOnTags()
    .then(success => {
      process.exit()
    })
    .catch(error => {
      throw new Error(error);
      process.exit();
    })

  })
}
