import {useAppSelector} from "../../../storage/store";
import classNames from "classnames";
import {useEffect, useState} from "react";
import {msgType} from "../../../storage/slices/notify.slice";
import "./Notify.scss"


export function Notify() {
    const notifySlice = useAppSelector(state => state.notify)
    const [queue, setQueue] = useState<(NotifyMessageProps & {
        id: number
    })[]>([])

    useEffect(() => {
        const id = Math.random() * 100

        const msg = notifySlice.msg
        if (msg) {
            setQueue(state => [
                ...state,
                {
                    id: id,
                    text: msg.text,
                    type: msg.type,
                }
            ])
        }

        setTimeout(() => {
            setQueue(state => state.filter(item => item.id !== id))
        }, 2000)
    }, [notifySlice.msg])

    return <div className={"notify"}>
        {queue.map((item) => {
            return <NotifyMessage key={item.id} {...item} />
        })}
    </div>
}

interface NotifyMessageProps {
    text: string
    type: msgType
    OnDelete?: () => void
}

function NotifyMessage(props: NotifyMessageProps) {
    return <div className={classNames(
        "notify__block",
        props.type == "success" ? "notify__block--success" : "notify__block--error"
    )}>
        <div className="notify__message">
            {props.text}
        </div>
    </div>
}