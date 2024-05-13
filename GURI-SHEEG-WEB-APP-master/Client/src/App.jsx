import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import UserContextProvider from "./context/UsersContext";
import Dashboard from "./dashboard/dashboard";
import { Users } from "./pages/Users";
import { ViewHouses } from "./pages/Houses/ViewHouses";
import {CreateHouse} from "./pages/Houses/CreateHouse";
import ProfileData from "./pages/ProfileData";
import HouseContextProvider, { HouseContext } from "./context/HouseContext";
import Details from "./pages/Houses/Details";
import HouseDetail from "./pages/HouseDetail";
import Bookings from "./pages/Bookings";
import Favorites from "./pages/Favorites";
import { ViewLands } from "./pages/Lands/ViewLands";
import { CreateLand } from "./pages/Lands/RegisterLand";
import LandContextProvider from "./context/LandContext";
import LandDetail from "./pages/Lands/LandDetail";

function App() {

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <UserContextProvider>
              <HomePage />
            </UserContextProvider>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <UserContextProvider>
              <Dashboard />
            </UserContextProvider>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <UserContextProvider>
              <ProfileData />
            </UserContextProvider>
          }
        ></Route>
        <Route
          path="/user/bookings"
          element={
            <HouseContextProvider>
              <UserContextProvider>
                <Bookings />
              </UserContextProvider>
            </HouseContextProvider>
          }
        ></Route>
        <Route
          path="/user/Favorites"
          element={
            <HouseContextProvider>
              <UserContextProvider>
                <Favorites />
              </UserContextProvider>
            </HouseContextProvider>
          }
        ></Route>
        <Route
          path="/terms"
          element={
            <UserContextProvider>
              <Terms />
            </UserContextProvider>
          }
        ></Route>
        <Route
          path="/users"
          element={
            <UserContextProvider>
              <Users />
            </UserContextProvider>
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <HouseContextProvider>
              <UserContextProvider>
                <HouseDetail />
              </UserContextProvider>
            </HouseContextProvider>
          }
        ></Route>

        <Route path="/houses">
          <Route
            index
            element={
              <HouseContextProvider>
                <ViewHouses />
              </HouseContextProvider>
            }
          />
          <Route
            element={
              <HouseContextProvider>
                <CreateHouse />
              </HouseContextProvider>
            }
            path={"create"}
          />
          <Route
            element={
              <HouseContextProvider>
                <Details />
              </HouseContextProvider>
            }
            path={"details/:id"}
          />
        </Route>

        <Route path="/lands">
          <Route
            index
            element={
              <LandContextProvider>
                <ViewLands />
              </LandContextProvider>
            }
          />
          <Route
            path="register"
            element={
              <LandContextProvider>
                <CreateLand />
              </LandContextProvider>
            }
          />
          <Route
            path="detail/:id"
            element={
              <LandContextProvider>
                <LandDetail />
              </LandContextProvider>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
