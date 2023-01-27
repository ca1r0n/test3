import {IRowRender} from "../../../storage/slices/row.slice";
import {FormEvent, useRef, useState} from "react";
// @ts-ignore
import DocsPng from "@/assets/icons/docs.png?url"
// @ts-ignore
import TrashPng from "@/assets/icons/trash.png?url"
import {Input} from "../../ui/input/Input";

interface RowProps {
    Row: IRowRender
    OnCreate?: () => void
    OnDelete?: () => void
    OnUpdate?: (row: IRowRender) => void
    IsCreate?: boolean
}

export const Row = (props: RowProps) => {
    const [isEdit, setIsEdit] = useState(props.IsCreate)
    const formRef = useRef<HTMLFormElement | null>(null)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const target = e.target as HTMLFormElement
        const row: IRowRender = {
            ...props.Row,
        }

        for (let i = 0; i < target.elements.length; i++) {
            if (target.elements[i].tagName == "INPUT") {
                const input = target.elements[i] as HTMLInputElement
                //@ts-ignore
                row[input.name] = input.type == "text" ? input.value :Number(input.value)
            }
        }

        if (props.OnUpdate) {props.OnUpdate(row)}
        setIsEdit(false)
    }

    const handleDelete = () => {
        let ok = true

        if (!props.IsCreate) {
            ok = confirm("Уверены?")
        }

        if (ok && props.OnDelete) {
            props.OnDelete()
        }
    }

    const handleCreate = () => {
        if (!props.IsCreate && props.OnCreate) {
            props.OnCreate()
        }
    }

    return <form
        ref={formRef}
        className={"content__table-row"}
        onDoubleClick={() => setIsEdit(true)}
        onSubmit={handleSubmit}
    >
        <div className={"content__table-rows"}>
            <div
                className="content__table-icons"
                style={{
                    marginLeft: `${props.Row.level * 16}px`
                }}
            >
                <img
                    onClick={handleCreate}
                    src={DocsPng}
                    alt="create"
                    className={"content__table-icon content__table-icon--show"}
                />
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
                    defaultValue: props.Row.rowName,
                    name: "rowName",
                }}
                fullWidth
            /> : props.Row.rowName}
        </div>
        <div className={"content__table-rows"}>
            {isEdit ? <Input
                inputAttr={{
                    type: "number",
                    defaultValue: props.Row.salary,
                    name: "salary",
                }}
                fullWidth
            /> : props.Row.salary}
        </div>
        <div className={"content__table-rows"}>
            {isEdit ? <Input
                inputAttr={{
                    type: "number",
                    defaultValue: props.Row.equipmentCosts,
                    name: "equipmentCosts",
                }}
                fullWidth
            /> : props.Row.equipmentCosts}
        </div>
        <div className={"content__table-rows"}>
            {isEdit ? <Input
                inputAttr={{
                    type: "number",
                    defaultValue: props.Row.overheads,
                    name: "overheads",
                }}
                fullWidth
            /> : props.Row.overheads}
        </div>
        <div className={"content__table-rows"}>
            {isEdit ? <Input
                inputAttr={{
                    type: "number",
                    defaultValue: props.Row.estimatedProfit,
                    name: "estimatedProfit",
                }}
                fullWidth
            /> : props.Row.estimatedProfit}
        </div>
        <button type="submit" hidden></button>
    </form>
}