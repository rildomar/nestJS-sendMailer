import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { CONFIRM_REGISTRATION, MAIL_QUEUE } from "src/constants/mailer-constants";
import { EmailDataDTO } from "src/sendMail/DTO/sendMail.dto";

@Injectable()
class SendMailProducerService {

    constructor(@InjectQueue(MAIL_QUEUE) private queue: Queue) { }

    async sendMail(emailDataDTO: EmailDataDTO) {
        await this.queue.add(CONFIRM_REGISTRATION, emailDataDTO);
    }
}

export { SendMailProducerService }