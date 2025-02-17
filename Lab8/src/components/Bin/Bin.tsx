import {Link, useNavigate} from "react-router-dom";
import {Badge, Button} from "reactstrap";

type Props = {
    isActive: boolean,
    draft_calculation_id: string,
    codes_count: number
}

const Bin = ({isActive, draft_calculation_id, codes_count}:Props) => {
    const navigate = useNavigate();

    if (!isActive) {
        return <Button color={"primary"} className="bin-wrapper" onClick={() => navigate('/codes/new')} >Новые данные</Button>
    }

    return (
        <Link to={`/calculations/${draft_calculation_id}/`} className="bin-wrapper">
            <Button color={"primary"} className="w-100 bin">
                Корзина
                <Badge>
                    {codes_count}
                </Badge>
            </Button>
        </Link>
    )
}

export default Bin