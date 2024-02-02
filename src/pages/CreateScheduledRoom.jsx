import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HTTP_GET_REQUEST, HTTP_POST_REQUEST } from "../helpers/network";
import ENDPOINTS from "../constants/network.constant";

const CreateScheduledRoom = (props) => {
  // state to store text values
  const[userName, setUserName] = useState('');
  const[roomName, setRoomName] = useState('');
  const[userNameError, setUserNameError] = useState('');
  const[roomNameError, setRoomNameError] = useState('');
  const[roomURL, setRoomURL] = useState('');
  const[serverError, setServerError] = useState('');

  //Function to handle user input change
  const handleNameChange = (event) => {
    const user = event.target.value;
    setUserName(user);
    setUserNameError(user.trim() === ''); // if user field is empty
  };

  //Function to handle room input change
  const handleRoomChange = (event) => {
    const room = event.target.value;
    setRoomName(room);
    setRoomNameError(room.trim() === ''); // if room field is empty
  };

  //Form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
  }

  // Function to handle button click
  const handleButtonClick = () => {
    createScheduledRoom(userName, roomName);
  };

  // Function that will rec the text input and call API
    async function createScheduledRoom (userName, roomName) {
    if(userName.trim()==='' || roomName.trim() === ''){
      alert('Please fill all mandatory field');
      return;
    }
    try{
         //const response =  HTTP_POST_REQUEST(ENDPOINTS.CREATE_SCHEDULED_ROOM, {
        const response = await HTTP_POST_REQUEST(ENDPOINTS.CREATE_SCHEDULED_ROOM, {
        userName,
        roomName
      })
        alert(`Room # ${roomName} # found, please join on given below link`);

        console.log("[test] server response before parse ##### : ",response.data.roomURL);
        const roomURL = setRoomURL(response.data.roomURL);
        console.log("[test] roomURL ##### : ", roomURL);
      }
      catch (err) {
        console.error("[test] server error : ", err);
        if(err.code === 'ERR_NETWORK' && err.message === 'Network Error'){
          setServerError("Network error try scheduling room after some time");
          return;
         }
      }
  };

  return (
    // roomURL !== '') ? <div style={{ backgroundColor: "#DDDDDD" }}> <h1 className="title">Joine Room</h1> Click to join room : <a href={roomURL} target="_blank"> {roomURL} </a> </div> :(
    <form onSubmit={handleFormSubmit}>
    <div style={{ backgroundColor: "#DDDDDD" }}>
      <h1 className="title"> Scheduled Room </h1>
      <table className="body">
        <tr>
          <td colSpan={2}><font color="red">{serverError}</font></td>
            <td></td>
        </tr>
        <tr>
          <th>User Name</th>
          <th>Room Name</th>
          <th>CreateRoom</th>
        </tr>
        <tr>
          <td><input type="text" required value={userName} onChange={handleNameChange} style={{borderColor: userNameError ? 'red': '' }}></input></td>
          <td><input type="text" required value={roomName} onChange={handleRoomChange} style={{borderColor: roomNameError ? 'red': '' }}></input></td>
          <td>
            <button onClick={handleButtonClick} style={{ backgroundColor: "#a1eafb" }}>CreateRoom</button>
          </td>
        </tr>
        <tr>
          <td>{userNameError && <span style={{color:'red'}}>userName is mandatory</span>}</td>
          <td>{roomNameError && <span style={{color:'red'}}>roomName is mandatory</span>}</td>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2}>
          Join Room : {roomName} # <a href={roomURL} target="_blank"> {roomURL}</a>
          </td>
        </tr>
      </table>
    </div>
    </form>
  );
};

export default CreateScheduledRoom;