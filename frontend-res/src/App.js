import './App.css';
import axios from 'axios';
import JSONDATA from './MOCK_DATA.json';
import { useState } from 'react';

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  const PostFile = (file)=>{
    const formdata=new FormData();
    formdata.append('file',file);
    postFiles(formdata, 'file');

  };

  const PostMultipleFile=(filelist)=>{
    console.log(filelist);
    const formdata = new FormData();
      for (let index = 0; index < filelist.length; index++) {
        const file = filelist[index];
        formdata.append('files',file);
      }
      postFiles(formdata, 'multiplefiles');
  };

  const postFiles = async (formdata, endpoint)=>{
    try {
      const result = await axios.post(`http://localhost:4000/${endpoint}`, formdata)
      console.log(result);
      
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="App">

      <h2>Upload Resumes below</h2>

        <input className='singleInput' type="file" onChange={(event) => {
          const file=event.target.files[0];
          PostFile(file)
        }}></input>

        <input 
        type="file" 
        multiple
        onChange={(event) => {
          const filelist=event.target.files;
          PostMultipleFile(filelist)
        }}></input>
        
      <div className='searchbar'>
      <h2>Search for Keyword</h2>

      <input 
      type="text" 
      placeholder="Search..." 
      onChange={event => {
        setSearchTerm(event.target.value);
      }}
        />
      {JSONDATA.filter((val)=>{
        if(searchTerm === ""){
          return;
        }
        else if (val.ip_address.toLowerCase().includes(searchTerm.toLowerCase())){
          return val;
        }
      }).map((val, key) => {
        return (
          <div className='user' key={key}>
            <a href='./sample-resumes_scs.pdf' target='_blank' >{val.first_name} skills: {val.ip_address}</a>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default App;
