import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";


const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/messages/`);
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
    }, [])
}

export default useGetMessages