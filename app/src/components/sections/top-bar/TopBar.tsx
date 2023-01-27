import "./TopBar.scss"
import AppSvg from "@/assets/icons/apps.svg"
import ReplySVG from "@/assets/icons/reply.svg"
import {FC, SVGProps, useState} from "react";
import classNames from "classnames";
import {ProjectIntro} from "./ProjectIntro";
import {Tabs} from "./Tabs";

export const TopBar = () => {
    return <div className={"top-bar"}>
        <div className="top-bar__top">
            <IconBar/>
            <Navs/>
        </div>
        <div className="top-bar__bot">
            <ProjectIntro
                Abbreviation={"Аббревиатура"}
                Name={"Название проекта"}
                OnClick={() => {}}
            />
            <Tabs />
        </div>
    </div>
}

const IconBar = () => {
    const items: {
        Icon: FC<SVGProps<SVGElement>>,
        OnClick?: () => void,
    }[] = [
        {
            Icon: AppSvg,
        },
        {
            Icon: ReplySVG,
        }
    ]

    return <div className="top-bar__icons">
        {items.map((item, index) => {
            return <item.Icon
                key={index}
                className="top-bar__icon"
                onClick={item.OnClick}
            />
        })}
    </div>
}
const Navs = () => {
    const [active, setActive] = useState(0)

    const items: {
        Title: string,
    }[] = [
        {
            Title: "Просмотр",
        },
        {
            Title: "Управление",
        }
    ]

    const handleClick = (index: number) => () => {
        setActive(index)
    }

    return <div className="top-bar__navs">
        {items.map((item,i) => {
            return <div
                key={i}
                className={classNames(
                    "top-bar__nav",
                    active === i ? "top-bar__nav--active" : ""
                )}
                onClick={handleClick(i)}
            >
                <div className="top-bar__nav-title">
                    {item.Title}
                </div>
            </div>
        })}
    </div>
}

