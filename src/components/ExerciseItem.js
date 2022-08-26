import React from 'react';
import {View} from 'react-native'
import styled from 'styled-components';
import useMuscleImage from '../hooks/useMuscleImage';


const ExerciseItemArea = styled.View`
    height:80px;
    flex-direction:row;
    margin-bottom:10px;
`

const ExerciseMuscleArea = styled.View`
    width:70px;
    height:70px;
    background-color: #ffcc98;
    border-radius:10px;
    justify-content:center;
    align-items:center;
`

const ExerciseMuscleImage = styled.Image`
    width:35px;
    height:35px;
`

const ExerciseInfo = styled.View`
    flex-direction:column;
    justify-content:center;
    margin-left:5px;
    flex:1;

`

const ExerciseName = styled.Text`
    font-size:15px;
    color:#fff;
`

const ExerciseDetails = styled.View`
`

const ExerciseDetailsText = styled.Text`
    font-size:12px;
    color:#000;
`


const ExerciseCheck = styled.TouchableHighlight`
    width:60px;
    justify-content:center;
    align-items:center;
`

const ExerciseDone = styled.Image`
    width:40px;
    height:40px;
`

const ExerciseUndone = styled.View`
    width:40px;
    height:40px;
    border: 5px solid #fff;
    border-radius:20px;
`

const ExerciseCount = styled.View`
    width:25px;
    justify-content:center;
`

const ExerciseCountText = styled.Text`
    font-size:17px;
    color:#fff;
`

export default ({data, checkAction,index}) => {
    let loads = data.initialLoad
    let actualLoad = data.actualLoad
    return (
        <ExerciseItemArea>
        <>
            <ExerciseCount>
                <ExerciseCountText>{index+1}.</ExerciseCountText>
            </ExerciseCount>
            <ExerciseMuscleArea>
                <ExerciseMuscleImage source={useMuscleImage(data.muscle)}/>
            </ExerciseMuscleArea>
            <ExerciseInfo>
                <ExerciseName>{data.name}</ExerciseName>
                <ExerciseDetails>
                    <ExerciseDetailsText>
                     {`${data.sets} séries - ${data.reps} reps`}
                    </ExerciseDetailsText>
                    <ExerciseDetailsText>
                    {`${loads?`Carga Inicial: ${loads} kg`:''}`}
                    </ExerciseDetailsText>
                    <ExerciseDetailsText>
                    {`${actualLoad?`Carga Atual: ${actualLoad} kg`:''}`}
                    </ExerciseDetailsText>
                </ExerciseDetails>
            </ExerciseInfo>

            <ExerciseCheck onPress={checkAction} underlayColor="transparent">
                {data.done ? <ExerciseDone source={require('../assets/check-white.png')} /> : <ExerciseUndone />  }
            </ExerciseCheck>

         </>
    </ExerciseItemArea>
    )
}