import { Box, Button, Container, HStack, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import RecycleNotItem from "../components/RecycleNotItem";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import useToastMsg from "../Hooks/useToastMsg.js";

const RecycleBin = () => {
  const [notes, setNotes] = useState([]);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const { recycleArr } = useSelector((state) => state.recyle);
  const { showToast } = useToastMsg();

  const getAllUser = async () => {
    try {
      const res = await fetch("/api/notes/all");
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.log(`Wrror while getAlll User : ${error}`);
    }
  };

  const handleMultipleDelete = async () => {
    try {
      const res = await fetch("/api/notes/deleteArr", {
        method: "post",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          deleteArr: recycleArr,
        }),
      });
      const data = await res.json();
      getAllUser();
      showToast(data);
      setIsDeleteActive(!isDeleteActive);
    } catch (error) {
      console.log(`Error while delete multiple user: ${error}`);
      showToast(error);
    }
  };

  useEffect(() => {
    getAllUser();
    return () => {};
  }, []);

  return (
    <Container py={"65"} maxH={"full"} maxW={"full"} w={"100vw"}>
      <Box
        className="text-3xl text-indigo-500 text-bo"
        fontSize={"2rem"}
        textAlign={"center"}
      >
        Recycle Bin
      </Box>
      <HStack m={"5"} justifyContent={"flex-end"}>
        {isDeleteActive ? (
          <MdDelete onClick={handleMultipleDelete} size={"20"} />
        ) : (
          <BiSolidSelectMultiple
            onClick={() => setIsDeleteActive(!isDeleteActive)}
          />
        )}
      </HStack>
      <HStack w={"100vw"} flexWrap={"wrap"} justifyContent={"center"} gap={"5"}>
        {notes.length ? (
          notes.map((note) => {
            if (note.isDelete === false) {
              return null;
            }
            return (
              <RecycleNotItem
                key={note._id}
                note={note}
                refreshData={getAllUser}
                Active={isDeleteActive}
              />
            );
          })
        ) : (
          <Heading>Emty</Heading>
        )}
      </HStack>
    </Container>
  );
};

export default RecycleBin;
