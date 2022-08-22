import React from 'react'
import {TextInput, View} from 'react-native'
import styled from 'styled-components'
import {Picker} from '@react-native-picker/picker';

export default ({modalLoad, setModalLoad}) => {

    const ModalLabel = styled.Text` 
        font-size:15px;
        font-weight:bold;
        margin-top:10px;
    `
    const ModalExtraItem = styled.View`
        align-items:center;
        min-width:60px;
        margin-right:5px;
    `

    const handleChangeLoad = (item, index) => {
        let new_loads = [...modalLoad]
        new_loads[index] = item
        setModalLoad(new_loads)
    }   

    let loads = []

    for(i=1;i<=200;i++) {
        loads.push(i)
    }

    const loadsList = loads.map((it,id)=>{
        return (
        <Picker.Item label={it.toString()} value={it.toString()} key={id.toString()}/>
        )
    })

    return (
        <>
            {modalLoad.length > 0 && modalLoad.map((item,index)=> {
                return (
                <View keyExtractor={index} style={{ minWidth:100}} key={index.toString()}>
                    <ModalLabel>Carga {index+1}</ModalLabel>
                    <Picker
                            selectedValue={modalLoad[index]}
                            style={{height:100, width:'100%'}}
                            itemStyle={{height: 100, minWidth:100}}
                            height={40}
                            onValueChange={(itemValue, itemIndex) => {
                                handleChangeLoad(itemValue, index)
                            }
                                
                            }>
                            {loadsList}
                    </Picker>
                </View>
            )
                })
            }
        </>
    )
}