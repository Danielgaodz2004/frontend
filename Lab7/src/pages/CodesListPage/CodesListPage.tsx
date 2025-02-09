import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchCodes, updateCodeName} from "store/slices/codesSlice.ts";
import CodeCard from "components/CodeCard/CodeCard.tsx";
import Bin from "components/Bin/Bin.tsx";

const CodesListPage = () => {

    const dispatch = useAppDispatch()

    const {codes, code_name} = useAppSelector((state) => state.codes)

    const {is_authenticated} = useAppSelector((state) => state.user)

    const {draft_calculation_id, codes_count} = useAppSelector((state) => state.calculations)

    const hasDraft = draft_calculation_id != null

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateCodeName(e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchCodes())
    }

    useEffect(() => {
        dispatch(fetchCodes())
    }, [])

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
                {is_authenticated &&
                    <Col className="d-flex flex-row justify-content-end" md="6">
                        <Bin isActive={hasDraft} draft_calculation_id={draft_calculation_id} codes_count={codes_count} />
                    </Col>
                }
            </Row>
            <Row className="mt-5 d-flex">
                {codes?.map(code => (
                    <Col key={code.id} className="mb-5 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <CodeCard code={code} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CodesListPage