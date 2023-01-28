import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRecalculatedRows} from "../../api/row.api";


export type msgType = "error" | "success"

interface msg {
    text: string
    type: msgType
}

interface IState {
    msg?: msg
}

const initState: IState = {}

const set: CaseReducer<IState, PayloadAction<msg>> = (state, action) => {
    state.msg = action.payload
}

export const notifySlice = createSlice({
    initialState: initState,
    name: "notify",
    reducers: {
        set: set,
    }
})