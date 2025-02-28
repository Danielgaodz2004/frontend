import React from "react";
import styled from 'styled-components/native';
import {Text} from 'react-native';

const HomeScreen = () => {
    return (
        <Wrapper>
            <Text style={{fontSize: 20, marginBottom: 15}}>Отчеты по добыче ресурсов на Луне</Text>
            <Text>
                Луна обладает и разнообразными полезными ископаемыми, в том числе и ценными для промышленности металлами — железом, алюминием, титаном; кроме этого, в поверхностном слое лунного грунта, реголите, накоплен редкий на Земле изотоп гелий-3, который может использоваться в качестве топлива для перспективных термоядерных реакторов. В настоящее время идут разработки методик промышленного получения металлов, кислорода и гелия-3 из реголита; найдены залежи водяного льда.
            </Text>
        </Wrapper>
    );
}

const Wrapper = styled.View`
  padding: 25px;
`

export default HomeScreen;
