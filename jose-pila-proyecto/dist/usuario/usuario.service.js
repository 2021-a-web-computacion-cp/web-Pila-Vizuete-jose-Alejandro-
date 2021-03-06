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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UsuarioService = class UsuarioService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    buscarUno(id) {
        return this.prisma.cITA_MEDICA.findUnique({
            where: {
                id_cita: id,
            },
        });
    }
    buscarMuchos(parametros) {
        const or = parametros.busqueda
            ? {
                OR: [
                    { nombre: { contains: parametros.busqueda } },
                    { apellido: { contains: parametros.busqueda } },
                    { cedula: { contains: parametros.busqueda } },
                    { categoria: { contains: parametros.busqueda } },
                ],
            }
            : {};
        return this.prisma.cITA_MEDICA.findMany({
            where: or,
            take: Number(parametros.take) || undefined,
            skip: Number(parametros.skip) || undefined,
        });
    }
    crearCita(cita) {
        return this.prisma.cITA_MEDICA.create({
            data: cita,
        });
    }
    eliminarCita(id) {
        return this.prisma.cITA_MEDICA.delete({
            where: { id_cita: id },
        });
    }
    actualizarUno(parametrosActualizar) {
        return this.prisma.cITA_MEDICA.update({
            data: parametrosActualizar.data,
            where: {
                id_cita: parametrosActualizar.id,
            },
        });
    }
};
UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map