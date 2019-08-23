import React from 'react';
import ReactDOM from 'react-dom';
import My_order from'./Scripts/my_order';
import './App.css'
import incedo from './download.png'
import AdminHome from './OnlinePosts/AdminHome'
import Register from './Scripts/Register';
import SetEnvironment from './configEnvironment/SetEnvironment'

class App extends  React.Component {
  constructor(props){
    super(props);
    this.state = { //state is by default an object
      host:SetEnvironment.getHost_IP(),
      Base_URL:"http://localhost:8080/login",
      Username:"blank",
      PWD:"blank",
      LoginDetail: [],
   }
   this.handleUsername = this.handleUsername.bind(this);
   this.handlePass = this.handlePass.bind(this);

  }
componentDidMount(){
  localStorage.removeItem('employeeId');
  localStorage.removeItem('employeeName');
  localStorage.removeItem('employeeContact');
  localStorage.removeItem('orderId');

      this.setState({ 
        Base_URL:"http://"+this.state.host+":8080/login"
    });
}
fetchCredintials(){
    if(this.state.Username=="" || this.state.PWD==""){
alert("USER name and Password  are Required Fields");
    }
    else{
      
  fetch( this.state.Base_URL, {
      method:'POST',
      headers: {     
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        username:this.state.Username,
        password:this.state.PWD,
      }),
  }).then(response => {
console.log(response)
          return response.json()
      }).then(json => {
          this.setState({ 
              LoginDetail:json
          }, () => {
            this.changePage();
          });
      });
    }
}

changePage = ()=>{
  // console.log(this.state.LoginDetail.login_details.role)
  if(this.state.LoginDetail.login_details!=null){
if(this.state.LoginDetail.login_details.role=="USER")
{
ReactDOM.render(<My_order employeeID = {this.state.LoginDetail.user_details.emp_id} employeeName={this.state.LoginDetail.user_details.name}
  employeeContact={this.state.LoginDetail.user_details.phone_no}  /> , document.getElementById('root'))
}
else if(this.state.LoginDetail.login_details.role=="ADMIN")
{
ReactDOM.render(<AdminHome employeeID = {this.state.LoginDetail.user_details.emp_id} employeeName={this.state.LoginDetail.user_details.name}
  employeeContact={this.state.LoginDetail.user_details.phone_no} />, document.getElementById('root'))
}
  }
else{
alert("Incorrect Credintials");
}
  


}

handleUsername(e){
  this.setState({Username:e.target.value});
}
handlePass(e){
  this.setState({PWD:e.target.value});
}
  
signUp(){
  ReactDOM.render(<Register role="USER"/>, document.getElementById('root'))
}
  render (){

  return (
    <body>
      <div className="App">
        <header className="App-header">
          <center>
              <img src={incedo} alt="Incedo Logo" width="50%"/>
              <br/><br/><br/>
              <table>
              <tr>
                <td><label>Employee ID</label></td><td><input type="text" placeholder="enter here" name="formUserName"  onChange={this.handleUsername}></input></td>
              </tr>
              <tr>
                <td><label>password</label></td><td><input type="password" placeholder="enter here" name="PWD" onChange={this.handlePass}></input></td>
              </tr>
              <tr>
                <td><button onClick = {()=>this.fetchCredintials()} class="appB">LOGIN</button></td>
                <td><button class="appC" onClick={()=>this.signUp()} >SIGN UP</button></td>
              </tr>
            </table>
          </center>      
        </header>
      </div>
    </body>
  )
  }
}

export default App;