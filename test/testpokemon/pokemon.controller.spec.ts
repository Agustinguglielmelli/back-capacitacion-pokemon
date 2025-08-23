import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from '../../src/pokemon/pokemon.controller';
import { PokemonService } from '../../src/pokemon/pokemon.service';
import { PokemonDTO } from '../../src/pokemon/dto/pokemonDTO';
import { PaginatedPokemonsDTO } from '../../src/pokemon/dto/paginatedPokemonsDTO';

const mockPokemonService = () => ({
  findPaginated: jest.fn(),
  create: jest.fn(),
  findOnePokemon: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: ReturnType<typeof mockPokemonService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        { provide: PokemonService, useFactory: mockPokemonService },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get(PokemonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findPaginated', () => {
    it('should call service.findPaginated', async () => {
      const query: PaginatedPokemonsDTO = { page: 1, limit: 10 };
      const result = { data: [], total: 0, page: 1, limit: 10, totalPages: 0 };
      service.findPaginated.mockResolvedValue(result);
      expect(await controller.findPaginated(query)).toEqual(result);
      expect(service.findPaginated).toHaveBeenCalledWith(query);
    });
  });

  describe('create', () => {
    it('should call service.create', async () => {
      const dto: PokemonDTO = { name: 'Pikachu', type: 'Electric', height: 4, weight: 60, imageUrl: 'url' };
      const result = { ...dto, id: '1', createdAt: new Date(), updatedAt: new Date() };
      service.create.mockResolvedValue(result);
      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOne', () => {
    it('should call service.findOnePokemon', async () => {
      const result = { id: '1', name: 'Pikachu', type: 'Electric', height: 4, weight: 60, imageUrl: 'url', createdAt: new Date(), updatedAt: new Date() };
      service.findOnePokemon.mockResolvedValue(result);
      expect(await controller.findOne('1')).toEqual(result);
      expect(service.findOnePokemon).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should call service.update', async () => {
      const dto: PokemonDTO = { name: 'Raichu', type: 'Electric', height: 8, weight: 100, imageUrl: 'url2' };
      const result = { ...dto, id: '1', createdAt: new Date(), updatedAt: new Date() };
      service.update.mockResolvedValue(result);
      expect(await controller.update('1', dto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should call service.remove', async () => {
      const result = { id: '1', name: 'Pikachu', type: 'Electric', height: 4, weight: 60, imageUrl: 'url', createdAt: new Date(), updatedAt: new Date() };
      service.remove.mockResolvedValue(result);
      expect(await controller.remove('1')).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});

