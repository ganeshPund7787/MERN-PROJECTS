import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

import { Link } from "react-router-dom";
import NoteItem from "../components/NoteItem";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";

const Home = () => {
  const [data, setdata] = useState([]);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [query, setQuery] = useState("");
  const [searchArr, setSearchArr] = useState("");

  const toast = useToast();
  const fetchNotes = async () => {
    const res = await fetch("/api/notes/all");
    const data = await res.json();
    setdata(data);
  };

  const handleMultipleDelete = async () => {
    fetchNotes();
    setIsDeleteActive(!isDeleteActive);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    const res = await fetch(`/api/notes/search?title=${query}`, {
      method: "post",
    });
    const data = await res.json();

    if (Array.from(data).length === 0) {
      toast({
        title: "not found",
        description: "This note is not found. Please found the correct title",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setSearchArr(data);
  };

  const sortByUpdate = async () => {
    try {
      const responce = await fetch(`/api/notes/sortByUpdate`);
      const data = await responce.json();
      setdata(data);
    } catch (error) {
      console.log(`Error while sortBy Updated  : ${error}`);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (query === "") setSearchArr([]);
  }, [query]);

  return (
    <Container maxH={"full"} maxW={"full"} w={"100vw"}>
      <Heading color={"purple.500"} p={"2"} mt={"1rem"} textAlign={"center"}>
        MindMatrix
      </Heading>

      <HStack
        flexWrap={"wrap"}
        mt={"3rem"}
        justifyContent={"space-between"}
        color={"white"}
      >
        <form onSubmit={handleSearch}>
          <HStack>
            <Input
              title="search notes title here.."
              type="text"
              placeholder={"find notes here...."}
              value={query}
              required
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button _hover={{ backgroundColor: "purple.500" }} type="submit">
              search
            </Button>
          </HStack>
        </form>

        <HStack gap={"3rem"}>
          <Menu>
            <MenuButton as={Button}>sort by</MenuButton>
            <MenuList>
              <MenuItem onClick={() => fetchNotes()}>created at</MenuItem>
              <MenuItem onClick={sortByUpdate}>updated at</MenuItem>
            </MenuList>
          </Menu>
          <Box bgColor={"purple.500"} p={"2"} rounded={"full"}>
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

      <Container maxH={"full"} maxW={"full"}>
        <Container maxH={"full"} maxW={"full"}>
          <HStack
            flexWrap={"wrap"}
            gap={"4"}
            justifyContent={"space-evenly"}
            p={"5"}
          >
            {data?.map((i) => {
              if (i.isDelete === true || i.isPin === false) return true;
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

        {searchArr.length === 0 || query === "" ? (
          <Container maxH={"full"} maxW={"full"} p={"2"}>
            <HStack
              flexWrap={"wrap"}
              gap={"4"}
              p={"5"}
              justifyContent={"space-evenly"}
            >
              {data?.map((i) => {
                if (i.isDelete === true || i.isPin === true) return true;
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
        ) : (
          <Container>
            {searchArr?.map((i) => {
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
          </Container>
        )}
      </Container>

      <Link to={"/addNote"}>
        <Button
          variant={"link"}
          rounded={"full"}
          bgColor={"purple.500"}
          pos={"fixed"}
          top={["90vh", "86vh"]}
          right={"12"}
          title="Add Notes"
        >
          <IoIosAddCircleOutline size={"3rem"} />
        </Button>
      </Link>
    </Container>
  );
};

export default Home;
