import {CreateRow, DeleteRow, GetListRow, IRow, UpdateRow} from "../../api/row.api";
import {IRowRender, rowSlice} from "../slices/row.slice";
import {AppDispatch} from "../store";
import {notifySlice} from "../slices/notify.slice";

export const getListRow = () => async (dispatch: AppDispatch) => {
    try {
        const res = await GetListRow()
        dispatch(rowSlice.actions.setList(res))
    } catch (e) {
        dispatch(notifySlice.actions.set({
            text: "Ошибка!",
            type: "error"
        }))
    }
}

export const deleteRow = (id: number) => async (dispatch: AppDispatch) => {
    if (id < 0) {
        return
    }

    try {
        await DeleteRow(id)
        dispatch(rowSlice.actions.deleteById(id))
        dispatch(notifySlice.actions.set({
            text: "Успешно!",
            type: "success"
        }))
    } catch (e) {
        dispatch(notifySlice.actions.set({
            text: "Ошибка!",
            type: "error"
        }))
    }
}

export const updateRow = (row: IRowRender) => async (dispatch: AppDispatch) => {
    try {
        const res = await UpdateRow(row.id, {
            rowName: row.rowName,
            salary: row.salary,
            mimExploitation: row.mimExploitation,
            machineOperatorSalary: row.machineOperatorSalary,
            materials: row.materials,
            mainCosts: row.mainCosts,
            supportCosts: row.supportCosts,
            equipmentCosts: row.equipmentCosts,
            overheads: row.overheads,
            estimatedProfit: row.estimatedProfit,
        })
        dispatch(rowSlice.actions.updateRow(res))
        dispatch(notifySlice.actions.set({
            text: "Успешно!",
            type: "success"
        }))
    } catch (e) {
        dispatch(notifySlice.actions.set({
            text: "Ошибка!",
            type: "error"
        }))
    }
}

export const createRow = (row: IRowRender, parentId: number | null) => async (dispatch: AppDispatch) => {
    try {
        const res = await CreateRow({
            parentId: parentId,
            rowName: row.rowName,
            salary: row.salary,
            mimExploitation: row.mimExploitation,
            machineOperatorSalary: row.machineOperatorSalary,
            materials: row.materials,
            mainCosts: row.mainCosts,
            supportCosts: row.supportCosts,
            equipmentCosts: row.equipmentCosts,
            overheads: row.overheads,
            estimatedProfit: row.estimatedProfit,
        })
        if (row.id < 0 && !parentId && res.current) {
            dispatch(rowSlice.actions.createRoot(res.current))
        } else {
            dispatch(rowSlice.actions.replaceEmpty({
                recalculated: res,
                idEmpty: row.id,
            }))
        }
        dispatch(notifySlice.actions.set({
            text: "Успешно!",
            type: "success"
        }))
    } catch (e) {
        dispatch(notifySlice.actions.set({
            text: "Some error!",
            type: "error"
        }))
    }
}
