# Project 4: Media Server

The point of this amazingly-complex-yet-super-simple app is to enable users to stream their local media to any device in the world without having to rely on a third party, hosted service. The app will provide an interface on the "server" device for a user to specify a directory to serve, and it will run a local web server to field requests for the files. The app will also feature a "client" side, public facing web interface where users can log in to their accounts and access their files, allowing a user to stream those files from anywhere.

## User Stories

- You're a huge music fan who has curated thousands of songs over the years. You have well over 17 petabytes of music files, and several devices to work with. Clearly, it'd be highly inneficent and pretty tough to manage all of your music on all of your devices, and services like Google Play and Dropbox have relatively small file size limitations.

- You are the tech guy in your family, and want to provide a simple platform for all of your family members to access the family movies you all cherish. You want it to be totally customizable, and absolutely can't imagine not having full control over the environment.

## Terminology

For the rest of this README, I'll be using the terms "server" and "client" somewhat incorrectly. The server will refer to the Node/Express/React app that will be installed on the device that has the media files, and will exist in an Electron app. The client will refer to the Node/Express/React/Postgres app that will be deployed to Heroku, and will function as the public facing interface for accessing one's files from anywhere.

## Technologies

This app will be built on:
- Node.js
- Express.js
- React.js
- PostgreSQL
- Electron.io
- (Angular.js?)
- (React Native?)

## Proof of Concept

Getting the media server part working is a major challenge, and I wouldn't have been able to have figured it out were it not for these two great resources. For now, I plan on copying the methods used on these two:

[Audio only streaming server example](https://docs.nodejitsu.com/articles/advanced/streams/how-to-use-fs-create-read-stream/)

[Video streaming example with streaming controls](http://stackoverflow.com/a/24977085)

The other major roadblock in getting this to work is building out the server app that serves files. I plan on using Electron.io to build this part, and have it just be a simple React container that spawns off a web server on the user's command, making fetch calls to the client app as needed.

## Wireframes
### Server

Login page:
![Login page](http://res.cloudinary.com/chairshare/image/upload/v1481574063/Screen_Shot_2016-12-12_at_1.35.35_PM_wvpgbb.png)
Landing page:
![Landing page](http://res.cloudinary.com/chairshare/image/upload/v1481574063/Screen_Shot_2016-12-12_at_1.47.59_PM_kxqyyg.png)
Streaming page:
![Streaming page](http://res.cloudinary.com/chairshare/image/upload/v1481574063/Screen_Shot_2016-12-12_at_1.51.16_PM_b6ilys.png)

### Client

Login page:
![Login page](http://res.cloudinary.com/chairshare/image/upload/v1481574063/Screen_Shot_2016-12-12_at_1.35.35_PM_wvpgbb.png)
Streaming page:
![Streaming page](http://res.cloudinary.com/chairshare/image/upload/v1481574063/Screen_Shot_2016-12-12_at_2.41.48_PM_ujq02a.png)


## Goals

1) Get a simple media streaming server working with React and Express, initially serving a hardcoded directory of files

2) Wrap that media server in an Electron app

3) Add a way for a user to specify a directory location on the server/Electron app, and dynamically run the express server with that directory

4) Create a database ERD for users and references to IP's and ports (see below)

5) Build client side app to log users in and display a list of files, using hardcoded IP's and ports at first (i.e. localhost:3000)

6) Update the server app to include a dynamic IP updater, sending the server's current IP address and port to the client app (via fetch) so that the server can even live behind a firewall on a network with a dynamically assigned IP address (provided the user can set a firewall rule to allow traffic on that port)
- Maybe look into using software like Ngrok to simplify matters

7) Update the client app to load files from the dynamically assigned IP address, getting the source IP and port from the database upon login

8) Style!!!

9) Bug fixes

10) Potentially look into switching the server app to a different front end framework, probably Angular.js (if I get this far)

11) Convert client app's React code to React Native for an all out amazing user experience

12) Look into AirPlay or MiraCast packages for the hell of it
