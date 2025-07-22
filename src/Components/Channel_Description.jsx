import React from 'react';
import {useState,useEffect} from 'react';
import CommonA from './CommonA'

const Channel_Description =()=>{
     const [userDetails, setUserDetails] = useState({
        fullName: "",
        username: "",
        avatar: null,
        coverImage: null,
      });

      const [showAssistant,setShowAssistant] = useState(false);
      const [description,setDescription]= useState('');

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await fetch("http://localhost:8000/api/v1/user/currentUser", {
              credentials: "include",
            });
            const data = await res.json();
            if (res.ok && data?.data) {
              setUserDetails(data.data);
            }
          } catch (err) {
            console.error("Error fetching user:", err);
          }
        };
    
        fetchUser();
      }, []);

      const handleDescription= async ()=>{
        try{
            const add_description = await fetch("http://localhost:8000/api/v1/user/userdescription",
               {
                 method:"PUT",
                 body: description,
                 credentials :"include"
               }
            );

              const userdescription = await add_description.json();
              if(userdescription.status === 200 || userdescription.statusCode===200){
                alert("user channel description has been updated :)");
              }else{
                alert("Your channel description could not be added :(");
              }
        }
        catch(err){
            alert(err);
        }
      };


      return (
         <div className="flex h-screen w-screen overflow-hidden">
            <CommonA 
                userDetails={userDetails}
                showAssistant={showAssistant}
                setShowAssistant={setShowAssistant}
            >
                <div>
                    <h2>Give your channel description , to personalise your AI assistant : Streamy </h2>
                    <textarea
                    className="w-full p-2 rounded bg-white/20 text-white"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={4}
                    />
                    <button
                    className="mt-2 px-4 py-2 bg-pink-600 rounded text-white"
                    onClick={handleDescription}
                    >
                     Save Description
                    </button>
                </div>
            </CommonA>

         </div>


      );
}

export default Channel_Description;