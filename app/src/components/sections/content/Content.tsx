import {LeftBar} from "./LeftBar";
import "./Content.scss"
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../storage/store";
import {createRow, deleteRow, getListRow, updateRow} from "../../../storage/actions/row.actions";
import {IRowRender, rowSlice} from "../../../storage/slices/row.slice";
import {Row} from "./Row";

export const Content = () => {
    return <div className="content">
        <LeftBar/>
        <Main/>
    </div>
}

function Main() {
    const dispatch = useAppDispatch()
    const rowsSelector = useAppSelector(state => state.row)

    useEffect(() => {
        dispatch(getListRow())
    }, [])

    const handleDelete = (index: number) => () => {
        if (rowsSelector.rows[index]?.id == 0) {
            dispatch(rowSlice.actions.deleteByIndex(index))
        } else {
            dispatch(deleteRow(rowsSelector.rows[index]?.id))
        }
    }

    const handleUpdate = (index: number)  => (row: IRowRender) => {
        if (row.id == 0) {
            dispatch(createRow(row, index))
        } else {
            dispatch(updateRow(row))
        }
    }

    const handleCreate = (id: number) => ()  => {
        dispatch(rowSlice.actions.createEmpty(id))
    }


    return <div className={"content__main _scrollbar"}>
        <div className="content__table">
            <Columns/>
            {rowsSelector.rows.map((item,index) => {
                if (!item) {
                    return null
                }

                return <Row
                    key={item.id}
                    Row={item}
                    OnUpdate={handleUpdate(index)}
                    OnDelete={handleDelete(index)}
                    OnCreate={handleCreate(item.id)}
                    IsCreate={item.id == 0}
                />
            })}
        </div>
    </div>
}


function Columns() {
    const columns: string[] = [
        "Уровень",
        "Наименование работ",
        "Основная з/п",
        "Оборудование",
        "Накладные расходы",
        "Сметная прибыль",
    ]

    return <div className={"content__table-row"}>
        {columns.map((column, index) => {
            return <div
                key={index}
                className={"content__table-column"}
            >
                {column}
            </div>
        })}
    </div>
}

