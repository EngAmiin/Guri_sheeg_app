import * as react from "react";
import axios from "axios";
import * as toasts from "react-hot-toast";
export const LandContext = react.createContext();

export default function LandContextProvider(props) {



  const createLand = async (data) => {
    var normalMessage="Land Was Created Successfully.."
    var response = await axios.post("http://localhost:8900/land/create", data);
    if (response.data.hasError)
      toasts.toast.error(
        "Error Occurred, Please try again.. " + response.data.message,
        {
          duration: 5000,
        }
      );

    return {response,normalMessage};
  };


  const UpdateUser = async (data) => {
    var response = await axios.post("http://localhost:8900/users/update", data);
    if (response.data.hasError) {
      toasts.toast.error(
        "Error Occurred, Please try again.. " + response.data.message,
        {
          duration: 5000,
        }
      );
    } else {
      var jsonParse = JSON.stringify(response.data.userData[0]);
      localStorage.setItem("userData", jsonParse);
      console.log(response.data);
      setResponseServer(response.data.message);
    }
  };

  const fetchLands = async () => {
    var response = await axios.get("http://localhost:8900/land/"); 
    return response.data;  
  };

  const getBookingByUser = async (id) => {
    var response = await axios.get("http://localhost:8900/house/booking/" + id);
    if (response.data.hasError)
      toasts.toast.error(
        "Error Occurred, Please try again.. " + response.data.message,
        {
          duration: 5000,
        }
      );
    else {
      return response;
    }
  };
  const releaseHouse = async (data) => {
    var response = await axios.post(
      "http://localhost:8900/house/release",
      data
    );
    if (response.data.hasError)
      toasts.toast.error(
        "Error Occurred, Please try again.. " + response.data.message,
        {
          duration: 5000,
        }
      );
    else {
      return response;
    }
  };

  const searchUser = async (userPattern) => {
    var response = await axios.get(
      `http://localhost:8900/users/search/${userPattern}`
    );
    if (response.data.hasError)
      toasts.toast.error(
        "Error Occurred, Please try again.. " + response.data.message,
        {
          duration: 5000,
        }
      );
    else {
      console.log(response.data.userData);
      setUserData(response.data.userData[0]);
    }
  };

  const deleteLand = async (data) => {
    var response = await axios.post(
      "http://localhost:8900/land/deleteLand",
      data
    );
    var {hasError,error,message}=response.data;
    return { hasError, error, message };
    
  };
  /**
   * Get and returns the house details based on the id
   * @param data - object data
   */

  const getLandDetails = async (id) => {
    var response = await axios.get(
      `http://localhost:8900/land/details/${id}`
    );
    console.log("context : ",response.data.data);
   return response.data;
  };
  const fetchAllLands = async () => {
    var response = await axios.get(`http://localhost:8900/land/fetchLands`);
    return response.data;
  };

  return (
    <>
      <toasts.Toaster />
      <LandContext.Provider
        value={{
          createLand,
          fetchLands,
          deleteLand,
          getLandDetails,
          fetchAllLands,
        }}
      >
        {props.children}
      </LandContext.Provider>
    </>
  );
}
