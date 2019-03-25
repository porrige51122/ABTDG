import Toastify from 'toastify-js';
import colours from './objects/colours';

export default (message, colour) => {
  Toastify({
    text: message,
    gravity: 'bottom',
    duration: 3000,
    backgroundColor: colour || colours.flat_middle_red_purple,
  }).showToast();
};
