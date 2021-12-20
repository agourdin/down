import { DocumentData } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";
import { DownErrorMessages } from "../../utils/errors";
import { validName, validIcon } from "../../utils/validators";

/**
 * handles incoming errors and sets the proper error messages based on
 * code.
 *
 * @param error a DownError or FirestoreError with code and message.
 * @returns `void`
 */
export const handleErrors = (
  error: any,
  errors: any,
  setErrors: Dispatch<SetStateAction<any>>
) => {
  const code = error.code;
  const msg = error.message;
  if (code) {
    if (code.match(/.*name.*/)) {
      return setErrors({ ...errors, nameError: msg });
    }
    if (code.match(/.*icon.*/)) {
      return setErrors({ ...errors, iconError: msg });
    }
  }
  return setErrors({
    ...errors,
    iconError: DownErrorMessages["internal-error"],
  });
};

/**
 * hook for using and editing a name and icon.
 *
 * @returns an object.
 */
export const useNameAndIcon = (
  data?: Data<DocumentData, "", ""> | undefined
) => {
  const emptyErrors = {
    nameError: "",
    iconError: "",
  };

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [errors, setErrors] = useState(emptyErrors);

  useEffect(() => {
    // clear name errors when name is edited
    setErrors({ ...errors, nameError: "" });
  }, [name]);

  useEffect(() => {
    // clear icon errors when icon is edited
    setErrors({ ...errors, iconError: "" });
  }, [icon]);

  useEffect(() => {
    setName(data?.name ?? "");
    setIcon(data?.icon ?? "");
  }, [data]);

  const validateNameAndIcon = () => {
    try {
      return validName(name) && validIcon(icon);
    } catch (error: any) {
      handleErrors(error, errors, setErrors);
      return false;
    }
  };

  return {
    name,
    setName,
    icon,
    setIcon,
    errors,
    setErrors,
    validateNameAndIcon,
  };
};
