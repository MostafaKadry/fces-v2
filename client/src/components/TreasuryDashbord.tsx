import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import axios from "axios";
import {columns, columnsControls} from "./TreasuryColumns";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const TreasuryDashbord = () => {
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
  const [rr, setRr]: any = useState([]);
  const [ra, setRa]: any = useState([]);
  const [rd, setRd]: any = useState([]);
  const acceptResReq = (donID: any) => {
    axios
      .post(`/api/accept-responsabile-by-treasury`, {
        donID,
      })
      .then((res) => {
        const acceptOne = rr.find((d: any) => d._id === donID);
        if (!acceptOne) {
          setMsg("هناك خطأ ما");
          setISError(true);
          return;
        }
        acceptOne.acceptedByTreasury = true;
        acceptOne.deniedByTreasury = false;
        setRr(rr.filter((r: any) => r._id !== donID));
        setRa([...ra, acceptOne]);
      })
      .catch((err) => {
        setISError(err);
      });
  };

  const denyResReq = (donID: any) => {
    axios
      .post(`/api/deny-responsabile-by-treasury`, {
        donID,
      })
      .then((res) => {
        const denyOne = rr.find((d: any) => d._id === donID);
        if (!denyOne) {
          setMsg("هناك خطأ ما");
          setISError(true);
          return;
        }
        denyOne.acceptedByTreasury = false;
        denyOne.deniedByTreasury = true;
        setRr(rr.filter((r:any ) => r._id !== donID));
        setRd([...rd, denyOne]);
      })
      .catch((err) => {
        console.log(err);
            setMsg(err.response && err.response.data.text
            ? err.response.data.text
            : err.message && "there is something wrong");
          setISError(true);
          return;
      });
  };

  useEffect(() => {
    axios
      .get(`/api/doners-requests`, {
        params: { responsibele_ID },
        headers: {
         'x-access-token': token,
          "content-type": "application/json"
        }
      })
      .then((res) => {
        setRr(
          res.data.filter(
            (d: any) =>
              d.sentToTreasury === true &&
              !d.acceptedByTreasury &&
              !d.deniedByTreasury
          )
        );
        setRa(
          res.data.filter(
            (d: any) =>
              d.sentToTreasury === true &&
              d.acceptedByTreasury === true &&
              !d.deniedByTreasury
          )
        );
        setRd(
          res.data.filter(
            (d: any) =>
              d.sentToTreasury === true &&
              d.acceptedByTreasury === false &&
              d.deniedByTreasury === true
          )
        );
      })
      .catch((err) => {
            setMsg(err.response && err.response.data.text
            ? err.response.data.text
            : err.message && "there is something wrong");
        setISError(err);
        console.log(err);
        if(err.response.data){
          if(err.response.data.auth === false) {
            window.location.href = "/sign";
            return;
          }
        }
      });
  }, [responsibele_ID]);
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
                <h3>تحويلات تحت المراجعة</h3>
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
           
            rr
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
                    < DoNotDisturbOnIcon sx={{":hover" : {cursor: 'pointer'}, color: "red", marginRight: "15px" }} onClick={() => denyResReq(r._id)}/>
                    < CheckCircleIcon sx={{":hover" : {cursor: 'pointer'}, color: "green" }} onClick={() => acceptResReq(r._id)}/>
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
        count={rr.length}
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
                {ra && ra.length > 0 ?  ra
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
           
            ra
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
        count={ra.length}
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
              ra
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
        count={ra.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  )
}

export default TreasuryDashbord