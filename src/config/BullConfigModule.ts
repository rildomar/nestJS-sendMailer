import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT),
            }
        }),
    ]
})

export class BullConfigModule { }