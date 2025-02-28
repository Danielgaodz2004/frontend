import {Button, FlatList, Text, TouchableOpacity, View} from 'react-native';
import styled from "styled-components/native";
import React, {useEffect, useState} from "react";
import ResourceCard from "../components/ResourceCard";
import {useDispatch, useSelector} from "react-redux";
import {Loading} from "../components/Loader";
import {
    deleteDraftReport,
    fetchReport,
    removeReport,
    sendDraftReport,
    updateReport
} from "../store/slices/reportsSlice";

export const ReportScreen = ({ route, navigation }) => {

    const { id } = route.params

    const [month, setMonth] = useState(report?.month)

    const [company, setCompany] = useState(report?.company)

    const report = useSelector((state) => state.reports.report)

    const dispatch = useDispatch()

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Resource", {id: item.id, name: item.name })}>
            <ResourceCard navigation={navigation} resource={item} edit={true} />
        </TouchableOpacity>
    )

    useEffect(() => {
        dispatch(fetchReport(id))
    }, [route]);

    useEffect(() => {
        setCompany(report?.company)
        setMonth(report?.month)
    }, [report]);

    const deleteReport = async () => {
        await dispatch(deleteDraftReport())

        navigation.navigate("Resources")
    }

    const sendReport = async () => {
        await saveReport()

        await dispatch(sendDraftReport())

        navigation.navigate("Reports")
    }

    const saveReport = async () => {
        const data = {
            month,
            company
        }

        dispatch(updateReport(data))
    }

    if (!report) {
        return <Loading />
    }

    return (
        <Container>
            <Text style={{fontSize: 32}}>
                Отчет №{id}
            </Text>
            <Input
                onChangeText={setCompany}
                value={company}
                placeholder="Компания"
            />
            <Input
                onChangeText={setMonth}
                value={month}
                placeholder="Месяц"
            />

                {report.resources.length > 0 ?
                    <View style={{height: 300}}>
                        <FlatList
                            data={report.resources}
                            renderItem={renderItem}
                            contentContainerStyle={{paddingBottom: 50}}
                        />
                    </View>
                    :
                    <Text style={{fontSize: 24, textAlign: "center"}}>Ресурсы не добавлены</Text>
                }

            <ButtonsContainer>
                <Button title='Сохранить' onPress={saveReport} color="green"/>
                <Button title='Отправить' onPress={sendReport} color="blue"/>
                <Button title='Удалить' onPress={deleteReport} color="red"/>
            </ButtonsContainer>

        </Container>
    )
}

const Container = styled.View`
    padding: 10px;
    gap: 15px;
`

const Input = styled.TextInput`
    height: 40px;
    border-width: 1px;
    padding: 10px;
`

const ButtonsContainer = styled.View`
    gap: 15px;
`
