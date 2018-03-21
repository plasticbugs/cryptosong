How to run this application:

Install Hombrew from http://brew.sh

Then run:
```
brew install yarn
```
This will install the latest stable version of Node.js and Yarn

You don't have git?! C'mon!
```
brew install git
```

You need MongoDB, too:
```
brew install mongodb
```

Now, navigate to where you want to download this code and clone this repo:
```
git clone https://github.com/plasticbugs/cryptosong.git
```
Change into the downloaded directory
```
cd cryptosong
```
Install all the app's dependencies (this may take a while):
```
yarn
```
Build the app (this will take about 10 seconds or so):
```
yarn run build
```
In another terminal window, run MongoDB:
```
mongod
```

Once the MongoDB daemon is running, you can seed the database in another terminal window:
```
yarn run seed
```

Then in a separate Terminal window or tab, run:
```
yarn start
```

Once the DB is seeded, view all the songs in the database at:
http://127.0.0.1:3000/songs

To view the 'new song' form, visit:
http://127.0.0.1:3000/song/new

To edit a song, visit:

http://localhost:3000/song/SONG_NUMBER_HERE/edit

for example:

http://localhost:3000/song/25/edit

When you want to stop the build process or the web server:

**Control + C**