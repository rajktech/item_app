import React from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import Itemlist from './Itemlist';
import Additem from './Additem';
import Dashboard from './Dashboard';
import Signup from './signup';
import Login from './login';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state={
      item_list: {},
      item_id: '',
      item_name: '',
      item_price: '',
      item_quantity: '',

      user_list: {},
      name: '',
      username: '',
      password: '',

      isloggedin: false
    };

    this.onChangeForm = this.onChangeForm.bind(this);
    this.handlerAddItem = this.handlerAddItem.bind(this);

    this.onChangeSignup = this.onChangeSignup.bind(this);
    this.handlerSignup = this.handlerSignup.bind(this);

    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.handlerLogin = this.handlerLogin.bind(this);

    this.handleLogout = this.handleLogout.bind(this);
    
  }

  componentDidMount() {
      if (localStorage.getItem('logged_user')) {
        this.setState({isloggedin: true});
      }
  }

  // USING IN ADD ITEM COMPONENT
  handlerAddItem() {
    var item_list = {
      item_id: 0,
      item_name: this.state.item_name,
      item_price: this.state.item_price,
      item_quantity: this.state.item_quantity
    }

    if (item_list.item_name === '' || item_list.item_price === '' || item_list.item_quantity === '') {
        alert("Please fill the required fields.");
        return false;
    }

    var arr = [];
    if (localStorage.getItem('item_list')) {
        arr = JSON.parse(localStorage.getItem('item_list'));
    }
    item_list.item_id = arr.length+1;
    arr.push(item_list);
    localStorage.setItem('item_list', JSON.stringify(arr));
    this.setState({
      item_name: '',
      item_price: '',
      item_quantity: ''
    });
    alert("Added successfully");
  }  

  onChangeForm(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  // USING IN ITEM LIST COMPONENT
  deleteItem(id) {
    if (window.confirm('Are you sure to delete this record?')) {
      var item_arr = localStorage.getItem('item_list');
      if (item_arr) {
        item_arr = JSON.parse(item_arr);
        var new_item_arr = item_arr.filter((value) => value.item_id !== id);
        localStorage.setItem('item_list', JSON.stringify(new_item_arr));
        this.setState({item_list: new_item_arr});
        alert("Deleted Successfully");
      }
    }
  }

  // USING IN SIGNUP COMPONENT
  onChangeSignup(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handlerSignup() {
      var user_list = {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password
      }

      var arr = [];
      if (localStorage.getItem('user_list')) {
        arr =  JSON.parse(localStorage.getItem('user_list'));
      }
      arr.push(user_list);
      localStorage.setItem('user_list', JSON.stringify(arr));
      this.setState({
        name: '',
        username: '',
        password: ''
      });
      alert("User Added successfully");
  }

  // USING IN LOGIN COMPONENT
  handlerLogin() {
    var username = this.state.username;
    var password = this.state.password;
    if (username === '' || password === '') {
        alert("Please fill the required fields.");
    } else {
      var new_arr = [];
      var arr = [];
      if (localStorage.getItem('user_list')) {
        arr = JSON.parse(localStorage.getItem('user_list'));
        new_arr = arr.filter((value) => value.username === username && value.password === password);
      }
      if (new_arr.length > 0) {        
        var logged_user = new_arr[0].username;
        localStorage.setItem('logged_user', logged_user);
        this.setState({isloggedin: true});        
      } else {
        alert("Wrong credentials.");
      }
    }
  }

  onChangeLogin(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  // USING IN LOGOUT COMPONENT
  handleLogout() {
    localStorage.removeItem('logged_user');
    this.setState({isloggedin: false});
  }

  render() {
    return (
      <div className="p-3">
        {this.state.isloggedin ? 
            <button type="button" className="btn btn-primary mb-2">
              Hello {localStorage.getItem('logged_user')}
            </button>
             : null}
        <BrowserRouter>
            <ul className="nav nav-tabs mb-2">
              {this.state.isloggedin ?
                <>
                  <li className="nav-item">
                    <span className="nav-link"><Link to="">Dashboard</Link></span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link"><Link to="/additem">Add New Item</Link></span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link"><Link to="/itemlist">Item List</Link> </span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link"><a href="#" onClick={this.handleLogout}>Logout</a></span>
                  </li>
                </>
              :
              <>
                <li className="nav-item">
                  <a className="nav-link"><Link to="/signup">Sign UP</Link></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"><Link to="/login">LOGIN</Link></a>
                </li>
              </>}
            </ul>

          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/additem">
              <Additem 
                handlerAddItem={this.handlerAddItem} 
                onChangeForm={this.onChangeForm}                
                {...this.state}
              />
            </Route>
            <Route path="/itemlist">
              <Itemlist
                  deleteItem={this.deleteItem}
              />
            </Route>
            <Route path="/signup">
                <Signup
                  onChangeSignup={this.onChangeSignup} 
                  handlerSignup={this.handlerSignup}  
                  {...this.state} 
                />
            </Route>
            
              <Route path="/login">                
                  <Login
                    onChangeLogin={this.onChangeLogin} 
                    handlerLogin={this.handlerLogin}  
                    {...this.state} 
                    {...this.props}
                  />
              </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }  
}

export default MainContainer;
