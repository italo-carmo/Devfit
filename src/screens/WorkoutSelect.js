import React, {useLayoutEffect, useState} from 'react';
import {Text} from 'react-native';
import {Button} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import Workout from '../components/Workout';
import {HeaderBackButton} from '@react-navigation/stack';

const WorkoutList = styled.FlatList` 
    flex:1;
`

const Title = styled.Text`
    margin-bottom:10px;
`

const Container = styled.SafeAreaView`
    flex:1
    background-color: #fff;
    margin-right:20px;
    margin-left:20px;
`


export default () => {
    let navigation = useNavigation()
    let dispatch = useDispatch()
    let myWorkouts = useSelector(state=>state.user.myWorkouts)
    let lastWorkout = false;
    let lastWorkout_redux = useSelector(state=>state.user.lastWorkout)


    if (lastWorkout_redux != '') {
        lastWorkout = myWorkouts.find(i=>i.id==lastWorkout_redux)
    }

    const handleReturn = () => {
        navigation.goBack()
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Escolha seu treino',
            tabBarVisible: false,
            headerLeft: ()=> (<Button title="Voltar" onPress={handleReturn}/>)
        })
},[])

const goWorkout = (workout) => {
    navigation.navigate('WorkoutCheckList', {workout})
}


    return (
            <Container>
                {lastWorkout &&
                    <>
                        <Title>Seu último treino foi:</Title>
                        <Workout data={lastWorkout}/>
                    </>
                }
                <Title>Escolha seu treino de hoje:</Title>
               <WorkoutList 
                data={myWorkouts}
                renderItem={({item})=><Workout data={item} onAction={()=>goWorkout(item)}/>}
                keyExtractor={(item)=>item.id}
            />
            </Container>

    )
}