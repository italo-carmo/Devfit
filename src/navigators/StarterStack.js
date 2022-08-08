import {createStackNavigator} from '@react-navigation/stack';
import StarterIntro from '../screens/StarterIntro';
import StarterName from '../screens/StarterName';
//import AppTab from './AppTab';

const StarterStack = createStackNavigator()

//tiramos o header deste stack principal para o usuário não conseguir trocar de stack sozinho

export default () => (
    <StarterStack.Navigator>
        <StarterStack.Screen name="StarterIntro" component={StarterIntro}/>
        <StarterStack.Screen name="StarterName" component={StarterName}/>
    </StarterStack.Navigator>
)
