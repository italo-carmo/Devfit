import React, {useLayoutEffect, useState} from 'react';
import {Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import Container from '../components/Container';

const ResetButton = styled.TouchableHighlight`
    width:200px;
    height:30px;
    border-radius:20px;
    background-color: #3ba237;
    justify-content:center;
    align-items:center;
`


export default ()=>{
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handleReset = () => {
        dispatch({
            type: 'RESET',
            payload: {

            }
        })
        navigation.navigate('Preload')
    }

    return (
        <Container justify='center'>
            <ResetButton onPress={handleReset}>
                    <Text>Resetar Dados do APP</Text>
            </ResetButton>
        </Container>
        
    )
}
