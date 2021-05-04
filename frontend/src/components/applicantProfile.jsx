import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {List, ListItem, ListItemSecondaryAction, IconButton, ListItemText, ListItemAvatar, Avatar} from '@material-ui/core';
import {Grid, Typography, Card, Button} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 50,
    marginRight: 50
  },
  heading: {
    paddingLeft: 10,
    fontSize: 30
  },
  profile_img: {
    width: "180px",
    height: "155px",
    marginLeft: "180px",
    marginTop: "30px",
    borderRadius: "50%"
  }
}));

const Skill = ({skills, setSkills}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [skillId, setSkillId] = useState(-1);
    const [skillName, setSkillName] = useState("");
  
    const handleClick = (e) => {
      e.preventDefault();
      const Set = (currId) => {
        currId = parseInt(currId);
        if(isSelected && skillId === currId) {
          setSkillName("");
          setIsSelected(false);
          setSkillId(-1);
        } else {
          setSkillName(skills[currId]);
          setIsSelected(true);
          setSkillId(parseInt(currId));
        }
      }
      if(!e.target.id)
      {
        Set(e.target.parentNode.id);
      } else {
        Set(e.target.id);
      }
    }
    const setcolor = (id) => {
      if (isSelected && id === skillId) return "secondary"
      else return ""
    }
    const removeSkill = (e) => {
      e.preventDefault();
      let newSkill = [...skills];
      newSkill.splice(skillId, 1);
      setSkills(newSkill);
      setSkillName("");
      setIsSelected(false);
      setSkillId(-1);
    }
    const addSkill = (e) => {
      e.preventDefault();
      let newSkill = [...skills];
      newSkill.push(skillName);
      setSkills(newSkill);
      setSkillName("");
      setIsSelected(false);
      setSkillId(-1);
    }
    return (
      <>
      {
        skills.map((skill, id) => {
          return <Button key={id} variant="contained" id={id} style={{marginLeft: 15,marginTop: 10,}}
          onClick={handleClick}
          color={setcolor(id)}
          >
          {skill}
          </Button>
        })
      }
      <br/> <br />
      {
        isSelected ? 
          <Fab color="primary" aria-label="add" size="medium" color="black" onClick={removeSkill}>
          <RemoveIcon  />
          </Fab>
        :
          <>
          <TextField
            id="outlined-disabled"
            label="Skills Update"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            style = {{
              marginLeft: 10,
              width: "70%"
            }}
          />
          <Fab color="primary" aria-label="remove" size="medium" color="black" onClick={addSkill} >
            <AddIcon />
          </Fab>
          </>
      }
      </>
    )
  }
  
