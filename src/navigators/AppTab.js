import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyWorkoutStack from './MyWorkoutStack';
import WorkoutStack from './WorkoutStack';
import HomeStack from './HomeStack';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default () => {
    return (
        <Tab.Navigator tabBar={props=>(
            <CustomTabBar
                {...props}
                items={[
                    {
                        type: 'regular',
                        text: 'Início',
                        icon: require('../assets/home.png'),
                        route: 'HomeStack'
                    },
                    {
                        type: 'big',
                        icon: require('../assets/dumbbell.png'),
                        route: 'WorkoutStack'
                    },
                    {
                        type: 'regular',
                        text: 'Meus Treinos',
                        icon: require('../assets/myworkouts.png'),
                        route: 'MyWorkoutStack'
                    },
                ]}
            />
        )}  screenOptions={{headerShown:false}}>
            <Tab.Screen name="HomeStack" component={HomeStack}/>
            <Tab.Screen name="WorkoutStack" component={WorkoutStack} />
            <Tab.Screen name="MyWorkoutStack" component={MyWorkoutStack} />
      </Tab.Navigator>
    )
}