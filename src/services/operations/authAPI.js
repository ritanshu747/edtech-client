export function signUp(
    accountType, 
    firstName, 
    lastName, 
    email, 
    password,
    confirmPassword, 
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{ 
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })

            console.log("SIGNUP API RESPONSE...........", response)
            
            if(!response.data.success) {
                if (response.data.message === "User already exists") {
                    toast.error("You are already registered. Please login instead.")
                    navigate("/login")
                } else {
                    throw new Error(response.data.message)
                }
            } else {
                toast.success("Signup Successful")
                navigate("/login")
            }

        } catch(error) {
            console.log("SIGNUP API ERROR.............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function resetPassword(password, confirmPassword, token) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });

            console.log("RESET Password RESPONSE ... ", response);

            if(!response.data.success) {
                if (response.data.message === "User not found") {
                    toast.error("You are not registered with us. Please sign up.")
                } else {
                    throw new Error(response.data.message);
                }
            } else {
                toast.success("Password Has Been Reset Successfully");
            }
        }
        catch(error) {
            console.log("RESET PASSWORD TOKEN Error............", error);
            toast.error("Unable To Reset Password");
        }
        dispatch(setLoading(false));
    }
}
