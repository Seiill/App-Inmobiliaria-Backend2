import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmueble,
  Zona,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleZonaController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/zona', {
    responses: {
      '200': {
        description: 'Zona belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Zona)},
          },
        },
      },
    },
  })
  async getZona(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
  ): Promise<Zona> {
    return this.inmuebleRepository.zona(id);
  }
}
