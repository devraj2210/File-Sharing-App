import { useState, useEffect, useRef } from 'react';
import { uploadFile } from './service/api.jsx'
import './App.css'

function App() {

  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  console.log(file);
  
  const fileInputRef = useRef();
  
  useEffect(() => {
    const getImage = async () => {
      if(file){
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file])


  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='main-wrapper' style={{ backgroundImage: 'url(https://images.pexels.com/photos/2457284/pexels-photo-2457284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
      <div className="container">
        <div className="wrapper">
          <h1>File Sharing App</h1>
          <p>Upload files and share the download link with your buddies</p>

          <button onClick={() => onUploadClick()}>Upload</button>
          <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={(e) => { setFile(e.target.files[0]) }} />
          <a href={result} target='_blank'>{result}</a>
        </div>
      </div>
    </div>
  );
}

export default App
