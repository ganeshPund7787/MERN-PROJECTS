import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { MdOutlinePushPin } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import EditModel from "../components/EditModel";

const NoteItem = ({ note, refreshData, activeDelete }) => {
  const selectHandle = async () => {
    const res = await fetch(`/api/notes/toggle/${note._id}`, {
      method: "PUT",
    });
    const data = await res.json();
    console.log("data: ", data);
  };

  return (
    <Card w={"23rem"} border={"2px"} borderColor={"black"}>
      <HStack justifyContent={"flex-end"} bgColor={"gray"} gap={"2"} p={"2"}>
        {activeDelete ? (
          <input onChange={selectHandle} type="checkbox" />
        ) : (
          <>
            <MdOutlinePushPin size={"24"} />
            <FiEdit size={"20"} />
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
  );
};

export default NoteItem;
