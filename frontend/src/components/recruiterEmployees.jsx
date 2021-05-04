import React, {Component} from 'react';
import axios from 'axios';
import conf from '../utils/config';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default class MyEmployees extends Component{
    constructor(props){
        super(props);
        this.state={
            employees: [],
            ratingOptions: ["0", "1", "2", "3", "4", "5"],
            rating: "",
            applicationId: -1,
            rows: [],
            sortOption: "",
            isSelected: false,
            isSort: false,
            sortedUsers: [],
            sortDirection: -1,
            sortName:  true,
            filter: ["Part Time","Full Time","Work From Home"]
        }
        this.sortChange = this.sortChange.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:4000/recruiter/myemployees')
             .then(response => {
                 console.log(response.data);
                this.setState({
                    employees: response.data,
                    sortedUsers:response.data
                });
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    sortChange(){
                var array = this.state.employees;
                var flag = this.state.sortName;
                array.sort(function(a, b) {
                    if(a.rating != undefined && b.rating != undefined){
                        return (1 - flag*2) * (a.rating - b.rating);
                    }
                    else{
                        return 1;
                    }
                  });
                this.setState({
                    employees:array,
                    sortName:!this.state.sortName,
                })
            }
    render(){
        return(
            <>
            <div>
                <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                                <h3>Filters</h3>
                        </ListItem>
                    </List>
                </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField 
                        id="standard-basic" 
                        label="Search" 
                        fullWidth={true}  
                        onChange={this.onChange} 
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )}}
                        />
                    </List>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem button>
                                <form noValidate autoComplete="off">
                                    <label>Salary</label>
                                    <TextField id="standard-basic" label="Enter Min" fullWidth={true} />
                                    <TextField id="standard-basic" label="Enter Max" fullWidth={true}/>
                                </form>                                                                
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={this.state.filter}
                                    getOptionLabel={(option) => option}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Select Names" variant="outlined" />}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                    <Button onClick={this.sortChange}>Sort</Button>
                                            <TableCell> Rating</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.employees.map((user,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{user.rating}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                        </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>            
            </div>
            </>
        )
    }
}