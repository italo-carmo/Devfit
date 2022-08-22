import React, {useState, useLayoutEffect, useEffect} from 'react'
import {Text} from 'react-native'
import Container from '../components/Container';
import styled from 'styled-components/native';
import Workout from '../components/Workout';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import workoutJson from '../../presetWorkouts.json';

const HeaderText = styled.Text`
    font-size:15px;
    text-align:center;
    color: #333;
    margin-top:10px;
    margin-bottom:30px;
`

const NextButton = styled.Button`
  
`

const BoldText = styled.Text`
    font-weight:bold;
`
const WorkoutList = styled.FlatList`
    width:100%;
`

const StarterRecommendation = () => {
    const navigation = useNavigation()
    const myWorkouts_redux = useSelector(state=>state.user.myWorkouts)
    const [btntxt, setBtntxt] = useState('Ignorar') 
    const [myWorkouts, setMyWorkouts] = useState(myWorkouts_redux)
    const dispatch = useDispatch()
    const nextAction = () => {
        navigation.reset({index:0, routes:[{name:'AppTab'}]})
    }
    useLayoutEffect(()=>{
        if(myWorkouts.length > 0) {
            setBtntxt('Concluir')
        } else {
            setBtntxt('Ignorar')
        }
        navigation.setOptions({
            title: '',
            headerRight: ()=> (
                <NextButton title={btntxt} onPress={nextAction}/>
            ),
            headerRightContainerStyle: {paddingRight:10}
        })
        
    }, [myWorkouts, btntxt])

    const addWorkout = (workout) => {
        let new_workouts = [...myWorkouts]
        if (myWorkouts.findIndex(i=>i.id==workout.id) < 0) {
            new_workouts.push(workout)
            setMyWorkouts(new_workouts)
            dispatch({
                type: 'ADD_WORKOUT',
                payload: {
                    workout
                }
            })
            
        } else {
            new_workouts = new_workouts.filter(i=>i.id!=workout.id)
            setMyWorkouts(new_workouts)
            dispatch({
                type: 'DEL_WORKOUT',
                payload: {
                    workout
                }
            })
            
        }
        
    }

    return(
        <Container style={{paddingLeft:20,paddingRight:20}}>
            <HeaderText>Opções de treino baseadas no seu nível</HeaderText>
            <HeaderText>Você selecionou <BoldText>{myWorkouts.length}</BoldText> treinos</HeaderText>

            <WorkoutList 
                data={workoutJson}
                renderItem={({item})=><Workout data={item} onAdd={()=>addWorkout(item)}/>}
                keyExtractor={(item)=>item.id}
            />
            <Text>{myWorkouts_redux.length }</Text>
        </Container>
    )
}

export default StarterRecommendation