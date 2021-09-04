import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { Progress } from './Progress'

function FileUpload() {
    const [file,setFile]=useState('')
    const [filename,setFilename]=useState('Choose File')
    const [url,setUrl]=useState(null)
    const [uploadPercentage,setUploadPercentage]=useState(0)

    const onChange = e =>{
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    

    }

    const onSubmit =async e =>{
        e.preventDefault();
        console.log(filename)
        const obj={
            "filename" : filename
        }
    

        try {
                const res = await axios.post('https://dev.homingos.com/homingo/admin/upload/getS3SignedUrl',obj , {
                    headers :{
                        'Content-Type': 'application/json' ,
                        'Authorization': '36c7770d-e525-461c-bd3e-b4e80470deb4' ,
                        'Cookie': 'JSESSIONID=882F7E0430F726E011BEB4BB80E9C81D'

                    },
                    onUploadProgress: progressEvent =>{
                        setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100)/
                        progressEvent.total )
                        )
                    );
                    setTimeout (() => setUploadPercentage(0),10000)
                    }
                   
                })
                console.log("akshat")
                console.log(res.data.data.resourceUrl)
                setUrl(res.data.data.resourceUrl)
                alert("File Uploaded Sucessfully")


        } catch (err){
                        console.log(err)
        }
    }
    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className='custom-file mb-4'>
                    <input type='file' className='custom-file-input' id='customFile' onChange={onChange}/>
                    <label className='custom-file-label' htmlFor='customFile'>
                        {filename}
                    </label>
                </div>
                <Progress percentage={uploadPercentage} />
                <input
                    type="submit"
                    value="upload"
                    className='btn btn-primary btn-block mt-4'
                    />
            </form>
            {setUrl ? <div className='row mt-5'>
                <div className='col-md-6 m-auto'>
                    <h3 className='text-center'>
                        FileUrl:     {url}
                    </h3>
                </div>
            </div> : null }
        </Fragment>
        
    )
}

export default FileUpload
