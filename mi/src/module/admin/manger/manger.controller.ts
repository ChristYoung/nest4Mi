import { Controller, Post, Get, Delete } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { MangerModel } from '@db/db/model/manger.model';
import { Crud } from 'nestjs-mongoose-crud';

@Crud({
    model: MangerModel,
})
@Controller('manger')
export class MangerController {

    constructor(@InjectModel(MangerModel) private readonly model: any) {

    }

}
