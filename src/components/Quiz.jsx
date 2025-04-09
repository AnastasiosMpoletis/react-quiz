import { useState, useCallback } from "react";
import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    /**
     * If there is an answer for a question then the active question is the next one.
     */
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = QUESTIONS.length === activeQuestionIndex;

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy icon" />
                <h2>Quiz completed!</h2>
            </div>
        );
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];

    /**
     * If we sort with a negative number, the elements will be swapped.
     * If we sort with a positive number, the elements will stay in place.
     * With 'Math.random() - 0.5' we will have 50% a positive and 50% a negative value, so some elements will be swapped and some will not, randomly.
     */
    shuffledAnswers.sort(() => Math.random() - 0.5);

    /**
     * We do not need to add any dependencies here, because it does not use any state, props or any other values that depend on state or props.
     */
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers(previousUserAnswers => {
            return [...previousUserAnswers, selectedAnswer];
        });
    }, []);

    /**
     * {@link QuestionTimer} onTimeout function causes an infinite loop.
     * Functions in JavaScript are objects and every time this function is executed, a new object is created.
     * For this reason we need to use useCallback.
     * Since handleSelectAnswer is the dependency here, we need to use useEffect to handleSelectAnswer also.
     */
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer
                    timeout={10000}
                    onTimeout={handleSkipAnswer}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>
                                {answer}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}