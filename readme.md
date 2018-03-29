# List of routes:
### New & Edit Instruments, Locations, Keys, Topics, Beards:

http://localhost:3000/instruments

http://localhost:3000/locations

http://localhost:3000/keys

http://localhost:3000/topics

http://localhost:3000/beards


### New Song:

http://localhost:3000/song/new


### Edit Song:

http://localhost:3000/song/SONG_NUMBER_HERE/edit

*example:* http://localhost:3000/song/25/edit


### All Songs:

http://localhost:3000/songs


# How to run this application:

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

Make a directory called 'data' on your root, and a directory inside that called 'db', so MongoDB has a default place to store DB files
**If this directory already exists, don't recreate it!**

```
sudo mkdir -p /data/db
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

Once the MongoDB daemon is running, you can seed the database in another terminal window. You can re-run this seed file at any time to reset the database to the original dataset based on the Google Spreadsheet. Make sure you're inside the 'cryptosong' directory when you run this command:
```
yarn run seed
```

After the seed file runs and exits successfully (you'll see a bunch of stuff scroll by), run:
```
yarn start
```

When you want to stop the build process or the web server:

**Control + C**
