import React, {useState} from 'react';
import styled from 'styled-components/native';
import useMuscleImage from '../hooks/useMuscleImage';

const Workout = styled.View`
    background-color:#f1f1f1;
    flex-direction:row;
    border-radius:10px;
    margin-bottom:20px;
    border:2px solid #ddd;
`

const WorkoutInfo = styled.View`
    flex:1;
`

const WorkoutActions = styled.View`
    justify-content:center;
`


const WorkoutTitle = styled.Text`
    font-size:17px;
    margin:10px;
`

const MuscleScroll = styled.ScrollView`
    margin:10px;
`

const WorkoutButton = styled.TouchableHighlight`
    height:25px;
    width:25px;
    margin:20px;
    justify-content:center;
    align-items:center;
    `

const WorkoutImage = styled.Image`
    width:25px;
    height:25px;
`
const MuscleGroup = styled.View`
    width:40px;
    height:40px;
    background-color: #ffcc98;
    border-radius:5px;
    margin-right:5px;
    justify-content:center;
    align-items:center;
`
const MuscleImage = styled.Image`
    width:30px;
    height:30px;
`

export default (props) => {
    const [included, setIncluded] = useState(false)
    let muscleGroups = [];
    for(let i in props.data.exercises) {
        if(!muscleGroups.includes(props.data.exercises[i].muscle)) {
            muscleGroups.push(props.data.exercises[i].muscle)
        }
    }

    const addAction = () => {
        setIncluded(!included)
        props.onAdd()
    }

    const editAction = () => {
        props.onEdit()
    }

    const delAction = ()  => {
        props.onDel()
    }



    return(
        <Workout>
            <WorkoutInfo>
                <WorkoutTitle>{props.data.name}</WorkoutTitle>
                <MuscleScroll horizontal={true}>
                    {muscleGroups.map((muscle, index)=>(
                        <MuscleGroup key={index.toString()}>
                            <MuscleImage source={useMuscleImage(muscle)}/>
                        </MuscleGroup>
                    ))}
                </MuscleScroll>

            </WorkoutInfo>

            <WorkoutActions>
               {props.onAdd &&
                 <WorkoutButton onPress={()=>addAction()} underlayColor="transparent">
                     <WorkoutImage source={included ? require('../assets/check-black.png') : require('../assets/add.png')}/>
                 </WorkoutButton>
               }
               {props.onEdit &&
                 <WorkoutButton onPress={()=>editAction()} underlayColor="transparent">
                     <WorkoutImage source={require('../assets/edit-black.png')}/>
                 </WorkoutButton>
               }
               {props.onDel &&
                 <WorkoutButton onPress={()=>delAction()} underlayColor="transparent">
                     <WorkoutImage source={require('../assets/trash-black.png')}/>
                 </WorkoutButton>
               }
            </WorkoutActions>
        </Workout>
    )
}