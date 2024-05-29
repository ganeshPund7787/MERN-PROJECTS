import React, { useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { setRecycleArr, unChecked } from "../app/feature/recycleSlice";
import { FaTrashRestore } from "react-icons/fa";
import { useDispatch } from "react-redux";

const RecycleNotItem = ({ note, refreshData, Active }) => {
  const dispatch = useDispatch();

  const restoreNotes = async () => {
    const res = await fetch(`/api/notes/toggle/${note._id}`, {
      method: "PUT",
    });
    const data = await res.json();
    refreshData();
    console.log("data: ", data);
  };

  return (
    <Card w={"23rem"} border={"2px"} borderColor={"black"}>
      <HStack justifyContent={"flex-end"} bgColor={"gray"} gap={"2"} p={"2"}>
        {Active ? (
          <input
            onChange={() => dispatch(setRecycleArr(note._id))}
            type="checkbox"
          />
        ) : (
          <FaTrashRestore onClick={restoreNotes} size={"22"} />
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

export default RecycleNotItem;
