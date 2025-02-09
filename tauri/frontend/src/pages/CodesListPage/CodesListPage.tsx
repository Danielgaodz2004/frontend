import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import CodeCard from "components/CodeCard/CodeCard.tsx";
import {ChangeEvent, FormEvent, useEffect} from "react";
import * as React from "react";
import {RootState, useAppSelector} from "src/store/store.ts";
import {updateCodeName} from "src/store/slices/codesSlice.ts";
import {T_Code} from "modules/types.ts";
import {CodeMocks} from "modules/mocks.ts";
import {useDispatch} from "react-redux";
import "./styles.css"
import {isTauri} from "@tauri-apps/api/core";

type Props = {
    codes: T_Code[],
    setCodes: React.Dispatch<React.SetStateAction<T_Code[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const CodesListPage = ({codes, setCodes, isMock, setIsMock}:Props) => {

    const dispatch = useDispatch()

    const {code_name} = useAppSelector((state:RootState) => state.codes)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCodeName(e.target.value))
    }

    const createMocks = () => {
        setIsMock(true)
        setCodes(CodeMocks.filter(code => code.name.toLowerCase().includes(code_name.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        await fetchCodes()
    }

    const fetchCodes = async () => {
        try {
            const env = await import.meta.env;
            const apiUrl = isTauri() ? env.VITE_API_URL : ""
            const response = await fetch(`${apiUrl}/api/codes/?code_name=${code_name.toLowerCase()}`)
            const data = await response.json()
            setCodes(data.codes)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    useEffect(() => {
        fetchCodes()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={code_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {codes?.map(code => (
                    <Col key={code.id} sm="12" md="6" lg="4">
                        <CodeCard code={code} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CodesListPage