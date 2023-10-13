// const colyseus = require('colyseus');
// const { v4: uuidv4 } = require('uuid');

// let clients = {}
// let sittables = {}
// let isStreaming = false;
// let streamerid;
// let audioGroupId = uuidv4();
// console.log(audioGroupId);

// exports.ChatRoom = class extends colyseus.Room {
//   maxClients = 100;

//   onCreate(options) {
//     console.log('ChatRoom created!', options);

//     this.broadcastInterval = setInterval(() => {
//       this.broadcast('move', clients);
//     }, 20);

//     this.onMessage('mute', (client, message) => {
//       clients[client.sessionId].mute = message.mute;
//       this.broadcast('mute', clients);
//     })

//     this.onMessage('mutePlayer', (client, message) => {
//       this.clients.filter((client) => client.sessionId === message.clientId).map((client) => {
//         client.send('mutePlayer');
//       })
//     })

//     this.onMessage('move', (client, message) => {
//       clients[client.sessionId].position = message.position;
//       clients[client.sessionId].rotation = message.rotation;
//       clients[client.sessionId].animation = message.animation;
//     });
//     this.onMessage('avatarUrl', (client, message) => {
//       // Broadcast the received move message to all clients except the sender
//       clients[client.sessionId].url = message.url;
//       clients[client.sessionId].name = message.name;
//       clients[client.sessionId].jobTitle = message.jobTitle;
//       clients[client.sessionId].givenName = message.givenName;
//       //this.send(client, 'move', clients);
//       // this.broadcast('join', clients);
//     });
//     this.onMessage('acsId', (client, message) => {
//       clients[client.sessionId].acsId = message.acsId;
//     })
//     this.onMessage('getExistingData', (client, message) => {
//       client.send('existingUserData', clients);
//     })
//     this.onMessage('endScreenShare', (client) => {
//       isStreaming = false;
//       streamerid = null;
//     })
//     this.onMessage('streamNewClient', (client, message) => {
//       const sClient = this.clients.filter(client => client.sessionId == message)[0];
//       sClient.send('streamNewClient', client.sessionId);
//     })
//     this.onMessage('isStreaming', (client) => {
//       if (isStreaming) {
//         client.send('selfScreenShareBy', clients[streamerid].givenName);
//       }
//     })
//     this.onMessage('loadComplete', (client) => {

//       this.broadcast('join', clients);
//       this.broadcast('userJoined', clients[client.sessionId].givenName, { except: client });
//     })
//     this.onMessage('getAudioGroupId', (client) => {
//       client.send('audioGroupId', audioGroupId);
//     })
//     this.onMessage('sit', (client, message) => {

//       if (sittables[message.name]) {
//         if (!sittables[message.name].occupied) {
//           sittables[message.name].occupied = true;
//           sittables[message.name].user = client.sessionId;
//           const toSend = {
//             seatName: message.name,
//             client: client,
//             position: message.position,
//             rotation: message.rotation
//           }
//           client.send('sit', toSend);

//           client.send('isSeatAvailable', 2)
//         }
//       } else {
//         sittables[message.name] = {
//           occupied: true,
//           user: client.sessionId
//         }
//         const toSend = {
//           seatName: message.name,
//           client: client,
//           position: message.position,
//           rotation: message.rotation
//         }
//         client.send('sit', toSend);

//         client.send('isSeatAvailable', 2)
//       }
//       Object.keys(sittables).filter(sittable => message.name != sittable).map((sittable) => {
//         if (sittables[sittable].user === client.sessionId) {
//           sittables[sittable].occupied = false;
//         }
//       })

//     })
//     this.onMessage('isSeatAvailable', (client, message) => {
//       if (sittables[message.name]) {
//         if (!sittables[message.name].occupied) {
//           client.send('isSeatAvailable', 1);
//         } else if (sittables[message.name].user === client.sessionId) {
//           client.send('isSeatAvailable', 2)
//         }
//         else {
//           client.send('isSeatAvailable', 0)
//         }
//       } else {
//         client.send('isSeatAvailable', 1);
//       }
//     })
//     this.onMessage('unsit', (client) => {
//       Object.keys(sittables).map((sittable) => {
//         if (sittables[sittable].user === client.sessionId) {
//           // console.log(sittable[sittable]);
//           sittables[sittable].occupied = false;
//         }
//       })
//       client.send('isSeatAvailable', 1);
//     })
//     this.onMessage('animate', (client, message) => {
//       client.send('animate', message);
//     })
//     this.onMessage('selfScreenShare', (client) => {
//       client.send('selfScreenShare');
//     })
//     this.onMessage('screenShareStarted', (client) => {
//       isStreaming = true;
//       streamerid = client.sessionId;
//       this.broadcast('selfScreenShareBy', clients[client.sessionId].givenName);
//     })
//   }

//   onJoin(client) {
//     clients[client.sessionId] = {
//       position: { x: 2, y: -4.1333, z: -86 },
//       rotation: { x: 0, y: 0, z: 0 },
//       animation: 'idle',
//       url: '',
//       name: '',
//       givenName: '',
//       mute: true,
//       jobTitle: '',
//       acsId: ''
//     }
//   }

//   onLeave(client) {
//     this.broadcast('userLeft', clients[client.sessionId].givenName);
//     delete clients[client.sessionId]
//     Object.keys(sittables).map((sittable) => {
//       if (sittables[sittable].user === client.sessionId) {
//         sittables[sittable].occupied = false;
//       }
//     })
//     if (streamerid === client.sessionId) {
//       if (isStreaming) {
//         this.broadcast('endScreenShare');
//         isStreaming = false;
//         streamerid = null;
//       }
//     }
//     this.broadcast('leave', clients);

//   }

//   onDispose() {
//     clearInterval(this.broadcastInterval);
//     console.log('Dispose ChatRoom');
//     sittables = {};
//   }

// }
