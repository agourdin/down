import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { DownError, DownErrorCode } from "../../utils/errors";
import { validEmails, validPasswords } from "../../utils/validators";

/**
 * a hook for authentication state variables and handlers.
 */
export const useAuthenticate = () => {
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState("");

  /**
   * handles signing a user up including setting any validation errors.
   * creates a new user with email and password if no errors.
   */
  const handleSignUpByEmail = async () => {
    try {
      if (validEmails(email, email) && validPasswords(password, password2)) {
        return await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      let code: DownErrorCode = error.code;
      let NewDownError = new DownError(code);
      setErrors(NewDownError.message);
    }
  };

  return {
    email,
    setEmail,
    email2,
    setEmail2,
    password,
    setPassword,
    password2,
    setPassword2,
    errors,
    setErrors,
    handleSignUpByEmail,
  };
};
