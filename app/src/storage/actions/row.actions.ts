import {CreateRow, DeleteRow, GetListRow, UpdateRow} from "../../api/row.api";
import {IRowRender, rowSlice} from "../slices/row.slice";
import {AppDispatch} from "../store";

export const getListRow = () => async (dispatch: AppDispatch) => {
    try {
        const res = await GetListRow()
        dispatch(rowSlice.actions.set(res))
    } catch (e) {
        // TODO: fix
    }
}

export const deleteRow = (id: number) => async (dispatch: AppDispatch) => {
    try {
        await DeleteRow(id)
        dispatch(rowSlice.actions.deleteById(id))
    } catch (e) {
        // TODO: fix
    }
}

export const updateRow = (row: IRowRender) => async (dispatch: AppDispatch) => {
    try {
        const res = await UpdateRow(row.id, row)
        dispatch(rowSlice.actions.update(res))
    } catch (e) {
        // TODO: fix
    }
}

export const createRow = (row: IRowRender, index: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await CreateRow(row)
        dispatch(rowSlice.actions.create({
            recalculate: res,
            parentId: row.parentId,
            index: index,
        }))
    } catch (e) {
        // TODO: fix
    }
}
