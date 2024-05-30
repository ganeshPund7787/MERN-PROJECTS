import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
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
  Stack,
  StackDivider,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlinePushPin } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import useNoteEdit from "../Hooks/useNoteEdit.js";
import useToastMsg from "../Hooks/useToastMsg.js";

const NoteItem = ({ note, refreshData, activeDelete }) => {
  const [updateNote, setUpdateNote] = useState({
    id: note._id,
    title: null,
    desc: null,
  });
  const { showToast } = useToastMsg();
  // model setup
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { editNote } = useNoteEdit();

  const selectHandle = async () => {
    const res = await fetch(`/api/notes/toggle/${note._id}`, {
      method: "PUT",
    });
    const data = await res.json();
    showToast(data);
    console.log("data: ", data);
  };

  const handleChange = (e) => {
    setUpdateNote({ ...updateNote, [e.target.name]: e.target.value });
  };

  const sendHookData = () => {
    onClose();
    const data = editNote(updateNote);
    refreshData();
  };

  const handlePin = async () => {
    const res = await fetch(`/api/notes/pin/${note._id}`, {
      method: "put",
    });
  };

  return (
    <>
      <Card w={"23rem"} border={"2px"} borderColor={"black"}>
        <HStack justifyContent={"flex-end"} h={"14"} gap={"4"} px={"4"}>
          {activeDelete ? (
            <input onChange={selectHandle} type="checkbox" />
          ) : (
            <>
              <MdOutlinePushPin onClick={handlePin} size={"24"} />
              <Button onClick={onOpen}>
                <FiEdit size={"20"} />
              </Button>
            </>
          )}
        </HStack>
        <CardHeader>
          <Heading size="md">{note.title}</Heading>
        </CardHeader>
        <hr />
        <hr />
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs">DESCRIPTION :-</Heading>
              <Box pt="2" fontSize="sm">
                {note.desc}
              </Box>
            </Box>
          </Stack>
        </CardBody>
      </Card>
      {/* // Model
       // for 
       // edit */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>title</FormLabel>
              <Input
                name="title"
                onChange={handleChange}
                ref={initialRef}
                defaultValue={note.title}
                placeholder="update title.."
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description :-</FormLabel>
              <Textarea
                placeholder="Enter some description.."
                name="desc"
                defaultValue={note.desc}
                onChange={handleChange}
              ></Textarea>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Box>
              <Button
                onClick={sendHookData}
                type="submit"
                colorScheme="blue"
                mr={3}
              >
                Save
              </Button>
            </Box>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NoteItem;
