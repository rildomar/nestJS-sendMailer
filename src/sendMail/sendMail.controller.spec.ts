import { MAIL_QUEUE } from './../constants/mailer-constants';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { SendMailController } from './sendMail.controller';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';

describe('SendMailController', () => {
  let controller: SendMailController;
  let moduleRef: TestingModule;

  const exampleQueueMock = { add: jest.fn() };

  beforeEach(async () => {
    jest.resetAllMocks();

    moduleRef = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: MAIL_QUEUE,
        }),
      ],
      controllers: [SendMailController],
      providers: [SendMailProducerService],
    })
      .overrideProvider(getQueueToken(MAIL_QUEUE))
      .useValue(exampleQueueMock)
      .compile();

    controller = moduleRef.get<SendMailController>(SendMailController);

    // const module: TestingModule = await Test.createTestingModule({
    //   controllers: [SendMailController],
    // }).compile();

    // controller = module.get<SendMailController>(SendMailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
