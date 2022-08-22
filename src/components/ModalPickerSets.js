import React, {memo} from 'react'
import styled from 'styled-components'
import {Picker} from '@react-native-picker/picker';


const Sets = ({modalSets, handleChangSet})=> {

    const PickerItem = styled.View`
    flex:1
`
    const ModalLabel = styled.Text` 
    font-size:15px;
    font-weight:bold;
    margin-top:10px;
`
    return (
        <PickerItem>
                        <ModalLabel>Séries</ModalLabel>
                        <Picker
                            selectedValue={modalSets}
                            style={{height:80, width:'80%'}}
                            itemStyle={{height: 80}}
                            height={40}
                            onValueChange={(itemValue, itemIndex) =>
                                handleChangSet(itemValue)
                            }>
                            <Picker.Item label="1" value="1" key="1"/>
                            <Picker.Item label="2" value="2" key="2"/>
                            <Picker.Item label="3" value="3" key="3"/>
                            <Picker.Item label="4" value="4" key="4"/>
                            <Picker.Item label="5" value="5" key="5"/>
                            <Picker.Item label="6" value="6" key="6"/>
                            <Picker.Item label="7" value="7" key="7"/>
                        </Picker>
        </PickerItem>
    )
}


export const ModalSets = memo(Sets)