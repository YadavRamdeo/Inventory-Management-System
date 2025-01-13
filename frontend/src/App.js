import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AddItem from './components/AddItem';
import UpdateItem from './components/UpdateItem';
import DeleteItem from './components/DeleteItem';
import ViewItems from './components/ViewItems';
import Login from './components/Login';
import Inventory from './components/Inventory';
import PurchaseOrders from './common/PurchaseOrders';
import SalesOrders from './common/SalesOrders';
import Package from './common/Package';
import Shipment from './common/Shipment';
import Reports from './common/Reports';
import ContactUs from './common/ContactUs';
import InventoryCatalog from './common/InventoryCatalog';
import './App.css';
import { logout } from './services/api';

class App extends Component {
  constructor(props) {
    super(props);
    console.log(localStorage.getItem('isAdminLogin'), "'isAdminLogin'");
    this.state = {
      isAdminLogin: localStorage.getItem('isAdminLogin') === 'true' ? true : false,
      isAuthenticated: !!localStorage.getItem('accessToken'),
      view: 'dashboard', // Default view
    };
  }

  // Function to set the current view
  setView = (view) => {
    this.setState({ view });
  };

  // Function to handle login
  handleLogin = () => {
    this.setState({ isAuthenticated: true, view: 'dashboard', });
  };

  // Function to handle logout
  handleLogout = () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      console.error('No refresh token found.');
      this.setState({ isAuthenticated: false, view: 'login' });
      return;
    }

    logout(refreshToken)
      .then(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('isAdminLogin');
        this.setState({ isAuthenticated: false, view: 'login' });
        console.log('Logout successful.');
      })
      .catch((error) => {
        console.error('Logout failed:', error.response ? error.response.data : error.message);
        alert('Logout failed. Please try again.');
      });
  };

  // Unified renderView function
  renderView = () => {
    const { view } = this.state;
    switch (view) {
      case 'add':
        return <AddItem />;
      case 'update':
        return <UpdateItem />;
      case 'delete':
        return <DeleteItem />;
      case 'view':
        return <ViewItems />;
      case 'inventory':
        return <Inventory />;
      case 'purchaseOrders':
        return <PurchaseOrders />;
      case 'salesOrders':
        return <SalesOrders />;
      case 'package':
        return <Package />;
      case 'shipment':
        return <Shipment />;
      case 'reports':
        return <Reports />;
      case 'contactUs':
        return <ContactUs />;
      case 'inventoryCatalog':
        return <InventoryCatalog />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  // Main render function
  render() {
    const { isAuthenticated } = this.state;
    console.log(this.state, "this.stateApp")
    return (
      <Fragment>
        <Header onLogout={this.handleLogout} isAuthenticated={isAuthenticated} />
        <div className="container">
          {isAuthenticated ? (
            <Fragment>
              <Sidebar setView={this.setView} isAdminLogin={this.state?.isAdminLogin} />
              <main>{this.renderView()}</main>
            </Fragment>
          ) : (
            <Login onLogin={this.handleLogin} />
          )}
        </div>
      </Fragment>
    );
  }
}

export default App;
