import {createStackNavigator} from '@react-navigation/stack';
import Preload from '../screens/Preload';
import StarterStack from './StarterStack';
import AppTab from './AppTab';

const MainStack = createStackNavigator()

//tiramos o header deste stack principal para o usuário não conseguir trocar de stack sozinho

export default () => (
    <MainStack.Navigator screenOptions={{headerShown:false, cardStyle: { backgroundColor: '#fff' }}}>
        <MainStack.Screen name="Preload" component={Preload}/>
        <MainStack.Screen name="StarterStack" component={StarterStack}/>
        <MainStack.Screen name="AppTab" component={AppTab}/>
    </MainStack.Navigator>
)
