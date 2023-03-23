import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { TextField, InputLabel, MenuItem, FormControl, Select, Button, Divider } from '@mui/material';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';




//====================input css ========================================== 
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

const Listedvalue = { name: "", email: "", companytype: "", template: "" }
const Edite = ({id}) => {
  const [list, setList] = useState(Listedvalue);
  const email = [
    { name: "Areness1@gmail.com" },
    { name: "Areness2@gmail.com" },
    { name: "Areness3@gmail.com" },
  ]
  const company = [
    { name: "SBI CARD" },
    { name: "MobiKwik" },
    { name: "Vodafone" },
  ]
  const template = [
    { name: "Demand notice sbi credit card number" },
    { name: "Demand notice sbi credit account number (QLD)" },
    { name: "invitation of conciliation " },
    { name: "notice of first hearing" },
    { name: "demand notice and invocation of arbitration" },
  ]

  const handleChange = (event) => {
    const { name, value } = event.target
    setList({ ...list, [name]: value })
  };

//  for update list data==========
  const Submit = async () => {
    try {
      const res = await fetch(`http://localhost:4000/notes/${id}`, {
        method: "put",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
      })
      const result = await res.json()
      if (result.Message === "Done") {
        toast("Added Successfull !", {
          position: "top-center",
          autoClose: 1000,
          type: "success"
        })
      }else if(result.Message === "Empaty"){
        toast("please fill details !", {
          position: "top-center",
          autoClose: 1000,
          type: "info"
        })
      }else{
        toast("userId allready exist!", {
          position: "top-center",
          autoClose: 1000,
          type: "error"
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Box sx={{ maxWidth: 500 }}>
        <form>
          <FormControl sx={{ m: 1, minWidth: 450 }}>
            <CssTextField placeholder='UniqueID' type='text' label="Name" id="custom-css-outlined-input" required name='name' value={list.name} onChange={handleChange} />
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 450 }}>
            <InputLabel required>Email</InputLabel>
            <Select label="Email" name='email' onChange={handleChange}  >
              <MenuItem defaultValue=""><em>None</em></MenuItem>
              {email.map((item, index) => {
                return <MenuItem key={index} value={`${item.name}` || ""} >{item.name} </MenuItem>
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 450 }}>
            <InputLabel required>Company Type</InputLabel>
            <Select label="Company Type" name='companytype' onChange={handleChange} >
              <MenuItem value=""><em>None</em></MenuItem>
              {company.map((item, index) => {
                return <MenuItem key={index} value={`${item.name || ""}`}>{item.name}</MenuItem>
              })}

            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, width: 450 }}>
            <InputLabel required>Template</InputLabel>
            <Select label="Company Type" name='template' onChange={handleChange} >
              <MenuItem value=""><em>None</em></MenuItem>
              {template.map((item, index) => {
                return <MenuItem key={index} value={`${item.name}`}>{item.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          <Divider />
          <Button variant="outlined" sx={{ m: 1, width: 450 }} onClick={Submit}>Click Me! fro Adding</Button>

        </form>
      </Box>
    </>
  )
}

export default Edite