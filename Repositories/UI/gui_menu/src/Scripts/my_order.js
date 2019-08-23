import React from 'react';
import ReactDOM from 'react-dom'
import OrderSummary from './OrderSummary';
import '../Styles/orderSummary.css';
import SetEnvironment from '../configEnvironment/SetEnvironment'
import AdminHome from '../OnlinePosts/AdminHome'


class My_order extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
                      host:SetEnvironment.getHost_IP(),
                      // save_order_URL:"http://localhost:8080/user/order/save",
                      // Fetch_menu_URL:"http://localhost:8000/user/order/",
                      EmpName:this.props.employeeName,
                      user:1,
                      EmpId:this.props.employeeID,
                      EmpPhone:this.props.employeeContact,
                    total:0,
                    posts :[],
                  qty:0 ,
                  data:[{ "snack_id":0,
                      "name":"",
                     "qty": 0,
                    "price":0,
                     "total":0,}],};
        this.handleChange = this.handleChange.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onAddItem = this.onAddItem.bind(this)
    this.onChangeQty = this.onChangeQty.bind(this)
    this.onChangePrice = this.onChangePrice.bind(this)
    this.CalculateTotal = this.CalculateTotal.bind(this)
    this.SetId = this.SetId.bind(this)
    this.SetName = this.SetName.bind(this)
    this.SetPhone = this.SetPhone.bind(this)
    this.SaveOrderDetails = this.SaveOrderDetails.bind(this)
    
    


      }
      
      componentDidMount(){
        if(this.state.EmpId==undefined)
        {
          this.setState({
            EmpId :  localStorage.getItem('employeeId'),
            EmpName : localStorage.getItem('employeeName'),
            EmpPhone : localStorage.getItem('employeeContact'),
        });
        }
          const Fetch_menu_URL="http://"+this.state.host+":8000/user/order/";
        fetch(Fetch_menu_URL)
        .then( response => response.json())
        .then(
            // handle the result
            (result) => {
                this.setState({
                    isLoaded : true,
                    posts : result
                });
            },
            // Handle error 
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            },
        )
      }

      onAddItem() {
        //this.setState(state => {
       // const list = state.list.concat(state.value);})
       this.setState({ list: this.state.list.concat(6) })
         }
    
      handleChange(event) {
       // this.setState({value: event.target.value});
        this.setState({qty: event.target.value});



      }


      onChangeQty(e,index){
      //  let value = e.target.value
      let value = e.target.value
    
      this.setState((state)=>{
    
          let postTemp = state.data
          postTemp[index].qty = value
          
          postTemp[index].total=postTemp[index].qty*postTemp[index].price
        this.CalculateTotal()
          
        })
    }

    onChangePrice(e,index){
      let value = e.target.value
      let name=""
      let price=0
      this.state.posts.map((post)=>
    {  if(post.id==e.target.value)
      {price=post.price
      name=post.name }
    }      
    )
      this.setState((state)=>{
    
          let postTemp = state.data
          postTemp[index].price = price
          postTemp[index].name = name
          postTemp[index].snack_id = value
          postTemp[index].total=postTemp[index].qty*postTemp[index].price
          this.CalculateTotal()  
        })
    }

      onChangeValue = event => {
        this.setState({ value: event.target.value });
        this.setState({ list: this.state.list.concat(6) });
        console.log(this.state.list)
      };


          handleAddShareholder = () => {
            this.state.data.push({
                 "snack_id":0,
                "name":"",
                "qty": 0,
                "price":0,
                "total":0,
            })
            this.setState({data:this.state.data})
          };

        CalculateTotal()
        {let Sum=0;
            this.state.data.map((post)=>(
              Sum=Sum+post.total
            )
            )
              this.setState({total:Sum})
            console.log(this.state.EmpId);
            console.log(this.state.EmpName);
            console.log(this.state.EmpPhone);

            

        }

  
        removePeople(index) {
          var array = [...this.state.data]; // make a separate copy of the array
         // var index = array.indexOf(e.target.value)
          if (index !== 0) {
            array.splice(index, 1);
            this.setState({data: array});
            let Sum=0;
            array.map((post)=>(
              Sum=Sum+post.total
            )
            )
              this.setState({total:Sum})
          }
          console.log(this.state.data)
      //    this.CalculateTotal()
        }   

        SetId(e)
        {
          this.setState({EmpId: e.target.value})
        }

        SetName(e)
        {
          this.setState({EmpName:e.target.value})
        }
        datee() {
          var x = new Date();
          var y = x.getFullYear().toString();
          var m = (x.getMonth() + 1).toString();
          var d = x.getDate().toString();
          (d.length == 1) && (d = '0' + d);
          (m.length == 1) && (m = '0' + m);
          var yyyymmdd = y +"-"+ m +"-"+ d;
          return yyyymmdd;
          }

        SetPhone(e)
        {
          this.setState({EmpPhone:e.target.value})
        }

        SendData()
        {
           ;

           this.state.data.map((arr1,index1)=>
           this.state.data.map((arr2,index2)=>
              
                {
                  if(arr1.snack_id==arr2.snack_id && index1<index2)
                  {
                    this.state.data[index1].total=this.state.data[index1].total+arr2.total;
                    this.state.data[index1].qty=Number(this.state.data[index1].qty)+Number(arr2.qty);
                    this.state.data.splice(index2, 1);
                    // this.removePeople(index2)
                  //  this.setState({data:this.state.data});
                    //index2=index2-1;
                  }
                }
              
           )//arr2
           )//arr1
         
        }

        SaveOrderDetails(event) {
          this.SendData();
          const save_order_URL="http://"+this.state.host+":8080/user/order/save";
          fetch(save_order_URL, {

            method: 'POST',
            headers: {
              
              "Content-type": "application/json; charset=UTF-8"
              
            },
            body: JSON.stringify({
              emp_id: this.state.EmpId,
          emp_name: this.state.EmpName,
          cart_id: null,
          ph_no: this.state.EmpPhone,
          Snack: this.state.data,
          datetime: this.datee(),
          total: this.state.total,
          tnx_id: null,
          payment_status: "pending"
            }),
          }).then(response => {
                  console.log(response)
              return response.text()
            }).then(json => {
              this.setState({ 
                user: json
              }, () => {
                this.newpage();
              });
            });
            event.preventDefault();   
        }
        newpage = ()=>ReactDOM.render(<OrderSummary orderSummaryData ={this.state.data} 
          orderId = {this.state.user} OrderTotal={this.state.total}
          EmployeeId = {this.state.EmpId} EmployeeContact = {this.state.EmpPhone} />, document.getElementById('root'));
        

 render()    
  {
      return (
        <div>
          <h1>INCEDO</h1>
          <div id="abc">.</div>
          <br/>
          <h2>PLACE MENU</h2>
          <br/>
          <div class="gray1">
            <div class="white2">
              <form onSubmit={this.SaveOrderDetails}>
                {/* <table>
                  <tr><td><label>Emp Id</label></td><td><input type="text" name="empId" maxLength='6' minLength='6' onChange={this.SetId} required></input></td>
                  <td><label>Emp name</label></td><td><input type="text" name="empname" onChange={this.SetName} required></input></td>
                  <td><label>contact no.</label></td><td><input type="text" name="contactNo." id="Contact" pattern="[0-9]*" onChange={this.SetPhone} maxLength='10' minLength='10' required></input></td></tr>
                </table> */}
                <table>
                  <tr >
                    <td class="TRLABEL"><label>Employee ID :</label><label>{this.state.EmpId}</label></td><td></td>
                    <td class="TRLABEL"><label>Employee Name :</label><label>{this.state.EmpName}</label></td><td></td>
                    <td class="TRLABEL"><label>Employee Contact :</label><label>{this.state.EmpPhone}</label></td><td></td>
                  </tr>
                </table>
          
                <table>
                  <tr>
                            <th>Menu </th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th> </th>
                  </tr>
                  { this.state.data.map((post,index)=> 
                    <tr>
                      <td><select 
                      onChange={(e)=>this.onChangePrice(e,index)} required>
                                <option value="" disabled selected>Select your option</option>
                                {
                                    this.state.posts.map(post => (
                                  !post.is_active? "" : <option name='price' onChange={(e)=>this.onChangePrice(e,index)} value={post.id}>{post.name}</option> 
                                  
                                    ))
                                }
                          </select>
                      </td>
                      <td><input type="number"  min="0" name='qty' onChange={(e)=>this.onChangeQty(e,index)} required/> </td>
                      <td><input class="inp" value={post.price} readonly/></td>
                      <td><input class="inp" value={post.total} readonly/></td>
                      <td><button type="button" class="addBu" onClick={() => this.removePeople(index)}><h3>x</h3></button>  </td>
                    </tr>)}
                </table>
                <br/><br/><br/>
                <button type="button" class="AddB" onClick={this.handleAddShareholder}>ADD ITEM</button>
                <br/><br/><br/>
                <h1 class="tot"><i class="fa fa-inr" /> {this.state.total}</h1><br/><br/><br/>
                <button class="custB" type="submit">ADD TO CART</button>
                <br/><br/>
              </form>
            </div>
          </div>  
        </div>  
      );      
  }
}

export default My_order;