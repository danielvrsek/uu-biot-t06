import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayController } from 'controllers/gateway.controller';
import { SchemaConstants } from 'dataLayer/common/schemaConstants';
import { GatewaySchema } from 'dataLayer/entities/gateway.entity';
import { GatewayRepository } from 'dataLayer/repositories/gateway.repository';
import { GatewayService } from 'services/gateway.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: SchemaConstants.Gateway, schema: GatewaySchema }])],
    controllers: [GatewayController],
    providers: [GatewayService, GatewayRepository],
    exports: [GatewayService, GatewayRepository],
})
export class GatewayModule {}
