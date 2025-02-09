import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {T_Code} from "src/modules/types.ts";
import CodeCard from "components/CodeCard";
import {CodeMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect} from "react";
import * as React from "react";
import "./styles.css"

type Props = {
    codes: T_Code[],
    setCodes: React.Dispatch<React.SetStateAction<T_Code[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    codeName: string,
    setCodeName: React.Dispatch<React.SetStateAction<string>>
}
// 在堆栈中存储过滤参数
// 通过道具从上面获取服务列表，并将其呈现出来
// 渲染搜索字段以过滤服务
const CodesListPage = ({codes, setCodes, isMock, setIsMock, codeName, setCodeName}:Props) => {

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/codes/?code_name=${codeName.toLowerCase()}`)
            const data = await response.json()
            setCodes(data.codes)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }
// ProductsListPage 组件会绘制 mocks
    const createMocks = () => {
        setIsMock(true)
        setCodes(CodeMocks.filter(code => code.name.toLowerCase().includes(codeName.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchData()
        }
    }
// 使用 useEffect 钩子，当页面打开时，就会调用 searchWorks 函数，
// 向后台发送 GET 请求，以获取服务列表
    useEffect(() => {
        fetchData()
    }, []);
// 在鼠标移动产品列表页面组件后，使用 useEffect 钩子调用 fetchData 函数，向后台发送 GET 请求以获取服务列表，并将过滤参数的值作为查询参数传递给后台
// 调用 setProducts 回调，更新 App.tsx 组件中服务列表状态的值 => 产品列表页面组件中道具的值改变 => 产品列表页面组件重新渲染 => 服务列表更新。
    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input value={codeName} onChange={(e) => setCodeName(e.target.value)} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {codes?.map(code => (
                    <Col key={code.id} xs="4">
                        <CodeCard code={code} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CodesListPage