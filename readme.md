# List of routes:
## New & Edit Instruments, Locations, Keys, Tags, Topics, Beards:

http://localhost:3000/instruments

http://localhost:3000/locations

http://localhost:3000/keys

http://localhost:3000/topics

http://localhost:3000/beards

http://localhost:3000/tags


## New Song:

http://localhost:3000/song/new


## Edit Song:

http://localhost:3000/song/SONG_NUMBER_HERE/edit

*example:* http://localhost:3000/song/25/edit


## All Songs:

http://localhost:3000/songs


# API Routes:

## All api routes are prefixed with ```api/```.

Some routes you may find useful:

```GET /api/song/:id``` ===> returns song data by song number

```GET /api/tag/:tag_name``` => returns an array of songs that match the provided tag


# What should I do to get the latest changes and start the app running again?

Run these commands in your terminal (explanation below):

1. ```git pull origin master```
2. ```yarn```
3. If the Mongo server isn't currently running, run: ```mongod```
4. ```yarn run seed```
5. ```yarn run build-and-start```
6. Visit http://localhost:3000/ in your browser

What do these things do?

1. Gets the latest master version of the code base
2. Installs any newly added packages/modules
3. Runs the Mongo daemon, a service that lets you connect to the database. If it's already running, this command will leave the service running and will exit with an error message.
4. This drops the development DB and restores the dataset to mirror what's in the Google Sheet
5. This both transpiles the React code (JSX/ES6) into JavaScript that the browser can execute and runs a Node-based web server that your web browser can connect to.
6. This is you typing a URL into your browser.

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

**Control + C** in your terminal window
