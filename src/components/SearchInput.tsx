import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
  return (
    <div>
      <Box>
          <InputGroup>
          <InputLeftElement children={<BsSearch />} />
            <Input
              borderRadius={20}
              placeholder="Search Games here..."
              variant="filled"
            />
          </InputGroup>
      </Box>
    </div>
  );
};

export default SearchInput;
