import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';
import { EmailDataDTO } from './DTO/sendMail.dto';

@Controller('sendMail')
export class SendMailController {

    constructor(private mailService: SendMailProducerService) { }

    @Post()
    async createUser(@Body() createUserDTO: EmailDataDTO) {
        this.mailService.sendMail(createUserDTO)
        return createUserDTO;
    }

    @Get("/")
    testRoute() {
        return {
            message: process.env.MAIL_USER
        }
    }
}
