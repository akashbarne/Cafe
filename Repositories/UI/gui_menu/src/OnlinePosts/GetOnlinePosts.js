import React, { Component } from 'react';
import './GetOnline.css'
import ReactDOM from 'react-dom';
import GetDates from './GetDates';
import AdminHome from './AdminHome';
import SetEnvironment from '../configEnvironment/SetEnvironment';

class GetOnlinePosts extends Component {
    constructor(props){
        super(props)
        this.state = {
            host:SetEnvironment.getHost_IP(),
            // menu_disp_URL:"http://localhost:8000/rest/v1/snacks/",
            // menu_update_URL:"http://127.0.0.1:8000/user/order/bulk_create/",
            error : null,
            isLoaded : false,
            posts : [] ,
        }
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount(){
        // this.setState({ 
        //     menu_disp_URL:"http://"+this.state.host+":8000/rest/v1/snacks/",
        //     menu_update_URL:"http://"+this.state.host+":8000/user/order/bulk_create/",
        // });
        this.getData()
    }

    getData(){
        const menu_disp_URL="http://"+this.state.host+":8000/rest/v1/snacks/";
        fetch(menu_disp_URL)
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

    refreshPage(){ 
        window.location.reload(); 
    }

    isActiveChanged(e, index){
        var data = this.state.posts;

        data[index].is_active = false;
        this.setState({
            posts: data
        })
    }

    onChange(e,index){
        let value = e.target.value
        let name = e.target.name
        let price = e.target.price
        this.setState((state)=>{
            let postTemp = state.posts
            postTemp[index][name] = value
            postTemp[index][price] = value
            console.log(value)
            return{
              ...state,
              posts:postTemp
            }
        })
    }

    handleKeyPress(e){
        if(e.target.value === '-'){
            alert("Price can't be negative.");
        }
    }

    handlePostDataSend = () => {
        debugger;
        var myPosts = this.state.posts;
        var data = myPosts.filter(function(post){
            return (post.name!=="" && post.price!=="");
        }).map(function({name, price, is_active}){
            return {name, price, is_active};

        });


        const menu_update_URL="http://"+this.state.host+":8000/user/order/bulk_create/";
        fetch(menu_update_URL, {
            method: 'POST',
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(
                data
            ),
        }).then(() => this.getData())
        alert("Menu Updated Successfully");
      };

    handleAddShareholder = () => {
        this.state.posts.push({
            "id" : 0,
            "name": "",
            "price": 0,
            "is_active": true,
            isNew: true
        })
        this.setState({post:this.state.posts})
      };

    render() {
        const {error, isLoaded, posts} = this.state;
        if(error){
            return <div>Error in loading</div>
        }else if (!isLoaded) {
            return <div>Loading ...</div>
        }else{
            return(
                <div>
                    <h1>INCEDO</h1>
                    <div id="abc">.</div>
                    <br/><br/>
                    <table class="topOne">
                        <tr>
                            <th><h2>MENU CONFIGURATION</h2></th>
                            <th width="850"></th>
                            <th><button onClick={()=>ReactDOM.render(<AdminHome/>, document.getElementById('root'))} class="getD">ADMIN HOME</button></th>
                            <th><button onClick={()=>ReactDOM.render(<GetDates/>, document.getElementById('root'))} class="getD">REPORT GENERATION</button></th>
                        </tr>
                    </table>
                   
                    <div className="container" class="p"><br/>
                        <div class="gray1">
                            <br/><br/>
                            <div class="white2">
                            {/* <br/><br/><br/><br/> */}
                                <table>
                                    <tr>
                                        <th  width="240">Name</th>
                                        <th  width="240">Price</th>
                                        <th  width="240"></th>
                                    </tr>
                                    {posts.map((post,index) => {
                                        return post.is_active ?(
                                            <tr>
                                                <td >{!post.isNew ? post.name : <input type='text' name='name' value={post.name} onChange={(e)=>this.onChange(e,index)} width="200"/>}</td>
                                                <td >{!post.isNew ? post.price : <input type='number' min='0.0' name='price' onKeyPress={(e)=>this.handleKeyPress(e)} value={parseFloat(post.price)} onChange={(e)=>this.onChange(e,index)} width="200"/>}</td>
                                                <td ><button onClick={(e)=>this.isActiveChanged(e,index)} class="cross">X</button></td>
                                            </tr>
                                        ):''
                                    })}
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <th><button type="button" onClick={this.handleAddShareholder} class="addB">ADD MENU ITEM</button></th>
                                        <th></th>
                                        <th><button type="button" id="update" onClick={this.handlePostDataSend } class="updateB">UPDATE MENU</button></th>
                                    </tr>
                                </table>
                                <br/>
                                <br/><br/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
  }
  
  export default GetOnlinePosts;