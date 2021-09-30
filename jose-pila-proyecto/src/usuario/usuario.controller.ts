import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioCrearDto } from './dto/usuario-crear.dto';
import { validate } from 'class-validator';
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
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }

  /*Método para llamar la ventana crear cita*/
  @Get('crear-cita')
  vistaCrear(@Res() response, @Query() parametros) {
    response.render('usuario/crear', {
      datos: {
        mensaje: parametros.mensaje,
      },
    });
  }
  @Post('registro-formulario')
  async RegistrarCita(@Body() parametrosCuerpo, @Res() response) {
    const usuarioCrearDto = new UsuarioCrearDto();
    usuarioCrearDto.nombre = parametrosCuerpo.nombre;
    usuarioCrearDto.apellido = parametrosCuerpo.apellido;
    usuarioCrearDto.categoria = parametrosCuerpo.categoria;
    usuarioCrearDto.cedula = parametrosCuerpo.cedula;
    try {
      const errores = await validate(usuarioCrearDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien parametros');
      } else {
        const respuestaUsuario = await this.usuarioService.crearCita({
          nombre: usuarioCrearDto.nombre,
          apellido: usuarioCrearDto.apellido,
          categoria: usuarioCrearDto.categoria,
          seguro_social: true,
          cedula: usuarioCrearDto.cedula,
        });
        response.redirect(
          '/cita/crear-cita' + '?mensaje=Se creo el usuario exitosamente',
        );
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores registrar una cita' });
      throw new InternalServerErrorException('Error servidor');
    }
  }

  /*Eliminar cita agendada*/
  @Post('eliminar-cita/:idUsuario')
  async eliminarUsuario(@Res() response, @Param() parametrosRuta) {
    try {
      await this.usuarioService.eliminarCita(+parametrosRuta.idUsuario);
      response.redirect('/cita/lista-citas' + '?mensaje=Se elimino al usuario');
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error');
    }
  }
  /*Generacion de la vista para actualizar una cita medica*/
  @Post('actualizar-cita/:idCita')
  async vistaActualizar(@Res() response, @Param() parametrosRuta) {
    try {
      const citaEdicion = await this.usuarioService.buscarUno(
        +parametrosRuta.idCita,
      );
      console.log(citaEdicion);
      response.render('usuario/actualizar', {
        cita: citaEdicion,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al encontrar la cita');
    }
  }
  @Post('actualizar-formulario/:idRuta')
  async actualizarFormulario(@Param() ruta, @Body() parametrosCuerpo, @Res() response) {
    console.log(parametrosCuerpo);
    const usuarioActualizarDto = new UsuarioCrearDto();
    usuarioActualizarDto.nombre = parametrosCuerpo.nombre;
    usuarioActualizarDto.apellido = parametrosCuerpo.apellido;
    usuarioActualizarDto.categoria = parametrosCuerpo.categoria;
    usuarioActualizarDto.cedula = parametrosCuerpo.cedula;
    parametrosCuerpo.seguro_social = false;
    try {
      const errores = await validate(usuarioActualizarDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien parametros');
      } else {
        const respuestaUsuario = await this.usuarioService.actualizarUno({
          id: +ruta.idRuta,
          data: parametrosCuerpo,
        });
        response.redirect('/cita/lista-citas');
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores registrar una cita' });
      throw new InternalServerErrorException('Error servidor');
    }
  }
}
