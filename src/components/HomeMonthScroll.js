import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const MonthScroll = styled.ScrollView`
    width:100%;
    height:60px;
`

const MonthButton = styled.TouchableHighlight`
    width: ${props=>props.width+'px'}
    justify-content:center;
    align-items:center;
`

const MonthItem = styled.View`
    width:90%;
    height:30px;
    background-color:#eee;
    border-radius:15px;
    justify-content:center;
    align-items:center;
`

const MonthText = styled.Text`

`

export default (props) => {
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho','Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    let monthRef = useRef()
    let screenWidth = Math.round((Dimensions.get('window').width)-40)
    let thirdWidth = screenWidth/3

    const [selectedMonth, setSelectedMonth] = useState(props.month)

    useEffect(()=>{
        props.setMonth(selectedMonth)
    },[selectedMonth])

    useEffect(()=>{
        setTimeout(()=>{
            scrollToMonth(selectedMonth)
        },10)
    },[props.month])

    const scrollToMonth = (month) =>{
        let posX = Math.round(month * thirdWidth)
        monthRef.current.scrollTo({x:posX, y:0, animated:true})
    }

    const handleScrollEnd = (e) => {
        let posX = e.nativeEvent.contentOffset.x;
        let targetMont = Math.round(posX / thirdWidth)
        setSelectedMonth(targetMont)
    
    }

    const handleClick = (month) => {
        setSelectedMonth(month)
    }
    return(
        <MonthScroll 
            horizontal={true}
            ref={monthRef}
            showsHorizontalScrollIndicator={false} //tirar barra embaixo
            decelerationRate="fast" //controlar desaceleração
            snapToInterval={thirdWidth} //parar em parte específica da tela
            contentContainerStyle={{paddingLeft:thirdWidth, paddingRight: thirdWidth}} //cria espaços em branco pro mes ficar no meio
            onMomentumScrollEnd={handleScrollEnd}
        >
            {months.map((item, index)=>(
                <MonthButton key={index} width={thirdWidth} onPress={()=>handleClick(index)} underlayColor="transparent">
                    <MonthItem style={index==selectedMonth ? {backgroundColor: '#3ba237'} : {}}>
                        <MonthText style={index==selectedMonth ? {color: '#fff'} : {}}>{item}</MonthText>
                    </MonthItem>
                </MonthButton>
            ))}
        </MonthScroll>
    )
}