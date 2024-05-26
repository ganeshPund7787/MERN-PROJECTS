import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  Textarea,
  background,
} from "@chakra-ui/react";
import { LuBellPlus } from "react-icons/lu";

const AddForm = () => {
  const [noteData, setNoteData] = useState("");

  const onChangeStData = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
    console.log(noteData);
  };

  return (
    <Container h={"100vh"} p={["4rem", "0rem"]} mt={"4rem"} w={"100vw"}>
      <HStack justifyContent={"flex-end"}>
        <LuBellPlus size={"20"} title="Add reminder" cursor={"pointer"} />
      </HStack>

      <Box my={"2rem"}>
        <Heading my={"1rem"}>Title :-</Heading>
        <Input
          name="title"
          title="title of the note"
          outline={"none"}
          placeholder="Write a title here..."
          onChange={onChangeStData}
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
          onChange={onChangeStData}
        ></Textarea>
      </Box>

      <HStack justifyContent={"flex-end"} gap={"1rem"} mt={["3rem", "1rem"]}>
        <Button _hover={{ bg: "purple.500" }}>Done</Button>
        <Button _hover={{ bg: "red.500" }}>cancel</Button>
      </HStack>
    </Container>
  );
};

export default AddForm;
