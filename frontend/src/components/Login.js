import React, { Component } from 'react';
import { login } from '../services/api';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            role: '', // Tracks whether login is for Admin or User
            error: null,
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (role) => (e) => {
        e.preventDefault();
        const { username, password } = this.state;

        // Call the login function
        login(username, password)
            .then((response) => {
                const { access, refresh } = response.data;

                // Save tokens to localStorage
                localStorage.setItem('accessToken', access);
                localStorage.setItem('refreshToken', refresh);

                alert(`${role} Login Successful!`);

                // Clear the form
                this.setState({
                    username: '',
                    password: '',
                    role: '',
                    error: null,
                });

                // Redirect if needed
                this.props.onLogin && this.props.onLogin();
            })
            .catch(() => {
                this.setState({ error: 'Invalid username or password.' });
            });
    };

    render() {
        const { username, password, error } = this.state;

        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '100vh',
                    padding: '0 175px',
                    backgroundColor: '#f4f4f4',
                    overflow: 'hidden',
                }}

            >
                {/* Admin Login Form */}
                <div
                    style={{
                        backgroundColor: '#fff',
                        padding: '40px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        width: '400px',
                        textAlign: 'center',
                        marginTop: '500px',
                        marginBottom: '500px',
                    }}
                >
                    <h2 style={{ color: '#4CAF50', marginBottom: '20px' }}>Admin Login</h2>
                    <form onSubmit={this.handleSubmit('Admin')} style={{ textAlign: 'left' }}>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="username-admin" style={{ display: 'block', marginBottom: '5px' }}>
                                Username
                            </label>
                            <input
                                type="text"
                                id="username-admin"
                                name="username"
                                value={username}
                                onChange={this.handleChange}
                                placeholder="Enter your username"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="password-admin" style={{ display: 'block', marginBottom: '5px' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                id="password-admin"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                                placeholder="Enter your password"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '16px',
                            }}
                        >
                            Admin Login
                        </button>
                    </form>
                    {error && (
                        <p style={{ marginTop: '15px', color: 'red', fontSize: '14px' }}>
                            {error}
                        </p>
                    )}
                </div>

                {/* User Login Form */}
                <div
                    style={{
                        backgroundColor: '#fff',
                        padding: '40px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        width: '400px',
                        textAlign: 'center',
                        marginTop: '5px',
                        marginBottom: '5px',
                    }}
                >
                    <h2 style={{ color: '#007BFF', marginBottom: '20px' }}>User Login</h2>
                    <form onSubmit={this.handleSubmit('User')} style={{ textAlign: 'left' }}>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="username-user" style={{ display: 'block', marginBottom: '5px' }}>
                                Username
                            </label>
                            <input
                                type="text"
                                id="username-user"
                                name="username"
                                value={username}
                                onChange={this.handleChange}
                                placeholder="Enter your username"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="password-user" style={{ display: 'block', marginBottom: '5px' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                id="password-user"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                                placeholder="Enter your password"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#007BFF',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '16px',
                            }}
                        >
                            User Login
                        </button>
                    </form>
                    {error && (
                        <p style={{ marginTop: '15px', color: 'red', fontSize: '14px' }}>
                            {error}
                        </p>
                    )}
                </div>
            </div>
        );
    }
}

export default Login;


// import React, { Component } from 'react';
// import { login } from '../services/api';

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             password: '',
//             error: null,
//         };
//     }

//     handleChange = (e) => {
//         this.setState({ [e.target.name]: e.target.value });
//     };

//     handleSubmit = (e) => {
//         e.preventDefault();
//         const { username, password } = this.state;

//         login(username, password)
//             .then((response) => {
//                 const { access, refresh } = response.data;
//                 localStorage.setItem('accessToken', access);
//                 localStorage.setItem('refreshToken', refresh);
//                 this.props.onLogin();
//             })
//             .catch((error) => {
//                 this.setState({ error: 'Invalid username or password' });
//             });
//     };

//     render() {
//         const { username, password, error } = this.state;

//         return (
//             <fragment>
//                 <h2>Login</h2>
//                 <form onSubmit={this.handleSubmit}>
//                     <input
//                         type="text"
//                         name="username"
//                         value={username}
//                         onChange={this.handleChange}
//                         placeholder="Username"
//                         required
//                     />
//                     <input
//                         type="password"
//                         name="password"
//                         value={password}
//                         onChange={this.handleChange}
//                         placeholder="Password"
//                         required
//                     />
//                     <button type="submit">Login</button>
//                 </form>
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//             </fragment>
//         );
//     }
// }

// export default Login;


