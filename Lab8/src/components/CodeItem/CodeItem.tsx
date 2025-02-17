import { useNavigate, useParams, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "store/store.ts";
import {
    deleteCode,
    fetchCode,
    removeSelectedCode,
    updateCode,
    updateCodeImage
} from "store/slices/codesSlice.ts";
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const CodeItem = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const { code } = useAppSelector((state) => state.codes);
    const { is_superuser } = useAppSelector((state) => state.user);
    
    const queryParams = new URLSearchParams(location.search);
    const initialEditMode = queryParams.get("edit") === "true";
    
    const [isEditable, setIsEditable] = useState(initialEditMode);
    const [name, setName] = useState<string>(code?.name);
    const [description, setDescription] = useState<string>(code?.description);
    const [weight, setWeight] = useState<number>(code?.weight);
    const [imgFile, setImgFile] = useState<File>();
    const [imgURL, setImgURL] = useState<string>(code?.image);
    
    useEffect(() => {
        dispatch(fetchCode(id));
        return () => dispatch(removeSelectedCode());
    }, [dispatch, id]);

    useEffect(() => {
        setName(code?.name);
        setDescription(code?.description);
        setWeight(code?.weight);
        setImgURL(code?.image);
    }, [code]);

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setImgFile(file);
            setImgURL(URL.createObjectURL(file));
        }
    };

    const saveCode = async () => {
        if (imgFile) {
            const formData = new FormData();
            formData.append("image", imgFile, imgFile.name);
            await dispatch(updateCodeImage({ code_id: id, data: formData }));
        }

        const data = { name, description, weight };
        await dispatch(updateCode({ code_id: id, data: data }));
        setIsEditable(false);
        navigate("/codes-table/");
    };

    const handleDeleteCode = async () => {
        await dispatch(deleteCode(id));
        navigate("/codes-table/");
    };

    if (!code) {
        return <div></div>;
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={imgURL} alt={name} className="w-100" />
                    {isEditable && (
                        <Container className="mt-3 d-flex justify-content-center">
                            <UploadButton handleFileChange={handleFileChange} />
                        </Container>
                    )}
                </Col>
                <Col md={6}>
                    {isEditable ? (
                        <>
                            <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName} />
                            <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription} />
                            <CustomInput label="Вес" placeholder="Введите вес" type="number" value={weight} setValue={setWeight} />
                            <Col className="d-flex justify-content-center gap-5 mt-5">
                                <Button color="primary" className="fs-4" onClick={saveCode}>Сохранить</Button>
                                <Button color="danger" className="fs-4" onClick={handleDeleteCode}>Удалить</Button>
                            </Col>
                        </>
                    ) : (
                      <>
                        <h2 className="text-wrap text-break">{name}</h2>
                        <p className="text-wrap text-break"><strong>Описание:</strong> {description}</p>
                        <p className="text-wrap text-break"><strong>Масса:</strong> {weight} </p>
                      </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CodeItem;