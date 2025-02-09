export type T_Code =  {
    id: string,
    name: string,
    description: string,
    weight: number,
    image: string,
    status: number,
    order?: number
}

export type T_Calculation = {
    id: string | null
    status: E_CalculationStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    codes: T_Code[]
    calculation_type: string
    result: number
}

export enum E_CalculationStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}

export type T_User = {
    id: number
    username: string
    is_authenticated: boolean
}

export type T_CalculationsFilters = {
    date_formation_start: string
    date_formation_end: string
    status: E_CalculationStatus
}

export type T_CodesListResponse = {
    codes: T_Code[],
    draft_calculation_id: number,
    codes_count: number
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}