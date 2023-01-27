import {forwardRef, InputHTMLAttributes} from "react";
import classNames from "classnames";
import "./Input.scss"

type InputProps = {
    fullWidth?: boolean
    inputAttr?: InputHTMLAttributes<HTMLInputElement>
}
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return <input
        {...props.inputAttr}
        className={classNames(
            props.inputAttr?.className,
            "input",
            props.fullWidth ? "input--full-width" : ""
        )}
        ref={ref}
    />
})
Input.displayName = "input"

export {Input}