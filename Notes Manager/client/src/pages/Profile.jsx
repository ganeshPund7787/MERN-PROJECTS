import {
  Avatar,
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
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  logoutUser,
  toggleEdit,
  fetchSuccess,
} from "../app/feature/userSlice";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Profile = () => {
  const { currentUser, isUpdate } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const toast = useToast();
  const handleOnChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    try {
      const userConfirmed = confirm(
        "Are you sure you want to delete your profile?"
      );
      if (!userConfirmed) {
        toast({
          title: "Error while logout useer",
          description: "You calcel logout.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const responce = await fetch(`/api/user/${currentUser._id}`, {
        method: "delete",
      });
      const data = await responce.json();
      if (data.success === false) {
        toast({
          title: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (data) {
        toast({
          title: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch(deleteUser());
        navigate("/");
        return;
      }
    } catch (error) {
      console.log(`Error while delete user : ${error}`);
      toast({
        title: error.message,
        description: "check your internet conection.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogout = async () => {
    try {
      const userConfirmed = confirm(
        "Are you sure you want to logout your profile?"
      );
      if (!userConfirmed) {
        toast({
          title: "Error while logout useer",
          description: "You cancel logout.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const responce = await fetch(`/api/user/logout`);

      const data = await responce.json();

      if (data.success === false) {
        toast({
          title: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (data) {
        toast({
          title: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch(logoutUser());
        navigate("/");
      }
    } catch (error) {
      console.log(`Error while logout user : ${error}`);
      toast({
        title: data.message,
        description: "check your internet conection.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const updateHandle = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch(`/api/user/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (data.success === false) {
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
          title: `User update successfully`,
          description:
            "Your all profile information are updated successfuly. on Update",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        dispatch(toggleEdit());
        navigate("/profile");
        return;
      }
      dispatch(toggleEdit());
    } catch (error) {
      console.log(`Error while updating User profile : ${error}`);
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
      {isUpdate ? (
        <div>
          <form onSubmit={updateHandle}>
            <VStack
              alignItems={"stretch"}
              spacing={"8"}
              h={["80vh", "100vh"]}
              justify={"center"}
              w={["full", "96"]}
              my={"16"}
              m={"auto"}
            >
              <Heading fontSize={"1.6rem"} textAlign={"center"}>
                {" "}
                Update Profile{" "}
              </Heading>
              <Input
                name="username"
                type="text"
                placeholder="New username"
                onChange={handleOnChange}
              />

              <Input
                readOnly
                value={currentUser.email}
                opacity={"0.7"}
                title="You cannot update your email"
              />

              <Input
                name="password"
                type="text"
                placeholder="new password..."
                onChange={handleOnChange}
              />

              <HStack justifyContent={"space-between"}>
                <Button
                  type="button"
                  onClick={() => dispatch(toggleEdit())}
                  bgColor={"red"}
                >
                  cancel
                </Button>
                <Button type="submit" bgColor={"green"}>
                  save
                </Button>
              </HStack>
            </VStack>
          </form>
        </div>
      ) : (
        <div>
          <VStack
            alignItems={"stretch"}
            spacing={"8"}
            w={["full", "96"]}
            m={"auto"}
            my={"16"}
          >
            <Avatar
              src={currentUser.profileImage}
              alignSelf={"center"}
              boxSize={"32"}
            />
            <Input
              value={currentUser.username}
              color={"black"}
              bgColor={"purple.600"}
              textColor={"white"}
              readOnly
            />

            <Input
              color={"black"}
              value={currentUser.email}
              bgColor={"purple.600"}
              textColor={"white"}
              readOnly
            />

            <Button
              bgColor={"purple"}
              type="button"
              _hover={{ bg: "purple.300" }}
              textColor={"white"}
              onClick={() => dispatch(toggleEdit())}
            >
              Update
            </Button>

            <HStack justifyContent={"space-between"}>
              <Button onClick={handleDelete} _hover={{ bg: "purple.500" }}>
                Delete Account
              </Button>
              <Button onClick={handleLogout} _hover={{ bg: "purple.500" }}>
                Logout
              </Button>
            </HStack>
          </VStack>
        </div>
      )}
    </Container>
  );
};

export default Profile;
