import {useState} from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import CodePage from "pages/CodePage";
import CodesListPage from "pages/CodesListPage";
import {Route, Routes} from "react-router-dom";
import {T_Code} from "src/modules/types.ts";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import "./styles.css"

function App() {
// App.tsx 组件的堆栈使用 useState 钩子存储服务列表，该钩子通过道具抛向 ProductsListPage.tsx 服务列表页面组件
    const [codes, setCodes] = useState<T_Code[]>([])

    const [selectedCode, setSelectedCode] = useState<T_Code | null>(null)


// 如果无法访问后台 - 则输出模拟（src/modules/mocks.ts）
// App.tsx 组件的状态存储了是否输出模拟的布尔标志，
// 该标志通过道具传递给服务列表页面和一个服务页面的组件。
    const [isMock, setIsMock] = useState(false);

    const [codeName, setCodeName] = useState<string>("")

    return (
        <div>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedCode={selectedCode} />
                </Row>
                <Row>
                    <Routes>
						<Route path="/" element={<HomePage />} />
                        <Route path="/codes/" element={<CodesListPage codes={codes} setCodes={setCodes} isMock={isMock} setIsMock={setIsMock} codeName={codeName} setCodeName={setCodeName}/>} />
                        <Route path="/codes/:id" element={<CodePage selectedCode={selectedCode} setSelectedCode={setSelectedCode} isMock={isMock} setIsMock={setIsMock}/>} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
