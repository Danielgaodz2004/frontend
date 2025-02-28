import React, {useEffect, useState} from 'react'
import styled from 'styled-components/native'
import {ScrollView} from "react-native";
import {Loading} from "../components/Loader";
import axios from "axios";
import {useIntl} from "react-intl";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 350px;
  margin-bottom: 20px;
`

const PostDetails = styled.View`
  flex-direction: column;
  padding-bottom: 25px;
`

const PostText = styled.Text`
  flex-direction: column;
  font-size: 18px;
  line-height: 24px;
`

const CodeScreen = ({ route }) => {

    const intl = useIntl()

    const { id } = route.params

    const [code, setCode] = useState(null)

    const [isLoading, setIsLoading] = useState(true)

    const fetchCode = () => {
        setIsLoading(true)
        axios
            .get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:8000/api/codes/${id}`)
            .then(({data}) => {
                setCode(data)
            })
            .catch((err) => {
                alert(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchCode()
    }, [id, route])

    if (isLoading) {
        return <Loading />
    }

    return (
        <ScrollView style={{ padding: 20 }}>
            <PostImage source={{uri: code.image}} />
            <PostDetails>
                <PostText>
                    {intl.messages.name}: {code.name}
                </PostText>
                <PostText>
                    {intl.messages.description}: {code.description}
                </PostText>
                <PostText>
                    {intl.messages.weight}: {code.weight} {intl.messages.bytes}
                </PostText>
            </PostDetails>
        </ScrollView>
    )
}

export default CodeScreen;