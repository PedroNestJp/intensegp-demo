import React, { useState, useEffect } from 'react';
import styles from './Question.module.css';

const Question = ({ question, options, currentQuestionIndex, totalQuestions, handleAnswer }) => {
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Resetar a opção selecionada ao mudar a pergunta
    setSelectedOption('');
  }, [currentQuestionIndex]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    handleAnswer(selectedOption);
  };

  return (
    <div className={styles.questionContainer}>
      <div className={styles.header}>
        <h3>Social</h3>
        <span className={styles.questionNumber}>{`${currentQuestionIndex + 1}/${totalQuestions}`}</span>
      </div>
      <p className={styles.question}>{question}</p>
      <div className={styles.options}>
        {options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name={`question-${currentQuestionIndex}`}
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        ))}
      </div>
      <button className={styles.continueButton} onClick={handleSubmit}>
        Continuar
      </button>
    </div>
  );
};

export default Question;
