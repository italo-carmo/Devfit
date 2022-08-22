import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react'
import {useNavigation} from '@react-navigation/native';


const Preload = () =>{
    const navigation = useNavigation()
    const name_redux = useSelector(state=>state.user.name)
    console.log(name_redux)
    console.log('preload')
    useEffect(()=>{
        if (name_redux == '') {
            navigation.reset({index:0, routes:[{name:'StarterStack'}]})
        } else{
            navigation.reset({index:0, routes:[{name:'AppTab'}]})
        }
    },[])
    
    return (
        null
    )
} 

export default Preload