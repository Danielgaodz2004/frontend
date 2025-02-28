import {Button} from "react-native";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components/native";

export const RegisterScreen = ({navigation}) => {

    const {is_authenticated} = useSelector((state) => state.user)

    useEffect(() => {
        if (is_authenticated) {
            navigation.navigate("Home")
        }
    }, [is_authenticated]);

    return (
        <Container>
            <LoginInput
                placeholder="Введите логин"
            />
            <PasswordInput
                placeholder="Введите пароль"
            />
            <PasswordInput
                placeholder="Повторите пароль"
            />
            <ButtonWrapper>
                <Button
                    title="Регистрация"
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
