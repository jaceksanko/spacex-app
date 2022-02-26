import React from "react";
import { Routes, Route } from "react-router-dom";
import ApiProvider from "./ApiProvider";
import FlightListPage from "./FlightListPage";
import FlightDetails from "./FlightDetails";

function App() {
  return (
    <ApiProvider>
      <h1>SpaceX App</h1>
      <Routes>
        <Route path="/" element={<FlightListPage />} />
        <Route path="flight-details/:id" element={<FlightDetails />} />
      </Routes>
    </ApiProvider>
  );
}

export default App;
