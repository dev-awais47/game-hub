import { useEffect, useState } from "react";
import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import PlatformSelector from "./components/PlatformSelector";
import { Genre } from "./hooks/useGenres";
import { Platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";
import useQueryState from "./hooks/useQueryState";
import useGenres from "./hooks/useGenres";
import usePlatforms from "./hooks/usePlatforms";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const { getQuery, setQuery } = useQueryState();
  const { data: genres } = useGenres();
  const { data: platforms } = usePlatforms();

  const [gameQuery, setGameQuery] = useState<GameQuery>({
    genre: null,
    platform: null,
    sortOrder: getQuery("sortOrder") || "",
    searchText: getQuery("searchText") || "",
  });

  useEffect(() => {
    const genreId = getQuery("genre");
    const platformId = getQuery("platform");

    const selectedGenre = genres.find((g) => g.id === Number(genreId)) || null;
    const selectedPlatform = platforms.find((p) => p.id === Number(platformId)) || null;

    setGameQuery({
      genre: selectedGenre,
      platform: selectedPlatform,
      sortOrder: getQuery("sortOrder") || "",
      searchText: getQuery("searchText") || "",
    });
  }, [getQuery, genres, platforms]);

  const handleSearch = (searchText: string) => {
    setQuery("searchText", searchText);
    setGameQuery((prev) => ({ ...prev, searchText }));
  };

  const handleSelectGenre = (genre: Genre) => {
    setQuery("genre", genre.id.toString());
    setGameQuery((prev) => ({ ...prev, genre }));
  };

  const handleSelectPlatform = (platform: Platform) => {
    setQuery("platform", platform.id.toString());
    setGameQuery((prev) => ({ ...prev, platform }));
  };

  const handleSelectSortOrder = (sortOrder: string) => {
    setQuery("sortOrder", sortOrder);
    setGameQuery((prev) => ({ ...prev, sortOrder }));
  };

  return (
    <>
      <Grid
        templateAreas={{
          base: ` "nav" "main" `,
          lg: ` "nav nav" "aside main" `,
        }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
      >
        <GridItem area="nav">
          <NavBar onSearch={handleSearch} />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" paddingX={3}>
            <GenreList
              selectedGenre={gameQuery.genre}
              onSelectGenre={handleSelectGenre}
            />
          </GridItem>
        </Show>
        <GridItem area="main">
          <Box paddingLeft={10}>
            <GameHeading gameQuery={gameQuery} />
            <HStack spacing={5}>
              <PlatformSelector
                selectedPlatform={gameQuery.platform}
                onSelectPlaform={handleSelectPlatform}
              />
              <SortSelector
                sortOrder={gameQuery.sortOrder}
                onSelectSortOrder={handleSelectSortOrder}
              />
            </HStack>
          </Box>
          <GameGrid gameQuery={gameQuery} />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
