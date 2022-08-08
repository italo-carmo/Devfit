import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
    flex:1;
    justify-content: center;
    align-items:center;
    background-color: #fff;
    
`

const WelcomeText = styled.Text`
    font-size:22px;
    color:#333;
`

const WelcomeImage = styled.View`
    flex:1;
    justify-content:center;
`

const WelcomeLogo = styled.Image`
    width:200px;
    height:200px;
`

const BeginConfigArea = styled.View`
    width:100%;
    margin-bottom:50px;
    justify-content:center;
    align-items:center;
`

const ButtonText = styled.Text`
    color: #fff
`


export default () => {
    const navigation = useNavigation()
    navigation.setOptions({headerShown:false})

    const start = () => {
        navigation.navigate('StarterName')
    }
    return (
        <Container justify='center'>
            <WelcomeText> Bem vindo(a) ao Dev Fit</WelcomeText>
            <WelcomeImage>
                <WelcomeLogo source={require('../assets/boneco.png')}/>
            </WelcomeImage>

            <BeginConfigArea>
                <DefaultButton width="90%" bgcolor="#0072c0" underlayColor="#0b7ac6" onPress={start}>
                    <ButtonText>Iniciar Configuração</ButtonText>
                </DefaultButton>
            </BeginConfigArea>

        </Container>
    )
}