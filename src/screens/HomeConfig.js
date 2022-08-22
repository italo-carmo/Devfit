import React, {useLayoutEffect, useState} from 'react';
import {Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import Container from '../components/Container';


const Label = styled.Text`
    font-size:15px;
    font-weight:bold;
    margin-top:20px;
    margin-bottom:10px;
`

const Input = styled.TextInput`
    border: 1px solid #ccc;
    width:100%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
`

const ListArea = styled.View`
    flex-direction:row;
    justify-content:space-between;
    width:100%;
`

const DayItem = styled.TouchableHighlight`
    width:30px;
    height:30px;
    border-radius:5px;
    background-color: ${props=>props.bgcolor};
    justify-content:center;
    align-items:center;
`

const DayItemText = styled.Text`

`

const NivelItem = styled.TouchableHighlight`
    background-color: ${props=>props.bgcolor};
    height:30px;
    border-radius:5px;
    justify-content:center;
    align-items:center;
    padding: 0px 15px

`

const NivelItemText = styled.Text`

`

const ResetButton = styled.TouchableHighlight`
    width:200px;
    height:50px;
    justify-content:center;
    align-items:center;
    border-radius:10px;
    background-color: #a5e8bc
    margin-top:30px;
`

const ResetButtonText = styled.Text`
    
`

export default () => {
    let navigation = useNavigation()
    let dispatch = useDispatch()
    let name_redux = useSelector(state=>state.user.name)
    let workoutDays_redux = useSelector(state=>state.user.workoutDays)
    let level_redux = useSelector(state=>state.user.level)
    const [name, setName] = useState(name_redux)
    const [level, setLevel] = useState(level_redux)
    const [workoutDays, setWorkoutDays] = useState(workoutDays_redux)
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Configurações',
        })
},[])

    const handleChangeName = (name) => {
        dispatch({
            type: 'SET_NAME',
            payload: {
                name
            }
        })
        setName(name)
    }

    const changeLevel = (level) => {
        dispatch({
            type: 'SET_LEVEL',
            payload: {
                level
            }
        })
        setLevel(level)
    }

    const changeWorkoutDays = (day) => {
        let new_workout_days = [...workoutDays]
        if (workoutDays.includes(day)) {
            if (new_workout_days.length == 1) {
                alert('Calma aê! Você precisa treinar pelo menos um dia')
            } else {
                new_workout_days =  new_workout_days.filter(i=>i!=day)
            }
            
        } else {
            new_workout_days.push(day)
        }
        dispatch({
            type: 'SET_WORKOUT_DAYS',
            payload: {
                workoutDays: new_workout_days
            }
        })
        setWorkoutDays(new_workout_days)
    }

    const handleReset = () => {
        dispatch({
            type: 'RESET',
            payload: {

            }
        })
        navigation.navigate('Preload')
    }


    return (
        <Container>
            <Label>Seu nome completo:</Label>
            <Input value={name} onChangeText={handleChangeName}/>
            <Label>Dias em que você treina:</Label>
            <ListArea>
                <DayItem bgcolor={workoutDays.includes(1) ? '#a5e8bc' : '#eee'} onPress={()=>changeWorkoutDays(1)} underlayColor="transparent">
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem bgcolor={workoutDays.includes(2) ? '#a5e8bc' : '#eee'} onPress={()=>changeWorkoutDays(2)} underlayColor="transparent">
                    <DayItemText>T</DayItemText>
                </DayItem>
                <DayItem bgcolor={workoutDays.includes(3) ? '#a5e8bc' : '#eee'} onPress={()=>changeWorkoutDays(3)} underlayColor="transparent">
                    <DayItemText>Q</DayItemText>
                </DayItem>
                <DayItem bgcolor={workoutDays.includes(4) ? '#a5e8bc' : '#eee'} onPress={()=>changeWorkoutDays(4)} underlayColor="transparent">
                    <DayItemText>Q</DayItemText>
                </DayItem>
                <DayItem bgcolor={workoutDays.includes(5) ? '#a5e8bc' : '#eee'} onPress={()=>changeWorkoutDays(5)} underlayColor="transparent"> 
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem bgcolor={workoutDays.includes(6) ? '#a5e8bc' : '#eee'} onPress={()=>changeWorkoutDays(6)} underlayColor="transparent">
                    <DayItemText>S</DayItemText>
                </DayItem>
                <DayItem bgcolor={workoutDays.includes(0) ? '#a5e8bc' : '#eee'} onPress={()=>changeWorkoutDays(0)} underlayColor="transparent">
                    <DayItemText>D</DayItemText>
                </DayItem>
            </ListArea>

            <Label>Seu nível:</Label>
            <ListArea>
                <NivelItem bgcolor={level=='begginer' ? '#a5e8bc' : '#eee'} onPress={()=>changeLevel('begginer')} underlayColor="transparent">
                    <NivelItemText>Iniciante</NivelItemText>
                </NivelItem>
                <NivelItem bgcolor={level=='intermediate' ? '#a5e8bc' : '#eee'} onPress={()=>changeLevel('intermediate')} underlayColor="transparent">
                    <NivelItemText>Intermediário</NivelItemText>
                </NivelItem>
                <NivelItem bgcolor={level=='advanced' ? '#a5e8bc' : '#eee'} onPress={()=>changeLevel('advanced')} underlayColor="transparent">
                    <NivelItemText>Avançado</NivelItemText>
                </NivelItem>
            </ListArea>

            <ResetButton onPress={handleReset} underlayColor="transparent">
                <ResetButtonText>Resetar Dados do APP</ResetButtonText>
            </ResetButton>
        </Container>
    )
}