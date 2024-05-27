import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { useNavigate } from "react-router-dom";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <HStack padding="10px">
      <Image 
        src={logo} 
        boxSize="60px" 
        onClick={handleLogoClick} 
        cursor="pointer"
        alt="Logo"
      />
      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
