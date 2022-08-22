import {createStackNavigator} from '@react-navigation/stack';
import StarterIntro from '../screens/StarterIntro';
import StarterName from '../screens/StarterName';
import StarterDias from '../screens/StarterDias'
import StarterNivel from '../screens/StarterNivel'
import StarterRecommendation from '../screens/StarterRecommendation'

//import AppTab from './AppTab';

const StarterStack = createStackNavigator()

//tiramos o header deste stack principal para o usuário não conseguir trocar de stack sozinho

export default () => (
    <StarterStack.Navigator screenOptions={{cardStyle: { backgroundColor: '#fff' }}} initialRouteName="StarterIntro">
        <StarterStack.Screen name="StarterIntro" component={StarterIntro}/>
        <StarterStack.Screen name="StarterName" component={StarterName}/>
        <StarterStack.Screen name="StarterDias" component={StarterDias}/>
        <StarterStack.Screen name="StarterNivel" component={StarterNivel}/>
        <StarterStack.Screen name="StarterRecommendation" component={StarterRecommendation}/>
    </StarterStack.Navigator>
)
