import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from '../../src/pokemon/pokemon.service';
import { PokemonRepository } from '../../src/pokemon/repository/pokemon.repository';
import { PokemonDTO } from '../../src/pokemon/dto/pokemonDTO';
import { BadRequestException } from '@nestjs/common';
import { PaginatedPokemonsDTO } from '../../src/pokemon/dto/paginatedPokemonsDTO';

const mockPokemonRepository = () => ({
  createPokemon: jest.fn(),
  getPokemonByid: jest.fn(),
  updatePokemon: jest.fn(),
  deletePokemon: jest.fn(),
  findPaginated: jest.fn(),
});

describe('PokemonService', () => {
  let service: PokemonService;
  let repository: ReturnType<typeof mockPokemonRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: PokemonRepository, useFactory: mockPokemonRepository },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    repository = module.get(PokemonRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.createPokemon', async () => {
      const dto: PokemonDTO = { name: 'Pikachu', type: 'Electric', height: 4, weight: 60, imageUrl: 'url' };
      const result = { ...dto, id: '1', createdAt: new Date(), updatedAt: new Date() };
      repository.createPokemon.mockResolvedValue(result);
      expect(await service.create(dto)).toEqual(result);
      expect(repository.createPokemon).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOnePokemon', () => {
    it('should return a pokemon if found', async () => {
      const result = { id: '1', name: 'Pikachu', type: 'Electric', height: 4, weight: 60, imageUrl: 'url', createdAt: new Date(), updatedAt: new Date() };
      repository.getPokemonByid.mockResolvedValue(result);
      expect(await service.findOnePokemon('1')).toEqual(result);
    });
    it('should throw if not found', async () => {
      repository.getPokemonByid.mockResolvedValue(null);
      await expect(service.findOnePokemon('2')).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update if found', async () => {
      const dto: PokemonDTO = { name: 'Raichu', type: 'Electric', height: 8, weight: 100, imageUrl: 'url2' };
      const result = { ...dto, id: '1', createdAt: new Date(), updatedAt: new Date() };
      repository.getPokemonByid.mockResolvedValue(result);
      repository.updatePokemon.mockResolvedValue(result);
      expect(await service.update('1', dto)).toEqual(result);
    });
    it('should throw if not found', async () => {
      repository.getPokemonByid.mockResolvedValue(null);
      await expect(service.update('2', { name: '', type: '', height: 0, weight: 0, imageUrl: '' })).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should call repository.deletePokemon', async () => {
      const result = { id: '1', name: 'Pikachu', type: 'Electric', height: 4, weight: 60, imageUrl: 'url', createdAt: new Date(), updatedAt: new Date() };
      repository.deletePokemon.mockResolvedValue(result);
      expect(await service.remove('1')).toEqual(result);
      expect(repository.deletePokemon).toHaveBeenCalledWith('1');
    });
  });

  describe('findPaginated', () => {
    it('should call repository.findPaginated', async () => {
      const query: PaginatedPokemonsDTO = { page: 1, limit: 10 };
      const result = { data: [], total: 0, page: 1, limit: 10, totalPages: 0 };
      repository.findPaginated.mockResolvedValue(result);
      expect(await service.findPaginated(query)).toEqual(result);
      expect(repository.findPaginated).toHaveBeenCalledWith(query);
    });
  });
});

