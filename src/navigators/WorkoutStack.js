import {createStackNavigator} from '@react-navigation/stack';
import WorkoutSelect from '../screens/WorkoutSelect'
import WorkoutChecklist from '../screens/WorkoutChecklist'

const WorkoutStack = createStackNavigator()

//tiramos o header deste stack principal para o usuário não conseguir trocar de stack sozinho

export default () => (
    <WorkoutStack.Navigator screenOptions={{cardStyle: { backgroundColor: '#fff' }}}>
        <WorkoutStack.Screen name="WorkoutSelect" component={WorkoutSelect}/>
        <WorkoutStack.Screen name="WorkoutCheckList" component={WorkoutChecklist}/>
    </WorkoutStack.Navigator>
)
