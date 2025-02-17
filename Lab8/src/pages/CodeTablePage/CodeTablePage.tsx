import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    fetchCalculations,
    updateFilters
} from "store/slices/calculationsSlice.ts";
import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.tsx";
import {T_CalculationsFilters} from "modules/types.ts";
import CalculationsTable from "components/CalculationsTable/CalculationsTable.tsx";
import {useNavigate} from "react-router-dom";
import { fetchCodes } from "src/store/slices/codesSlice";
import CodeRowTable from "src/components/CodeRowTable/CodeRowTable";
import Bin from "components/Bin/Bin.tsx";

const CodeTablePage = () => {

        const dispatch = useAppDispatch()
    
        const {codes, code_name} = useAppSelector((state) => state.codes)
    
        const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)
    
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

        // useEffect(() => {
        //     if (!is_superuser) {
        //         navigate("/")
        //     }
        // }, [is_superuser]);

        // useEffect(() => {
        //     dispatch(fetchCodes())
        // }, [filters]);

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
                <Row>
                    {codes.length ? <CodeRowTable codes={codes}/> : <h3 className="text-center mt-5">Запросы не найдены</h3>}
                </Row>
            </Container>
        )
};

export default CodeTablePage