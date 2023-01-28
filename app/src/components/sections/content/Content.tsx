import {LeftBar} from "./LeftBar";
import "./Content.scss"
import {useEffect, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../../storage/store";
import {createRow, deleteRow, getListRow, updateRow} from "../../../storage/actions/row.actions";
import {genEmptyRow, IRowRender, rowSlice} from "../../../storage/slices/row.slice";
import {Row} from "./Row";
import {IRow} from "../../../api/row.api";
import {heightTree} from "../../../utils/utils";

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

    const handleDelete = (id: number) => {
        if (id < 0) {
            dispatch(rowSlice.actions.deleteById(id))
        } else {
            dispatch(deleteRow(id))
        }
    }

    const handleUpdate = (row: IRowRender, id: number | null) => {
        if (row.id < 0) {
            dispatch(createRow(row, id))
        } else {
            dispatch(updateRow(row))
        }
    }

    const handleCreateEmpty = (parentId: number) => {
        dispatch(rowSlice.actions.createEmpty({
            parentId: parentId,
        }))
    }

    const heightRow = useMemo(() => {
        let max = 0

        rowsSelector.rows.forEach((row) => {
            const h = heightTree(row)
            if (h > max) {
                max = h
            }
        })

        return `${max * 30}px`
    }, [rowsSelector.rows])

    return <div className={"content__main _scrollbar"}>
        <div
            className="content__table"
            style={{
                //@ts-ignore
                ["--level-width"]: heightRow,
            }}
        >
            <Columns/>
            {!rowsSelector.rows.length && <Row
                row={genEmptyRow()}
                onUpdate={handleUpdate}
                parentId={null}
                depth={0}
            />}
            {rowsSelector.rows.map((item) => {
                if (!item) {
                    return null
                }

                return <Row
                    key={item.id}
                    row={item}
                    onCreateEmpty={handleCreateEmpty}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    parentId={null}
                    depth={0}
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

