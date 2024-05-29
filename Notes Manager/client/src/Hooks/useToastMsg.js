import { useToast } from "@chakra-ui/react";

const useToastMsg = () => {
    const toast = useToast();

    const showToast = (data) => {
        if (data.success === false) {
            toast({
                title: data.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return { showToast };
        }

        toast({
            title: data.message,
            status: "success",
            duration: 9000,
            isClosable: true,
        });
        return { showToast };
    }
}

export default useToastMsg;