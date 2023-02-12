import React from 'react'
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const Register = () => {
  return (
      <div style={{marginTop: "3.5rem"}}>
          <Divider>
      <h2 id="">
تسجيل حساب جديد
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
      <div style={{  display: 'flex',
                        flexDirection: 'column', 
                        alignItems: 'stretch'}}>
        غير متاح فى الوقت الحالى .. راسلنا لمعرفة ما يمكن المساعدة به
          {/* <Button variant="contained" sx={{margin:'1rem'}}>ارسال</Button> */}
      </div>
      
    </Box>
    </div>
  )
}

export default Register;