import React from 'react'

export default function UploadForm() {


    return (
        <div className="container">
                <div className="row">
                    <form action='/uploads' method='POST' encType='multipart/form-data'>
                        <h3>React File Upload</h3>
                        <div className="input-button">
                            <input type="file" name='image'/>
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
    )
}