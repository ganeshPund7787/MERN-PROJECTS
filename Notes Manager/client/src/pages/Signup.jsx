import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const Signup = () => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const navigate = useNavigate();
  const onChaneSet = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmitHandle = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      console.log(userData);
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        toast({
          title: data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      if (data) {
        setLoading(false);
        toast({
          title: data.message,
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
        return;
      }
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(`Error While sign up fetch : ${error}`);
      toast({
        title: error.message,
        description: "check your internet conection.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={"container.xl"} h={"120vh"} p={"10"}>
      <form onSubmit={onSubmitHandle}>
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
            name="username"
            onChange={onChaneSet}
            type="text"
            placeholder="username"
            required
            focusBorderColor={"purple"}
          />

          <Input
            name="email"
            type="email"
            onChange={onChaneSet}
            placeholder="email"
            required
            focusBorderColor={"purple"}
          />

          <Input
            type="password"
            placeholder="password"
            name="password"
            onChange={onChaneSet}
            required
            focusBorderColor={"purple"}
          />

          <Button colorScheme="purple" type="submit">
            {loading ? "LOADING..." : "sign Up"}
          </Button>

          <hr />
          <Box>
            <OAuth />
          </Box>

          <Text textAlign={"right"}>
            Already sign Up ?{" "}
            <Button variant={"link"} colorScheme="purple">
              <Link to={"/signin"}>Login </Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
  );
};

export default Signup;
