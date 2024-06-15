import React from "react";
import { fetchFail, fetchStart, fetchSuccess } from "../app/feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, useToast } from "@chakra-ui/react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      dispatch(fetchStart());
      const Provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, Provider);
      const user = result.user;
      console.log(user);
      const res = await fetch("/api/user/googleAuth", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          username: user.displayName,
          email: user.email,
          profileImage: user.photoURL,
        }),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(fetchFail());
        toast({
          title: data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      if (data) {
        dispatch(fetchSuccess(data));
        toast({
          title: `WelCome , ${data.username}`,
          description:
            "we hope you will like this app if you have any issue contact  us.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
        return;
      }
    } catch (error) {
      console.log(`Error While sign up fetch : ${error}`);
      dispatch(fetchFail());
      toast({
        title: error.message,
        description: "check your internet conection.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
  };
  return (
    <Button
      type={"button"}
      onClick={handleClick}
      colorScheme="green"
      w={"full"}
    >
      {loading ? `LOADING...` : `continue  with google`}
    </Button>
  );
};

export default OAuth;
