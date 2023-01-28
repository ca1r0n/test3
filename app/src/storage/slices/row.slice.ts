import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRecalculatedRows, IRow} from "../../api/row.api";
import {filterTree, mapTree} from "../../utils/utils";

export type IRowRender = Omit<IRow, "child"> & {
    child: Array<IRowRender | null>
}

export function genEmptyRow(): IRowRender {
    return {
        id: Math.random() * -100,
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
        child: []
    }
}

interface IState {
    rows: Array<IRowRender | null>
}

const initialState: IState = {
    rows: []
}

const setList: CaseReducer<IState, PayloadAction<IRowRender[]>> = (state, action) => {
    state.rows = action.payload
}

const createRoot: CaseReducer<IState, PayloadAction<Omit<IRowRender, "child">>> = (state, action) => {
    state.rows.push({
        ...action.payload,
        child: []
    })
}

const deleteById: CaseReducer<IState, PayloadAction<number>> = (state, action) => {
    state.rows = state.rows.map((row) => {
        return filterTree<IRowRender>(row, (t) => action.payload !== t.id)
    })
}

const updateRow: CaseReducer<IState, PayloadAction<IRecalculatedRows>> = (state, action) => {
    state.rows = state.rows.map((row) => {
        return mapTree<IRowRender>(row, (t) => {
            for (let i = 0; i < action.payload.changed.length; i++) {
                const changed = action.payload.changed[i]
                if (changed.id == t.id) {
                    return {
                        ...t,
                        ...changed,
                    }
                }
            }

            if (action.payload.current && action.payload.current.id === t.id) {
                return {
                    ...t,
                    ...action.payload.current,
                }
            }

            return t
        })
    })
}

const createEmpty: CaseReducer<IState, PayloadAction<{
    parentId: number
}>> = (state, action) => {
    state.rows = state.rows.map((row) => {
        return mapTree<IRowRender>(row, (t) => {
            if (t && t.id == action.payload.parentId) {
                return {
                    ...t,
                    child: [
                        ...t.child,
                        genEmptyRow()
                    ]
                } as IRow
            }

            return t
        })
    })
}

const replaceEmpty: CaseReducer<IState, PayloadAction<{
    recalculated: IRecalculatedRows,
    idEmpty: number
}>> = (state, action) => {
    state.rows = state.rows.map((row) => {
        return mapTree<IRowRender>(row, (t) => {
            if (t?.id === action.payload.idEmpty && action.payload.recalculated.current) {
                return {
                    ...t,
                    ...action.payload.recalculated.current
                }
            }

            for (let i = 0; i < action.payload.recalculated.changed.length; i++) {
                const changed = action.payload.recalculated.changed[i]
                if (changed.id == t.id) {
                    return {
                        ...t,
                        ...changed,
                    }
                }
            }

            return t
        })
    })
}


export const rowSlice = createSlice({
    name: "row",
    initialState: initialState,
    reducers: {
        updateRow: updateRow,
        setList: setList,
        deleteById: deleteById,
        createEmpty: createEmpty,
        replaceEmpty: replaceEmpty,
        createRoot: createRoot,
    },
})
