import React from 'react';
import axios from 'axios';

class Form extends React.Component
{
    //instatiate object to use ref which will be used to pass user input to form event handler
   // userNameInput = React.createRef();
    //handling event for form submit , event passed as parameter

    state = {userName: ''};
    
    handleSubmit = async (event)=>{

        event.preventDefault(); //so that without even if we submit the form, page will refresh, we need to stop that
        //console.log(this.userNameInput.current.value);
        console.log(this.state.userName);

        //use axios to call api and get result, axios returns a promise stored in response object
        const resp= await axios.get(`https://api.github.com/users/${this.state.userName}`);

        //using function reference passed from app
        this.props.onSubmit(resp.data);

        //reset username field
        this.setState({userName:''});
    };
    render(){
        return(
            <form onSubmit={this.handleSubmit}>{/*passing handler event for form */}
                {/*<input type="text" ref={this.userNameInput} placeholder="Github username" required/>*/}
                <input type="text" value={this.state.userName} 
                    onChange={event => this.setState({userName:event.target.value})} 
                    placeholder="Github username" required/>
                <button>Add new card</button>
            </form>
        );
    }
}

export default Form;