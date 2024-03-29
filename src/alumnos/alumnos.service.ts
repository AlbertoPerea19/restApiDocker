import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';

@Injectable()
export class AlumnosService {
  private alumnos: Alumno[] = [];

  create(createAlumnoDto: CreateAlumnoDto) {
    this.alumnos.push(createAlumnoDto);
    return createAlumnoDto;
  }

  findAll() {
    return this.alumnos;
  }

  findOne(id: number) {
    const alumno = this.alumnos.find((alumno) => alumno.id === id);
    if (!alumno) {
        throw new NotFoundException(`Alumno with id ${id} does not exist`);
    }
    return alumno;
  }

  update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    const index = this.alumnos.findIndex((alumno) => alumno.id === id);
    if (index === -1) {
        throw new NotFoundException(`Alumno with id ${id} does not exist`);
    }
    this.alumnos[index] = updateAlumnoDto;
    return updateAlumnoDto;
  }

  remove(id: number) {
    const initialLength = this.alumnos.length;
    this.alumnos = this.alumnos.filter((alumno) => alumno.id !== id);
    if (initialLength === this.alumnos.length) {
        throw new NotFoundException(`Alumno with id ${id} does not exist`);
    }
    return `Alumno with id ${id} has been deleted`;
  }
}
