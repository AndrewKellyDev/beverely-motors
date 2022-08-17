import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import {
  StockPage,
  AdminPage,
  AddNewCarPage,
  DetailPage,
  HomePage,
  EditCarPage,
  LoginPage,
  RequireAuth,
} from "./pages";
import { Navbar, Footer } from "./components";
import store from "./store";

function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminPage />
                </RequireAuth>
              }
            />
            <Route
              path="/addcar"
              element={
                <RequireAuth>
                  <AddNewCarPage />
                </RequireAuth>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <RequireAuth>
                  <EditCarPage />
                </RequireAuth>
              }
            />
          </Routes>
        </Provider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
