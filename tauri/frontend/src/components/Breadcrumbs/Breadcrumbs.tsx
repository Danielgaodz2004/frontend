import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Code} from "modules/types.ts";
import "./styles.css"

type Props = {
    selectedCode: T_Code | null
}

const Breadcrumbs = ({selectedCode}:Props) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{location.pathname == "/" &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/codes") &&
                <BreadcrumbItem active>
                    <Link to="/codes">
						Данные
                    </Link>
                </BreadcrumbItem>
			}
            {selectedCode &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedCode.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs