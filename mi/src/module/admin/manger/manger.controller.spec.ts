import { Test, TestingModule } from '@nestjs/testing';
import { MangerController } from './manger.controller';

describe('Manger Controller', () => {
  let controller: MangerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MangerController],
    }).compile();

    controller = module.get<MangerController>(MangerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
