import React, {useState, useEffect, useRef} from 'react';
import {Text} from 'react-native'
import {Dimensions} from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

const DaysScroll = styled.ScrollView`
    width:100%;
    height:60px;
`

const DayButton = styled.TouchableHighlight`
    width: ${props=>props.width+'px'}
    justify-content:center;
    align-items:center;
`

const DayItem = styled.View`
    width:30px;
    height:30px;
    background-color:#eee;
    border-radius:15px;
    justify-content:center;
    align-items:center;
`

const DayLeg = styled.View`
`

const DayLegText = styled.Text`
    font-size:10px;
    margin-bottom:3px;
`

const DayText = styled.Text`

`

const Day = ({day, month, dailyProgress, workoutDays, onPress, dayW}) =>{
    console.log(dailyProgress)
    let bgColor = "#f4f4f4";
    var opacity = 1;
    let today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)
    let ano = today.getFullYear()
    let thisDate = new Date(today.getFullYear(), month, day)
    let dia_da_semana = thisDate.getDay()
    if (parseInt(day)<=9) {
        day = '0'+day
    }
    if (parseInt(month + 1)<=9) {
        month = '0'+(month + 1)
    }
    let data_formatada = ano+'-'+month+'-'+day
    if (workoutDays.includes(thisDate.getDay())) {

    } else {
        opacity = 0.2
    }

    if (thisDate.getTime() == today.getTime()) {
        bgColor = '#B5EEFF';
        opacity =1;
    }

    if ((thisDate.getTime() < today.getTime()) && workoutDays.includes(thisDate.getDay()) ) {
        if(dailyProgress.includes(data_formatada)) {
            bgColor= '#B5FFD8'
            opacity=1
        } else {
            bgColor = '#FFB5B5'
            opacity=1
        }
    }

    let dias_array = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

    return(
        <DayButton width={dayW} onPress={onPress} underlayColor="transparent">
            <>
                <DayLeg>
                    <DayLegText>{dias_array[dia_da_semana]}</DayLegText>
                </DayLeg>
                <DayItem style={{opacity, backgroundColor:bgColor}}>
                    <DayText>{day}</DayText>
                </DayItem>
            </>
        </DayButton>

    )
}

export default (props) => {
    let name = useSelector(state=>state.user)
    let daysRef = useRef()
    let screenWidth = Math.round((Dimensions.get('window').width)-40)
    let dayW = Math.round(screenWidth/9)
    let offsetW = Math.round((screenWidth - dayW))/2
    const [selectedDay, setSelectedDay] = useState(props.day)

    const scrollToDay = (day) =>{
        let posX = Math.round((day - 1) * dayW)
        daysRef.current.scrollTo({x:posX, y:0, animated:true})
    }

    const handleScrollEnd = (e) => {
        let posX = e.nativeEvent.contentOffset.x;
        let targetMont = Math.round((posX / dayW) + 1)
        setSelectedDay(targetMont)
    
    }

    useEffect(()=>{
        props.setDay(selectedDay)
    },[selectedDay])

    useEffect(()=>{
        setTimeout(()=>{
            if(props.month == new Date().getMonth()) {
                scrollToDay(new Date().getDate())
            } else {
                scrollToDay(1)
            }
        },10)
    },[props.month])

    let days = []
    let daysInMonth = new Date(new Date().getFullYear(),(props.month + 1), 0).getDate() //tecnica para achar a quantidade de dias tem no mes
    for(let i=1;i<=daysInMonth;i++) {
        days.push(i)
    }

    return(
        <DaysScroll 
            horizontal={true}
            ref={daysRef}
            showsHorizontalScrollIndicator={false} //tirar barra embaixo
            decelerationRate="fast" //controlar desaceleração
            snapToInterval={dayW} //parar em parte específica da tela
            contentContainerStyle={{paddingLeft:offsetW, paddingRight: offsetW}} //cria espaços em branco pro mes ficar no meio
            onMomentumScrollEnd={handleScrollEnd}
        >
            {days.map((item, index)=>(
                <Day 
                    key={index}
                    day={item}
                    month={props.month}
                    dailyProgress={props.dailyProgress}
                    workoutDays={props.workoutDays}
                    onPress={()=>scrollToDay(item)}
                    dayW={dayW}
                />
            ))}
        </DaysScroll>
    )
}