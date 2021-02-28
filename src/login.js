import React from 'react';
class Login extends React.Component {
    render() {
        return(
            <div>
                <h4>Login</h4>
                <table>
                    <tbody>
                        <tr>
                            <td>User Name*</td>
                            <td><input type="text" placeholder="Enter username" className="form-control mb-2" name="username" onChange={this.props.onChangeLogin} value={this.props.username} autoComplete="off" /></td>
                        </tr>
                        <tr>
                            <td>Password*</td>
                            <td><input type="password" placeholder="Enter password" className="form-control mb-2" name="password" onChange={this.props.onChangeLogin} value={this.props.password} autoComplete="off" /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="button" className="btn btn-primary" name="submit" value="Submit" onClick={this.props.handlerLogin} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Login;