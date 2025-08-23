-- CreateTable
CREATE TABLE "public"."Pokemon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ability" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_PokemonAbilities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PokemonAbilities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "public"."Pokemon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ability_name_key" ON "public"."Ability"("name");

-- CreateIndex
CREATE INDEX "_PokemonAbilities_B_index" ON "public"."_PokemonAbilities"("B");

-- AddForeignKey
ALTER TABLE "public"."_PokemonAbilities" ADD CONSTRAINT "_PokemonAbilities_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Ability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PokemonAbilities" ADD CONSTRAINT "_PokemonAbilities_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
