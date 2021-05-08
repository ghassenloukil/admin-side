import React  , { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const axios = require('axios');

// Generate Order Data



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


export default function Orders() {
  const classes = useStyles();
  const [state, setState] = useState({
    data: []
});

useEffect(() => {
    const timer = window.setTimeout(() => {
        axios.get('http://localhost:3000/api/ParkiZone/allusers').then((response) =>{
            setState({ data: response.data });
            console.log('userrrrrssss',response);
        }).catch((error) =>{
            console.log(error);
        })
  }, 1000);

  return () => window.clearTimeout(timer );
  },[]);
const deleteUser = (user) => {
    axios.delete(`http://localhost:3000/api/ParkiZone/delete/${user.userId}`).then((response) =>{
        console.log(response);
    }).catch((error) =>{
        console.log(error);
    })
}
  return (
    <React.Fragment>
      <Title>ParkiZone Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell >Points</TableCell>
            <TableCell>delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.data.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell>{user.points}</TableCell>
              <TableCell onClick={()=>deleteUser(user)}><DeleteForeverIcon/></TableCell>
              {console.log(user)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}