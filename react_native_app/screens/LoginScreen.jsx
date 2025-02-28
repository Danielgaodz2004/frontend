import {Button} from "react-native";
import {useEffect, useState} from "react";
import styled from "styled-components/native";
import {useDispatch, useSelector} from "react-redux";
import {handleLogin} from "../store/slices/userSlice";

export const LoginScreen = ({navigation}) => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const {is_authenticated} = useSelector((state) => state.user)

    const handleUserLogin = async () => {
        const data = {
            username,
            password
        }

        dispatch(handleLogin(data))
    }

    useEffect(() => {
        if (is_authenticated) {
            navigation.navigate("Resources")
        }
    }, [is_authenticated]);

    return (
        <Container>
            <LoginInput
                onChangeText={setUsername}
                value={username}
                placeholder="Введите логин"
            />
            <PasswordInput
                onChangeText={setPassword}
                value={password}
                placeholder="Введите пароль"
            />
            <ButtonWrapper>
                <Button
                    onPress={handleUserLogin}
                    title="Вход"
                    color="#841584"
                />
            </ButtonWrapper>
        </Container>
    )
}

const Container = styled.View`
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const LoginInput = styled.TextInput`
    height: 40px;
    border-width: 1px;
    padding: 10px;
`

const PasswordInput = styled.TextInput`
    height: 40px;
    border-width: 1px;
    padding: 10px;
`

const ButtonWrapper = styled.View`
    width: 100%;
    display: flex;
`
