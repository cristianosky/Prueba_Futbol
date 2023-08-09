export interface Equipo {
  capacidad: number;
  entrenador: string;
  estadio: string;
  fundacion: string;
  id: number;
  nacionalidad: string;
  nombre: string;
  sitioWeb: string;
  valor: string;
}

export interface CargarEquiposResponse {
  content: Equipo[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface BodyAddEquipo {
  nombre: string;
  estadio: string;
  sitioWeb: string;
  nacionalidad: string;
  fundacion: string;
  entrenador: string;
  capacidad: number;
  valor: number;
}
