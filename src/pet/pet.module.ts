import { Module } from '@nestjs/common';
import { PetController } from './controllers';
import { PetService } from './services';
import { PetModuleConstants } from './constants';
import { PetRepository } from './repositories';

@Module({
  imports: [],
  controllers: [PetController],
  providers: [
    PetService,
    { provide: PetModuleConstants.petRepo, useClass: PetRepository },
  ],
  exports: [
    PetService,
    PetModuleConstants.petRepo,
  ]
})
export class PetModule {}

