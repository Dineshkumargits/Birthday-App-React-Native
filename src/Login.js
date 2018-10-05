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
    marginTop: 100,
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
    background:'#5cb85c',
  },
  redirectRegister: {
    marginTop:10,
    marginLeft: 135,
  }
};

// These Fields will create a login form with three fields
const fields = [
  {
    type: 'email',
    name: 'email',
    icon: 'mail',
    required: true,
    label: 'Email',
  },
  {
    type: 'password',
    name: 'password',
    icon: 'lock',
    required: true,
    label: 'Password',
  },

];
export default class Login extends Component {
  static navigationOptions = {
    title:'Login',
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
  register() {
    const formValues = this.formGenerator.getValues();
    var Password = formValues['password'];
    var Email = formValues['email'];
    this.setState({visible:true})
      fetch('https://skills.adkdinesh.ml/user/react_login',{
      method:'POST',
      headers : {
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        password:Password,
        email:Email,
      }),
    }).then((response)=>response.json())
      .then((responseJson)=>{
        if(responseJson=="Login Successful"){
          this.props.navigation.navigate("Home");
        }else{
          alert(responseJson);
        }
        this.setState({visible:false})
      })
      .catch((error)=>{
        console.error(error);
        alert(error);
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
          <Button visible={!this.state.visible} block onPress={() => this.register()}>
            <Text>Login</Text>
          </Button>
        </View>
        <View style={styles.redirectRegister}>
          <Text onPress={()=>this.props.navigation.navigate("Register")}>Not having Account</Text>
        </View>
        </View>
    );
  }
}
 
AppRegistry.registerComponent('FormGenerator', () => Login);