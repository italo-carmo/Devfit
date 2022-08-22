import {createStackNavigator} from '@react-navigation/stack';
import MyWorkoutScreen from '../screens/MyWorkoutScreen'
import EditWorkout from '../screens/EditWorkout'

const MyWorkoutStack = createStackNavigator()

//tiramos o header deste stack principal para o usuário não conseguir trocar de stack sozinho

export default () => (
    <MyWorkoutStack.Navigator screenOptions={{cardStyle: { backgroundColor: '#fff' }}}>
        <MyWorkoutStack.Screen name="MyWorkoutScreen" component={MyWorkoutScreen}/>
        <MyWorkoutStack.Screen name="EditWorkout" component={EditWorkout}/>
    </MyWorkoutStack.Navigator>
)
