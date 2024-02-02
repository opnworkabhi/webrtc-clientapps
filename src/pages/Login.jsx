import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HTTP_POST_REQUEST } from "../helpers/network";
import ENDPOINTS from "../constants/network.constant";
import "../App.css";
import { Link } from 'react-router-dom';

function Login(props) {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => sendLoginRequest(data);
  const[loginUnAuthorized, setloginUnAuthorized] = useState(''); 

  const sendLoginRequest = async (authData) => {
    try {
      const response = await HTTP_POST_REQUEST(ENDPOINTS.LOGIN, {}, authData);
      localStorage.setItem("encodedToken",JSON.stringify(authData));
      if (response.data.status === "200 OK"){
        navigate("/createScheduledRoom");
      } 
    } catch (err) {
      console.error("[test] server error1 : ", err);
      if(err.code === 'ERR_NETWORK' && err.message === 'Network Error'){
        setloginUnAuthorized("Network error try login after some time");
        return;
       }
       if (err.response.data.message === "401 Unauthorized: [no body]"){
        setloginUnAuthorized("Plese enter correct userName and password");
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#DDDDDD" }}>
      <center>
        <div>
          <form className="Login" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="title">Login</h2>{" "}
            <table width="350" className="body">
              <tr>
                <td colSpan={2}><font color="red">{loginUnAuthorized}</font></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <label>UserName</label>
                </td>
                <td>
                <input type="text" id="username" name="username"  {...register("username")} required />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Password</label>
                </td>
                <td>
                <input type="password" id="password" name="password"  {...register("password")}  required />
                </td>
              </tr>
              <tr>
                <td></td>
                <td align="right">
                   <button
                    type={"submit"}
                    style={{ backgroundColor: "#a1eafb" }}
                  >Submit</button>
                </td>
              </tr>
              
            </table>
          </form>
        </div>
        
          {/* <div>
            <table>
            <tr><td> Or </td></tr>
            <tr><td>
            <Link to={navigate("/createScheduledRoom")} > Login as Guest </Link>
              </td></tr>
          </table>
          </div> */}
         
      </center>
    </div>
  );
}
export default Login;
