import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { LuBellPlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import useToastMsg from "../Hooks/useToastMsg.js";

const AddForm = () => {
  const [noteData, setNoteData] = useState("");

  const navigate = useNavigate();
  const { showToast } = useToastMsg();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

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

      showToast(data);
      if (data.success === false) return;
      navigate("/");
      return;
    } catch (error) {
      console.log(`Error while add note in form : ${error}`);
      showToast(error);
    }
  };

  const handleReminder = () => {
    console.log(`first`);
    setTimeout(() => {
      console.log(`Working all corect`);
    }, 5000);
    onClose();
  };
  return (
    <Container h={"100vh"} p={["4rem", "0rem"]} mt={"4rem"} w={"100vw"}>
      <form onSubmit={sendData}>
        <HStack justifyContent={"flex-end"}>
          <LuBellPlus
            onClick={onOpen}
            size={"20"}
            title="Add reminder"
            cursor={"pointer"}
          />
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
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set to remind</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Remider Date: </FormLabel>
              <Input
                name="title"
                ref={initialRef}
                type="datetime-local"
                placeholder="enter a reninder date..."
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleReminder}
              type="button"
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AddForm;
