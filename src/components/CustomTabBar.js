import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';


const TabBarArea = styled.SafeAreaView`
    flex-direction:row;
    background-color:#eee;
`
const TabBarItem = styled.View`
    flex:1;
    height:65px;
    align-items:center;
`

const TabRegular = styled.TouchableHighlight`
    align-items:center;
`

const TabImage = styled.Image`
    width:25px;
    height:25px;
    margin-top:10px;
    margin-bottom:5px;

`
 
const TabText = styled.Text`

`

const TabBig = styled.TouchableHighlight`
    width: 100px;
    height:100px;
    background-color: #3ba237;
    border-radius:50px;
    justify-content:center;
    align-items:center;
    border: 5px solid #fff;
    margin-top: -50px;
`

const TabBigImage = styled.Image`
    width:40px;
    height:40px;
`

export default (props) => {
    const navigation = useNavigation()

    const setNavigate = (routeName)=> {
        navigation.navigate(routeName)
    }
    return(
        <TabBarArea>
            {props.items.map(item=>(
                <TabBarItem key={item.route}>
                    {item.type == 'regular' &&
                        <TabRegular onPress={()=>setNavigate(item.route)} underlayColor="transparent">
                            <>
                                <TabImage source={item.icon}/>
                                <TabText>{item.text}</TabText>
                            </>
                        </TabRegular>
                    }
                    {item.type == 'big' &&
                        <TabBig onPress={()=>setNavigate(item.route)} underlayColor="#00FF00">
                            <TabBigImage source={item.icon}/>
                        </TabBig>
                }
                </TabBarItem>
            ))}
        </TabBarArea>
    )
}