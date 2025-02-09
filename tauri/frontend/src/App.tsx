import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import CodePage from "pages/CodePage/CodePage.tsx";
import CodesListPage from "pages/CodesListPage/CodesListPage.tsx";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage/HomePage.tsx";
import {useState} from "react";
import {T_Code} from "modules/types.ts";

function App() {

    const [codes, setCodes] = useState<T_Code[]>([])

    const [selectedCode, setSelectedCode] = useState<T_Code | null>(null)

    const [isMock, setIsMock] = useState(false);

    return (
        <>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedCode={selectedCode}/>
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/codes/" element={<CodesListPage codes={codes} setCodes={setCodes} isMock={isMock} setIsMock={setIsMock} />} />
                        <Route path="/codes/:id" element={<CodePage selectedCode={selectedCode} setSelectedCode={setSelectedCode} isMock={isMock} setIsMock={setIsMock} />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App
