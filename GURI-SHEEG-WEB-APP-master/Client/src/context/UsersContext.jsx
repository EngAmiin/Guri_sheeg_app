import * as react from "react";
import axios from "axios";
import * as toasts from "react-hot-toast";
export const UserContext = react.createContext();

export default function UserContextProvider(props) {
  const [userData, setUserData] = react.useState([]);
  const [singleUserData, setSingleUserData] = react.useState([]);
  const [openLogin, setOpenLogin] = react.useState(false);
  const [responseServer, setResponseServer] = react.useState();

  const RegisterUser = async (data) => {
    var response = await axios.post("http://localhost:8900/users/create", data);
    if (response.data.hasError)
      toasts.toast.error(
        "Error Occurred, Please try again.. " + response.data.message,
        {
          duration: 5000,
        }
      );
    else {
      toasts.toast.success(response.data.message, {
        duration: 3000,
      });
      fetchUsers();
    }
  };
  const UpdateUser = async (data) => {
    var response = await axios.post("http://localhost:8900/users/update", data);
    if (response.data.hasError)
     {
     
       toasts.toast.error(
         "Error Occurred, Please try again.. " + response.data.message,
         {
           duration: 5000,
         }
       );
     }
    else {
      var jsonParse=JSON.stringify(response.data.userData[0])
      localStorage.setItem("userData",jsonParse)
      console.log(response.data)
      setResponseServer(response.data.message);
    }
  };

  const fetchUsers = async () => {
    var response = await axios.get("http://localhost:8900/users/");
    if (response.data.hasError)
      toasts.toast.error(
        "Error Occurred, Please try again.. " + response.data.message,
        {
          duration: 5000,
        }
      );
    else {
      response.data.data.map((data) => {
        console.log(Object.keys(data));
      });
      console.log(response.data.data);
      setUserData(response.data.data);
    }
  };


 const fetchUser = async (id) => {
   var response = await axios.get(`http://localhost:8900/users/fetchOne/${id}`);
   if (response.data.hasError)
     toasts.toast.error(
       "Error Occurred, Please try again.. " + response.data.message,
       {
         duration: 5000,
       }
     );
   else {
    console.log(response.data.userData[0])
     setSingleUserData(response.data.userData[0]);
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
    console.log(response.data.userData)
     setUserData(response.data.userData[0]);
   }
 };

  const deleteUser = async (data) => {
    var response = await axios.delete(
      "http://localhost:8900/users/delete/" + data.ID
    );
    if (response.data.hasError)
      toasts.toast.error(
        "Error Occurred, Please try again.. " + response.data.message,
        {
          duration: 5000,
        }
      );
    else fetchUsers();
  };

  const findUserCredentials = async (data) => {
    var response = await axios.get(
      `http://localhost:8900/users/findUser/${data.email}/${data.password}`,
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
      console.log(response.data.userData);
      if (response.data.userData.length > 0) {
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data.userData[0])
        );

        setOpenLogin(false);
      } else
        toasts.toast.error("Email or Password is incorrect", {
          duration: 2000,
        });
    }
  };

  return (
    <>
      <toasts.Toaster />
      <UserContext.Provider
        value={{
          openLogin,
          setOpenLogin,
          RegisterUser,
          findUserCredentials,
          userData,
          fetchUsers,
          deleteUser,
          fetchUser,
          singleUserData,
          searchUser,
          setResponseServer,
          responseServer,
          UpdateUser
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
}
