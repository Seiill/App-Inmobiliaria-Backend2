import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Zona} from '../models';
import {ZonaRepository} from './zona.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly zona: BelongsToAccessor<Zona, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>,
  ) {
    super(Inmueble, dataSource);
    this.zona = this.createBelongsToAccessorFor('zona', zonaRepositoryGetter,);
    this.registerInclusionResolver('zona', this.zona.inclusionResolver);
  }
}
