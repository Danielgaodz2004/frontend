import {IntlProvider} from "react-intl";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";


const dictionary = {
    russian: {
        codes: "Список кодов",
        code: "Код",
        settings: "Настройки",
        search: "Поиск",
        open: "Открыть",
        name: "Название",
        description: "Информационный вектор",
        weight: "Объем",
        language: "Язык",
        save: "Сохранить",
        bytes: "байт",
    },
    english: {
        codes: "Code list",
        code: "Code",
        settings: "Settings",
        search: "Search",
        open: "Open",
        name: "Name",
        description: "Information vector",
        weight: "Weight",
        language: "Language",
        save: "Save",
        bytes: "bytes",
    },
    chinese: {
        codes: "守则一览表",
        code: "密码",
        settings: "设置",
        search: "搜索",
        open: "打开",
        name: "标题",
        description: "信息向量",
        weight: "卷数",
        language: "语言",
        save: "储蓄",
        bytes: "字节",
    }
}


export const Internalization = ({children}) => {

    const {language} = useSelector(state => state.language)

    const [messages, setMessages] = useState({})

    useEffect(() => {
        if (language === "russian") {
            setMessages(dictionary.russian)
        } else if (language === "english") {
            setMessages(dictionary.english)
        } else if (language === "chinese") {
            setMessages(dictionary.chinese)
        }
    }, [language]);

    return (
        <IntlProvider key={ language } locale={ language }  messages={ messages }>
            {children}
        </IntlProvider>
    );
}