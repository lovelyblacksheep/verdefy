import { Amplify } from "aws-amplify";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import store from './store';
import amplifyconfig from "./amplifyconfiguration.json";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Main from "./components/Main/Main";
import VerifyEmail from "./components/Auth/VerifyEmail";
import Dashboard from "./components/Dashboard/Dashboard";
import Checkout from "./components/CreateTransaction/Checkout";
import CreateCustomer from "./components/CreateCustomer/CreateCustomer";
import CreateDealership from "./components/CreateDealership/CreateDealership";
import CreateSalespersonForm from "./components/CreateSalesperson/CreateSalesperson";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ForgotPassword2 from "./components/Auth/ForgotPassword2";
import ChooseRole from "./components/Auth/ChooseRole";
import CreateDealer from "./components/CreateDealer/CreateDealer";
import Dealership from "./components/Dealership/Dealership";
import Dealerships from "./components/Dealerships/Dealerships";
import Salesperson from "./components/Salesperson/Salesperson";
import DealerSetting from "./components/Dealership/DealerSetting";
import Invoice from "./components/Invoice/Invoice";
import CreateInvoiceForm from "./components/CreateInvoice/CreateInvoice";
import Salespeople from "./components/Salespeople/Salespeople";
import ForcePassword from "./components/Auth/ForceChange";

import "./App.css";

Amplify.configure(amplifyconfig);

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={store._persistor}>
          
          <BrowserRouter>
            {/* <Nav /> */}
            <Routes>
              <Route path="/" element={<Main />} />
              {/* <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/create-customer" element={<CreateCustomerForm />} />  */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/forgotpassword2" element={<ForgotPassword2 />} />
              <Route path="/verifyemail" element={<VerifyEmail />} />
              <Route path="/forcechange" element={<ForcePassword />} />
              <Route path="/chooserole" element={<ChooseRole />} />
              <Route path="/createcustomer" element={<CreateCustomer />} />
              <Route path="/createtransaction" element={<Checkout />} />
              <Route path="/createdealership" element={<CreateDealership />} />
              <Route path="/createdealer" element={<CreateDealer />} />
              <Route path="/dealersetting" element={<DealerSetting />} />
              <Route path="/salespeople/:dealershipId" element={<Salespeople />} />
              <Route
                path="/createsalesperson"
                element={<CreateSalespersonForm />}
              />
              <Route
                path="/createinvoice"
                element={<CreateInvoiceForm />}
              />
              <Route
                path="/invoice"
                element={<Invoice />}
              />
              <Route path="/dealerships" element={<Dealerships />} />
              <Route path="/dealership/:dealershipId" element={<Dealership />} />
              <Route path="/salesperson/:salespersonId" element={<Salesperson />} />
              <Route path="/invoice/:invoiceId" element={<Invoice />} />
              {/* <Route path="/create-contract" element={<CreateContractForm />} /> */}
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;