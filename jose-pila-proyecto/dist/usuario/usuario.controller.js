"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("./usuario.service");
const usuario_crear_dto_1 = require("./dto/usuario-crear.dto");
const class_validator_1 = require("class-validator");
let UsuarioController = class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    inicio(response) {
        response.render('inicio');
    }
    async listaCita(response, parametrosConsulta) {
        try {
            const respuesta = await this.usuarioService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda
                    ? parametrosConsulta.busqueda
                    : undefined,
            });
            response.render('usuario/buscar', {
                datos: {
                    usuarios: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    vistaCrear(response, parametros) {
        response.render('usuario/crear', {
            datos: {
                mensaje: parametros.mensaje,
            },
        });
    }
    async RegistrarCita(parametrosCuerpo, response) {
        const usuarioCrearDto = new usuario_crear_dto_1.UsuarioCrearDto();
        usuarioCrearDto.nombre = parametrosCuerpo.nombre;
        usuarioCrearDto.apellido = parametrosCuerpo.apellido;
        usuarioCrearDto.categoria = parametrosCuerpo.categoria;
        usuarioCrearDto.cedula = parametrosCuerpo.cedula;
        try {
            const errores = await (0, class_validator_1.validate)(usuarioCrearDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien parametros');
            }
            else {
                const respuestaUsuario = await this.usuarioService.crearCita({
                    nombre: usuarioCrearDto.nombre,
                    apellido: usuarioCrearDto.apellido,
                    categoria: usuarioCrearDto.categoria,
                    seguro_social: true,
                    cedula: usuarioCrearDto.cedula,
                });
                response.redirect('/cita/crear-cita' + '?mensaje=Se creo el usuario exitosamente');
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores registrar una cita' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
    async eliminarUsuario(response, parametrosRuta) {
        try {
            await this.usuarioService.eliminarCita(+parametrosRuta.idUsuario);
            response.redirect('/cita/lista-citas' + '?mensaje=Se elimino al usuario');
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async vistaActualizar(response, parametrosRuta) {
        try {
            const citaEdicion = await this.usuarioService.buscarUno(+parametrosRuta.idCita);
            console.log(citaEdicion);
            response.render('usuario/actualizar', {
                cita: citaEdicion,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al encontrar la cita');
        }
    }
    async actualizarFormulario(ruta, parametrosCuerpo, response) {
        console.log(parametrosCuerpo);
        const usuarioActualizarDto = new usuario_crear_dto_1.UsuarioCrearDto();
        usuarioActualizarDto.nombre = parametrosCuerpo.nombre;
        usuarioActualizarDto.apellido = parametrosCuerpo.apellido;
        usuarioActualizarDto.categoria = parametrosCuerpo.categoria;
        usuarioActualizarDto.cedula = parametrosCuerpo.cedula;
        parametrosCuerpo.seguro_social = false;
        try {
            const errores = await (0, class_validator_1.validate)(usuarioActualizarDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien parametros');
            }
            else {
                const respuestaUsuario = await this.usuarioService.actualizarUno({
                    id: +ruta.idRuta,
                    data: parametrosCuerpo,
                });
                response.redirect('/cita/lista-citas');
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores registrar una cita' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
};
__decorate([
    (0, common_1.Get)('inicio'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "inicio", null);
__decorate([
    (0, common_1.Get)('lista-citas'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "listaCita", null);
__decorate([
    (0, common_1.Get)('crear-cita'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "vistaCrear", null);
__decorate([
    (0, common_1.Post)('registro-formulario'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "RegistrarCita", null);
__decorate([
    (0, common_1.Post)('eliminar-cita/:idUsuario'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "eliminarUsuario", null);
__decorate([
    (0, common_1.Post)('actualizar-cita/:idCita'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "vistaActualizar", null);
__decorate([
    (0, common_1.Post)('actualizar-formulario/:idRuta'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "actualizarFormulario", null);
UsuarioController = __decorate([
    (0, common_1.Controller)('cita'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map