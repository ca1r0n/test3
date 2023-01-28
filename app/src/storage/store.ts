import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {rowSlice} from "./slices/row.slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {notifySlice} from "./slices/notify.slice";


const rootReducer = combineReducers({
    row: rowSlice.reducer,
    notify: notifySlice.reducer,
})
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector