import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubscriptionPlan from "./pages/SubscriptionPlan";
import Layout from "./layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <AppProvider>
                <Routes>
                    <Route path="/" element={<Login />} />

                    <Route
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/subscription-plan" element={<SubscriptionPlan />} />
                        {/* Add more protected pages here as they're built:
                            <Route path="/bank-details" element={<BankDetails />} />
                            <Route path="/service-control" element={<ServiceControl />} />
                            <Route path="/payment-approvals" element={<PaymentApprovals />} />
                        */}
                    </Route>
                </Routes>
            </AppProvider>
        </BrowserRouter>
    );
}

export default App;