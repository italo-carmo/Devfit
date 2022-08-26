import React, {useLayoutEffect, useState} from 'react';
import {StatusBar, TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import ExerciseItem from '../components/ExerciseItem';
import Modal from '../components/Modal';
import DefaultButton from '../components/DefaultButton';
import LoadInput from '../components/LoadInput';
import Timer from '../components/Timer';

const Container = styled.ImageBackground`
    flex:1;
    background-color:#000;
    align-items:center;
`

const SafeArea = styled.SafeAreaView`
    flex:1;
    width:100%;
    align-items:center;
    background-color:rgba(128, 128, 128, 0.9)
`

const WorkoutHeader = styled.View`
    flex-direction:row;
    width:90%
    align-items:center;
    height:70px;
`

const WorkoutTitle = styled.Text`
    flex:1;
    color:#fff;
    font-size:20px;
`

const WorkoutClose = styled.TouchableHighlight` 
    width:50px;
    height:50px;
    justify-content:center;
    align-items:center;
`

const WorkoutCloseText = styled.Text`
    font-size:22px;
    color:#fff;
    font-weight:bold;
`

const WorkoutList = styled.FlatList`
    width:90%;
    flex:1;
`

const ModalLabel = styled.Text` 
        font-size:18px;
        font-weight:bold;
        margin-top:10px;
        margin-bottom:20px;
    `

const ModalExtra = styled.View`
    width:100%;
    flex-wrap:wrap;
    flex-direction:row;
    margin-bottom:20px;
`

const ButtonText = styled.Text`
    color: #fff;
`



export default () => {
    let navigation = useNavigation()
    let dispatch = useDispatch()
    let route = useRoute()
    let workout = route.params.workout
    const [modalVisible, setModalVisible] = useState(false)
    const [modalName, setModalName] = useState('')
    const [modalLoad, setModalLoad] = useState([])
    const [workoutId, setWorkoutId] = useState(workout.id)
    const [modalExerciseId, setModalExerciseId] = useState('')

    const [exercises, setExercises] = useState([...workout.exercises])

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
},[])

const checkWorkout = () => {
    if(exercises.every(i=>i.done)) {
        alert('PARABÉNS, VOCÊ FINALIZOU')

        let today = new Date()
        let ano = today.getFullYear()
        let month = today.getMonth()
        let day = today.getDate()
    
        if (parseInt(day)<=9) {
            day = '0'+day
        }
        if (parseInt(month + 1)<=9) {
            month = '0'+(month + 1)
        }
        let data_formatada = ano+'-'+month+'-'+day

        dispatch({
            type: 'ADD_PROGRESS',
            payload: {
                date: data_formatada
            }
        })

        dispatch({
            type: 'ADD_LAST_WORKOUT',
            payload: {
                lastWorkout: workout.id
            }
        })

        navigation.reset({index:0, routes:[{name:'AppTab'}]})
    }
}

const checkAction = (item, index) => {
    let newExercises = [...exercises]
    if(!item.done) {
        setModalName(item.name)
        setModalExerciseId(item.id)
        if(item.actualLoad.length ==0) {
            setModalLoad(item.initialLoad)
        } else {
            setModalLoad(item.actualLoad)
        }
        
        setModalVisible(true)
        newExercises[index].done = true
    } else {
        newExercises[index].done = false
    }

    setExercises(newExercises)
}

const handleClose = () => {
    setModalVisible(false)
}

const modalSave = () => {
    dispatch({
        type: 'UPDATE_ACTUAL_LOAD',
        payload: {
            actualLoad: modalLoad,
            workoutId,
            exerciseId: modalExerciseId
        }
    })
    setModalVisible(false)
    checkWorkout()

}


    return (
        <Container  source={require('../assets/fitness.jpg')}>
            <StatusBar barStyle="light-content"/>
            <SafeArea>
                <WorkoutHeader>
                    <WorkoutTitle>{workout.name}</WorkoutTitle>
                    <WorkoutClose onPress={()=>navigation.goBack()} underlayColor="transparent">
                        <WorkoutCloseText>X</WorkoutCloseText>
                    </WorkoutClose>
                </WorkoutHeader>

                <Timer/>

                <WorkoutList 
                    data={exercises}
                    renderItem={({item, index})=> <ExerciseItem data={item} index={index} checkAction={()=>checkAction(item, index)}/>}
                    keyExtractor={item=>item.id.toString()}
                />


            <Modal  visible={modalVisible} closeAction={handleClose}>
                <ModalLabel>Carga Atual - {modalName}</ModalLabel>
                <ModalExtra>
                   <LoadInput modalLoad={modalLoad} setModalLoad={setModalLoad}/>
                </ModalExtra>
                <DefaultButton bgcolor="#4ac34e" onPress={modalSave} underlayColor="transparent">
                    <ButtonText>Salvar</ButtonText>
                </DefaultButton>
            </Modal>

            </SafeArea>
        </Container>
    )
}