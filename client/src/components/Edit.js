import React, {useState, useEffect, Fragment} from 'react';

import DatePicker from 'react-date-picker';


import { makeStyles } from '@material-ui/core/styles';
import { Input, Select, MenuItem, Button } from '@material-ui/core';
import api from '../apiCalls';

import { useHistory } from "react-router-dom";

import Typography from '@material-ui/core/Typography';



export default function Edit() {
  const history = useHistory();
  const routeChange = () =>{ 
    let path = `/`; 
    history.push(path);
  }

  const [job, setJob] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [doneFetch, setDoneFetch] = useState(false);
  
  const [steps, setSteps] = useState([{step: "", sequence: "", potentialHazard: "", controls: "" }]);

  const [status, setStatus] = useState('New');
  const [title, setTitle] = useState();
  const [supervisor, setSupervisor] = useState();
  const [analyst, setAnalyst] = useState();
  const [organizaton, setOrganization] = useState();
  const [location, setLocation] = useState();
  const [department, setDepartment] = useState();
  const [review, setReview] = useState();
  const [ppe, setPpe] = useState();
  const [training, setTraining] = useState();
  const [editVals, setEditVals] = useState();


  const passUrl = window.location.pathname;
  const passId = passUrl.substring(passUrl.lastIndexOf('/') + 1); 

  useEffect(async () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1); 
    const res = await api.getSpecficJha(id);
    const resJson = res[0];
    console.log('res');

    console.log(resJson);
    setSteps(await api.getJhaSteps(id))
    console.log('Bro Please');
    // console.log(resJson)
    setDoneFetch(true);
    if (doneFetch){
      console.log('Completed Fetch');
      console.log(steps);
      setJob(resJson.job);
      setSelectedDate(resJson.selectedDate);
      setStatus(resJson.status);
      setTitle(resJson.title);
      setSupervisor(resJson.supervisor);
      setAnalyst(resJson.analyst);
      setOrganization(resJson.organization);
      setLocation(resJson.location);
      setDepartment(resJson.department);
      setReview(resJson.review);
      setPpe(resJson.ppe);
      setTraining(resJson.training);
      console.log('steps')
      console.log(steps)
      for (var step in steps){
        editStepFields(step, steps);
      }
        
      setEditVals(true);
    }
  }, [doneFetch, editVals]);

    const editStepFields = (index, json) => {
      const values = [...steps];
      console.log('val')
      console.log(values);
      values[index].step = json[index].step;
      values[index].potentialHazard = json[index].potHaz;
      values[index].sequence = json[index].seqJob;
      values[index].controls = json[index].control;
    };

    const handleStepsChange = (index, event) => {
      const values = [...steps];
      values[index][event.target.name] = event.target.value;
      setSteps(values);
    };
    

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

  
  const handleInputChange = (text, setFunc) => {
    setFunc(text)
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  
  // function handleDateChange(date) {setSelectedDate(date)};
  const handleSubmit = async () => {
    //Gather Data for apiCalls
    const data = { job, selectedDate, status, title, supervisor,
    analyst, organizaton, location, department, review, ppe, training }

    await api.updateJha(passId, data);
    routeChange()
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
      <div style={{marginTop:"10px", width:'50%',justifyContent: 'space-between','display':'flex', 'flexDirection':'row'}}>
        <Input 
        placeholder='Required Training' 
        value={training}
        // onChange={e=>setName(e.target.value)} 
        onChange = {e=>handleInputChange(e.target.value, setTraining)}
        />
      </div>
      <Typography style={{color: 'black',fontWeight:'bold'}} variant="h6" gutterBottom component="div">
        Add Steps
      </Typography>
      <div className="form-row">
          {steps.map((stepInput, index) => (
            <Fragment key={`${stepInput}~${index}`}>
              <div>
                <Input
                  id="step"
                  name="step"
                  placeholder='Step #' 
                  value={steps[index].step}
                  onChange = {e=>handleStepsChange(index, e)}
                  
                />
                <Input
                  id="sequence"
                  name="sequence"
                  placeholder='Sequence of Steps' 
                  value={steps[index].seqJob}
                  onChange = {e=>handleStepsChange(index, e)}
                />
                <Input
                  id="potentialHazard"
                  name="potentialHazard"
                  placeholder="Potential Hazards"
                  value={stepInput.potHaz}
                  onChange = {e=>handleStepsChange(index, e)}
                />
                <Input
                  id="controls"
                  name="controls"
                  placeholder='Controls'
                  value={stepInput.control}
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
      <div className={useStyles().root}>
        <Button variant="contained" color="secondary" onClick={() => { routeChange() }}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      
    </div>
  );
}
  