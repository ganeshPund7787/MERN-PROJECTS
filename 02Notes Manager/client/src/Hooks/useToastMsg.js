import { useToast } from "@chakra-ui/react";

const useToastMsg = () => {
    const toast = useToast();

    const showToast = (data) => {
        if (data.success === false) {
            return toast({
                title: data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });

        }
        if (data.success) {
            return toast({
                title: data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }

        return toast({
            title: data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    }
    return { showToast };
}

export default useToastMsg;