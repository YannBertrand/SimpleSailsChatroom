# Simple Sails Chatroom
**Stability: 1 - Experimental**

## Description
SimpleSailsChatroom is a small chatroom application that take advantage of the [Sails](http://sailsjs.org) framework. It uses [Socket.IO](http://socket.io/) internally to do real-time communication between users.

* User join a chatroom by entering a name
* User see the list of users in the chatroom
* User can read the last 10 messages
* Users can read new messages in real time
* User can write and send new messages

This project is just a proof of concept and had to be done in less than a day. Therefor, there is still a lot to do before deploying SimpleSailsChatroom to production.

## Dev
**You'll need a [MongoDB](https://www.mongodb.com/) database up and running to launch SimpleSailsChatroom.**

*However*, you can switch to a few others datastores such as MySQL or Postgre thanks to the [Waterline](https://github.com/balderdashy/waterline) ORM (see [the Sails docs](http://sailsjs.org/documentation/concepts/models-and-orm) for more infos on this).

### Commands
* Init: `npm install`
* Run: `npm start`

## License
MIT © [Yann Bertrand](http://yann-bertrand.fr)
