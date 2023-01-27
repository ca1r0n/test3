import "./Tabs.scss"

interface TabsProps {
    Title: string
}

export const Tabs = () => {
    const tabs: TabsProps[] = [
        {
            Title: "Строительно-монтажные работы"
        },
    ] // TODO: load from redux

    return <>
        {tabs.map((item, ) => {
            return <div key={item.Title} className={"tabs__tab"}>
                <div className="tabs__title">
                    {item.Title}
                </div>
            </div>
        })}
    </>
}