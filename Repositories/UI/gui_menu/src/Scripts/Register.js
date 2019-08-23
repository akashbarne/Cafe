import React from 'react';
import '../Styles/orderSummary.css';
import incedo from '../download.png'
import App from '../App';
import ReactDOM from 'react-dom';
import SetEnvironment from '../configEnvironment/SetEnvironment'


class Register extends React.Component {

  constructor(props){
      super(props);
      this.state = { //state is by default an object
        host:SetEnvironment.getHost_IP(),
        registration_URL:"http://localhost:8080/register",
        Registration_status:"NOT registered",
        EmployeeId : "",
        EmployeeName:"",
        EmployeeContact : "",
        userName : "",
        password:"",
        role:this.props.role
     }
     this.handleEmployeeName = this.handleEmployeeName.bind(this);
     this.handleEmployeeId = this.handleEmployeeId.bind(this);
     this.handleEmployeeContact = this.handleEmployeeContact.bind(this);
     this.handlepassword = this.handlepassword.bind(this);
     this.registerUser = this.registerUser.bind(this);

  }

  componentDidMount(){
    this.setState({ 
      registration_URL:"http://"+this.state.host+":8080/register"
      });
}

  handleEmployeeName(e){
    this.setState({EmployeeName:e.target.value});
  }
  handleEmployeeId(e){
    this.setState({EmployeeId:e.target.value,
                  userName:e.target.value
                  });
  }
  handleEmployeeContact(e){
    this.setState({EmployeeContact:e.target.value});
  }
  handlepassword(e){
    this.setState({password:e.target.value});
  }

  registerUser(event){
    fetch(this.state.registration_URL, {
      method:'POST',
      headers: {     
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        login_details :{
          username:this.state.userName,
          password:this.state.password,
          role:this.state.role
        },
        
        user_details :{
          emp_id: this.state.EmployeeId,
          name:this.state.EmployeeName,
          phone_no: this.state.EmployeeContact
        }
      }),
  }).then(response => {
console.log(response)
          return response.text()
      }).then(json => {
          this.setState({ 
              Registration_status:json
          }, () => {
            alert(this.state.Registration_status);
            if(this.state.Registration_status=="Successfully Register" || this.state.Registration_status=="User Exist"){
              ReactDOM.render(<App/>, document.getElementById('root'))
            }else if(this.state.Registration_status=="Failed To register"){
              ReactDOM.render(<Register/>, document.getElementById('root'))
            }
          });
      });
      event.preventDefault();   
  }
  render(){
    return(
          <div > 
            <center>
              <img src={incedo} alt="Incedo Logo" width="50%"/>
              </center>
              <form onSubmit={this.registerUser}>
                <table >
                <tr><td><label>EMPLOYEE NAME</label></td><td><input type="text"  name="name"  onChange={this.handleEmployeeName}  required></input></td></tr>
                <tr><td><label>EMPLOYEE ID</label></td><td><input type="text"  name="Id"  onChange={this.handleEmployeeId} pattern="[0-9]*" maxLength='6' minLength='6' required></input></td></tr>
                <tr><td><label>Contact No.</label></td><td><input type="text"  name="contact"  onChange={this.handleEmployeeContact} pattern="[0-9]*" maxLength='10' minLength='10' required></input></td></tr>
                <tr><td><label>Password</label></td><td><input type="password"  name="password"  onChange={this.handlepassword}></input></td></tr>
                </table>
                 <center><input class ="getD" type="submit" value="Sign Up" /></center>
                 </form>
          </div>   

    )
  }
}

export default Register;