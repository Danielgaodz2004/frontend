import {Button, Text} from "react-native";
import styled from "styled-components/native";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveLanguage} from "../store/slices/languageSlice";
import {useIntl} from "react-intl";

export const SettingsScreen = ({route}) => {

    const intl = useIntl()

    const {language} = useSelector(state => state.language)

    const [value, setValue] = React.useState("russian");

    const dispatch = useDispatch()

    useEffect(() => {
        setValue(language)
    }, [route]);

    const handleSaveLanguage = () => {
        dispatch(saveLanguage(value))
    }

    return (
        <Container>
            <Text>{intl.messages.language}</Text>
            <Input
                onChangeText={setValue}
                value={value}
            />
            <Button title={intl.messages.save} onPress={handleSaveLanguage} />
        </Container>
    )
}

const Container = styled.View`
    padding: 25px;
    display: flex;
    gap: 25px;
`

const Input = styled.TextInput`
    height: 40px;
    border-width: 1px;
    padding: 10px;
`