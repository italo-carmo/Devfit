import {createStackNavigator} from '@react-navigation/stack';
import Preload from '../screens/Preload';
import StarterStack from './StarterStack';
//import AppTab from './AppTab';

const MainStack = createStackNavigator()

//tiramos o header deste stack principal para o usuário não conseguir trocar de stack sozinho

export default () => (
    <MainStack.Navigator screenOptions={{headerShown:false}}>
        <MainStack.Screen name="Preload" component={Preload}/>
        <MainStack.Screen name="StarterStack" component={StarterStack}/>
    </MainStack.Navigator>
)
