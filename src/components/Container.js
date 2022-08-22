import styled from 'styled-components/native';

export default styled.SafeAreaView`
    flex:${props=>props.flexprop || 1};
    justify-content: ${props=>props.justify || ''};
    align-items:center;
    background-color: #fff;
    margin-right:20px;
    margin-left:20px;
`