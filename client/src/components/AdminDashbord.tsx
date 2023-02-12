import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import {columns, columnsControls} from "./AdminColumns";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const AdminDashbord = () => {
  const [msg, setMsg] = useState("");
  const responsibele_ID = localStorage.getItem("res-id");
  const token = sessionStorage.getItem("token");
  const [isError, setISError] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleCloseErr = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setISError(false);
  };
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setOpen(false);
  };
  // data appears to treasury
  const [rr, setRr] = useState([]);
  const [ra, setRa] = useState([]);
  const [rd, setRd] = useState([]);
  // All data appears to responsibales
  const [dr, setDr] = useState([]);
  const [da, setDa] = useState([]);
  const [dd, setDd] = useState([]);
  const handleDelete = (id: string, CN: string) => {
    axios
      .post(`/api/delete-one`, {
        donerID: id,
        collectionName: CN,
      })
      .then((response) => {
        console.log("res", response);
        setDd(dd.filter((d: any) => d._id !== id));
        setMsg("Done");
        setOpen(true);
      })
      .catch((err) =>{
        setMsg(err.response && err.response.data.text
            ? err.response.data.text
            : err.message)
        console.log(err);
        setISError(true);
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
      },
  
      )
      .then((res) => {
        console.log("res.data", res.data);

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
        setDr(
          res.data.filter(
            (d: any) =>
              d.accepted === false &&
              d.denied === false &&
              !d.sentToTreasury &&
              !d.acceptedByTreasury &&
              !d.deniedByTreasury
          )
        );
        setDa(
          res.data.filter(
            (d: any) =>
              d.accepted === true &&
              d.denied === false &&
              !d.sentToTreasury &&
              !d.acceptedByTreasury &&
              !d.deniedByTreasury
          )
        );
        setDd(
          res.data.filter(
            (d: any) =>
              d.accepted === false &&
              d.denied === true &&
              !d.sentToTreasury &&
              !d.acceptedByTreasury &&
              !d.deniedByTreasury
          )
        );
      })
      .catch((err) => {
        setMsg(err.response && err.response.data.text
            ? err.response.data.text
            : err.message)
        console.log(err);
        setISError(true);
        if(err.response.data){
          if(err.response.data.auth === false) {
            window.location.href = "/sign";
            return;
          }
        }
      });
  }, [responsibele_ID]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
           
            dr
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .reverse()
              .map((r: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={r._id}>

                    {columns.map((column: any) => {
                      const value = r[column.id];
  
                      return (
                        <TableCell key={column.id} align="right">
                          {/* {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value} */}
                            {/* {column.id === 'register_date' ? new Date(value).toDateString() : value } */}
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
           
            da
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
              {columnsControls.map((r: any) => (
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

                    {columnsControls.map((column: any) => {
                      const value = r[column.id];
  
                      return (
                        <TableCell key={column.id} align="right">
                          {column.id === "edit" ? (< DeleteForeverIcon sx={{":hover" : {cursor: 'pointer'}, color: "red"}} onClick={() => handleDelete(r._id, 'all-doners')}/>): value}
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
           
            rr
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
                {ra && ra.length > 0 && ra
                  .map((i:any) => i.donation_val)
                  .reduce((prev, next) => parseInt(prev) + parseInt(next))}
                جنية{" "}
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
           
            rd
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
        count={rd.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
        </>
  )
}

export default AdminDashbord