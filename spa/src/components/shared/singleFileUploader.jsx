import { useState, useEffect } from 'react';
import InputFileUpload from './inputFileUpload';

const SingleFileUploader = () => {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

 useEffect(() => {
    let fileReader, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }

  }, [file]);

  const handleFileChange = (e) => {
    if (e.target.files) {
        if (!e.target.files[0].type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      console.log('Subiendo archivo...');

      const formData = new FormData();
      formData.append('file', file);

      try {
        // You can write the URL of your server or any other endpoint used for file upload
        const result = await fetch('http://localhost:3001/api/maestro/perfil', {
          method: 'POST',
          body: formData,
        });

        const data = await result.json();

        console.log(data);
        alert(data);
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <>
      <div className="input-group">
        {/* <input id="file" type="file" onChange={handleFileChange} /> */}
        <InputFileUpload handleOnChange={handleFileChange}/>
      </div>
      {file && (
        <section>
          Archivo detalles:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button 
          onClick={handleUpload}
          className="submit"
        >Subir archivo</button>
      )}

        {fileDataURL && (
        <p className="img-preview-wrapper">
          {
            <img src={fileDataURL} alt="preview"/>
          }
        </p>
        )}
    </>
  );
};

export default SingleFileUploader;