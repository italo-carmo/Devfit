import React, {useLayoutEffect, useState} from 'react';
import {Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import Container from '../components/Container';
import HomeMonthScroll from '../components/HomeMonthScroll';
import HomeDaysScroll from '../components/HomeDaysScroll';
import HomeDayStatus from '../components/HomeDayStatus'

const ConfigButtonArea = styled.TouchableHighlight`
    width:30px;
    height:30px;
    justify-content:center;
    align-items:center;
    margin-right:20px;
`

const ConfigButtonImage = styled.Image`
    width:25px;
    height:25px;
`

const Legend = styled.View`
    width:90%;
    align-items:flex-start;
    margin-top:30px;
`

const LegendText = styled.Text`
    color:#555;
`

const LegendItem = styled.View`
    flex-direction:row;
    align-items:center;
    margin-top:5px;
`

const Legendbox = styled.View`
    width:15px;
    height:15px;
    background-color: #ccc;
    margin-right:5px;
`

export default ()=> {
    navigation = useNavigation()
    let today = new Date();
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth())
    const [selectedDay, setSelectedDay] = useState(today.getDate())
    const dailyProgress = useSelector(state=>state.user.dailyProgress)
    const workoutDays = useSelector(state=>state.user.workoutDays)
    const btnAction = () => {
        navigation.navigate('HomeConfig')
    }

        useLayoutEffect(()=>{
            navigation.setOptions({
                title: 'Seu progresso diário',
                headerRight: ()=>(
                    <ConfigButtonArea onPress={btnAction} underlayColor="transparent">
                        <ConfigButtonImage source={require('../assets/config.png')}/>
                    </ConfigButtonArea>
                ),
            })
    },[])

    const delProgress = () => {

    }

    const addProgress = () => {
        
    }

    return(
        <Container flexprop={'none'}>
            <HomeMonthScroll
                month={selectedMonth}
                setMonth={setSelectedMonth}
            />
            <HomeDaysScroll
                month={selectedMonth}
                day={selectedDay}
                setDay={setSelectedDay}
                dailyProgress={dailyProgress}
                workoutDays={workoutDays}
            />
            <HomeDayStatus
                delProgress={delProgress}
                addProgress={addProgress}
                month={selectedMonth}
                day={selectedDay}
                setDay={setSelectedDay}
                dailyProgress={dailyProgress}
                workoutDays={workoutDays}
            />

            <Legend>
                <LegendText>Legenda:</LegendText>
                <LegendItem>
                    <Legendbox style={{backgroundColor: '#B5EEFF'}}></Legendbox>
                    <LegendText>Hoje</LegendText>
                </LegendItem>
                <LegendItem>
                    <Legendbox style={{backgroundColor: '#B5FFD8'}}></Legendbox>
                    <LegendText>Treino feito</LegendText>
                </LegendItem>
                <LegendItem>
                    <Legendbox style={{backgroundColor: '#FFB5B5'}}></Legendbox>
                    <LegendText>Treino perdido</LegendText>
                </LegendItem>
                <LegendItem>
                    <Legendbox style={{backgroundColor: '#F4F4F4', opacity:0.2}}></Legendbox>
                    <LegendText>Dia de descanso</LegendText>
                </LegendItem>
                <LegendItem>
                    <Legendbox style={{backgroundColor: '#F4F4F4'}}></Legendbox>
                    <LegendText>Dia futuro</LegendText>
                </LegendItem>
            </Legend>
        </Container>
    )
}