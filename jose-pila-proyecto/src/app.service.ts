import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  buscarMuchos(parametrosBusqueda: {
   skip?: number;
   take?: number;
  })
}
