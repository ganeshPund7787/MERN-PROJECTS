import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Img,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import logo from "../assets/logo.jpg";

import { Link, useNavigate } from "react-router-dom";
import { fetchFail, fetchStart, fetchSuccess } from "../app/feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

const Signup = () => {
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const toast = useToast();

  const onChaneSet = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log(userData);
  };

  const onSubmitHandle = async (e) => {
    try {
      dispatch(fetchStart());
      e.preventDefault();
      console.log(userData);
      const res = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(fetchFail());
        toast({
          title: data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      if (data) {
        dispatch(fetchSuccess(data));
        toast({
          title: `WelCome , ${data.username}`,
          description:
            "we hope you will like this app if you have any issue contact  us.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
        return;
      }
    } catch (error) {
      console.log(`Error While sign up fetch : ${error}`);
      dispatch(fetchFail());
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
          my={"24"}
        >
          <VStack p={"3"}>
            <Img rounded={"full"} h={"4rem"} w={"4rem"} src={logo} />
          </VStack>
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
            {loading ? `LOADING...` : `SIGN IN`}
          </Button>

          <hr />
          <Box>
            <OAuth />
          </Box>

          <Text textAlign={"right"}>
            new membar ?{" "}
            <Button variant={"link"} colorScheme="purple">
              <Link to={"/signup"}>Sign up </Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
  );
};

export default Signup;
