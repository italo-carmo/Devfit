import React, {useState, useLayoutEffect, useEffect} from 'react'
import {Text} from 'react-native'
import Container from '../components/Container';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

const HeaderText = styled.Text`
    font-size:22px;
    color: #333;
    margin-top:50px;
    margin-bottom:50px;
`

const NameInput = styled.TextInput`
    border: 1px solid #ccc;
    width:100%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
`

const NextButton = styled.Button`
  
`

const StarterName = () => {
    const [name, setName] = useState('')
    const name_redux = useSelector(state=> state.user.name)
    useEffect(()=>{
        setName(name_redux)
    },[])
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const nextAction = () => {
        if(!name) {
            alert('Ei, você precisa de um nome!')
            return
        } 
        dispatch({
            type: 'SET_NAME',
            payload: {
                name
            }
        })
        navigation.navigate('StarterDias', {name})
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: '',
            headerRight: ()=> (
                <NextButton title="Próximo" onPress={nextAction}/>
            ),
            headerRightContainerStyle: {paddingRight:10}
        })
    }, [name])


    return(
        <Container>
            <HeaderText>Qual é o seu nome?</HeaderText>
            <NameInput 
                value={name} 
                onChangeText={e=>setName(e)} 
                autoFocus={true}
                autoCapitalize="words"
                onSubmitEditing={nextAction}
            />

        </Container>
    )
}

export default StarterName