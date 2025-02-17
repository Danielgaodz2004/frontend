import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/store.ts";
import { fetchCode, removeSelectedCode, updateCodeName } from "store/slices/codesSlice.ts";
import CodeItem from "src/components/CodeItem/CodeItem";

const CodePage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { code } = useAppSelector((state) => state.codes);
    const { is_superuser} = useAppSelector((state) => state.user)

    const [editableCode, setEditableCode] = useState({
        name: "",
        description: "",
        weight: 0,
        image: "",
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchCode(id));
        }
        return () => dispatch(removeSelectedCode());
    }, [id, dispatch]);

    useEffect(() => {
        if (code) {
            setEditableCode({
                name: code.name || "",
                description: code.description || "",
                weight: code.weight || 0,
                image: code.image || "",
            });
        }
    }, [code]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditableCode((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdate = () => {
        if (id) {
            dispatch(updateCode(id, editableCode));
        }
    };

    if (!code) {
        return <div>Loading...</div>;
    }

    return (
        <CodeItem code={code} />
    );
};

export default CodePage;
