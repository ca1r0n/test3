import "./LeftBar.scss"
import {useState} from "react";
// @ts-ignore
import DefaultSVG from "@/assets/icons/default.png?url"
import classNames from "classnames";

const items: ProjectItemProps[] = [
    {Title: "Объекты"},
    {Title: "РД"},
    {Title: "МТО"},
    {Title: "СМР"},
    {Title: "График"},
    {Title: "МиМ"},
    {Title: "Рабочие"},
    {Title: "Капвложения"},
    {Title: "Бюджет"},
    {Title: "Финансирование"},
    {Title: "Панорамы"},
    {Title: "Камеры"},
    {Title: "Поручения"},
    {Title: "Контрагенты"},
]
export const LeftBar = () => {
    const [active, setActive] = useState(-1) // TODO: load from redux

    const handleClick = (index: number) => () => {
        setActive(index)
    }

    return <div className={"left-bar _scrollbar"}>
        <div className="left-bar__list">
            {items.map((item, index) => {
                return <TabItem
                    key={index}
                    IsActive={active == index}
                    OnClick={handleClick(index)}
                    {...item}
                />
            })}
        </div>
    </div>
}


interface ProjectItemProps {
    Title: string
    OnClick?: () => void
    IsActive?: boolean
}

function TabItem(props: ProjectItemProps) {
    return <div className={classNames(
        "left-bar__item",
        props.IsActive ? "left-bar__item--active" : ""
    )}
                onClick={props.OnClick}
    >
        <img
            src={DefaultSVG}
            alt="default"
            className="left-bar__item-icon"
        />
        <div className="left-bar__item-title">
            {props.Title}
        </div>
    </div>
}