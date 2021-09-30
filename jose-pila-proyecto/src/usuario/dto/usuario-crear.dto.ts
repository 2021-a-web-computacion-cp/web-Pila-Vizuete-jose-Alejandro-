import { IsNotEmpty, IsString, Max, maxLength, MaxLength, Min, minLength, MinLength } from 'class-validator';

export class UsuarioCrearDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(22)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(22)
  apellido: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(20)
  cedula: string;

  @IsNotEmpty()
  @IsString()
  categoria: string;
}