import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import DefaultButton from './DefaultButton';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';


const BallonTriangle = styled.View`
    width:0;
    height:0;
    borderLeftColor: transparent;
    borderLeftWidth: 15px;
    borderBottomWidth:15px;
    borderBottomColor: #ededed;
    borderRightWidth:15px;
    borderRightColor: transparent;
`

const BallonArea = styled.View`
    width:90%;
    padding: 20px;
    background-color: #ededed;
    border-radius: 10px;
    min-height:100px;
`

const BallonBigText = styled.Text`
    font-size:15px;
    align-self:center;
`

const ButtonText = styled.Text`
    color: #fff;
    font-weight:bold;
`

const BallonText = styled.Text`
    font-size:13px;
    align-self:center;
    margin-top:10px;
`

const Strong = styled.Text`
    font-weight:bold;
`


export default ({month, day, dailyProgress, workoutDays}) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    let today = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)
    let ano = today.getFullYear()
    let thisDate = new Date(today.getFullYear(), month, day)

    if (parseInt(day)<=9) {
        day = '0'+day
    }
    if (parseInt(month + 1)<=9) {
        month = '0'+(month + 1)
    }
    let data_formatada = ano+'-'+month+'-'+day

    let isDayOff = false;
    let isToday = false;
    let isFuture = false;
    let isDone = false;
    if(!workoutDays.includes(thisDate.getDay())) {
        isDayOff = true;
    } else if (thisDate.getTime() > today.getTime()) {
        isFuture = true;
    } else {
        if (dailyProgress.includes(data_formatada)) {
            isDone = true;
        }
    }

    if (thisDate.getTime() == today.getTime()) {
        isToday = true
    }

    const handleIr = () => {
        navigation.navigate('')
    }

    const setDone = () => {
        dispatch({
            type: 'ADD_PROGRESS',
            payload: {
                date: data_formatada
            }
        })
    }

    const setUndone = () => {
        dispatch({
            type: 'DEL_PROGRESS',
            payload: {
                date: data_formatada
            }
        })
    }

    const [timeLeft, setTimeLeft] = useState('')

    useEffect(()=>{
        const timerFunction = () => {
            let now = Date.now()
            let endToday = new Date()
            endToday.setHours(23)
            endToday.setMinutes(59)
            endToday.setSeconds(59)
            endToday = endToday.getTime()
            let diff = endToday - now

            let h = Math.floor(diff / (1000 * 60 * 60));
            let m = Math.floor((diff / (1000 * 60)) - (h * 60))
            let s = Math.floor((diff / 1000) - (m*60) - ((h*60) * 60))

            h = h < 10 ? '0'+h : h;
            m = m < 10 ? '0'+m : m;
            s = s < 10 ? '0'+s : s;

            setTimeLeft(`${h}h ${m}m ${s}s`)
        }
        let timer = setInterval(timerFunction, 1000)
        timerFunction()

        return ()=>clearInterval(timer)
    },[])



    return(
        <>
        <BallonTriangle>

        </BallonTriangle>
        <BallonArea>
            {isDayOff &&
                <BallonBigText>Dia de descanso!</BallonBigText>
            }
            {isFuture &&
                <BallonBigText>Esse dia ainda não chegou!</BallonBigText>
            }
            {!isDayOff && !isFuture && isDone &&
                <>
                    <BallonBigText><Strong>Parabéns</Strong>, você treinou!</BallonBigText>
                    <DefaultButton bgcolor="#4ac34e" style={{marginTop:20}} onPress={setUndone} underlayColor="transparent">
                        <ButtonText>DESMARCAR</ButtonText>
                    </DefaultButton>
                </>
            }
            {!isDayOff && !isFuture && !isDone && !isToday &&
                <>
                    <BallonBigText><Strong>Fraco</Strong>, você falhou neste dia!</BallonBigText>
                    <DefaultButton bgcolor="#4ac34e" style={{marginTop:20}} onPress={setDone} underlayColor="transparent">
                        <ButtonText>MARCAR COMO FEITO</ButtonText>
                    </DefaultButton>
                </>
            }
            {!isDayOff && !isFuture && !isDone && isToday &&
              <>
                  <BallonBigText><Strong>HOJE TEM TREINO!</Strong></BallonBigText>
                  <BallonText>Você tem {timeLeft} para treinar</BallonText>
                <DefaultButton bgcolor="#4ac34e" style={{marginTop:20}} onPress={handleIr} underlayColor="transparent">
                    <ButtonText>INICIAR TREINO</ButtonText>
                </DefaultButton>
              </>
            }
        </BallonArea>
        </>
    )
}