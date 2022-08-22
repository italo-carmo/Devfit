import {createStackNavigator} from '@react-navigation/stack';
import MyWorkoutScreen from '../screens/MyWorkoutScreen'

const WorkoutStack = createStackNavigator()

//tiramos o header deste stack principal para o usuário não conseguir trocar de stack sozinho

export default () => (
    <WorkoutStack.Navigator screenOptions={{cardStyle: { backgroundColor: '#fff' }}}>
        <WorkoutStack.Screen name="My Workout" component={MyWorkoutScreen}/>
    </WorkoutStack.Navigator>
)
