import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRecalculatedRows, IRow} from "../../api/row.api";
import {array} from "../../utils/array";

export type IRowRender = Omit<IRow, "child"> & {
    level: number
    parentId: number
}

const emptyRowRender: IRowRender = {
    id: 0,
    rowName: "",
    total: 0,
    salary: 0,
    mimExploitation: 0,
    machineOperatorSalary: 0,
    materials: 0,
    mainCosts: 0,
    supportCosts: 0,
    equipmentCosts: 0,
    overheads: 0,
    estimatedProfit: 0,
    level: 0,
    parentId: 0
}

interface IState {
    rows: Array<IRowRender | null>
}

const initialState: IState = {
    rows: []
}


const update: CaseReducer<IState, PayloadAction<IRecalculatedRows>> = (state, action) => {
    state.rows = state.rows.map((row) => {
        // if null
        if (!row) {
            return row
        }

        if (action.payload.current) {
            if (row.id == action.payload.current.id) {
                row = IRowToIRowRender(action.payload.current, row.level, row.parentId)
            }
        }

        for (let j = 0; j < action.payload.changed.length; j++) {
            if (row?.id == action.payload.changed[j].id) {
                row = {
                    ...action.payload.changed[j],
                    level: row.level,
                    parentId: row.parentId,
                }
                break
            }
        }

        return row
    })

}

const set: CaseReducer<IState, PayloadAction<IRow[]>> = (state, action) => {
    state.rows = RowToArray(action.payload)
}

const deleteById: CaseReducer<IState, PayloadAction<number>> = (state, action) => {
    const ids = [action.payload]

    state.rows = state.rows.filter((item) => {
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i]

            if (id === item?.id) {
                return false
            }

            if (id === item?.parentId) {
                ids.push(item.id)
                return false
            }
        }

        return true
    })
}

const createEmpty: CaseReducer<IState, PayloadAction<number>> = (state, action) => {
    let lastElemWithParent = 0
    let parentIndex = 0

    let el: IRowRender

    state.rows.forEach((row, index) => {
        if (row && row.id === action.payload) {
            parentIndex = index
        }
        if (row && row.parentId === action.payload) {
            lastElemWithParent = index
        }
    })

    const parent = state.rows[parentIndex]
    if (parent) {
        el = {
            ...emptyRowRender,
            level: parent.level + 1,
            parentId: parent.id
        }

        if (state.rows[lastElemWithParent]?.parentId == parent.id) {
            state.rows = array(state.rows, el, lastElemWithParent + 1)
        } else {
            state.rows = array(state.rows, el, parentIndex + 1)
        }
    }
}

const deleteByIndex: CaseReducer<IState, PayloadAction<number>> = (state, action) => {
    state.rows = state.rows.filter((item,index) => {
        return !(item && index == action.payload);
    })
}

const create: CaseReducer<IState, PayloadAction<{
    recalculate: IRecalculatedRows,
    parentId: number,
    index: number
}>> = (state, action) => {
    state.rows = state.rows.map((row) => {
        if (!row) {
            return row
        }

        for (let j = 0; j < action.payload.recalculate.changed.length; j++) {
            if (row?.id == action.payload.recalculate.changed[j].id) {
                row = {
                    ...action.payload.recalculate.changed[j],
                    level: row.level,
                    parentId: row.parentId,
                }
                break
            }
        }

        return row
    })

    let indexParent = 0

    state.rows.forEach((row, index) => {
        if (row?.id == action.payload.parentId) {
            indexParent = index
        }
    })

    const parent = state.rows[indexParent]
    if (parent && action.payload.recalculate.current) {
        state.rows[action.payload.index] = {
            ...action.payload.recalculate.current,
            level: parent.level + 1,
            parentId: parent.id,
        }
    }
}

export const rowSlice = createSlice({
    name: "row",
    initialState: initialState,
    reducers: {
        update: update,
        set: set,
        deleteById: deleteById,
        deleteByIndex: deleteByIndex,
        createEmpty: createEmpty,
        create: create,
    },
})

function RowToArray(rows: IRow[], level = 0, parentId = 0): IRowRender[] {
    const arr: IRowRender[] = []

    rows.forEach((row) => {

        arr.push(IRowToIRowRender(row, level, parentId))

        if (row.child.length) {
            arr.push(...RowToArray(row.child, level + 1, row.id))
        }
    })

    return arr
}

function IRowToIRowRender(row: IRow, level: number, parentId: number): IRowRender {
    return {
        id: row.id,
        rowName: row.rowName,
        total: row.total,
        salary: row.salary,
        mimExploitation: row.mimExploitation,
        machineOperatorSalary: row.machineOperatorSalary,
        materials: row.materials,
        mainCosts: row.mainCosts,
        supportCosts: row.supportCosts,
        equipmentCosts: row.equipmentCosts,
        overheads: row.overheads,
        estimatedProfit: row.estimatedProfit,
        level: level,
        parentId: parentId,
    }
}