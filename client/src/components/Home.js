import React, { useState, useEffect } from 'react';
/* eslint react/prop-types: 0 */
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import '../App.css';

import api from '../apiCalls';
// import deleteRow from './Delete';

// const [allSteps,setAllSteps] = useState([]);

const deleteClick = async (ID) => {

  const done = await api.deleteJha(ID); 
  if (done) {
    console.log('Complete');
  }
  
  window.location.reload();
}



const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });





function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [steps, setSteps] = useState([]);
    const classes = useRowStyles();
    const history = useHistory();
    const [finish, setFinish] = useState(false);
    // console.log(row.id);
    useEffect(async () => {
      console.log("work pls")
      console.log(api.getJhaSteps(row.ID))
      setSteps(await api.getJhaSteps(row.ID))
      setFinish(true);
      if (finish){
        console.log("Completed")
      }
    }, [finish]);

    const routeChange = (id) =>{ 
      let path = `/edit/`+id; 
      history.push(path);
    }
    

    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.job}
          </TableCell>
          <TableCell align="right">{row.title}</TableCell>
          <TableCell align="right">{row.organization}</TableCell>
          <TableCell align="right">{row.ppe}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box marginX={10} style={{'border-style':"solid", borderWidth:"2px", borderRadius:"5px" }}>
                <Table size="small" aria-label="moreInfo">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{fontWeight:'bold'}}>Date</TableCell>
                      <TableCell  style={{fontWeight:'bold'}} align="right">New/Revised</TableCell> 
                      {/* I just realized. this new/revised 
                      isnt needed in an online app*/}
                      <TableCell style={{fontWeight:'bold'}} align="right">Supervisor</TableCell> 
                      <TableCell style={{fontWeight:'bold'}} align="right">Analyst</TableCell> 
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {row.selectedDate}
                      </TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">{row.supervisor}</TableCell>
                      <TableCell align="right">{row.analyst}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table size="small">
                  <TableRow>
                    <TableCell style={{fontWeight:'bold'}}></TableCell>
                  </TableRow>
                </Table>
                
                <Table size="small" aria-label="evenMoreInfo">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{fontWeight:'bold'}}>Location</TableCell>
                      <TableCell style={{fontWeight:'bold'}} align="right">Department</TableCell> 
                      <TableCell style={{fontWeight:'bold'}} align="right">Review</TableCell> 
                      <TableCell style={{fontWeight:'bold'}} align="right">Training</TableCell> 
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {row.location}
                      </TableCell>
                      <TableCell align="right">{row.department}</TableCell>
                      <TableCell align="right">{row.review}</TableCell>
                      <TableCell align="right">{row.training}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

          
                <Typography style={{fontWeight:'bold'}} variant="h6" gutterBottom component="div">
                  Steps
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{fontWeight:'bold'}}>Step #</TableCell>
                      <TableCell style={{fontWeight:'bold'}}>Sequence of Job</TableCell>
                      <TableCell style={{fontWeight:'bold'}} align="right">Potential Hazard</TableCell>
                      <TableCell style={{fontWeight:'bold'}} align="right">Controls</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {steps.map((step) => (
                      <TableRow key={step.ID}>
                        <TableCell component="th" scope="row">
                          {step.step}
                        </TableCell>
                        <TableCell>{step.seqJob}</TableCell>
                        <TableCell align="right">{step.potHaz}</TableCell>
                        <TableCell align="right">{step.control}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  
                </Table>
                <Button variant="contained" color="secondary" onClick={() => {deleteClick(row.ID)}}>
                    Delete
                </Button>
                <Button variant="contained" color="primary" onClick={() => {routeChange(row.ID)}}>
                    Edit
                </Button>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }


// Row.propTypes = {
//   row: PropTypes.shape({
//     job: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     organization: PropTypes.string.isRequired,
//     ppe: PropTypes.string.isRequired,
//     ID: PropTypes.number.isRequired,
//     selectedDate: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//     supervisor: PropTypes.string.isRequired,
//     analyst: PropTypes.string.isRequired,
//     location: PropTypes.string.isRequired,
//     department: PropTypes.string.isRequired,
//     review: PropTypes.string.isRequired,
//     training: PropTypes.string.isRequired,
//     // extraInfo: PropTypes.arrayOf(
//     //   PropTypes.shape({
        
//     //   }),
//     // ).isRequired,
    

//     moreRow: PropTypes.arrayOf(
//       PropTypes.shape({
//         step: PropTypes.number.isRequired,
//         seqJob: PropTypes.string.isRequired,
//         potHaz: PropTypes.string.isRequired,
//         control: PropTypes.string.isRequired
//       }),
//     ).isRequired,
//   }).isRequired,
// };



function Home() {
    const [fullResponse, setFullResponse] = useState([])
    const [jhaList, setJhaList] = useState([])
    const [doneFetch, setDoneFetch] = useState(false)
    // const [allSteps, setAllSteps] = useState([]);
    // const [subStep, setSubSteps] = useState([]);
    // const [finish, setFinish] = useState(false);


    useEffect(async () => {
        setFullResponse(await api.getJha());
        // console.log('full');
        setDoneFetch(true);
        // console.log("")
        if (doneFetch){
            console.log('Completed Fetch');
            // console.log(jhaList);
            setJhaList(fullResponse[0]['main']);
            // console.log("saes")
            // console.log(fullResponse[0].step);
            // setAllSteps(fullResponse[0].step);
            // setAllSteps(fullResponse[0].step);

            // allSteps.forEach()
        }
        // 
        
        // console.log(jhaList);
        }, [doneFetch]);


    // const AllJHA = JHAList.map(JHA =>
    //     <li key = {JHA.ID}>{JHA.job}</li> )

    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow >
              <TableCell  />
              <TableCell style={{fontWeight:'bold'}}>Job Title</TableCell>
              <TableCell style={{fontWeight:'bold'}} align= 'right'>Title of Person doing Job</TableCell>
              <TableCell style={{fontWeight:'bold'}} align= 'right' >Organization</TableCell>
              <TableCell style={{fontWeight:'bold'}} align= 'right' >PPE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jhaList.map((row) => (
              <Row key={row.name} row={row}/>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>
    )
}

export default Home;