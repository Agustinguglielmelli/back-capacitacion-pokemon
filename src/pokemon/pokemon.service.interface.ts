
export abstract class PokemonServiceInterface {
  abstract create(dto: any): Promise<any>;

  abstract findAll(): Promise<any[]>;

  abstract findOnePokemon(id: number): Promise<any>;

  abstract update(id: number, dto: any): Promise<any>;

  abstract remove(id: number): Promise<any>;

  abstract findPaginated(params: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
  }): Promise<{ data: any[]; total: number; page: number; limit: number }>;

  abstract getPokemonsByAbilityName(abilityName: string): Promise<any[]>;
}