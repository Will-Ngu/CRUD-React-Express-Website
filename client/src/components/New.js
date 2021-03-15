import React, {useState, Fragment } from 'react';

import DatePicker from 'react-date-picker';
import { useHistory } from "react-router-dom";


import { makeStyles } from '@material-ui/core/styles';
import { Input, Select, MenuItem, Button } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import api from '../apiCalls';
import '../App.css';

function Form() {


  const history = useHistory();
  const routeChange = () =>{ 
    let path = `/`; 
    history.push(path);
  }

  const [job, setJob] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [status, setStatus] = useState('New');
  const [title, setTitle] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [analyst, setAnalyst] = useState('');
  const [organizaton, setOrganization] = useState('');
  const [location, setLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [review, setReview] = useState('');
  const [ppe, setPpe] = useState('');
  const [training, setTraining] = useState('');

  const [steps, setSteps] = useState([{step: "", sequence: "", potentialHazard: "", controls: "" }]);

  const handleInputChange = (text, setFunc) => {
    setFunc(text)
  }

  const handleStepsChange = (index, event) => {
    const values = [...steps];
    values[index][event.target.name] = event.target.value;
    setSteps(values);
  };
  

  const useStyles = makeStyles((theme) => ({
    root: {
      // '& > *': {
      //   margin: theme.spacing(1),
      // },
      '& .MuiInput-root': {
        margin: theme.spacing(1),
        width: '25ch',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
      },
    },
    
  }));
  

  function handleAddClick() {
    const values = [...steps];
    values.push({ value: null });
    setSteps(values);
  }

  function handleRemoveClick(i) {
    const values = [...steps];
    values.splice(i, 1);
    setSteps(values);
  }

  

  // function handleDateChange(date) {setSelectedDate(date)};
  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    //Gather Data for apiCalls
    const data = { job, "selectedDate":selectedDate.toString(), status, title, supervisor,
    analyst, organizaton, location, department, review, ppe, training }

    

    var step;
    for (step in steps) {
      steps[step]['job'] = job;
      if ('value' in steps[step]){
        delete steps[step]['value']; 
      }
    }
    const apiData = {'data': data, 'stepData':steps};
    await api.postJha(apiData);
    routeChange();
    
  }
  return (
    <div style={{background: 'white', 'display':'flex', height:'100%', width:'100%','flexDirection':'column', 'alignItems': 'center','justifyContent':"space-between"}}>
        <Typography style={{color: 'black',fontWeight:'bold'}} variant="h6" gutterBottom component="div">
          Create New JHA
        </Typography>

        <Input style={{ width:'50%'}}
          placeholder='Job Title' 
          value={job}
          // onChange={e=>setName(e.target.value)} 
          onChange = {e=>handleInputChange(e.target.value, setJob)}
        />
        <div style={{marginTop:"10px", width:'50%',justifyContent: 'space-between','display':'flex', 'flexDirection':'row'}}>
          <DatePicker
            onChange={handleDateChange}
            value={selectedDate}
          />
          <Select
            value={status}
            onChange={e=>handleInputChange(e.target.value, setStatus)}
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Revised">Revised</MenuItem>
          </Select>
        </div>
        <div style={{marginTop:"10px", width:'50%',justifyContent: 'space-between','display':'flex', 'flexDirection':'row'}}>          
        <Input 
            placeholder='Title of Person performing Job' 
            value={title}
            // onChange={e=>setName(e.target.value)} 
            onChange = {e=>handleInputChange(e.target.value, setTitle)}
          />
          <Input 
            placeholder='Supervisor' 
            value={supervisor}
            // onChange={e=>setName(e.target.value)} 
            onChange = {e=>handleInputChange(e.target.value, setSupervisor)}
          />
        </div>
        <div style={{marginTop:"10px", width:'50%',justifyContent: 'space-between','display':'flex', 'flexDirection':'row'}}>
          <Input 
            placeholder='Analyst' 
            value={analyst}
            // onChange={e=>setName(e.target.value)} 
            onChange = {e=>handleInputChange(e.target.value, setAnalyst)}
          />
          <Input 
            placeholder='Organization' 
            value={organizaton}
            // onChange={e=>setName(e.target.value)} 
            onChange = {e=>handleInputChange(e.target.value, setOrganization)}
          />
        </div>
        <div style={{marginTop:"10px", width:'50%',justifyContent: 'space-between','display':'flex', 'flexDirection':'row'}}>
          <Input
            placeholder='Location' 
            value={location}
            // onChange={e=>setName(e.target.value)} 
            onChange = {e=>handleInputChange(e.target.value, setLocation)}
          />
          <Input 
            placeholder='Department' 
            value={department}
            // onChange={e=>setName(e.target.value)} 
            onChange = {e=>handleInputChange(e.target.value, setDepartment)}
          />
        </div>
        <div style={{marginTop:"10px", width:'50%',justifyContent: 'space-between','display':'flex', 'flexDirection':'row'}}>
          <Input 
            placeholder='Reviewed by' 
            value={review}
            // onChange={e=>setName(e.target.value)} 
            onChange = {e=>handleInputChange(e.target.value, setReview)}
          />
            <Input 
            placeholder='REQUIRED PPE:' 
            value={ppe}
            // onChange={e=>setName(e.target.value)} 
            onChange = {e=>handleInputChange(e.target.value, setPpe)}
            />
          </div>
          <Input  style={{ width:'50%'}}
          placeholder='Required Training' 
          value={training}
          // onChange={e=>setName(e.target.value)} 
          onChange = {e=>handleInputChange(e.target.value, setTraining)}
          />
      <div className="form-row" style={{marginTop:"10px"}}>
          <Typography style={{color: 'black',fontWeight:'bold'}} variant="h6" gutterBottom component="div">
            Add Steps
          </Typography>
          {steps.map((stepInput, index) => (
            <Fragment key={`${stepInput}~${index}`}>
              <div>
                
                <Input
                  id="step"
                  name="step"
                  placeholder='Step #' 
                  value={stepInput.step}
                  onChange = {e=>handleStepsChange(index, e)}
                  
                />
                <Input
                  id="sequence"
                  name="sequence"
                  placeholder='Sequence of Steps' 
                  value={stepInput.sequence}
                  onChange = {e=>handleStepsChange(index, e)}
                />
                <Input
                  id="potentialHazard"
                  name="potentialHazard"
                  placeholder="Potential Hazards"
                  value={stepInput.potentialHazard}
                  onChange = {e=>handleStepsChange(index, e)}
                />
                <Input
                  id="controls"
                  name="controls"
                  placeholder='Controls'
                  value={stepInput.controls}
                  onChange = {e=>handleStepsChange(index, e)}
                />
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleRemoveClick(index)}
                >
                  -
                </button>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleAddClick()}
                >
                  +
                </button>
              </div>
            </Fragment>
          ))}
        </div>
      
      <div className={useStyles().root} style={{marginTop:'10px', marginBottom:'10px', width:'50%', 'justifyContent':"space-between"}}>
        <Button variant="contained" color="secondary" style={{marginRight:"10px"}} onClick={() => { routeChange() }}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
          
        
    </div>
  );
}
  
export default Form