/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '10f5baca47667211be0d',
    cluster: 'eu',
    forceTLS: true
});
