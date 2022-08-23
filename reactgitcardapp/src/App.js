import './App.css';
import React from 'react';
import Cardlist from './components/Cardlist';
import Form from './components/Form';

/*const App =({title})=>{
  return(
    <div className='header'>{title}</div>
  );
}*/

/*const testData = [
  {
      name: "Dan Abramov", 
      avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", 
      company: "@facebook"
  },
  {
      name: "Sophie Alpert", 
      avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", 
      company: "Humu"
  },
  {
      name: "Sebastian Markbåge", 
      avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", 
      company: "Facebook"
  }
];*/

class App extends React.Component
{
  //property passed is declared in constructor
  /*constructor(props){
    super(props);
    //current state populated with test data object which can be access via this.state.property name used
    //in this case this.state.profiles
    this.state={
      profiles:testData,
    };
  }*/
  //instead of constructor use below declaration
  state ={
    //profiles: testData,
    profiles: []
  };
  //function to add github profile
  addProfile = (profileData)=>{
    console.log(profileData);
    this.setState(prevState=>({
      //append new profiledata to existing profiles object
      profiles: [...prevState.profiles,profileData]
    }));
  };
  render(){
    return(
      <div>
        {/*title is passed as parameter to app and shown */}
        <div className="header">{this.props.title}</div>
        {/*pass function reference so that it can change state of object in App*/}
        <Form onSubmit={this.addProfile}/>
        {/*current state profile passed */}
        <Cardlist profiles={this.state.profiles}/>
      </div>    
    );
  }
}


export default App;
