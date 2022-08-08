import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react'
import {useNavigation} from '@react-navigation/native';


const Preload = () =>{

    useState(()=>{
        const navigation = useNavigation()
        const name_redux = useSelector(state=>state.user.name)
        if (!name_redux) {
            navigation.reset({index:0, routes:[{name:'StarterStack'}]})
        }
    },[])
    
    return (
        null
    )
} 

export default Preload