/* eslint-disable no-console */
/* eslint-disable max-len */
import Queue from 'bull';
import IRedisConfig from '../interfaces/redisConfig.interface';

import * as jobs from '../jobs';

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, { redis: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT } as IRedisConfig }),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find((line) => line.name === name);

    return queue.bull.add(data);
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job) => {
        console.log('Job failed', queue.key, job.data);
      });
    });
  },
};
