import React, {useState} from 'react'
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSignUp } from "./useSignUp";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import LinearProgress from '@mui/material/LinearProgress';
const Sign = () => {
  const { signUp, isLoding, signError , signMsg } = useSignUp();
   const [msg, setMsg] = useState("");
  const [open, setOpen] = React.useState(false);
const [successOpen, setSuccessOpen] = React.useState(false);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
setOpen(false);
  };
  const handleSuccessClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setSuccessOpen(false);
  };
  const [signData, setSignData] = useState({
    res_email: "",
    res_password: "",
    sign_date: "",
    sign_time: "",
  });

  const handleChange = ({ target }: any) => {
    setSignData({ ...signData, [target.name]: target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!signData.res_email || !signData.res_password) {
      setMsg( "برجاء ادخال البريد الالكترونى والرقم السري بشكل صحيح");
      setOpen(true);
      return;
    }
    signData.sign_date = new Date().toLocaleDateString();
    signData.sign_time = new Date().toLocaleTimeString();
    await signUp(signData);
    return;
  };
  return (
    <>
    {
        isLoding?  <LinearProgress style={{marginBottom: "1rem"}}/> : ""
    }
    <div style={{marginTop: "3.5rem"}}>
      <Snackbar open={open || signError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {msg || signMsg}
        </Alert>
    </Snackbar>
    <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleSuccessClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {msg}
        </Alert>
    </Snackbar>
        <Divider>
        <h2 id="">
    تسجيل الدخول
        </h2>
        </Divider>
           <Box
      component="form"
      sx={{
        width: "270px",
        textAlign: "right", 
        margin: "3rem auto 4rem auto",
        '& .MuiTextField-root': { m: 1, },
      }}
    >
    <div style={{           
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'stretch'}}>
        <TextField
          required
          id="outlined"
          label="البريد الالكترونى"
          type="email"
          name="res_email"
          onChange={handleChange}
          autoFocus

        />
        <TextField
        required
          id="outlined-password-input"
          label="الرقم السرى"
          type="password"
          name="res_password"
          onChange={handleChange}
          autoComplete="current-password"
        />
          <Button variant="contained" sx={{margin:'1rem'}} onClick={handleSubmit}>تأكيد</Button>
      </div>
      
    </Box>
    </div>
  </>
  )
}

export default Sign;