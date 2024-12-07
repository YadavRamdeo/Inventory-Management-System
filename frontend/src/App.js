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
import './App.css';
import { logout } from './services/api'; // Import the logout function

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: !!localStorage.getItem('accessToken'),
      view: 'dashboard', // Default view
    };
  }

  setView = (view) => {
    this.setState({ view });
  };

  handleLogin = () => {
    this.setState({ isAuthenticated: true, view: 'dashboard' });
  };

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
        this.setState({ isAuthenticated: false, view: 'login' });
        console.log('Logout successful.');
      })
      .catch((error) => {
        console.error('Logout failed:', error.response ? error.response.data : error.message);
        alert('Logout failed. Please try again.');
      });
  };

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
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Fragment>
        <Header onLogout={this.handleLogout} isAuthenticated={isAuthenticated} />
        <div className="container">
          {isAuthenticated ? (
            <Fragment>
              <Sidebar setView={this.setView} />
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
