import {FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import CodeCard from "../components/CodeCard";
import React, {useEffect, useState} from "react";
import SearchBar from "../components/SearchBar";
import styled from 'styled-components/native';
import axios from "axios";

const CodesScreen =({ navigation, route }) => {

    const [isLoading, setIsLoading] = useState(true)

    const [clicked, setClicked] = useState(false)

    const [codeName, setCodeName] = useState("")

    const [codes, setCodes] = useState([])

    const fetchCodes = () => {
        setIsLoading(true)
        axios
            .get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:8000/api/codes?code_name=${codeName}`)
            .then(({data}) => {
                setCodes(data["codes"])
            })
            .catch((err) => {
                alert(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchCodes()
    }, [codeName, route]);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Code", {id: item.id })}>
            <CodeCard navigation={navigation} id={item.id} name={item.name} item={item} />
        </TouchableOpacity>
    )

    return (
        <PostsListContainer>

            <SearchBar searchPhrase={codeName} setSearchPhrase={setCodeName} clicked={clicked} setClicked={setClicked} />

            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchCodes} />}
                data={codes}
                renderItem={renderItem}
            />

        </PostsListContainer>
    );
}

const PostsListContainer = styled.View`
  padding-bottom: 75px;
`

export default CodesScreen;
