import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from "axios";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const MakeDonation = () => {
    const [responsiblesData, setResponsiblesData] = useState<any[]>([]);
    
  const [donerData, setdonerData] = useState({
    name: "",
    phone: 0,
    email: "",
    donation_val: 0,
    responsibele_name: "",
    responsibele_ID: "",
    register_date: "",
    register_time: "",
    delivery_date: "",
    accepted: false,
    denied: false,
  });
  const [msg, setMsg] = useState("");
  const [open, setOpen] = React.useState(false);
const [successOpen, setSuccessOpen] = React.useState(false);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    // if (reason === 'clickaway') {
    //   return;
    // }

    setOpen(false);
  };
  const handleSuccessClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    // if (reason === 'clickaway') {
    //   return;
    // }

    setSuccessOpen(false);
  };
//   const handleNumericInput = (evt: any) => {
//     // Only ASCII character in that range allowed
//     var ASCIICode = evt.which ? evt.which : evt.keyCode;
//     if (ASCIICode !== 8 && ASCIICode !== 46) {
//       if (ASCIICode < 48 || ASCIICode > 57) {
//         if (evt.target.name === "donation_val") {
//               <Alert severity="error">برجاء كتابة الرقم فقط وبشكل صحيح بدون كسور</Alert>
//         }
//         if (evt.target.name === "phone") {
//                   <Alert severity="error">"برجاء كتابة رقم هاتف صحيح</Alert>
//         }
//         setdonerData({ ...donerData, [evt.target.name]: 0 });
//         setTimeout(() => {
//           evt.target.value = "";
//         }, 10);
//         return false;
//       }
//     }
//     return true;
//   };
//   const handleDrop = (evt: any) => {
//     setdonerData({ ...donerData, [evt.target.name]: 0 });
//     setTimeout(() => {
//       evt.target.value = "";
//     }, 10);
//     return false;
//   };

  const handleChange = ({ target }: any) => {
    setdonerData({ ...donerData, [target.name]: target.value });
  };
  const handleSubmit = async (e: any) => {
    console.log(donerData);
    e.preventDefault();
    if (donerData.phone) {
      if (donerData.phone.toString().length < 11) {
        setMsg("برجاء ادخال رقم هاتف صحيح");
        setOpen(true);
        return;
      }
    }
    if (
      !donerData.donation_val ||
      !donerData.responsibele_ID ||
      donerData.donation_val <= 0
    ) {
    setMsg("برجاء مراجعة قيمة التبرع او ادخال اسم المسؤول بشكل صحيح");
    setOpen(true);
    return;
    }
    if (!/\d/.test(donerData.donation_val.toString())) {
     setMsg("برجاء ادخال مبلغ صحيح");
    setOpen(true);
    return;

    }
    const checkVal = String(donerData.donation_val)
      .split("")
      .map((num) => {
        return Number(num);
      });
    for (let c of checkVal) {
      if (isNaN(c)) {
        setMsg("برجاء ادخال مبلغ صحيح");
        setOpen(true);
        return;
      }
    }
    setdonerData({...donerData, register_date : new Date().toLocaleDateString(), register_time : new Date().toLocaleTimeString()})
    // donerData.register_date = new Date().toLocaleDateString();
    // donerData.register_time = new Date().toLocaleTimeString();
  
    await axios
      .post(`/api/register-donation`, {
        donerData,
      })
      .then((response) => {
        console.log(response);
        setMsg("تم تسجيل التبرع بنجاح")
        setSuccessOpen(true);
        setdonerData({
                name: "",
                phone: 0,
                email: "",
                donation_val: 0,
                responsibele_name: "",
                responsibele_ID: "",
                register_date: "",
                register_time: "",
                delivery_date: "",
                accepted: false,
                denied: false,
        })
      })
      .catch((err) => {
          console.log(err);
        setMsg(err.response && err.response.data.text
            ? err.response.data.text
            : err.message);
        setOpen(true);
      });
  };
  useEffect(() => {
    axios
      .get("/api/responsibles")
      .then((response) => {
        setResponsiblesData(response.data);      
      })
      .catch((err) => console.log(err.message));
  }, [donerData, msg]);

  return (
    <>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {msg}
        </Alert>
    </Snackbar>
    <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleSuccessClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {msg}
        </Alert>
    </Snackbar>
    <Box
      component="form"
      sx={{
        textAlign: "right", 
        width: "270px",
        margin: "3rem auto 4rem auto",
        '& .MuiTextField-root': { m: 1, },
      }}
    >
      <div style={{  display: 'flex',
        flexDirection: 'column', 
        alignItems: 'stretch'}}>
        <TextField
        required
        id="outlined-number"
        label="قيمة التبرع"
        type="number"
        autoFocus
        name='donation_val'
        onChange={handleChange}
        value={donerData.donation_val}
        />
    <Autocomplete  
      disablePortal
      options={responsiblesData.map(option => option.res_name)}
        onInputChange={(event, newInputValue) => {
            let resid = responsiblesData.find(r => r.res_name === newInputValue )
          setdonerData({ ...donerData, responsibele_ID : resid ? resid._id : null,  responsibele_name : newInputValue});
       
        }}
      sx={{ width: '95%' }}

      renderInput={
        (params) => <TextField required {...params} label={`اسم المسؤول`} 
        inputProps={{
            ...params.inputProps,
          }}
          />
    }
    />
    <TextField 
          type="date"
          id="delivery_date"
          name="delivery_date"
          label="تاريخ التبرع"
          // value={donerData.delivery_date}
          InputLabelProps={{
            shrink: true,
          }}
    />
    <TextField
        id="outlined"
        label="الاسم"
        name="name"
         onChange={handleChange}
            value={donerData.name}

        />
       
        <TextField
          id="outlined-number"
          label="رقم الهاتف"
          type="phone"
          name="phone"
          onChange={handleChange}
          value={donerData.phone}

        />
          <Button variant="contained" sx={{margin:'1rem'}} onClick={handleSubmit}>ارسال</Button>
      </div>
      
    </Box>
    </>
  )
}

export default MakeDonation;