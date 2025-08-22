import { PokemonResponseDTO } from './pokemonResponseDTO';

export class PaginatedResponseDto {
  data: PokemonResponseDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;

  constructor(data: PokemonResponseDTO[], total: number, page: number, limit: number) {
    this.data = data;
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
  }
}