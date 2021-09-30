import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class UsuarioCrearDto {
  @IsNotEmpty()
  @IsString()
  @Min(2)
  @Max(12)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @Min(2)
  @Max(12)
  apellido: string;

  @IsNotEmpty()
  fecha_registro: string;

  @IsNotEmpty()
  seguro_social: string;

  @IsNotEmpty()
  @IsString()
  @Min(2)
  @Max(12)
  categoria: string;
}