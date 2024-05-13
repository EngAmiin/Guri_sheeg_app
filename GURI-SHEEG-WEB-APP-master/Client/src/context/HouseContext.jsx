import * as react from "react";
import axios from "axios";
import * as toasts from "react-hot-toast";
export const HouseContext = react.createContext();

export default function HouseContextProvider(props) {
  const [userData, setUserData] = react.useState([]);
  const [singleUserData, setSingleUserData] = react.useState([]);
  const [openLogin, setOpenLogin] = react.useState(false);
  const [responseServer, setResponseServer] = react.useState();

  const CreateHouse = async (data) => {
    var response = await axios.post("http://localhost:8900/house/create", data);
    if (response.data.hasError)
      toasts.toast.error(
        "Error Occurred, Please try again.. " + response.data.message,
        {
          duration: 5000,
        }
       
      );

      return response;
    
  };

const makeReservationHouse = async (data) => {
  var response = await axios.post("http://localhost:8900/house/reserve", data);
  if (response.data.hasError)
    toasts.toast.error(
      "Error Occurred, Please try again.. " + response.data.message,
      {
        duration: 5000,
      }
    );

  return response;
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

  const fetchHouses = async () => {
    var response = await axios.get(
      "http://localhost:8900/house/"
    );
    if (response.data.hasError)
      toasts.toast.error(
        "Error Occurred, Please try again.. " + response.data.message,
        {
          duration: 5000,
        }
      );
    else
    { 
      return response;}
  };
  const getBookingByUser = async (id) => {
    var response = await axios.get("http://localhost:8900/house/booking/"+id);
    if (response.data.hasError)
      toasts.toast.error(
        "Error Occurred, Please try again.. " + response.data.message,
        {
          duration: 5000,
        }
      );
    else
    { 
      
      return response;}
  };
  const releaseHouse = async (data) => {
    var response = await axios.post("http://localhost:8900/house/release",data);
    if (response.data.hasError)
      toasts.toast.error(
        "Error Occurred, Please try again.. " + response.data.message,
        {
          duration: 5000,
        }
      );
    else
    { 
      
      return response;}
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

  const deleteHouse = async (data) => {
    var response = await axios.post(
      "http://localhost:8900/house/deleteHouse/",data
    );
    if (response.data.hasError)
      toasts.toast.error(
        "Error Occurred, Please try again.. " + response.data.message,
        {
          duration: 5000,
        }
      );
      console.log(response);
  };
  /**
   * Get and returns the house details based on the id
   * @param data - object data
   */

  const getHouseDetails = async (data) => {
    var response = await axios.post(
      `http://localhost:8900/house/houseDetails`,
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
  const fetchAllHouses = async () => {
    var response = await axios.get(`http://localhost:8900/house/getAllHouses`);
    if (response.data.hasError)
    console.log("Error ", response.data.message)
      // toasts.toast.error(
      //   "Error Occurred, Please try again.. " + response.data.message,
      //   {
      //     duration: 5000,
      //   }
      // );
    else {
     return response;
    }
  };

  return (
    <>
      <toasts.Toaster />
      <HouseContext.Provider
        value={{
          CreateHouse,
          fetchHouses,
          deleteHouse,
          getHouseDetails,
          fetchAllHouses,
          makeReservationHouse,
          getBookingByUser,
          releaseHouse,
        }}
      >
        {props.children}
      </HouseContext.Provider>
    </>
  );
}
