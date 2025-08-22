import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Tipos para la respuesta de la PokéAPI
type PokemonListResponse = {
  results: { name: string; url: string }[];
};

type PokemonDetails = {
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  sprites: { front_default: string };
};

async function main() {
  console.log('🌱 Starting Pokémon seed...');

  // Import dinámico de fetch
  const fetch = (await import('node-fetch')).default;

  // Limpiar datos existentes
  await prisma.pokemon.deleteMany({});
  await prisma.ability.deleteMany({});

  // Traer los primeros 30 pokemones de la PokéAPI
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
  const data = (await res.json()) as PokemonListResponse;

  for (const poke of data.results) {
    // Traer los detalles de cada pokemon
    const pokeDetailsRes = await fetch(poke.url);
    const pokeDetails = (await pokeDetailsRes.json()) as PokemonDetails;

    // Mapear tipos
    const type = pokeDetails.types.map((t) => t.type.name).join(', ');

    // Mapear habilidades
    const abilities = pokeDetails.abilities.map((a) => a.ability.name);

    // Crear habilidades en DB si no existen
    const abilityRecords: { id: string; name: string }[] = [];
    for (const abilityName of abilities) {
      const ability = await prisma.ability.upsert({
        where: { name: abilityName },
        update: {},
        create: { name: abilityName },
      });
      abilityRecords.push(ability);
    }

    // Crear Pokémon y asociarle sus habilidades
    const pokemon = await prisma.pokemon.create({
      data: {
        name: pokeDetails.name,
        type,
        height: pokeDetails.height,
        weight: pokeDetails.weight,
        imageUrl: pokeDetails.sprites.front_default,
        abilities: {
          connect: abilityRecords.map((a) => ({ id: a.id })),
        },
      },
    });

    console.log(`✅ Created Pokémon: ${pokemon.name}`);
  }

  const totalPokemons = await prisma.pokemon.count();
  const totalAbilities = await prisma.ability.count();
  console.log(`🎉 Seed completed! Created ${totalPokemons} pokemons and ${totalAbilities} abilities.`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
