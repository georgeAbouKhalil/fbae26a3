import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import Header from "./Header.jsx";

import Archive from "./components/view_components/Archive.js";
import MissedCall from "./components/view_components/MissedCall.js";
import PageNotFound from "./components/view_components/PageNotFound.js";
import ActivityDetail from "./components/view_components/ActivityDetail.js";

import ActivityFeed from "./components/view_components/ActivityFeed.js";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<ActivityFeed />} />
          <Route path="/missedCall" element={<MissedCall />} />
          <Route path="/activityDetail/:id" element={<ActivityDetail />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
