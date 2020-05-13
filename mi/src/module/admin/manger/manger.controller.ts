import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { MangerModel } from '@db/db/model/manger.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';

@Crud({
    model: MangerModel,
})
@Controller('manger')
@ApiTags('用户/管理员')
export class MangerController {

    constructor(@InjectModel(MangerModel) private readonly model: ReturnModelType<typeof MangerModel>) {

    }

}
