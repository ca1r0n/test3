import {FormEvent, useCallback, useMemo, useState} from "react";
// @ts-ignore
import DocsPng from "@/assets/icons/docs.png?url"
// @ts-ignore
import TrashPng from "@/assets/icons/trash.png?url"
import {Input} from "../../ui/input/Input";
import classNames from "classnames";
import {countTree} from "../../../utils/utils";
import {IRowRender} from "../../../storage/slices/row.slice";

interface RowProps {
    row: IRowRender | null
    parentId: number | null
    depth: number
    onCreateEmpty?: (parentId: number) => void
    onDelete?: (id: number) => void
    onUpdate?: (row: IRowRender, parentId: number | null) => void
}

export const Row = (props: RowProps) => {
    if (props.row === null) {
        return null
    }

    const [isEdit, setIsEdit] = useState(props.row.id < 0)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (props.onUpdate && props.row) {
            const row: IRowRender = {
                ...props.row,
            }
            const forEl = e.target as HTMLFormElement

            for (let i = 0; i < forEl.elements.length; i++) {
                const el = forEl.elements[i]
                if (el.tagName === "INPUT") {
                    //@ts-ignore
                    row[el.name] = el.value
                }
            }

            props.onUpdate(row, props.parentId)
        }
        setIsEdit(false)
    }

    const handleDelete = () => {
        if (props.onDelete && props.row) {
            props.onDelete(props.row.id)
        }
    }

    const handleCreateEmpty = useCallback(() => {
        if (props.onCreateEmpty && props.row && props.row.id > 0) {
            props.onCreateEmpty(props.row.id)
        }
    }, [isEdit])

    const heightLine = useMemo(() => {
        if (!props.row) {
            return ""
        }

        let lastNotNull: IRowRender | null = null

        for (let i = props.row.child.length-1; i >= 0; i--) {
            if (props.row.child[i] !== null) {
                lastNotNull = props.row.child[i]
                break
            }
        }

        let count = countTree(props.row) - countTree(lastNotNull)

        let isEmpty = true
        props.row.child.forEach(row => {
            if (row !== null) {
                isEmpty = false
            }
        })

        if (isEmpty)  {
            count--
        }


        return `${(count * 63) - 8}px`
    }, [props.row.child])

    return <>
        <form
            className={"content__table-row"}
            onDoubleClick={() => setIsEdit(true)}
            onSubmit={handleSubmit}
        >
            <div className={"content__table-rows"}>
                <div
                    className="content__table-icons"
                    style={{
                        marginLeft: `${props.depth * 20}px`
                    }}
                >
                    <div className={"content__table-create"}>
                        <img
                            onClick={handleCreateEmpty}
                            src={DocsPng}
                            alt="create"
                            className={"content__table-icon content__table-icon--show"}
                        />
                        <div
                            className={classNames(
                                "content__table-tree",
                                props.depth == 0 ? "content__table-tree--root" : ""
                            )}
                            style={{
                                height: heightLine,
                            }}
                        />
                    </div>
                    <img
                        onClick={handleDelete}
                        src={TrashPng}
                        alt="create"
                        className={"content__table-icon"}
                    />

                </div>
            </div>
            <div className={"content__table-rows"}>
                {isEdit ? <Input
                    inputAttr={{
                        type: "text",
                        defaultValue: props.row.rowName,
                        name: "rowName",
                    }}
                    fullWidth
                /> : props.row.rowName}
            </div>
            <div className={"content__table-rows"}>
                {isEdit ? <Input
                    inputAttr={{
                        type: "number",
                        defaultValue: props.row.salary,
                        name: "salary",
                    }}
                    fullWidth
                /> : props.row.salary}
            </div>
            <div className={"content__table-rows"}>
                {isEdit ? <Input
                    inputAttr={{
                        type: "number",
                        defaultValue: props.row.equipmentCosts,
                        name: "equipmentCosts",
                    }}
                    fullWidth
                /> : props.row.equipmentCosts}
            </div>
            <div className={"content__table-rows"}>
                {isEdit ? <Input
                    inputAttr={{
                        type: "number",
                        defaultValue: props.row.overheads,
                        name: "overheads",
                    }}
                    fullWidth
                /> : props.row.overheads}
            </div>
            <div className={"content__table-rows"}>
                {isEdit ? <Input
                    inputAttr={{
                        type: "number",
                        defaultValue: props.row.estimatedProfit,
                        name: "estimatedProfit",
                    }}
                    fullWidth
                /> : props.row.estimatedProfit}
            </div>
            <button type="submit" hidden></button>
        </form>
        {props.row.child.map((row) => {
            if (row === null) {
                return null
            }

            return <Row
                key={row.id}
                {...props}
                depth={props.depth + 1}
                parentId={props.row?.id || null}
                row={row}
            />
        })}
    </>
}