import React from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
} from "@chakra-ui/react";
import { FaCheckDouble } from "react-icons/fa6";
import { Select } from "@chakra-ui/react";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container
      border={"2px"}
      maxH={"full"}
      maxW={"full"}
      h={"100vh"}
      w={"100vw"}
    >
      <Heading color={"purple"} p={"3"} textAlign={"center"}>
        MindMatrix
      </Heading>

      <HStack
        flexWrap={"wrap"}
        mt={"3rem"}
        justifyContent={"space-between"}
        color={"white"}
      >
        <HStack>
          <Input
            title="search notes title here.."
            type="text"
            placeholder={"find notes here...."}
          />
          <Button _hover={{ backgroundColor: "purple" }} type="submit">
            search
          </Button>
        </HStack>

        <HStack gap={"3rem"}>
          <Box bgColor={"purple"} p={"2"} rounded={"full"}>
            <FaCheckDouble size={"20"} />
          </Box>
          <Box>
            <Select>
              <option value="option1">List by modified</option>
              <option value="option2">List by time of creation</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
        </HStack>
      </HStack>

      <Link to={"/addNote"}>
        <Button
          variant={"link"}
          rounded={"full"}
          bgColor={"purple"}
          pos={"absolute"}
          bottom={"8"}
          right={"8"}
          title="Add Notes"
        >
          <IoAdd size={"3rem"} />
        </Button>
      </Link>
    </Container>
  );
};

export default Home;
