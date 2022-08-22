import React, {useRef, useCallback, useState, useLayoutEffect} from 'react';
import styled from 'styled-components';
import {TextInput, Text} from  'react-native'
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import ExerciseItemEdit from '../components/ExerciseItemEdit'
import DefaultButton from '../components/DefaultButton';
import Modal from '../components/Modal';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid'
import {Picker} from '@react-native-picker/picker';
import LoadInput from '../components/LoadInput';
import {ModalMusclesComponent} from '../components/ModalMuscles';
import {ModalSets} from '../components/ModalPickerSets'


const NameInput = styled.TextInput`
    border: 1px solid #ccc;
    width:100%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
`

const ContainerEdit = styled.SafeAreaView`
    flex:1;
    margin-left:20px;
    margin-right:20px;
`


export default () => {
    let navigation = useNavigation()
    let route = useRoute()
    let [name, setName] = useState('')
    let [id, setId] = useState('')
    let [exercises, setExercises] = useState([])
    let [modalVisible, setModalVisible]  = useState(false)
    let [modalId, setModalId] = useState('')
    let [modalName, setModalName] = useState('')
    let [modalMuscle, setModalMuscle] = useState('')
    let [modalSets, setModalSets] = useState('')
    let [modalReps, setModalReps] = useState('')
    let [modalLoad, setModalLoad] = useState([])

    const SaveArea = styled.TouchableHighlight`
        width:30px;
        height:30px;
        justify-content:center;
        align-items:center;
        margin-right:10px;
    `

    const SaveImage = styled.Image`
        width:25px;
        height:25px;
    `

    const ButtonText = styled.Text`
        color: #fff;
    `

    const ExercisesArea = styled.View`
        flex:1;
        margin-top:20px;
        padding-top:20px;
        border-top-width: 1px;
        border-top-color: #ccc;
    `

    const ExercisesList = styled.FlatList`
        flex:1;
        padding-top:20px;
    `

    const ModalLabel = styled.Text` 
        font-size:15px;
        font-weight:bold;
        margin-top:10px;
    `

    const ModalInput = styled.TextInput`
        width:100%;
        font-size:14px;
        color:#333;
        height:40px;
        border-bottom-width:1px;
        border-bottom-color:#ccc;
    `

    const ModalExtra = styled.View`
        width:100%;
        flex-wrap:wrap;
        flex-direction:row;
        margin-bottom:20px;
    `

    const ModalExtraItem = styled.View`
        align-items:center;
        min-width:60px;
        margin-right:5px;
    `

    const PickerArea = styled.View`
        flex-direction:row;
    `

    const PickerItem = styled.View`
        flex:1
    `

    const dispatch = useDispatch()

    

    useLayoutEffect(()=>{
        let isEdit = (route.params && route.params.workout) ? true : false
        if (isEdit) {
            if (name == '' && id == '') {
            let workout = route.params.workout
            setName(workout.name)
            setId(workout.id)
            setExercises(workout.exercises)
            }
        } else {
            workout = false
        }
        let title = isEdit ? 'Editar Treino' : 'Adicionar Treino'
        navigation.setOptions({
            title: title,
            headerBackTitleVisible: false,
            headerRight: ()=>(
                <SaveWorkoutButton exercises={exercises}/>
            ),
        })
},[name, id, exercises])

const SaveWorkoutButton = () => {
    
    const handleSave = () => {
        if (name && exercises) {
            if (exercises.length > 0) {
                if(id!='') {
                    let workout = {
                        id,
                        name,
                        exercises
                    }
                    dispatch({
                        type: 'EDIT_WORKOUT',
                        payload: {
                            workout
                        }
                    })
                }  else {
                    let workout = {
                        id: uuid(),
                        name,
                        exercises
                    }
                    dispatch({
                        type: 'ADD_WORKOUT',
                        payload: {
                            workout
                        }
                    })
                }
            } else {
                alert('Você precisa de pelo meneos 1 exercício!')
                return
            }
        }
        navigation.goBack()
    }

    return (
        <SaveArea underlayColor="transparent" onPress={handleSave}>
            <SaveImage source={require('../assets/check-black.png')}/>
        </SaveArea>
    )
}

    const deleteAction = (item) => {
        let new_exercises = [...exercises]
        new_exercises = new_exercises.filter(i=>i.id!=item.id)
        setExercises(new_exercises)
    }

    const editAction = (item) => {
        setModalId(item.id)
        setModalName(item.name)
        setModalMuscle(item.muscle)
        setModalSets(item.sets)
        setModalReps(item.reps)
        setModalLoad(item.initialLoad)
        setModalVisible(true)
    }

    const handleClose = () => {
        setModalVisible(false)
    }

    const handleChangSet = (e) => {
        setModalSets(e)
        let new_loads = [...modalLoad]  
        if(modalLoad.length < e) {
            for(i=modalLoad.length;i<e;i++)  {
                new_loads[i] = '0'
            }
        } else {
            new_loads = new_loads.filter((item,index)=>index<e)
        }
        setModalLoad(new_loads)
    }

    const modalSave  = () => {
        let new_exercises = [...exercises]
        let filter_load = modalLoad.filter(item=>item!=0)
        if (modalName == '' ||  modalMuscle == '' || modalSets == '' || modalReps == '' || filter_load.length < 1) {
            alert('Preencha  todas as informações')
            return
        } 
        let index = new_exercises.findIndex(i=>i.id==modalId)
        if(index> -1) {
            new_exercises[index].name = modalName
            new_exercises[index].muscle = modalMuscle
            new_exercises[index].sets = modalSets
            new_exercises[index].reps = modalReps
            new_exercises[index].initialLoad = modalLoad
        } else {
            let ex ={
                id: uuid(),
                name: modalName,
                muscle: modalMuscle,
                sets: modalSets,
                reps: modalReps,
                initialLoad: modalLoad,
                actualLoad: []
            }

            new_exercises.push(ex)
        }
            setExercises(new_exercises)
            setModalVisible(false)
        
    }

    const resetModal = () => {
        setModalId('')
        setModalName('')
        setModalMuscle('')
        setModalReps('')
        setModalSets('')
        setModalLoad([])
    }

    const addExercise = () => {
        resetModal()
        setModalVisible(true)
    }

    const handleChangeName =  (e) => {
        setName(e)
    }


    return (
        <ContainerEdit>
            <Modal  visible={modalVisible} closeAction={handleClose}>
                <ModalLabel>Músculo principal</ModalLabel>
                <ModalMusclesComponent modalMuscle={modalMuscle} setModalMuscle={setModalMuscle}/>
                <ModalLabel>Nome do exercício</ModalLabel>
                <TextInput value={modalName}  onChangeText={e=>setModalName(e)} style={{width:'100%',fontSize:14,color:'#333', height:40, borderBottomWidth:1,borderBottomColor:'#ccc'}}/>
                <PickerArea>
                    <ModalSets modalSets={modalSets} handleChangSet={handleChangSet}/>
                    <PickerItem>
                        <ModalLabel>Repetições</ModalLabel>
                        <Picker
                            selectedValue={modalReps}
                            style={{height:80, width:'80%'}}
                            itemStyle={{height: 80}}
                            height={40}
                            onValueChange={(itemValue, itemIndex) =>
                                setModalReps(itemValue)
                            
                            }>
                            <Picker.Item label="1" value="1" key="1"/>
                            <Picker.Item label="2" value="2" key="2"/>
                            <Picker.Item label="3" value="3" key="3"/>
                            <Picker.Item label="4" value="4" key="4"/>
                            <Picker.Item label="5" value="5" key="5"/>
                            <Picker.Item label="6" value="6" key="6"/>
                            <Picker.Item label="7" value="7" key="7"/>
                            <Picker.Item label="8" value="8" key="8"/>
                            <Picker.Item label="9" value="9" key="9"/>
                            <Picker.Item label="10" value="10" key="10"/>
                            <Picker.Item label="11" value="11" key="11"/>
                            <Picker.Item label="12" value="12" key="12"/>
                            <Picker.Item label="13" value="13" key="13"/>
                            <Picker.Item label="14" value="14" key="14"/>
                            <Picker.Item label="15" value="15" key="15"/>
                            <Picker.Item label="16" value="16" key="16"/>
                            <Picker.Item label="17" value="17" key="17"/>
                            <Picker.Item label="18" value="18" key="18"/>
                            <Picker.Item label="19" value="19" key="19"/>
                            <Picker.Item label="20" value="20" key="20"/>
                            <Picker.Item label="21" value="21" key="21"/>
                            <Picker.Item label="22" value="22" key="22"/>
                            <Picker.Item label="23" value="23" key="23"/>
                            <Picker.Item label="24" value="24" key="24"/>
                            <Picker.Item label="25" value="25" key="25"/>
                            <Picker.Item label="26" value="26" key="26"/>
                            <Picker.Item label="27" value="27" key="27"/>
                            <Picker.Item label="28" value="28" key="28"/>
                            <Picker.Item label="29" value="29" key="29"/>
                            <Picker.Item label="30" value="30" key="30"/>
                        </Picker>
                    </PickerItem>
                </PickerArea>
                <ModalExtra>
                   <LoadInput modalLoad={modalLoad} setModalLoad={setModalLoad}/>
                </ModalExtra>
                <DefaultButton bgcolor="#4ac34e" onPress={modalSave} underlayColor="transparent">
                    <ButtonText>Salvar</ButtonText>
                </DefaultButton>
            </Modal>
            <NameInput value={name} onChangeText={handleChangeName} placeholder="Digite o nome do treino"/>
            <ExercisesArea>
                <DefaultButton bgcolor="#4ac34e" onPress={addExercise} underlayColor="transparent">
                    <ButtonText>Adicionar Exercício</ButtonText>
                </DefaultButton>

                <ExercisesList 
                    data={exercises} 
                    renderItem={({item})=>
                        <ExerciseItemEdit  data={item} deleteAction={()=>deleteAction(item)} editAction={()=>editAction(item)}/>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />

            </ExercisesArea>
        </ContainerEdit>
    )
}