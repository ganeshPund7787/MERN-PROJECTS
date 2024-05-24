import {
  Avatar,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchFail, fetchStart, fetchSuccess } from "../app/feature/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();

  const onChaneSet = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log(userData);
  };

  const onSubmitHandle = async (e) => {
    try {
      dispatch(fetchStart());
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
      }
      console.log(data);
    } catch (error) {
      console.log(`Error While sign up fetch : ${error}`);
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
            sign Up
          </Button>

          <Text textAlign={"right"}>
            Already sign Up ?{" "}
            <Button variant={"link"} colorScheme="purple">
              <Link to={"/login"}>Login </Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
  );
};

export default Signup;
