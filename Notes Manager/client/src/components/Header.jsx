import logo from "../assets/logo.jpg";
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
  HStack,
  Img,
  Box,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { useSelector } from "react-redux";
import { MdLightbulb } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <Button
        zIndex={"overlay"}
        pos={"fixed"}
        top={"4"}
        left={"4"}
        bgColor={"purple.600"}
        p={"0"}
        w={"10"}
        h={"10"}
        borderRadius={"full"}
        onClick={onOpen}
      >
        <BiMenuAltLeft size={"20"} />
      </Button>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <HStack w={"full"} alignItems={"flex-start"}>
              {currentUser ? (
                <VStack>
                  <HStack onClick={onClose} mt={"1rem"}>
                    <Link onClick={onClose} to={"/profile"}>
                      <Img
                        mx={"2"}
                        src={currentUser.profileImage}
                        rounded={"full"}
                        h={"12"}
                      />
                    </Link>
                    <Link to={"profile"}>
                      <Box fontSize={"1rem"} p={"1.1rem"}>
                        {currentUser.username}
                      </Box>
                    </Link>
                  </HStack>
                  <VStack alignItems={"flex-start"} mt={"2rem"}>
                    <Button
                      onClick={onClose}
                      variant={"ghost"}
                      colorScheme="purple"
                    >
                      <Link to={"/"}>
                        {" "}
                        <HStack>
                          <MdLightbulb />
                          <Text> All Notes </Text>
                        </HStack>
                      </Link>
                    </Button>

                    <Button
                      onClick={onClose}
                      variant={"ghost"}
                      colorScheme="purple"
                    >
                      <Link to={"/videos?category=free"}>
                        <HStack>
                          <FaBell /> <Text>Reminders</Text>
                        </HStack>
                      </Link>
                    </Button>

                    <Button
                      onClick={onClose}
                      variant={"ghost"}
                      colorScheme="purple"
                    >
                      <Link to={"/recyclebin"}>
                        <HStack>
                          <MdDelete /> <Text>Recycal bin</Text>
                        </HStack>
                      </Link>
                    </Button>
                  </VStack>
                </VStack>
              ) : (
                <HStack justifyContent={"center"} mt={"2"} w={"full"}>
                  <Button
                    alignItems={"center"}
                    onClick={onClose}
                    colorScheme={"purple"}
                  >
                    <Link to={"/signin"}>sign in </Link>
                  </Button>
                </HStack>
              )}
            </HStack>
          </DrawerBody>

          <HStack p={"3"}>
            <Img rounded={"full"} h={"4rem"} w={"4rem"} src={logo} />
            <DrawerHeader fontSize={["2rem", "2rem"]}>MindMatrix</DrawerHeader>
          </HStack>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
