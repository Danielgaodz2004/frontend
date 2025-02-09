import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {T_Code} from "modules/types.ts";
import {useEffect, useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {addCodeToCalculation, fetchCodes} from "store/slices/codesSlice.ts";
import {
    fetchDraftCalculation,
    removeCodeFromDraftCalculation, updateCodeOrder,
    updateCodeValue
} from "store/slices/calculationsSlice.ts";

type Props = {
    code: T_Code,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean,
}

const CodeCard = ({code,  showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const location = useLocation()

    const isCalculationPage = location.pathname.includes("calculations")

    const handeAddToDraftCalculation = async () => {
        await dispatch(addCodeToCalculation(code.id))
        await dispatch(fetchCodes())
    }

    const handleRemoveFromDraftCalculation = async () => {
        await dispatch(removeCodeFromDraftCalculation(code.id))
    }

    const handleShuffleCards = async () =>{
        await dispatch(updateCodeOrder(code.id))
        await dispatch(fetchDraftCalculation())
    }

    if (isCalculationPage) {
        return (
            <Card key={code.id}>
                <Row>
                    <Col>
                        <img
                            alt=""
                            src={code.image}
                            style={{"width": "100%"}}
                        />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {code.name}
                            </CardTitle>
                            <CardText>
                                Объем: {code.weight} байт
                            </CardText>
                            <Col className="d-flex gap-5">
                                <Link to={`/codes/${code.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {editMM &&
                                    <Button color="primary" type="button" onClick={handleShuffleCards}>
                                        Вниз
                                    </Button>
                                }
                                {showRemoveBtn &&
                                    <Button color="danger" onClick={handleRemoveFromDraftCalculation}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={code.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={code.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {code.name}
                </CardTitle>
                <CardText>
                    Объем: {code.weight} байт
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/codes/${code.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftCalculation}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default CodeCard