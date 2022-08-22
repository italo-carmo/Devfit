import React, {useLayoutEffect} from 'react';
import {Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import Container from '../components/Container';
import Workout from '../components/Workout';


const WorkoutList = styled.FlatList` 
    flex:1;
    padding:20px;
`


const AddWorkoutButton = ({onPress}) => {

    const ButtonArea = styled.TouchableHighlight`
        width:30px;
        height:30px;
        justify-content:center;
        align-items:center;
        margin-right:10px
    `
    const ButtonImage = styled.Image`
        width:25px;
        height:25px;
    `

    return (
        <ButtonArea onPress={onPress} underlayColor="transparent">
            <ButtonImage source={require('../assets/add.png')}/>
        </ButtonArea>

    )
}


export default ()=> {
    let navigation = useNavigation()
    let myWorkouts = useSelector(state=>state.user.myWorkouts)
    let dispatch = useDispatch()
    const btnAction = () => {
        navigation.navigate('EditWorkout')
    }
        useLayoutEffect(()=>{
            navigation.setOptions({
                title: 'Meus treinos',
                headerRight: ()=>(
                    <AddWorkoutButton onPress={btnAction}/>
                ),
            })
    },[])

    const handleEdit = (workout) => {
        navigation.navigate('EditWorkout', {workout})
    }

    const handleDelete = (workout) => {
        dispatch({
            type: 'DEL_WORKOUT',
            payload: {
                workout
            }
        })
    }

    
    return(

            <WorkoutList 
                data={myWorkouts}
                renderItem={({item})=><Workout data={item} onEdit={()=>handleEdit(item)} onDel={()=>handleDelete(item)}/>}
                keyExtractor={(item)=>item.id}
                
            />
    )
}