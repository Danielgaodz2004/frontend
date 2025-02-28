import React, {useEffect} from 'react'
import styled from 'styled-components/native'
import {ScrollView} from "react-native";
import {Loading} from "../components/Loader";
import {fetchResource} from "../store/slices/resourcesSlice";
import {useDispatch, useSelector} from "react-redux";

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

const ResourceScreen = ({ route }) => {

    const {resource} = useSelector((state) => state.resources)

    const { id } = route.params

    const dispatch = useDispatch()

    const handleFetchResources = (id) => dispatch(fetchResource(id))

    useEffect(() => {
        handleFetchResources(id)
    }, [id])

    if (!resource || resource.id !== id) {
        return <Loading />
    }

    return (
        <ScrollView style={{ padding: 20 }}>
            <PostImage source={{uri: resource.image}} />
            <PostDetails>
                <PostText>
                    Название: {resource.name}
                </PostText>
                <PostText>
                    Описание: {resource.description}
                </PostText>
                <PostText>
                    Плотность: {resource.density} г/см³
                </PostText>
            </PostDetails>
        </ScrollView>
    )
}

export default ResourceScreen;