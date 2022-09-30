import { Controller, Get, Post, Delete, Patch, Put } from '@nestjs/common';

@Controller('premier')
export class PremierController {
  @Get('get')
  getPremier(): string {
    console.log('getPremier');
    return 'getPremier';
  }
  @Post('post')
  postPremier(): string {
    console.log('postPremier');
    return 'postPremier';
  }
  @Delete('delete')
  deletePremier(): string {
    console.log('deletePremier');
    return 'deletePremier';
  }
  @Put('put')
  putPremier(): string {
    console.log('putPremier');
    return 'putPremier';
  }
  @Patch('patch')
  patchPremier(): string {
    console.log('patchPremier');
    return 'patchPremier';
  }
}
