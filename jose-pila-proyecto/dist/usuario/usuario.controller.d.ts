import { UsuarioService } from './usuario.service';
export declare class UsuarioController {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    inicio(response: any): void;
    listaCita(response: any, parametrosConsulta: any): Promise<void>;
}
