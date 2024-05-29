import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { LuBellPlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import useToastMsg from "../Hooks/useToastMsg.js";

const AddForm = () => {
  const [noteData, setNoteData] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  // const { showToast } = useToastMsg(null);

  const onChangeSetData = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };

  const sendData = async (e) => {
    try {
      e.preventDefault();
      const desc = noteData.desc.trim();

      const res = await fetch("/api/notes/new", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          title: noteData.title,
          desc: desc,
        }),
      });
      const data = await res.json();

      if (data.success === false) {
        toast({
          title: data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return { showToast };
      }

      if (data) {
        toast({
          title: data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
        return;
      }
    } catch (error) {
      console.log(`Error while add note in form : ${error}`);
    }
  };

  return (
    <Container h={"100vh"} p={["4rem", "0rem"]} mt={"4rem"} w={"100vw"}>
      <form onSubmit={sendData}>
        <HStack justifyContent={"flex-end"}>
          <LuBellPlus size={"20"} title="Add reminder" cursor={"pointer"} />
        </HStack>

        <Box my={"2rem"}>
          <Heading my={"1rem"}>Title :-</Heading>
          <Input
            autoFocus
            name="title"
            title="title of the note"
            outline={"none"}
            placeholder="Write a title here..."
            onChange={onChangeSetData}
          />
        </Box>

        <Box>
          <Box fontSize={"1.5rem"} m={"2"}>
            Description:{" "}
          </Box>
          <Textarea
            title="description of the title"
            h={["10rem", "15rem"]}
            name="desc"
            onChange={onChangeSetData}
          ></Textarea>
        </Box>

        <HStack justifyContent={"flex-end"} gap={"1rem"} mt={["3rem", "1rem"]}>
          <Button bgColor={"green"} type="submit">
            Done
          </Button>
          <Link to={"/"}>
            <Button bgColor={"red"} type="button">
              cancle
            </Button>
          </Link>
        </HStack>
      </form>
    </Container>
  );
};

export default AddForm;
