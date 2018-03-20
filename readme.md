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

Now, navigate to where you want to download this code and clone this repo:
```
git clone https://github.com/plasticbugs/cryptosong.git
```
Change into this directory
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
Then in a separate Terminal window or tab, run:
```
yarn start
```
Now, open your favorite web browser and navigate to:

http://127.0.0.1:3000/ or http://localhost:3000/

One of those should work

When you want to stop the build process and the web server:

**Control + C**