// ../hooks/useLoginUser.ts

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginUserRequest } from "../types";

export type LoginFormValues = LoginUserRequest;

export const useLoginUser = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  return { serverError };
};