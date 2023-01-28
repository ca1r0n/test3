import {api, entityId} from "./api";

export interface IRow {
    id: number
    rowName: string
    total: number
    salary: number
    mimExploitation: number
    machineOperatorSalary: number
    materials: number
    mainCosts: number
    supportCosts: number
    equipmentCosts: number
    overheads: number
    estimatedProfit: number
    child: Array<IRow>
}

export interface IRecalculatedRows {
    changed: Array<Omit<IRow, "child">>
    current: IRow | null
}

export type ICreateRow = Omit<IRow, "id" | "child" | "total"> & {
    parentId: number | null
}
export type IUpdateRow = Omit<IRow, "id" | "child" | "total">

export const GetListRow = () => {
    return api.get(`/v1/outlay-rows/entity/${entityId}/row/list`)
        .then(res => res.data as Array<IRow>)
}

export const CreateRow = (row: ICreateRow) => {
    return api.post(`/v1/outlay-rows/entity/${entityId}/row/create`, row)
        .then(res => res.data as IRecalculatedRows)
}

export const UpdateRow = (id: number, row: IUpdateRow) => {
    return api.post(`/v1/outlay-rows/entity/${entityId}/row/${id}/update`, row)
        .then(res => res.data as IRecalculatedRows)
}

export const DeleteRow = (id: number) => {
    return api.delete(`/v1/outlay-rows/entity/${entityId}/row/${id}/delete`)
        .then(res => res.data as IRecalculatedRows)
}