import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {formatDate} from "src/utils/utils.ts";
import {T_Calculation, T_Code} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import { Button } from "reactstrap";
import { useAppDispatch } from "src/store/store";
import { deleteCode } from "src/store/slices/codesSlice";

const CodeRowTable = ({codes}:{codes:T_Code[]}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const handleClick = (code_id) => {
        navigate(`/codes/${code_id}`)
    }

    const handleEdit = (code_id) => {
        navigate(`/codes/${code_id}?edit=true`)
    }

    const handleDelete = async (code_id) => {
        await dispatch(deleteCode(code_id));
        navigate("/codes-table/");
    };


    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Статус',
                accessor: 'status',
            },
            {
                Header: 'Имя',
                accessor: 'name',
            },
            {
                Header: 'Изображение',
                accessor: 'image',
                Cell: ({ value }) => <img alt="" src={value} width="140" height="64"/>,
            },
            {
                Header: 'Масса',
                accessor: 'weight',
            },
            {
                Header: "Изменить",
                accessor: "edit_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => handleEdit(cell.row.original.id)} className="btn-edit"> Изменить</Button>
                )
            },
              {
                Header: "Удалить",
                accessor: "delete_button",
                Cell: ({ cell }) => (
                  <Button color="danger" onClick={() => handleDelete(cell.row.original.id)}>
                    Удалить
                  </Button>
                ),
              },
        ],
        []
    )

    return (
        <CustomTable columns={columns} data={codes} onClick={handleClick}/>
    )
};

export default CodeRowTable