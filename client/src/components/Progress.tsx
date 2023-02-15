import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import axios from "axios";
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const Progress = () => {

  const [collected, setCollected] = useState(0);
  useEffect(() => {
    axios
      .get("/api/collected-money")
      .then((res) => {
        setCollected(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return(
    <>
         <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 3,
        '& > :not(style)': {
          m: 1,
        //   width: 128,
        //   height: 128,
        },
      }}
    >

      <Paper elevation={8} sx={{ display: 'flex', alignItems: 'center',  padding: '1rem', backgroundColor: "cadetblue", }}>
         <Paper elevation={8} sx={{padding: "10px",  backgroundColor: "cadetblue", color: "white" ,fontSize: '13px'}}>
            مدفوع: {collected} ج.م
         </Paper>
        <CircularProgressWithLabel value={(collected / 70000) * 100} sx={{margin: "auto 5px", }}/>
            <Paper elevation={8} sx={{padding: "10px",  backgroundColor: "cadetblue", color: "white", fontSize: '13px'}}>
            مستهدف: 70,000 ج.م
         </Paper>
      </Paper>
    </Box>
    </>
     );
}

export default Progress;