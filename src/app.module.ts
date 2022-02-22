import { InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Queue } from 'bull';
import { BullConfigModule } from './config/BullConfigModule';
import { MailConfigModule } from './config/MailerConfigModule';
import { MAIL_QUEUE } from './constants/mailer-constants';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { MiddlewareBuilder } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

@Module({
  imports: [
    //responsável por carregar os Env's da aplicação
    ConfigModule.forRoot(),
    BullConfigModule,
    MailConfigModule,    
  ],
  
})
export class AppModule { }
