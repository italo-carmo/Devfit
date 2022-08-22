import React, {useState, useLayoutEffect, useEffect} from 'react'
import {Text} from 'react-native'
import Container from '../components/Container';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton'
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

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

const DaysArea = styled.View`
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:space-between;
`

const ButtonText = styled.Text`
    color: ${props=>props.color || '#000'}
`

const StarterDias = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const name = useSelector(state=>state.user.name).split(' ')[0]
    var workout_days_redux = useSelector(state=>state.user.workoutDays)
    const [workoutDays, setWorkoutDays] = useState(workout_days_redux)
    
    const dispatch = useDispatch()
    const nextAction = () => {
        if(!workoutDays || !workoutDays.length) {
            alert('Ei, você precisa pelo menos treinar um dia!')
            return
        } 
        navigation.navigate('StarterNivel')
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: '',
            headerRight: ()=> (
                <NextButton title="Próximo" onPress={nextAction}/>
            ),
            headerRightContainerStyle: {paddingRight:10}
        })
    }, [workoutDays])

    const toggleDay = (day) => {
        if (!workoutDays.includes(day)) {
            var newWorkoutDays = [...workoutDays]
            newWorkoutDays.push(day)
            setWorkoutDays(newWorkoutDays)
        } else {
            var newWorkoutDays = workoutDays.filter(item=>item != day)
            setWorkoutDays(newWorkoutDays)
            
        }
        
        dispatch({
            type: 'SET_WORKOUT_DAYS',
            payload: {
                workoutDays: newWorkoutDays
            }
        })
    }


    return(
        <Container style={{paddingLeft:20,paddingRight:20}}>
            <HeaderText>Opa <BoldText>{name}</BoldText>, tudo bem?</HeaderText>
            <HeaderText>Quantos <BoldText>dias por semana</BoldText> você pretende treinar?</HeaderText>

            <DaysArea>
                <DefaultButton bgcolor={workoutDays.includes(1) ? '#a5e8bc' : false} width={'100px'} style={{marginBottom:20}} underlayColor="#ccc" onPress={()=>toggleDay(1)}>
                    <ButtonText>Segunda</ButtonText>
                </DefaultButton>
                <DefaultButton bgcolor={workoutDays.includes(2) ? '#a5e8bc' : false} width={'100px'} style={{marginBottom:20}} underlayColor="#ccc" onPress={()=>toggleDay(2)}>
                    <ButtonText>Terça</ButtonText>
                </DefaultButton>
                <DefaultButton bgcolor={workoutDays.includes(3) ? '#a5e8bc' : false}  width={'100px'} style={{marginBottom:20}} underlayColor="#ccc" onPress={()=>toggleDay(3)}>
                    <ButtonText>Quarta</ButtonText>
                </DefaultButton>
                <DefaultButton bgcolor={workoutDays.includes(4) ? '#a5e8bc' : false} width={'100px'} style={{marginBottom:20}} underlayColor="#ccc" onPress={()=>toggleDay(4)}>
                    <ButtonText>Quinta</ButtonText>
                </DefaultButton>
                <DefaultButton bgcolor={workoutDays.includes(5) ? '#a5e8bc' : false} width={'100px'} style={{marginBottom:20}} underlayColor="#ccc" onPress={()=>toggleDay(5)}>
                    <ButtonText>Sexta</ButtonText>
                </DefaultButton>
                <DefaultButton bgcolor={workoutDays.includes(6) ? '#a5e8bc' : false} width={'100px'} style={{marginBottom:20}} underlayColor="#ccc" onPress={()=>toggleDay(6)}>
                    <ButtonText>Sábado</ButtonText>
                </DefaultButton>
                <DefaultButton bgcolor={workoutDays.includes(0) ? '#a5e8bc' : false} width={'100px'} style={{marginBottom:20}} underlayColor="#ccc" onPress={()=>toggleDay(0)}>
                    <ButtonText>Domingo</ButtonText>
                </DefaultButton>
            </DaysArea>
        </Container>
    )
}

export default StarterDias