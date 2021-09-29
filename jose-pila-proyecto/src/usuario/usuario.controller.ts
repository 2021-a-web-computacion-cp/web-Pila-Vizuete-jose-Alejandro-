import { Controller, Get, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
@Controller('usuario')
export class UsuarioController {
  constructor(
    private usuarioService: UsuarioService,
  ) {}
  @Get(':idUsuario')
  obtenerUno(@Param() parametrosRuta) {
    return this.usuarioService.buscarUno(+parametrosRuta.idUsuario)
  }
}