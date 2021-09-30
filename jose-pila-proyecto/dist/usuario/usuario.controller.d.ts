import { UsuarioService } from './usuario.service';
export declare class UsuarioController {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    inicio(response: any): void;
    listaCita(response: any, parametrosConsulta: any): Promise<void>;
    vistaCrear(response: any, parametros: any): void;
    RegistrarCita(parametrosCuerpo: any, response: any): Promise<void>;
    eliminarUsuario(response: any, parametrosRuta: any): Promise<void>;
    vistaActualizar(response: any, parametrosRuta: any): Promise<void>;
    actualizarFormulario(ruta: any, parametrosCuerpo: any, response: any): Promise<void>;
}
