import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsuarioService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): Prisma.Prisma__CITA_MEDICAClient<import(".prisma/client").CITA_MEDICA>;
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").CITA_MEDICA[]>;
}
