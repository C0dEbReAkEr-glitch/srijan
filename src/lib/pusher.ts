import Pusher from 'pusher-js';

const pusher = new Pusher('886d0ab8eb7c324f06a6', {
  cluster: 'ap2',
});

export const chatChannel = pusher.subscribe('chat');