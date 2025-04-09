import { useRef } from "react";

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
        const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];

        /**
         * If we sort with a negative number, the elements will be swapped.
         * If we sort with a positive number, the elements will stay in place.
         * With 'Math.random() - 0.5' we will have 50% a positive and 50% a negative value, so some elements will be swapped and some will not, randomly.
         */
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answer) => {
                const isSelected = selectedAnswer === answer;
                let cssClass = ``;

                if (answerState === "selected" && isSelected) {
                    cssClass = "selected";
                }

                if ((answerState === "correct" || answerState === "wrong") && isSelected) {
                    cssClass = answerState;
                }

                return (
                    <li key={answer} className="answer">
                        <button onClick={() => onSelect(answer)} className={cssClass}>
                            {answer}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}