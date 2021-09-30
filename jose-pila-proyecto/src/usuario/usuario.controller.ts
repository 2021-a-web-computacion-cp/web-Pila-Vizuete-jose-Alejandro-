import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
@Controller('cita')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}
  /*Metodo que inicializa la pagina*/
  @Get('inicio')
  inicio(@Res() response) {
    response.render('inicio');
  }

  /*Generacion de metodo para consultar el listado de citas medicas*/
  @Get('lista-citas')
  async listaCita(@Res() response, @Query() parametrosConsulta) {
    try {
      const respuesta = await this.usuarioService.buscarMuchos({
        skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
        take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
        busqueda: parametrosConsulta.busqueda ? parametrosConsulta.busqueda : undefined,
      });
      response.render('usuario/buscar', {
        datos: {
          usuarios: respuesta,
          mensaje: parametrosConsulta.mensaje,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }
}