const Education = ({education, setInstitute, isError, errors}) => {

  const [isSelected, setIsSelected] = useState(false);
  const [educationId, setInstituteId] = useState(-1);
  const [newEducation, setnewEducation] = useState({});

  const handleClick = (e) => {
    e.preventDefault();
    const Set = (currId) => {
      currId = parseInt(currId);
      if(isSelected && educationId === currId) {
        setnewEducation({});
        setIsSelected(false);
        setInstituteId(-1);
      } else {
        let herenewEducation = education[currId];
        herenewEducation.name = ("name" in herenewEducation) ? herenewEducation.name : "";
        herenewEducation.startyear = ("startyear" in herenewEducation) ? herenewEducation.startyear.substring(0,4) : "";
        if(("endyear" in herenewEducation)) {
          try {
            herenewEducation.endyear = herenewEducation.endyear.substring(0,4);
          } catch {
            delete herenewEducation.endyear;
          }

        }
        setnewEducation(herenewEducation);
        setIsSelected(true);
        setInstituteId(parseInt(currId));
      }
    }
    if(e.target.id && e.target.id >= 0)
      Set(e.target.id);
  }
  
  const handleChange = (e) => {
    let herenewEducation = Object.assign({}, newEducation);
    herenewEducation[e.target.id] = e.target.value;
    setnewEducation(herenewEducation);
  }
  
  const getYearString = (inst) => {
    if (inst.endyear && inst.startyear) return `started: ${inst.startyear.substring(0,4)}, ended: ${inst.endyear.substring(0,4)}`;
    else if (inst.startyear) return `started: ${inst.startyear.substring(0,4)}`;
    else if(inst.endyear) return `ended: ${inst.endyear.substring(0,4)}`;
    else return "";
  }
  const setcolor = (id) => {
    if (isSelected && id === educationId) return "secondary"
    else return ""
  }

  const editInstitute = (e) => {
    e.preventDefault();
    let herenewEducation = [...education];
    let copynewEducation = newEducation;
    if(("endyear" in copynewEducation)) copynewEducation.endyear = `${setDate(copynewEducation.endyear)}-12-31T18:30:00.000+00:00`
    if("startyear" in copynewEducation) copynewEducation.startyear = `${setDate(copynewEducation.startyear)}-12-31T18:30:00.000+00:00`
    Object.assign(herenewEducation[educationId], newEducation)
    setnewEducation({});
    setIsSelected(false);
    setInstituteId(-1);
    setInstitute(herenewEducation);
  }

    const removeInstitute = (e) => {
      e.preventDefault();
      let newEducation = [...education];
      newEducation.splice(educationId, 1);
      setInstitute(newEducation);
      setnewEducation({});
      setIsSelected(false);
      setInstituteId(-1);
    }
    const setDate = (date) => {
      if (date.length >=4 ) return date.substring(0,4);
      else {
        for(let i=date.length; i<=4;i++) date+="x";
        return date;
      }
    }
    const addInstitute = (e) => {
      e.preventDefault();
      let herenewEducation = [...education];
      let copynewEducation = newEducation;
      if("endyear" in copynewEducation) copynewEducation.endyear = `${setDate(copynewEducation.endyear)}-12-31T18:30:00.000+00:00`
      if("startyear" in copynewEducation) copynewEducation.startyear = `${setDate(copynewEducation.startyear)}-12-31T18:30:00.000+00:00`
      herenewEducation.push(copynewEducation);
      setnewEducation({});
      setIsSelected(false);
      setInstituteId(-1);
      setInstitute(herenewEducation);
    }


  const getnewEducation = () => {
    const herenewEducation = {};
    herenewEducation.name = ("name" in newEducation) ? newEducation.name : "";
    herenewEducation.startyear = ("startyear" in newEducation) ? newEducation.startyear : "";
    herenewEducation.endyear = ("endyear" in newEducation) ? newEducation.endyear : "";
    return herenewEducation;
  }

  return (
    <>
      <Typography style={{
            marginTop: 50,
            marginLeft: 10,
            fontSize: 30
          }}>
            Education
      </Typography>
      <List>
      {
        education && 
        education.map((inst, id) => {
            return <> 
                    <ListItem>
                      <ListItemText
                          primary={inst['name']}
                          secondary={getYearString(inst)}
                      />
                      <ListItemSecondaryAction style={{
                          marginRight: 200
                      }}>
                      <IconButton edge="end" aria-label="delete" id={id} onClick={handleClick} color={setcolor(id)}>
                        <EditIcon id={id} onClick={handleClick} />
                      </IconButton>
                </ListItemSecondaryAction>
                </ListItem>
                {
                  isError && errors && errors && errors[id] && 
                  Object.keys(errors[id]).map((key, id1) => {
                    return <p key={id1} style={{color: "red", marginLeft: "70px"}}>{errors[id][key]}</p>
                  }) 
                }
            </>
          })
      }
       <Typography style={{
            marginTop: 50,
            marginLeft: 10,
            fontSize: 30
          }}>
            Add Education Institute 
        </Typography>
        <TextField
          id="name"
          value={getnewEducation().name}
          onChange={handleChange}
          required
          label="Name"
          placeholder="IIIT Hyderabad"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{
            marginTop: 30,
            marginLeft: 10,
            width: "90%"
          }}
        />
        <TextField
          id="startyear"
          value={getnewEducation().startyear}
          onChange={handleChange}
          label="Start Year"
          style={{ margin: 8 }}
          placeholder="69"
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          
        />
        <TextField
          id="endyear"
          value={getnewEducation().endyear}
          onChange={handleChange}
          label="End Year"
          style={{ margin: 8 }}
          placeholder="420 "
          margin="normal" 
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        {
          isSelected ?
          <>
          <Fab color="primary" aria-label="add" size="medium" color="black" onClick={removeInstitute} style={{
            marginLeft: 20  ,
            marginTop: 15
          }}>
            <RemoveIcon />
          </Fab>
          <Fab color="primary" aria-label="add" size="medium" color="black"  onClick={editInstitute}  style={{
            marginLeft: 20  ,
            marginTop: 15
          }}>
            <EditIcon />
          </Fab>
          </>
          :
          <Fab color="primary" aria-label="add" size="medium" color="black" onClick={addInstitute} style={{
            marginLeft: 20  ,
            marginTop: 15
          }}>
            <AddIcon />
          </Fab>

        }
          </List>
      
    </>
  )


}

