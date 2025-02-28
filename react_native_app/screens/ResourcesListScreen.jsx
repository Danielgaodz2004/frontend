import {FlatList, TouchableOpacity, View} from 'react-native';
import ResourceCard from "../components/ResourceCard";
import React, {useEffect, useState} from "react";
import SearchBar from "../components/SearchBar";
import styled from 'styled-components/native';
import {useDispatch, useSelector} from "react-redux";
import {fetchResources, updateResourceName} from "../store/slices/resourcesSlice";
import {Bin} from "../components/Bin";

const ResourcesListScreen =({ navigation, route }) => {

    const {is_authenticated} = useSelector((state) => state.user)

    const [clicked, setClicked] = useState(false)

    const dispatch = useDispatch()

    const {resources, resource_density} = useSelector((state) => state.resources)

    const {draft_report_id, resources_count} = useSelector((state) => state.reports)

    const hasDraft = draft_report_id != null

    const handleFetchResources = () => dispatch(fetchResources())

    useEffect(() => {
        handleFetchResources()
    }, [resource_density, route]);

    const handleChangeResourceDensity = (value) => {
        dispatch(updateResourceName(value))
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Resource", {id: item.id, name: item.name })}>
            <ResourceCard navigation={navigation} resource={item} />
        </TouchableOpacity>
    )

    return (
        <PostsListContainer>

            <SearchBar searchPhrase={resource_density} setSearchPhrase={handleChangeResourceDensity} clicked={clicked} setClicked={setClicked} />

            {is_authenticated &&
                <BinContainer>
                    <Bin isActive={hasDraft} draft_report_id={draft_report_id} resources_count={resources_count} navigation={navigation} />
                </BinContainer>
            }

            <View>
                <FlatList
                    data={resources}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 50 }}
                />
            </View>


        </PostsListContainer>
    );
}

const BinContainer = styled.View`
  padding: 0 25px;
`

const PostsListContainer = styled.View`
  padding-bottom: 75px;
`

export default ResourcesListScreen;
