import React, { useState } from "react";
import CallRecordTable from "./components/CallRecordTable";
import Header from "./components/header";

const App = () => {
  return (
    <div>
      <Header />
      <CallRecordTable />
    </div>
  );
};

export default App;
