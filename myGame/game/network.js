// import IO from 'socket.io-client';
//
// // const SOCKET_URL = 'https://socket.abtdg.fun/game';
// const SOCKET_URL = 'http://10.2.86.183:8080/game'; // comment out to socket url in production. To use local socket.
// const SERVER = IO(SOCKET_URL); // this is the socket
//
// // take the game id from the curent URL
// let getGamePin = (url) => {
//   let gamePin;
//   if (url.split('?game_pin=') != null) {
//     gamePin = url.split('=')[1];
//     gamePin = gamePin.split('&')[0];
//     return gamePin;
//   }
// }
//
// // take the user id fom the current URL
// let getUserId = (url) => {
//   let userId;
//   if (url.split('&user_id=')[1] != null) {
//     userId = url.split('&user_id=')[1];
//     return userId;
//   }
// }
//
// const GAME_PIN = getGamePin(window.location.href);
// const USER_ID = getUserId(window.location.href);
//
// // user connects
// SERVER.on('connect', () => {
//   // join the game
//   SERVER.emit('join', {
//     game_pin: GAME_PIN,
//     user_id: USER_ID
//   });
//
//   // we joined the game
//   SERVER.on('success', (socket) => {
//
//     // hide loading screen here
//
//     alert('JOINED GAME'); // testing
//
//     SERVER.on('money', (data) => {
//       // store money locally in some counter
//     });
//   });
//
//   // unable to join game
//   SERVER.on('fail', () => {
//
//     // alert('COULD NOT JOIN GAME'); // testing
//
//     // redirect back to hame or error message
//   });
// });
//
// export default {
//   server: SERVER,
//   game_pin: GAME_PIN,
//   user_id: USER_ID
// };
