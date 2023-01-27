import ArrowSVG from "@/assets/icons/arrow.png?url"
import "./ProjectIntro.scss"

interface ProjectIntroProps {
    Name: string
    Abbreviation: string
    OnClick: () => void
}


export function ProjectIntro(props: ProjectIntroProps) {
    return <div className="project-intro">
        <div className="project-intro__intro-left">
            <div className="project-intro__title">
                {props.Name}
            </div>
            <div className="project-intro__sub-title">
                {props.Abbreviation}
            </div>
        </div>
        <img
            src={ArrowSVG}
            alt="arrow"
            onClick={props.OnClick}
            className="project-intro__intro-right"
        />
    </div>
}