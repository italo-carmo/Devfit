import React,{memo} from 'react'
import styled from 'styled-components'

const Muscles = ({modalMuscle, setModalMuscle}) => {

    const ModalMuscle = styled.TouchableHighlight`
        width:50px;
        height:50px;
        background-color:#eee;
        border-radius:10px;
        justify-content:center;
        align-items:center;
        margin-right:10px;
        opacity: ${props=>props.opacity}
    `

    const ModalMuscleImage = styled.Image`
        width:35px;
        height:35px;
    `
    const ModalMuscles = styled.ScrollView`
    
    `

    return (
        <ModalMuscles horizontal={true} showHorizontalScrollIndicator={false}>
            <ModalMuscle opacity={modalMuscle == 'abs' ? 1 : 0.3} onPress={()=>setModalMuscle('abs')} underlayColor="transparent">
                <ModalMuscleImage source={require('../assets/muscles/abs.png')} />
            </ModalMuscle>
            <ModalMuscle opacity={modalMuscle == 'back' ? 1 : 0.3} onPress={()=>setModalMuscle('back')} underlayColor="transparent">
                <ModalMuscleImage source={require('../assets/muscles/back.png')} />
            </ModalMuscle>
            <ModalMuscle opacity={modalMuscle == 'biceps' ? 1 : 0.3} onPress={()=>setModalMuscle('biceps')} underlayColor="transparent">
                <ModalMuscleImage source={require('../assets/muscles/biceps.png')} />
            </ModalMuscle>
            <ModalMuscle opacity={modalMuscle == 'chest' ? 1 : 0.3} onPress={()=>setModalMuscle('chest')} underlayColor="transparent">
                <ModalMuscleImage source={require('../assets/muscles/chest.png')} />
            </ModalMuscle>
            <ModalMuscle opacity={modalMuscle == 'gluteos' ? 1 : 0.3} onPress={()=>setModalMuscle('gluteos')} underlayColor="transparent">
                <ModalMuscleImage source={require('../assets/muscles/gluteos.png')} />
            </ModalMuscle>
            <ModalMuscle opacity={modalMuscle == 'legs' ? 1 : 0.3} onPress={()=>setModalMuscle('legs')} underlayColor="transparent">
                <ModalMuscleImage source={require('../assets/muscles/legs.png')} />
            </ModalMuscle>
            <ModalMuscle opacity={modalMuscle == 'shoulders' ? 1 : 0.3} onPress={()=>setModalMuscle('shoulders')} underlayColor="transparent">
                <ModalMuscleImage source={require('../assets/muscles/shoulders.png')} />
            </ModalMuscle>
            <ModalMuscle opacity={modalMuscle == 'triceps' ? 1 : 0.3} onPress={()=>setModalMuscle('triceps')} underlayColor="transparent">
                <ModalMuscleImage source={require('../assets/muscles/triceps.png')} />
            </ModalMuscle>
    </ModalMuscles>
    )
}

export const ModalMusclesComponent = memo(Muscles)