import React, {useState, useLayoutEffect, useEffect} from 'react'
import {Text} from 'react-native'
import Container from '../components/Container';
import styled from 'styled-components/native';
import DefaultButton from '../components/DefaultButton'
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

const HeaderText = styled.Text`
    font-size:15px;
    text-align:center;
    color: #333;
    margin-top:10px;
    margin-bottom:30px;
`

const NextButton = styled.Button`
  
`

const BoldText = styled.Text`
    font-weight:bold;
`

const LevelArea = styled.View`
    width:100%;
`

const ButtonText = styled.Text`
    color: ${props=>props.color || '#000'}
`

const StarterNivel = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const workoutDays = useSelector(state=>state.user.workoutDays)
    const level_redux = useSelector(state=>state.user.level)
    const [level, setLevel] = useState(level_redux)
    const dispatch = useDispatch()
    const nextAction = () => {
        if(!level) {
            alert('Ei, você precisa selecionar o seu nível!')
            return
        } 
        navigation.navigate('StarterRecommendation')
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: '',
            headerRight: ()=> (
                <NextButton title="Próximo" onPress={nextAction}/>
            ),
            headerRightContainerStyle: {paddingRight:10}
        })
    }, [level])

    let funnyPhrase = '...'

    switch(workoutDays.length) {
        case 1:
            funnyPhrase = 'Só um dia não vai adiantar muito, mas...'
        break;
        case 2:
            funnyPhrase = 'Dois dias eu acho pouco, mas quem sou eu pra te julgar...'
        break;
        case 3:
            funnyPhrase = 'Legal, 3 dias da pro gasto'
        break;
        case 4:
            funnyPhrase = 'Legal, 4 dias vai ser TOP!'
        break;
        case 5:
            funnyPhrase = 'É isso ai, 5 dias, tá animado(a)!'
        break;
        case 6:
            funnyPhrase = 'Legal, 6 dias é pra poucos!'
        break;
        case 7:
            funnyPhrase = 'Woow, todo dia? WTF?!'
        break;
    }

    const setSeelectedLevel = (level_set) => {
        setLevel(level_set)
        dispatch({
            type: 'SET_LEVEL',
            payload: {
                level: level_set
            }
        })
        }
    return(
        <Container style={{paddingLeft:20,paddingRight:20}}>
            <HeaderText>{funnyPhrase}</HeaderText>
            <HeaderText>Qual <BoldText>seu nível hoje?</BoldText></HeaderText>

            <LevelArea>
                <DefaultButton bgcolor={level == 'begginer' ? '#a5e8bc' : false} style={{marginBottom:20}} underlayColor="#ccc" onPress={()=>setSeelectedLevel('begginer')}>
                    <ButtonText>Iniciante / Um frango</ButtonText>
                </DefaultButton>
                <DefaultButton bgcolor={level == 'intermediate'  ? '#a5e8bc' : false} style={{marginBottom:20}} underlayColor="#ccc" onPress={()=>setSeelectedLevel('intermediate')}>
                    <ButtonText>Intermediário / Me viro bem</ButtonText>
                </DefaultButton>
                <DefaultButton bgcolor={level == 'advanced'  ? '#a5e8bc' : false} style={{marginBottom:20}} underlayColor="#ccc" onPress={()=>setSeelectedLevel('advanced')}>
                    <ButtonText>Avançado / Quase um  Arnold Schwarzenegger</ButtonText>
                </DefaultButton>
            </LevelArea>
        </Container>
    )
}

export default StarterNivel