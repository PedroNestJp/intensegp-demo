import React, { useState, useEffect } from 'react';
import styles from './Question.module.css';

const Question = ({
  progressPercentage,
  question,
  options = [],
  currentQuestionIndex,
  totalQuestions,
  handleAnswer,
  sectionName,
  sectionIcon,
  sectionColor,
}) => {
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Resetar a opção selecionada ao mudar a pergunta
    setSelectedOption('');
  }, [currentQuestionIndex]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      handleAnswer(selectedOption);
    }
  };

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.sectionCategory}>
          <div className={styles.sectionColor} style={{ backgroundColor: sectionColor }}>
            <img className={styles.icon} src={sectionIcon} alt={`${sectionName} Icon`} />
          </div>
          <h3 className={styles.sectionName} >{sectionName}</h3>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div className={styles.questionIndexContainer}>
          <p className={styles.questionNumber}>{`${currentQuestionIndex + 1}/${totalQuestions}`}</p>
        </div>
      </header>
      <p className={styles.question}>{question}</p>
      <div className={styles.options}>
        {options.map((option, index) => (
          <label key={index}>
            <input
              className={styles.radioInput}
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
      <div className={styles.buttonContainer}>
        <button
          className={styles.continueButton}
          onClick={handleSubmit}
          disabled={!selectedOption}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Question;
