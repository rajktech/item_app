import React from 'react';
class Signup extends React.Component {
    render() {
        return(
            <div>
                <h4>Sign UP</h4>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td><input type="text" className="form-control mb-2" placeholder="Enter Name" name="name" onChange={this.props.onChangeSignup} value={this.props.name} autoComplete="off" /></td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td><input type="text"  className="form-control mb-2" placeholder="Enter username" name="username" onChange={this.props.onChangeSignup} value={this.props.username} autoComplete="off" /></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input type="text"  className="form-control mb-2" placeholder="Enter password" name="password" onChange={this.props.onChangeSignup} value={this.props.password} autoComplete="off" /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="button" className="btn btn-primary" name="submit" value="Submit" onClick={this.props.handlerSignup} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Signup;