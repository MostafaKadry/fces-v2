import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import axios from "axios";
import {columns, columnsControls} from "./ResColumns";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const ResDashbord = () => {
  const [msg, setMsg] = useState("");
  const responsibele_ID = localStorage.getItem("res-id");
  const token = sessionStorage.getItem("token");
  const [isError, setISError] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleCloseErr = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
      return;
    }
    setISError(false);
  };
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [dr, setDr]: any  = useState([]);
  const [da, setDa]: any = useState([]);
  const [dd, setDd]: any  = useState([]);
  const [donersRequestes, setDonerRequestes]: any  = useState([]);
  const [sentDonersToTresury, setDonersSentToTresury]: any  = useState([]);
  const [acceptedByTreasury, setAcceptedByTreasury]: any  = useState([]);
  const [deniedByTreasury, setDeniedByTreasury]: any  = useState([]);

  const acceptDonationReq = (donID: object) => {
    axios
      .post("/api/accept-donation", { donID })
      .then((response) => {
        const acceptedOne :any = dr.find((d: any) => d._id === donID);
        if (!acceptedOne) {
          setMsg("هناك خطأ ما");
          setISError(true);
          return;
        }
        acceptedOne.accepted = true;
        acceptedOne.denied = false;
        setDr(dr.filter((d: any) => d._id !== donID));
        setDa([...da, acceptedOne]);
        setMsg("Done")
        setOpen(true)
        return;
      })
      .catch((err) => {
          setMsg(err.response && err.response.data.text
            ? err.response.data.text
            : err.message && "there is something wrong");
          setISError(true);
          return;
      });
  };


  const denyDonationReq = (donID : string) => {
    axios
      .post("/api/deny-donation", { donID })
      .then((response) => {
        const deniedOne : any= dr.find((d : any) => d._id === donID);
        if (!deniedOne) {
              setMsg("there is something wrong");
              setISError(true);
          return;
        }
        deniedOne.accepted = false;
        deniedOne.denied = true;
        setDr(dr.filter((d: any ) => d._id !== donID));
        setDd([...dd, deniedOne]);
        setMsg("Done")
        setOpen(true)

      })
      .catch((err) => {
        console.log(err);
        setMsg(err.response && err.response.data.text
        ? err.response.data.text
        : err.message && "there is something wrong");
        setISError(true);
      });
  };
   const sendToTresury = (donID: string ) => {
    if (donID) {
      axios
        .post("/api/send-to-tresury-by-res", {
          donID,
        })
        .then(() => {
          const sentDonation = da.find((d: any) => d._id === donID);
          if (!sentDonation) {
             setMsg("there is something wrong");
            setISError(true);
            return }
          sentDonation.accepted = false;
          sentDonation.denied = false;
          sentDonation.sentToTreasury = true;
          sentDonation.acceptedByTreasury = false;

          setDa(da.filter((d: any) => d._id !== donID));
          setDonersSentToTresury([...sentDonersToTresury, sentDonation]);
        })
        .catch((err) => {
          console.log(err);
             setMsg(err.response && err.response.data.text
            ? err.response.data.text
            : err.message && "there is something wrong");
          setISError(true);
          
        });
    } else {
         setMsg("there is something wrong");
          setISError(true);
    }
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/not-found";
      return;
    }
    (() => {
      axios
        .get(`/api/doners-requests`, {
          params: { responsibele_ID },
            headers: {
         'x-access-token': token,
          "content-type": "application/json"
        }
        })
        .then((res) => {
          setDonerRequestes(res.data);
          console.log(res.data);
          setDr(
            res.data.filter(
              (d: any ) =>
                d.accepted === false &&
                d.denied === false &&
                !d.sentToTreasury &&
                !d.acceptedByTreasury &&
                !d.deniedByTreasury
            )
          );
          setDa(
            res.data.filter(
              (d: any ) =>
                d.accepted === true &&
                d.denied === false &&
                !d.sentToTreasury &&
                !d.acceptedByTreasury &&
                !d.deniedByTreasury
            )
          );
          setDd(
            res.data.filter(
              (d: any ) =>
                d.accepted === false &&
                d.denied === true &&
                !d.sentToTreasury &&
                !d.acceptedByTreasury &&
                !d.deniedByTreasury
            )
          );
          setDonersSentToTresury(
            res.data.filter(
              (d: any ) => d.sentToTreasury === true && !d.acceptedByTreasury
            )
          );
          setAcceptedByTreasury(
            res.data.filter(
              (d: any ) =>
                d.acceptedByTreasury === true &&
                !d.deniedByTreasury &&
                d.sentToTreasury === true
            )
          );
          setDeniedByTreasury(
            res.data.filter(
              (d: any ) =>
                d.acceptedByTreasury === false &&
                d.deniedByTreasury === true &&
                d.sentToTreasury === true
            )
          );
        })
        .catch((err) => {
           setMsg(err.response && err.response.data.text
            ? err.response.data.text
            : err.message && "there is something wrong");
          setISError(true);
          console.log(err);
        if(err.response.data){
          if(err.response.data.auth === false) {
            window.location.href = "/sign";
            return;
          }
        }
          return;
        });
    })();
  }, [token]);
     return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
      <Snackbar open={isError} autoHideDuration={6000} onClose={handleCloseErr}>
        <Alert onClose={handleCloseErr} severity="error" sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
    <Paper sx={{ width: '100%', overflow: 'hidden', textAlign: "right" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
              <TableRow>
              <TableCell align="center" colSpan={12}>
                <h3>تبرعات تحت المراجعة</h3>
              </TableCell>
            </TableRow>
            <TableRow sx={{"& > th" :{ backgroundColor: 'cornflowerblue'}}}>
              {columnsControls.map((r: any) => (
                <TableCell
                  key={r.id}
                  align="right"
                  style={{ minWidth: r.minWidth,}}
                >
                  <h4>
                  {r.label}
                  </h4>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
           
            dr
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .reverse()
              .map((r: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={r._id}>

                    {columnsControls.map((column: any) => {
                      const value = r[column.id];
  
                      return (
                        <>
              <TableCell key={column.id} align="right" style={column.id === "edit" ? {textAlign: "center"} : {}}>
  
                {
                  column.id === "edit" ? (
                    <>
                    < DoNotDisturbOnIcon sx={{":hover" : {cursor: 'pointer'}, color: "red", marginRight: "15px" }} onClick={() => denyDonationReq(r._id)}/>
                    < CheckCircleIcon sx={{":hover" : {cursor: 'pointer'}, color: "green" }} onClick={() => acceptDonationReq(r._id)}/>
                    </>
                  ) : value
                }
                        </TableCell>
                        </>
                      );
                    })}
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={dr.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    
    <Paper sx={{ width: '100%', overflow: 'hidden', textAlign: "right" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
              <TableRow>
              <TableCell align="center" colSpan={12}>
                <h3>تبرعات مقبولة</h3>
              </TableCell>
            </TableRow>
            <TableRow sx={{"& > th" :{ backgroundColor: 'cornflowerblue'}}}>
              {columnsControls.map((r: any) => (
                <TableCell
                  key={r.id}
                  align="right"
                  style={{ minWidth: r.minWidth }}
                >
                  <h4>
                  {r.id === "edit" ? "تسليم لللخزنة" : r.label}
                  </h4>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
           
            da
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .reverse()
              .map((r: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={r._id}>

                    {columnsControls.map((column: any) => {
                      const value = r[column.id];
  
                      return (
                        <>
                        <TableCell key={column.id} align="right">
      {column.id === "edit" ? (< SendIcon sx={{":hover" : {cursor: 'pointer'}, color: "blueviolet"}} onClick={() => sendToTresury(r._id)}/>): value}
                        </TableCell>

                        </>
                      );
                    })}
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={da.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>


      <Paper sx={{ width: '100%', overflow: 'hidden', textAlign: "right" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
              <TableRow>
              <TableCell align="center" colSpan={12}>
                <h3>تبرعات مرفوضة</h3>
              </TableCell>
            </TableRow>
            <TableRow sx={{"& > th" :{ backgroundColor: 'cornflowerblue'}}}>
              {columns.map((r: any) => (
                <TableCell
                  key={r.id}
                  align="right"
                  style={{ minWidth: r.minWidth }}
                >
                  <h4>
                  {r.label}
                  </h4>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
           
            dd
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .reverse()
              .map((r: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={r._id}>

                    {columns.map((column: any) => {
                      const value = r[column.id];
  
                      return (
                        <TableCell key={column.id} align="right">
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={dd.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

      <Paper sx={{ width: '100%', overflow: 'hidden', textAlign: "right" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
              <TableRow>
              <TableCell align="center" colSpan={12}>
                <h3>تحويلات للخزنة تحت المراجعة </h3>
              </TableCell>
            </TableRow>
            <TableRow sx={{"& > th" :{ backgroundColor: 'cornflowerblue'}}}>
              {columns.map((r: any) => (
                <TableCell
                  key={r.id}
                  align="right"
                  style={{ minWidth: r.minWidth }}
                >
                  <h4>
                  {r.label}
                  </h4>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
          sentDonersToTresury
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .reverse()
              .map((r: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={r._id}>

                    {columns.map((column: any) => {
                      const value = r[column.id];
                      return (
                        <TableCell key={column.id} align="right">
                            {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={sentDonersToTresury.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

          <Paper sx={{ width: '100%', overflow: 'hidden', textAlign: "right" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
              <TableRow>
              <TableCell align="center" colSpan={12}>
                <h3> تحويلات مقبولة</h3>
                اجمالى :{" "}
                {acceptedByTreasury && acceptedByTreasury.length > 0 ?  acceptedByTreasury
                  .map((i:any) => i.donation_val)
                  .reduce((prev: any, next: any) => parseInt(prev) + parseInt(next)) : 0}
              {" "}   جنية {" "}
              </TableCell>
            </TableRow>
            <TableRow sx={{"& > th" :{ backgroundColor: 'cornflowerblue'}}}>
              {columns.map((r: any) => (
                <TableCell
                  key={r.id}
                  align="right"
                  style={{ minWidth: r.minWidth }}
                >
                  <h4>
                  {r.label}
                  </h4>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
           
            acceptedByTreasury
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .reverse()
              .map((r: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={r._id}>

                    {columns.map((column: any) => {
                      const value = r[column.id];
  
                      return (
                        <TableCell key={column.id} align="right">
                            {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={acceptedByTreasury.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

          <Paper sx={{ width: '100%', overflow: 'hidden', textAlign: "right" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
              <TableRow>
              <TableCell align="center" colSpan={12}>
                <h3>تحويلات مرفوضة </h3>
              </TableCell>
            </TableRow>
            <TableRow sx={{"& > th" :{ backgroundColor: 'cornflowerblue'}}}>
              {columns.map((r: any) => (
                <TableCell
                  key={r.id}
                  align="right"
                  style={{ minWidth: r.minWidth }}
                >
                  <h4>
                  {r.label}
                  </h4>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              deniedByTreasury
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .reverse()
              .map((r: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={r._id}>

                    {columns.map((column: any) => {
                      const value = r[column.id];
  
                      return (
                        <TableCell key={column.id} align="right">
                            {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={deniedByTreasury.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  )
}
export default ResDashbord;