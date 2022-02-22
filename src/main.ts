import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { MAIL_QUEUE } from 'src/constants/mailer-constants';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import * as Queue from 'bull';

import { FastifyAdapter as BullFastifyAdapter } from '@bull-board/fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const bullServerAdapter = new BullFastifyAdapter();

  createBullBoard({
    queues: [new BullAdapter(new Queue(MAIL_QUEUE))],
    serverAdapter: bullServerAdapter,
  });

  bullServerAdapter.setBasePath('/admin/queues');

  app.register(bullServerAdapter.registerPlugin(), {
    prefix: '/admin/queues',
    basePath: '/admin/queues',
  });

  await app.listen(3000);
}
bootstrap();
