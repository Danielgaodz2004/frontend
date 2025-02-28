import {Button, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {handleLogout} from "../store/slices/userSlice";
import styled from "styled-components/native";

export const ProfileScreen = ({navigation}) => {

    const dispatch = useDispatch()

    const {is_authenticated, username} = useSelector((state) => state.user)

    useEffect(() => {
        if (!is_authenticated) {
            navigation.navigate("Home")
        }
    }, [is_authenticated]);

    const logout = () => dispatch(handleLogout())

    return (
        <Container>
            <Text>Пользователь: {username}</Text>
            <Button
                onPress={logout}
                title="Выход"
                color="#841584"
            />
        </Container>
    )
}

const Container = styled.View`
    padding: 25px;
    display: flex;
    gap: 25px;
`