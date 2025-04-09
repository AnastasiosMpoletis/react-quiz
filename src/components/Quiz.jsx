import { useState, useCallback } from "react";
import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';
import Question from "./Question.jsx";

export default function Quiz() {
    const [answerState, setAnswerState] = useState("");
    const [userAnswers, setUserAnswers] = useState([]);

    /**
     * If there is an answer for a question then the active question is the next one.
     */
    const activeQuestionIndex = answerState === "" ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = QUESTIONS.length === activeQuestionIndex;

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy icon" />
                <h2>Quiz completed!</h2>
            </div>
        );
    }

    /**
     * We do not need to add any dependencies here, because it does not use any state, props or any other values that depend on state or props.
     */
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState("answered");
        setUserAnswers(previousUserAnswers => {
            return [...previousUserAnswers, selectedAnswer];
        });

        setTimeout(() => {
            if (QUESTIONS[activeQuestionIndex].answers[0] === selectedAnswer) {
                setAnswerState("correct");
            } else {
                setAnswerState("wrong");
            }

            setTimeout(() => {
                setAnswerState("");
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex]);

    /**
     * {@link QuestionTimer} onTimeout function causes an infinite loop.
     * Functions in JavaScript are objects and every time this function is executed, a new object is created.
     * For this reason we need to use useCallback.
     * Since handleSelectAnswer is the dependency here, we need to use useEffect to handleSelectAnswer also.
     */
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                answerState={answerState}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}