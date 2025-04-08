import { useState } from "react";
import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

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


    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers(previousUserAnswers => {
            return [...previousUserAnswers, selectedAnswer];
        });
    }

    return (
        <div id="quiz">
            <div id="question">
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