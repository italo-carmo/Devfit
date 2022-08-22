import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'
import HomeConfig from '../screens/HomeConfig'

const HomeStack = createStackNavigator()

//tiramos o header deste stack principal para o usuário não conseguir trocar de stack sozinho

export default () => (
    <HomeStack.Navigator screenOptions={{cardStyle: { backgroundColor: '#fff' }}}>
        <HomeStack.Screen 
            name="HomeScreen" 
            component={HomeScreen} 
            />
        <HomeStack.Screen 
            name="HomeConfig" 
            component={HomeConfig} 
            />
    </HomeStack.Navigator>
)
