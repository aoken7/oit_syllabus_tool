import type { FC } from "react";
import type { Syllabus } from "../types/syllabus";

export const List: FC<Syllabus> = props => {
    const { kougi, nenji, kikan, numbering, tantousya, link } = props;
    return (
        <p>
            {kougi},{nenji},{kikan},{numbering},{tantousya},<a href={link}>公式シラバスへ</a>
        </p >
    );
};