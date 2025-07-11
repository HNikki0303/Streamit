import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const PublishVideo = () =>{
    
    const [formData, setformData] = useState({
        "title":"",
        "description":"",
    })

    const Navigate =  useNavigate();

    const [videoFile,setVideoFile]= useState(null);
    const [thumbnail,setThumbnail]=useState(null);

    const [message,setMessage]=useState("")
    const [loading,setLoading]=useState(false);

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setformData((prevState)=>({
            ...prevState,
            [name]:value,
        }));
    };

    const handleFormSubmit = async(e)=>{
        e.preventDefault();

        if(!videoFile){
            setMessage("Thumbnail is required");
            return;
        }

        setLoading(true);

        const Body = new FormData();
        Body.append("title",formData.title);
        Body.append("description",formData.description);
        Body.append("video",videoFile);
        if(thumbnail)Body.append("thumbnail",thumbnail);

        try{

            const res = await fetch("http://localhost:8000/api/v1/video/publishAVideo",{
                method:"POST",
                body :Body,
                credentials:"include"
            });

            const received = await res.json();

            if(received.status==200 || received.stausCode==200){
                setMessage("Video has been published on the server")
            }else{
                setMessage("Sorry ma'am we could not publish the video :(")
            }
            Navigate('/FormattedVideo');
        }
        catch(err){
            console.log(err.message);
            setMessage(err.message )
        }
        finally{
            setLoading(false);
        }
        
    }


    return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4"> Publish Video</h2>

      {message && (
        <p className="mb-4 text-sm font-medium text-blue-600">{message}</p>
      )}

      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Upload Video *</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Upload Thumbnail (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Publishing...' : 'Publish Video'}
        </button>
      </form>
    </div>
  );
    
};

export default PublishVideo;
