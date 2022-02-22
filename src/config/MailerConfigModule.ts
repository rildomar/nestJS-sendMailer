import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MAIL_QUEUE } from 'src/constants/mailer-constants';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';
import { SendMailConsumerService } from 'src/jobs/sendMail-consumer';
import { SendMailController } from 'src/sendMail/sendMail.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MailerModule.forRoot({
            transport: {
              pool: true,
              host: process.env.MAIL_HOST,
              port: Number(process.env.MAIL_PORT), // por default, o env tras como String. Então é so converter para Number
              auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWD
              }
            },
            defaults: {
              from: process.env.MAIL_DEFAULT_FROM,
            },
          }),
        BullModule.registerQueue({
            name: MAIL_QUEUE
        })
    ],
    controllers: [SendMailController],
    providers: [SendMailProducerService, SendMailConsumerService],
})

export class MailConfigModule {}