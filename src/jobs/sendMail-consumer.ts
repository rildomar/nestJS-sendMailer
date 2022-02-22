import { MailerService } from '@nestjs-modules/mailer';
import { OnQueueActive, OnQueueCompleted, OnQueueError, OnQueueFailed, OnQueueProgress, Process, Processor } from "@nestjs/bull";
import { Logger } from '@nestjs/common';
import { Job } from "bull";
import { CONFIRM_REGISTRATION, MAIL_QUEUE } from 'src/constants/mailer-constants';
import { EmailDataDTO } from "src/sendMail/DTO/sendMail.dto";

@Processor(MAIL_QUEUE)
class SendMailConsumerService {

    private readonly _logger = new Logger(SendMailConsumerService.name);

    constructor(private mailService: MailerService) { }

    @Process(CONFIRM_REGISTRATION)
    async sendMailJob(job: Job<EmailDataDTO>) {
        const { data } = job;
        console.log(data)
        this._logger.log(
            `Enviando email para: ${data.email}`
        )

        try{
            await this.mailService.sendMail({
                to: data.email,
                // from: '"Teste asd" <asd@asd.com>',
                subject: `Para ${data.name}: ${data.subject}`,
                text: data.body
            });
        } catch (err) {
            this._logger.error(
                `Falha ao tentar enviar email para: ${data.email}`, err
            )
        }
        this._logger.log(
            `Email enviado!`
        )

    }

    @OnQueueActive()
    onQuererActive(job: Job) {
        this._logger.debug(`Processando o job ${job.id} do tipo ${job.name}`)
    }

    @OnQueueFailed()
    onQueueError(job: Job, error: any) {
        this._logger.error(
            `Falha no jog ${job.id} do tipo ${job.name}: ${error.message}`
        )
    }

    @OnQueueCompleted()
    onQueueCompleted(job: Job) {
        this._logger.debug(`Job ${job.id} Processado. Tipo ${job.name}`)
    }

}

export { SendMailConsumerService }