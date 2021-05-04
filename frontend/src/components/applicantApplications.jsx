import React, {useState, useEffect} from 'react';
import axios from 'axios';
import conf from '../utils/config';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import StarsIcon from '@material-ui/icons/Stars';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles({
  table: {
    marginLeft: 40,
    width: 800,
    marginTop: 10,
  },
});

export default function MyApplications() {
  console.log("MyApplications");
  let ratingOptions = ["0", "1", "2", "3", "4", "5"];
  const [rating, setRating] = useState("");
  const classes = useStyles();
  const [isSuccess, setIsSuccess] = useState(false);
 
  const getData = () => {
    axios({
      method: "GET",
      url: `http://localhost:4000/applicant/myapplications/`,
      headers: {
          'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log("GetData", response.data);
      setRows(response.data);
    })
  };
  const setcolor = (id) => (isSelected && id === jobId) ? "primary" : "";
  const [jobId, setJobId] = useState(-1);
  const [rows, setRows] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  useEffect(getData, []);
  const handleRate = () => {
    if(!isSelected) return;
    let formData = {
      rating: parseInt(rating)
    }
    axios({
      method: "PUT",
      url: `http://localhost:4000/applicant/myapplications/rate/${rows[jobId].job_id}`,
      data: JSON.stringify(formData),
    }).then((response) => {
      getData();
      setIsSelected(false);
      setRating("");
      setJobId(-1);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    })
  }

  const changerating = (e) => {
    const change = (cid) => {
      cid = parseInt(cid);
      console.log(cid);
    }
  }
  
  return (
    <div>
   
    <h3 style={{marginTop: 30, marginLeft: 40}}>My Applications</h3>

    <TableContainer >
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Date Of Joining</TableCell>
            <TableCell align="right">Salary Per Month</TableCell>
            <TableCell align="right">Name Of Recruiter</TableCell>
            <TableCell align="right">Rating Given</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, id) => (
            <TableRow  key={id}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.status === "Selected" ? row.dateofaccept.toString().substring(0,10) : "NA"}</TableCell>
              <TableCell align="right">{row.salary}</TableCell>
              <TableCell align="right">{row.recruiter_name}</TableCell>
              <TableCell align="right">{row.status === "Selected" ? (row.rating !== -1 ? row.rating.toString() : "Not Rated") : "NA"}</TableCell>
              <TableCell align="right">
                {
                  row.status === "Selected" && row.rating === -1 && 
                    <IconButton edge="end" aria-label="edit" id={id} onClick={changerating} color={setcolor(id)}>
                        <StarsIcon id={id} onClick={changerating} />
                    </IconButton>
                }
        </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  );
}