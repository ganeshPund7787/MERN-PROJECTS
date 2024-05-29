import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { Select } from "@chakra-ui/react";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import NoteItem from "../components/NoteItem";
import { BiSolidSelectMultiple } from "react-icons/bi";

const Home = () => {
  const [data, setdata] = useState([]);
  const [isDeleteActive, setIsDeleteActive] = useState(false);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes/all");
    const data = await res.json();
    setdata(data);
  };

  const handleMultipleDelete = async () => {
    const deleteArr = data.filter((note) => note.isDelete === true);
    console.log("deleteArr : ", deleteArr);

    fetchNotes();
    setIsDeleteActive(!isDeleteActive);
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <Container maxH={"full"} maxW={"full"} w={"100vw"}>
      <Heading color={"purple"} p={"3"} textAlign={"center"}>
        MindMatrix
      </Heading>

      <HStack
        flexWrap={"wrap"}
        mt={"3rem"}
        justifyContent={"space-between"}
        color={"white"}
      >
        <HStack>
          <Input
            title="search notes title here.."
            type="text"
            placeholder={"find notes here...."}
          />
          <Button _hover={{ backgroundColor: "purple" }} type="submit">
            search
          </Button>
        </HStack>

        <HStack gap={"3rem"}>
          <Box>
            <Select>
              <option value="option1">List by modified</option>
              <option value="option2">List by time of creation</option>
            </Select>
          </Box>
          <Box bgColor={"purple"} p={"2"} rounded={"full"}>
            {isDeleteActive ? (
              <MdDelete onClick={handleMultipleDelete} size={"20"} />
            ) : (
              <BiSolidSelectMultiple
                onClick={() => setIsDeleteActive(!isDeleteActive)}
              />
            )}
          </Box>
        </HStack>
      </HStack>

      <Container maxH={"full"} maxW={"full"} p={"2"}>
        <HStack flexWrap={"wrap"} gap={"4"} justifyContent={"center"} p={"5"}>
          {data?.map((i) => {
            if (i.isDelete) return true;
            return (
              <NoteItem
                key={i._id}
                note={i}
                refreshData={fetchNotes}
                activeDelete={isDeleteActive}
              />
            );
          })}
        </HStack>
      </Container>
      <Link to={"/addNote"}>
        <Button
          variant={"link"}
          rounded={"full"}
          bgColor={"purple"}
          pos={"fixed"}
          top={["90vh", "86vh"]}
          right={"12"}
          title="Add Notes"
        >
          <IoAdd size={"3rem"} />
        </Button>
      </Link>
    </Container>
  );
};

export default Home;
