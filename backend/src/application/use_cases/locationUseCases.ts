import { Location } from "@domain/entities/Location";
import { ILocationRepository } from "@domain/repositories/ILocationRepository";

export class LocationUseCases {
  constructor(private readonly locationRepository: ILocationRepository) {}

  async save(
    user_id: number,
    latitude: number,
    longitude: number,
    city: string,
  ): Promise<Location> {
    const locationToSave = Location.create(user_id, latitude, longitude, city);
    return await this.locationRepository.save(locationToSave);
  }

  async getByFields(fields: Partial<Location>): Promise<Location | null> {
    const locations = await this.locationRepository.getByFields(fields);
    if (locations.length === 0 || locations.length > 1) {
      return null;
    }
    return locations[0];
  }
}
