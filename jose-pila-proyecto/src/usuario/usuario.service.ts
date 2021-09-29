import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
/*import { contains } from 'class-validator';*/
@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}
  /*Funcion BuscarUno permite encontrar una coincidencia del usuario */
  buscarUno(id: number) {
    return this.prisma.cITA_MEDICA.findUnique({
      where: {
        id_cita: id,
      },
    });
  }
}
