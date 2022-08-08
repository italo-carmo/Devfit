import styled from 'styled-components/native';

export default styled.SafeAreaView`
    flex:1;
    justify-content: ${props=>props.justify || ''};
    align-items:center;
    background-color: #fff;
    
`