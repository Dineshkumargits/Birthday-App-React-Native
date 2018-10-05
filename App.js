import {createStackNavigator} from 'react-navigation';
import Login from './src/Login';
import Register from './src/Register';
import Home from './src/Home';

const Navigation = createStackNavigator({
  Login:{
    screen:Login,
  },
  Register:{
    screen:Register,
  },
  Home:{
    screen:Home,
  }
})

export default  Navigation;