import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Zona extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Localidad: string;

  @property({
    type: 'string',
    required: true,
  })
  Barrio: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Zona>) {
    super(data);
  }
}

export interface ZonaRelations {
  // describe navigational properties here
}

export type ZonaWithRelations = Zona & ZonaRelations;
