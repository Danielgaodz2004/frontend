import styled from "styled-components/native";
import {Button} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {addResourceToReport} from "../store/slices/resourcesSlice";
import {removeResourceFromDraftReport} from "../store/slices/reportsSlice";

const ResourceCard = ({navigation, resource, showAddBtn=false, edit=false}) => {

    const {is_authenticated} = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const handleOpenResourceScreen = () => navigation.navigate("Resource", {id: id, name: name });

    const handleAddResourceToReport = () => dispatch(addResourceToReport(resource.id));

    const handleRemoveResourceFromDraftReport = () => {
        dispatch(removeResourceFromDraftReport(resource.id))
    }

    if (edit) {
        return (
            <PostView>
                <PostDetails>
                    <PostImage source={{uri: resource.image}} />
                    <PostRightDetails>
                        <PostTitleContainer>
                            <PostTitle>{resource.name}</PostTitle>
                        </PostTitleContainer>
                        <PostButtonsContainer>
                            <Button title='Открыть' onPress={handleOpenResourceScreen} color="#CF4D35"/>
                            <Button title='Удалить' onPress={handleRemoveResourceFromDraftReport} color="blue"/>
                        </PostButtonsContainer>
                    </PostRightDetails>
                </PostDetails>
            </PostView>
        )
    }

    return (
        <PostView>
            <PostDetails>
                <PostImage source={{uri: resource.image}} />
                <PostRightDetails>
                    <PostTitleContainer>
                        <PostTitle>{resource.name}</PostTitle>
                    </PostTitleContainer>
                    {is_authenticated ?
                        <PostButtonsContainer>
                            <Button title='Открыть' onPress={handleOpenResourceScreen} color="#CF4D35"/>
                            <Button title='Добавить' onPress={handleAddResourceToReport} color="blue"/>
                        </PostButtonsContainer>
                        :
                        <PostButtonContainer>
                            <Button title='Открыть' onPress={handleOpenResourceScreen} color="#CF4D35"/>
                        </PostButtonContainer>
                    }
                </PostRightDetails>
            </PostDetails>
        </PostView>
    )
}


const PostView = styled.View`
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  margin: 15px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
  border-style: solid;
  border-radius: 5px;
`

const PostImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-right: 12px;
`

const PostTitleContainer = styled.Text`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const PostTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
`

const PostDetails = styled.View`
  flex-direction: row;
`
const PostRightDetails = styled.View`
  flex-direction: column;
  flex: 1;
  gap: 20px;
`

const PostButtonContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-content: center;
`

const PostButtonsContainer = styled.View`
    flex-direction: row;
    display: flex;
    gap: 15px;
    flex: 1;
    justify-content: space-around;
    align-content: center;
`

export default ResourceCard;