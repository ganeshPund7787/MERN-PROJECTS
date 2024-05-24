import {
  Avatar,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <Container maxW={"container.xl"} h={"120vh"} p={"10"}>
      <form action="">
        <VStack
          alignItems={"stretch"}
          spacing={"8"}
          w={["full", "96"]}
          m={"auto"}
          my={"16"}
        >
          <Heading textAlign={"center"}> MindMatrix </Heading>
          <Avatar alignSelf={"center"} boxSize={"32"} />

          <Input
            name="email"
            type="email"
            placeholder="email"
            required
            focusBorderColor={"cyan.800"}
          />

          <Input
            type="password"
            placeholder="password"
            name="password"
            required
            focusBorderColor={"cyan.800"}
          />

          <Button colorScheme="cyan" type="submit">
            sign Up
          </Button>

          <Text textAlign={"right"}>
            Already sign Up ?{" "}
            <Button variant={"link"} colorScheme="cyan">
              <Link to={"/login"}>Login </Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
  );
};

export default Signup;
