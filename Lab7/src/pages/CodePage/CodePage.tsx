import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchCode, removeSelectedCode} from "store/slices/codesSlice.ts";

const CodePage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {code} = useAppSelector((state) => state.codes)

    useEffect(() => {
        dispatch(fetchCode(id))
        return () => dispatch(removeSelectedCode())
    }, []);

    if (!code) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={code.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{code.name}</h1>
                    <p className="fs-5">Информационный вектор: {code.description}</p>
                    <p className="fs-5">Объем: {code.weight} байт</p>
                </Col>
            </Row>
        </Container>
    );
};

export default CodePage