import {Button, StyleSheet } from "react-native";
import {Badge} from 'react-native-paper';
import styled from "styled-components/native";

export const Bin = ({isActive, draft_report_id, resources_count, navigation}) => {
    if (!isActive) {
        return <Button title="Корзина" color={"secondary"} className="bin-wrapper" disabled />
    }

    const openDraftReportScreen = () => navigation.navigate("Report", {id: draft_report_id})

    return (
        <ButtonContainer>
            <Button title="Корзина" style={styles.button} onPress={openDraftReportScreen} />
            <Badge visible={true} style={styles.badge}>
                {resources_count}
            </Badge>
        </ButtonContainer>
    )
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: -8,
        right: -8,
    },
});

const ButtonContainer = styled.View`
  width: 100%;
`