import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftCalculation,
    fetchCalculation,
    removeCalculation,
    sendDraftCalculation,
    updateCalculation
} from "store/slices/calculationsSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import {E_CalculationStatus, T_Code} from "modules/types.ts";
import CodeCard from "components/CodeCard/CodeCard.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.tsx";

const CalculationPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated} = useAppSelector((state) => state.user)

    const calculation = useAppSelector((state) => state.calculations.calculation)

    const [type, setType] = useState<string>(calculation?.calculation_type)

    const [result, setResult] = useState<string>(calculation?.result)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        is_authenticated && dispatch(fetchCalculation(id))
        return () => dispatch(removeCalculation())
    }, []);

    useEffect(() => {
        setType(calculation?.calculation_type)
        setResult(calculation?.result)
    }, [calculation]);

    const sendCalculation = async (e) => {
        e.preventDefault()

        await saveCalculation()

        await dispatch(sendDraftCalculation())

        navigate("/calculations/")
    }

    const saveCalculation = async (e?) => {
        e?.preventDefault()

        const data = {
            calculation_type: type
        }

        await dispatch(updateCalculation(data))
    }

    const deleteCalculation = async () => {
        await dispatch(deleteDraftCalculation())
        navigate("/codes/")
    }

    if (!calculation) {
        return (
            <div>

            </div>
        )
    }

    const isDraft = calculation.status == E_CalculationStatus.Draft
    const isCompleted = calculation.status == E_CalculationStatus.Completed

    const typeOptions = {
        "Шифрование": "Шифрование",
        "Дешифрование": "Дешифрование",
    }

    return (
        <Form onSubmit={sendCalculation} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновой запрос" : `Запрос №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomDropdown label="Тип" placeholder="Введите тип" selectedItem={type} setSelectedItem={setType} disabled={!isDraft} options={typeOptions}/>
                {isCompleted &&
                    <Row className="mt-3">
                        <CustomInput label="Результат" value={result} disabled={true}/>
                    </Row>
                }
            </Row>
            <Row>
                {calculation.codes.length > 0 ? calculation.codes.map((code:T_Code) => (
                    <Row key={code.id} className="d-flex justify-content-center mb-5">
                        <CodeCard code={code} showRemoveBtn={isDraft} editMM={isDraft && code.id !== calculation.codes[calculation.codes.length - 1].id} />
                    </Row>
                )) :
                    <h3 className="text-center">Данные не добавлены</h3>
                }
            </Row>
            {isDraft &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                        <Button color="success" className="fs-4" onClick={saveCalculation}>Сохранить</Button>
                        <Button color="primary" className="fs-4" type="submit">Отправить</Button>
                        <Button color="danger" className="fs-4" onClick={deleteCalculation}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default CalculationPage