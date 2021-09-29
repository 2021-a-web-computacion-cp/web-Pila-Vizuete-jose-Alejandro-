import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
/*import { Prisma } from '@prisma/client';*/
/*import { contains } from 'class-validator';*/
@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}
  buscarUno(id: number) {
    this.prisma.cITA_MEDICA.findUnique({
      where: {
        id: id,
      },
    });
  }
}
