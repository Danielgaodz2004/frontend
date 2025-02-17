import { Button, Col, Container, Row, CustomInpuz } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/store.ts";
import React, { useEffect, useState } from "react";
import mock from "src/assets/mock.png";
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";
import { createCode } from "store/slices/codesSlice.ts";
import { T_CreateCode } from "modules/types.ts";

const NewCode = () => {
    const { is_superuser } = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [imgURL, setImgURL] = useState<string>(mock);

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/");
        }
    }, [is_superuser, navigate]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImgFile(file);
            setImgURL(URL.createObjectURL(file));
        }
    };

    const handleCreateCode = async () => {
        if (!name || !description || !weight) {
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("weight", weight);

        if (imgFile) {
            formData.append("image", imgFile, imgFile.name);
        }

        await dispatch(createCode(formData as T_CreateCode));
        navigate("/codes-table/");
    };

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={imgURL} alt="Preview" className="w-100" />
                    <Container className="mt-3 d-flex justify-content-center">
                        <UploadButton handleFileChange={handleFileChange} />
                    </Container>
                </Col>
                <Col md={6}>
                    <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName} />
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription} />
                    <CustomInput label="Вес" placeholder="Введите вес" type="number" value={weight} setValue={setWeight} />
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="primary" className="fs-4" onClick={handleCreateCode}>Создать</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default NewCode;