const ApplicantProfile = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({});
  const [skills, setSkills] = useState([]);
  const [education, setInstitute] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:4000/applicant/profile`,
      headers: {
          'Content-Type': 'application/json',
      }
    }).then((response) => {
      setFormData(response.data);
      setSkills(response.data.skills);
      setInstitute(response.data.education);
    }).catch(error => {
        if (error) {
            console.log(error.response.data);
            setIsError(true);
            setErrors(error.response.data);
        }
    });
  }, [])

  const handleChange = (e) => {
    if (e.target.type == "file") {
      
      var reader = new FileReader();
      var file = e.target.files[0];

      reader.onload = function(upload) {
          let newformData = Object.assign({}, formData);
          newformData.image = upload.target.result;
          setFormData(newformData);
      }
      reader.readAsDataURL(file);
  }
    e.preventDefault();
    console.log(e.target.value);
    let newFormData = Object.assign({}, formData);
    newFormData[e.target.id] = e.target.value;
    setFormData(newFormData);
  }

  const handleSave = (e) => {
    e.preventDefault();
    let newFormData = Object.assign({}, formData);
    newFormData.skills = skills;
    newFormData.education = education;
    console.log(newFormData);
    axios({
      method: "PUT",
      url: `http://localhost:4000/applicant/profile`,
      data: newFormData,
    }).then((response) => {
      setFormData(response.data);
      setIsError(false);
      setSkills(response.data.skills);
      setIsSuccess(true);
      setErrors({});
      setInstitute(response.data.education);
      setTimeout(() => setIsSuccess(false), 3000);
    }).catch(error => {
        if (error) {
            console.log(error.response.data);
            setIsError(true);
            setErrors(error.response.data.errors)
        }
    });
  }

  return (
    <div>
    <Typography style={{textAlign: "center", fontSize: "60px"}}> Welcome {formData['name']} </Typography>
      <Grid container spacing={5}>
        <Grid item xs={5}>

          <img src={formData['image']} alt="Profile Picture" className={classes.profile_img}/> 
          <br></br>
          <TextField
          id="name"
          label="Name"
          style={{ margin: 8 }}
          placeholder="Bulla"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{
            marginTop: 30,
            marginLeft: 10,
            width: "90%"
          }}
          onChange={handleChange}
          value={formData['name']}
          />

          {
            isError && errors.name && 
            <p style={{color: "red", marginLeft: "10px"}}>{errors.name}</p>
          }

        <TextField
          id="email"
          label="Email"
          style={{ margin: 8 }}
          placeholder="khulla@gmail.com"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{
            marginTop: 15,
            marginLeft: 10,
            width: "90%"
          }}
          onChange={handleChange}
          value={formData['email']}
        />
        
        {
          isError && errors.email && 
          <p style={{color: "red", marginLeft: "10px"}}>{errors.email}</p>
        }

        <Typography style={{
            marginTop: 15,
            marginLeft: 20,
            fontSize: 30
          }}>
            Skills
        </Typography>
        
        <Skill skills={skills} setSkills={setSkills} />
        
        </Grid>
        <Grid item xs={7}>
          <Education education={education} setInstitute={setInstitute} isError={isError} errors={errors.education}/>
          <Typography style={{
            marginTop: 15,
            marginLeft: 20,
            fontSize: 20
          }}>
            Rating:{formData['rating']}
        </Typography>
        </Grid>
        
      </Grid>
      <Button
        variant="contained"
        color="black"
        size="large"
        style = {{
            marginTop: "50px",
            marginBottom: "20px",
            marginLeft: "700px"
        }}
        onClick={handleSave}
        >
        Update
      </Button>
      {
        isSuccess && 
        <p>Successfully Updated</p>
      }
    </div>
  )
}

export default ApplicantProfile;
