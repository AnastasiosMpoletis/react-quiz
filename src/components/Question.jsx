import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

/**
 * React does not allow sharing of the same key between siblings. This is why we create this component.
 * 
 * @param {*} param0 
 * @returns 
 */
export default function Question({ questionText, answers, onSelectAnswer, selectedAnswer, answerState, onSkipAnswer }) {
    return (
        <div id="question">
            <QuestionTimer
                // whenever the key value (activeQuestionIndex) changes, React will destroy the old component instance and create a new one.
                // key={activeQuestionIndex}
                timeout={10000}
                onTimeout={onSkipAnswer}
            />
            <h2>{questionText}</h2>
            <Answers
                // key={activeQuestionIndex}
                answers={answers}
                selectedAnswer={selectedAnswer}
                answerState={answerState}
                onSelect={onSelectAnswer}
            />
        </div>
    );
}