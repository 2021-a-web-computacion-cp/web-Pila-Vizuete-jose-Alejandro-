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

  /*Funcion para BuscarMuchos usuarios para la lista
   de usuarios con el mismo nombre*/
  buscarMuchos(parametrosBusqueda: {
    skip?: number;
    take?: number;
    busqueda?: string;
  }) {
    const or = parametrosBusqueda.busqueda
      ? {
          OR: [
            { nombre: { contains: parametrosBusqueda.busqueda } },
            { apellido: { contains: parametrosBusqueda.busqueda } },
          ],
        }
      : {};
    console.log(or);
    return this.prisma.cITA_MEDICA.findMany({
      where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    });
  }

  /*Funcion CrearNuevo este permite crear una nueva cita medica*/
  crearNuevo(cita: Prisma.CITA_MEDICACreateInput) {
    return this.prisma.cITA_MEDICA.create({
      data: cita,
    });
  }
  /*Funcion ELiminarCita permite eliminar una cita que ya ha sido registrada*/
  eliminarCita(id: number) {
    return this.prisma.cITA_MEDICA.delete({
      where: { id_cita: id },
    });
  }
  actualizarUno(parametrosActualizar: {
    id: number;
    data: Prisma.CITA_MEDICAUpdateInput;
  }) {
    return this.prisma.cITA_MEDICA.update({
      data: parametrosActualizar.data,
      where: {
        id_cita: parametrosActualizar.id,
      },
    });
  }
}
