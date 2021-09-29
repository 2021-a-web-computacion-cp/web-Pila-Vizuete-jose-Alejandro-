import { UsuarioService } from './usuario.service';
export declare class UsuarioController {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    obtenerUno(parametrosRuta: any): import(".prisma/client").Prisma.Prisma__CITA_MEDICAClient<import(".prisma/client").CITA_MEDICA>;
}
