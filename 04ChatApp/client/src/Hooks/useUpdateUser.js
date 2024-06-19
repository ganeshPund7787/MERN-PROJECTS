import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContex } from "../context/AuthContext";


const useUpdateUser = () => {

    const [loading, setLoading] = useState(false)
    const { authUser } = useAuthContex()

    const updateUser = async (userData, imageUrl = "") => {
        try {
            const res = await fetch(`/api/users/user-update/${authUser._id}`);
            console.log(userData, imageUrl)
        } catch (error) {
            toast.error(error.message)
        }
        return
    }
    return { updateUser }
}

export default useUpdateUser;