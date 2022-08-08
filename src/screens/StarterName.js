import React, {useState, useLayoutEffect} from 'react'
import Container from '../components/Container';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

const HeaderText = styled.Text`
    font-size:22px;
    color: #333;
    margin-top:50px;
    margin-bottom:50px;
`

const NameInput = styled.TextInput`
    border: 1px solid #ccc;
    width:90%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
`

const NextButton = styled.Button``

const StarterName = () => {
    const [name, setName] = useState('')
    const navigation = useNavigation()


    useLayoutEffect(()=>{
        navigation.setOptions({
            title: '',
            headerRight: ()=> (
                <NextButton title="Próximo"/>
            ),
            headerRightContainerStyle: {marginRight:10}
        })
    }, [])


    return(
        <Container>
            <HeaderText>Qual é o seu nome?</HeaderText>
            <NameInput 
                value={name} 
                onChangeText={e=>setName(e)} 
                autoFocus={true}
                autoCapitalize="words"
            />
        </Container>
    )
}

export default StarterName