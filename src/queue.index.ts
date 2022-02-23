import 'dotenv/config';
import Queue from './lib/Queue';

// eslint-disable-next-line no-console
console.log('Queues server running.');

Queue.process();
