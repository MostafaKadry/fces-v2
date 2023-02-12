import React from 'react'
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// const MostafaKadry = require("../images/mostafa-kadry.jpg");


const AllRes = () => {
  return (
    <div style={{textAlign: 'center',}}>
      <div  style={{textAlign: 'center', margin: '1em'}}>
        <h2 style={{margin: '5px'}}>
            فريق العمل
      </h2>
        <Divider>
     </Divider>
      </div>
     <div style={{margin: '3rem 0 3rem 0'}}>
    <Divider>
      <h3 id="about">
        اعضاء مجلس الادارة
      </h3>
     </Divider>
 <Stack direction="row" spacing={2} sx={{margin: "2rem 0 1rem 0"}} justifyContent= "center">
  <Stack direction="column" spacing={2} alignItems="center">
      <Avatar alt='مصطفى قدرى' />
      <h4>مصطفى قدرى</h4>
  </Stack>
    <Stack direction="column" spacing={2} alignItems="center">
   <Avatar alt='مدحت القاضى' />
      <h4> مدحت القاضى</h4>
  </Stack>
    <Stack direction="column" spacing={2} alignItems="center">
      <Avatar alt='وليد عبدالناصر' />
      <h4> وليد عبدالناصر</h4>
  </Stack>
    <Stack direction="column" spacing={2} alignItems="center">
<Avatar alt='معتصم مسعود' />
      <h4>معتصم مسعود</h4>
  </Stack>
    </Stack>
     </div>

          <div style={{margin: '3rem 0 3rem 0'}}>
    <Divider>
      <h3 id="about">
        فريق جمع التبرعات
      </h3>
     </Divider>
 <Stack direction="row" spacing={2} sx={{margin: "2rem 0 1rem 0"}} justifyContent= "center">
  <Stack direction="column" spacing={2} alignItems="center">
      <Avatar alt='مصطفى قدرى' />
      <h4>مصطفى قدرى</h4>
          <Typography variant="caption" display="block" gutterBottom>
        جمع يدويا
      </Typography>
  </Stack>
    <Stack direction="column" spacing={2} alignItems="center">
   <Avatar alt='مدحت القاضى' />
      <h4> مدحت القاضى</h4>
          <Typography variant="caption" display="block" gutterBottom>
        فودافون كاش
      </Typography>
           <Typography variant="caption" display="block" sx={{margin: "0 !important"}}>
     01016126167
      </Typography>

  </Stack>
    <Stack direction="column" spacing={2} alignItems="center">
      <Avatar alt='وليد عبدالناصر' />
      <h4> وليد عبدالناصر</h4>
          <Typography variant="caption" display="block" gutterBottom>
        جمع يدويا
      </Typography>
  </Stack>
    <Stack direction="column" spacing={2} alignItems="center">
<Avatar alt='معتصم مسعود' />
      <h4>معتصم مسعود</h4>
          <Typography variant="caption" display="block" gutterBottom>
        جمع يدويا
      </Typography>
  </Stack>
    </Stack>
    <Stack direction="row" spacing={2} sx={{margin: "2rem 0 1rem 0"}} justifyContent= "center">
  <Stack direction="column" spacing={2} alignItems="center">
      <Avatar alt='مصطفى خالد' />
      <h4>مصطفى خالد</h4>
          <Typography variant="caption" display="block" gutterBottom>
        جمع يدويا
      </Typography>
  </Stack>
    <Stack direction="column" spacing={2} alignItems="center">
   <Avatar alt='ابراهيم محمود ' />
      <h4> ابراهيم محمود</h4>
      <Typography variant="caption" display="block" gutterBottom>
        جمع يدويا
      </Typography>
  </Stack>
    <Stack direction="column" spacing={2} alignItems="center">
      <Avatar alt='يسرا الطيب ' />
      <h4> يسرا الطيب </h4>
          <Typography variant="caption" display="block" gutterBottom>
        جمع يدويا
      </Typography>
  </Stack>
    <Stack direction="column" spacing={2} alignItems="center">
<Avatar alt=' نورهان صلاح ' />
      <h4>نورهان صلاح </h4>
          <Typography variant="caption" display="block" gutterBottom>
        جمع يدويا
      </Typography>
  </Stack>
    </Stack>


        <Stack direction="row" spacing={2} sx={{margin: "2rem 0 1rem 0"}} justifyContent= "center">
  <Stack direction="column" spacing={2} alignItems="center">
      <Avatar alt=' ضحى خليل' />
      <h4>ضحى خليل </h4>
          <Typography variant="caption" display="block" gutterBottom>
        جمع يدويا
      </Typography>
  </Stack>
    </Stack>
     </div>
    </div>
  )
}

export default AllRes;