import axios from "axios";
import { useState } from "react";
export const useSignUp = () => {
  const [isLoding, setISLoding] = useState(false);
  const [signError, setSignError] = useState(false);
  const [signMsg, setSignMsg] = useState("")
  const signUp = async (resData : any) => {
    setISLoding(true);
    await axios
      .post(`/api/sign-responsible`, {
        resData,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("res-id", response.data.responsibele_ID);
        sessionStorage.setItem("token", response.data.token);
        setISLoding(false);
        window.location.href = response.data.nextUrl;
      })
      .catch((err) => {
        console.log(err);
        setSignMsg(err.response && err.response.data ? err.response.data.message ?  err.response.data.message : err.response.data: err.message)
        setISLoding(false);
        setSignError(true);
      });
  };
  return { signUp, isLoding ,signError , signMsg};
};
