import React, { useState } from 'react'
import { toast } from "react-hot-toast"

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);

    const SignUp = async ({ ...formData }) => {
        const success = handleInputError({ ...formData });
        if (!success) return;
    }
}

function handleInputError({ ...formData }) {
    if (!fullname.trim() || !username.trim() || !password.trim() || !confirmPassword.trim() || !gender.trim() === '') {
        toast.error("Please fill all the field");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Password do not match");
        return false;
    }


}
