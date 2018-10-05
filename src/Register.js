import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { View, Text, Button } from 'native-base';
import GenerateForm from 'react-native-form-builder';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

 
const styles = {
  wrapper: {
    flex: 1,
    marginTop: 80,
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
    background:'#5cb85c',
  },
  redirectLogin: {
    marginTop:10,
    marginLeft:130,
  }
};

// These Fields will create a login form with three fields
const fields = [
  {
    type: 'text',
    name: 'user_name',
    required: true,
    icon: 'person',
    label: 'Username',
  },
  {
    type: 'password',
    name: 'password',
    icon: 'lock',
    required: true,
    label: 'Password',
  },
  {
    type: 'email',
    name: 'email',
    icon: 'mail',
    required: true,
    label: 'Email',
  },
  {
    type: 'number',
    name: 'mobile_number',
    icon: 'mobile-alt',
    required:true,
    label: 'Mobile No'
  }
];
export default class Register extends Component {
  static navigationOptions = {
    title:'Register',
  }
  constructor() {
    super();
    this.state = {visible: false}
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({
        visible: false
      });
    }, 3000)
  }
  login() {
    const formValues = this.formGenerator.getValues();
    var Username = formValues['user_name'];
    var Password = formValues['password'];
    var Email = formValues['email'];
    var Ph_No = formValues['mobile_number'];
    this.setState({visible:true})
      fetch('https://skills.adkdinesh.ml/user/react_register',{
      method:'POST',
      headers : {
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        user_name:Username,
        password:Password,
        email:Email,
        ph_no:Ph_No,
      }),
    }).then((response)=>response.json())
      .then((responseJson)=>{
        if(responseJson=="Register Successful"){
          this.props.navigation.navigate("Login");
        }else{
          alert(responseJson);
        }
        this.setState({visible:false})
      })
      .catch((error)=>{
        console.error(error);
        alert("Out"+error);
        this.setState({visible:false})
      });
  }
  render() {
    return (
      <View style={styles.wrapper}>
      {
          (this.state.visible)?
         <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
          :  null
        }
        <View>
          <GenerateForm
            ref={(c) => {
              this.formGenerator = c;
            }}
            fields={fields}
          />
        </View>
        <View style={styles.submitButton}>
          <Button visible={!this.state.visible} block onPress={() => this.login()}>
            <Text>Register</Text>
          </Button>
        </View>
        <View style={styles.redirectLogin}>
          <Text onPress={()=>this.props.navigation.navigate("Login")}>Already have an Account!!</Text>
        </View>
        </View>
    );
  }
}
 
AppRegistry.registerComponent('FormGenerator', () => Register);