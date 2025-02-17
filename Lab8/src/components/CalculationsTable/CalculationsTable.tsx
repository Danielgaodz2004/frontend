// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { formatDate } from 'src/utils/utils.ts';
// import { T_Calculation } from 'modules/types.ts';
// import CustomTable from 'components/CustomTable/CustomTable.tsx';
// import './CalculationTable.css';
// import { Button } from 'reactstrap';
// import { useAppDispatch, useAppSelector } from 'src/store/store';
// import { acceptCalculation, declineCalculation, fetchCalculations } from 'src/store/slices/calculationsSlice';
// import qrCode from "src/assets/qrCode.svg";
// import unknown from "src/assets/2.svg"

// interface CalculationRowProps {
//   id: number;
//   status: number;
//   result: string;
//   dateCreated: string;
//   dateFormation: string;
//   dateComplete: string;
//   qr?: string;
//   onClick: () => void;
// }

// const getStatusText = (status: number) => {
//   const STATUSES = {
//     1: 'Введен',
//     2: 'В работе',
//     3: 'Завершен',
//     4: 'Отменён',
//     5: 'Удалён',
//   };
//   return STATUSES[status] || 'Неизвестен';
// };

// const CalculationRow: React.FC<CalculationRowProps> = ({
//   id,
//   status,
//   result,
//   dateCreated,
//   dateFormation,
//   dateComplete,
//   qr,
//   onClick,
// }) => {
//   return (
//     <tr className={`calculation-row ${getStatusText(status).toLowerCase()}`} onClick={onClick}>
//       <td>{id}</td>
//       <td>{getStatusText(status)}</td>
//       <td>{result}</td>
//       <td>{formatDate(dateCreated)}</td>
//       <td>{formatDate(dateFormation)}</td>
//       <td>{formatDate(dateComplete)}</td>
//       <td>
//         {qr ? (
//           <div className="qr-hover-wrapper">
//             <image className="status-icon" src={qrCode} alt="QR Icon" />
//             <div className="qr-hover">
//               <img className="qr-code" src={`data:image/png;base64,${qr}`} alt="QR Code" />
//             </div>
//           </div>
//         ) : (
//           <img src={qrCode} alt='QR Icon'/>
//         )}
//       </td>
//     </tr>
//   );
// };

// const CalculationsTable: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { calculations } = useAppSelector((state) => state.calculations);
//   const { is_superuser } = useAppSelector((state) => state.user);

//   const handleAcceptCalculation = async (calculation_id: number) => {
//     await dispatch(acceptCalculation(calculation_id));
//     await dispatch(fetchCalculations());
//   };

//   const handleDeclineCalculation = async (calculation_id: number) => {
//     await dispatch(declineCalculation(calculation_id));
//     await dispatch(fetchCalculations());
//   };

//   const columns = React.useMemo(() => {
//     const baseColumns = [
//       {
//         Header: '№',
//         accessor: 'id',
//       },
//       {
//         Header: 'Статус',
//         accessor: 'status',
//         Cell: ({ value }) => getStatusText(value),
//       },
//       {
//         Header: 'Результат',
//         accessor: 'result',
//         Cell: ({ value }) => value,
//       },
//       {
//         Header: 'Дата создания',
//         accessor: 'date_created',
//         Cell: ({ value }) => formatDate(value),
//       },
//       {
//         Header: 'Дата формирования',
//         accessor: 'date_formation',
//         Cell: ({ value }) => formatDate(value),
//       },
//       {
//         Header: 'Дата завершения',
//         accessor: 'date_complete',
//         Cell: ({ value }) => formatDate(value),
//       },
      
//       { Header: 'Qr Код',
//       accessor: 'qr',
//        Cell: ({ value }) => ( value ?
//          ( <div className="qr-hover-wrapper"> <img className="status-icon"
//            src={qrCode} alt="QR Icon" /> <div className="qr-hover"> 
//            <img className="qr-code" src={`data:image/png;base64,${value}`} alt="QR Code" /> </div> </div> ) : 
//            ( <img className="status-icon" src={unknown} alt="QR Icon" /> ) ), },
//     ];

//     if (is_superuser) {
//       baseColumns.push({
//         Header: 'Действия',
//         accessor: 'actions',
//         Cell: ({ row }) => (
//           row.original.status < 3 && (
//             <>
//               <Button color="primary" onClick={() => handleAcceptCalculation(row.original.id)}>
//                 Принять
//               </Button>{' '}
//               <Button color="danger" onClick={() => handleDeclineCalculation(row.original.id)}>
//                 Отклонить
//               </Button>
//             </>
//           )
//         ),
//       });
//     }

    

//     return baseColumns;
//   }, [is_superuser]);

//   return <CustomTable columns={columns} data={calculations} />;
// };

// export default CalculationsTable;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from 'src/utils/utils.ts';
import { T_Calculation } from 'modules/types.ts';
import CustomTable from 'components/CustomTable/CustomTable.tsx';
import './CalculationTable.css';
import { Button } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { acceptCalculation, declineCalculation, fetchCalculations } from 'src/store/slices/calculationsSlice';
import qrCode from "src/assets/qrCode.svg";
import unknown from "src/assets/2.svg";

const getStatusText = (status: number) => {
  const STATUSES = {
    1: 'Введен',
    2: 'В работе',
    3: 'Завершен',
    4: 'Отменён',
    5: 'Удалён',
  };
  return STATUSES[status] || 'Неизвестен';
};

const CalculationsTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { calculations } = useAppSelector((state) => state.calculations);
  const { is_superuser } = useAppSelector((state) => state.user);

  const handleAcceptCalculation = async (calculation_id: number) => {
    await dispatch(acceptCalculation(calculation_id));
    await dispatch(fetchCalculations());
  };

  const handleDeclineCalculation = async (calculation_id: number) => {
    await dispatch(declineCalculation(calculation_id));
    await dispatch(fetchCalculations());
  };

  const columns = React.useMemo(() => {
    const baseColumns = [
      { Header: '№', accessor: 'id' },
      { Header: 'Статус', accessor: 'status', Cell: ({ value }) => getStatusText(value) },
      { Header: 'Результат', accessor: 'result', Cell: ({ value }) => value },
      { Header: 'Дата создания', accessor: 'date_created', Cell: ({ value }) => formatDate(value) },
      { Header: 'Дата формирования', accessor: 'date_formation', Cell: ({ value }) => formatDate(value) },
      { Header: 'Дата завершения', accessor: 'date_complete', Cell: ({ value }) => formatDate(value) },
    ];

    if (is_superuser) {
      baseColumns.push({
        Header: 'Qr Код',
        accessor: 'qr',
        Cell: ({ value }) =>
          value ? (
            <div className="qr-hover-wrapper">
              <img className="status-icon" src={qrCode} alt="QR Icon" />
              <div className="qr-hover">
                <img className="qr-code" src={`data:image/png;base64,${value}`} alt="QR Code" />
              </div>
            </div>
          ) : (
            <img className="status-icon" src={unknown} alt="QR Icon" />
          ),
      });

      baseColumns.push({
        Header: 'Действия',
        accessor: 'actions',
        Cell: ({ row }) =>
          row.original.status < 3 && (
            <>
              <Button color="primary" onClick={() => handleAcceptCalculation(row.original.id)}>
                Принять
              </Button>{' '}
              <Button color="danger" onClick={() => handleDeclineCalculation(row.original.id)}>
                Отклонить
              </Button>
            </>
          ),
      });
    }

    return baseColumns;
  }, [is_superuser]);

  return <CustomTable columns={columns} data={calculations} />;
};

export default CalculationsTable;
