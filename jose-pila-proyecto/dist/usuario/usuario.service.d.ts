import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsuarioService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): Prisma.Prisma__CITA_MEDICAClient<import(".prisma/client").CITA_MEDICA>;
}
