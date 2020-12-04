# proto-rtc-yjs
A simple TextArea that several users can edit at the same time. Powered by React with Y.js.

**Warning :** This repository is a simple prototype / proof-of-concept

## How to run

```sh
# install dependancies
npm install

# spawn a Y.js WebSocket Server
PORT=1234 node ./node_modules/y-websocket/bin/server.js

# start the react app
yarn start

```

then open two browsers at http://localhost:3000/ and start playing


## Sources and documentations :

- [Y.js documentation](https://docs.yjs.dev)
- [https://github.com/yjs/yjs-demos](https://github.com/yjs/yjs-demos)
- [Old version of Y.js](https://github.com/yjs/yjs/tree/e1ece6dc66c4319316acfcac9a81ea1a854af9d6) with a [TextArea binding](https://github.com/yjs/yjs/tree/e1ece6dc66c4319316acfcac9a81ea1a854af9d6/src/Bindings) which helped me a lot to understand how it works

