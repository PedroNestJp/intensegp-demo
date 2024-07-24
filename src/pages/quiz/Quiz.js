import React, { useState, useEffect } from 'react';
import Question from '../../components/question/Question';
import styles from '../quiz/Quiz.module.css';
import { assignmentIcon, logo } from '../../assets/img';

const quizQuestions = {
  governanca: [
    {
      question: 'A empresa possui um conselho administrativo?',
      options: ['Sim', 'Não']
    },
    {
      question: 'A empresa possui planejamento estratégico?',
      options: ['Sim', 'Não']
    },
    {
      question: 'A empresa possui setor de Compliance?',
      options: ['Sim', 'Não']
    },
  ],
  social: [
    {
      question: 'A empresa possui políticas de direitos humanos que mitigam os riscos para o negócio e estão em conformidade com os Princípios Orientadores da ONU sobre Empresas e Direitos Humanos?',
      options: ['Sim', 'Não']
    },
    {
      question: 'A empresa identifica, avalia e responde aos reais e potenciais impactos adversos sobre os direitos humanos que ela causa ou contribui?',
      options: ['Sim', 'Não']
    },
    {
      question: 'A empresa possui mecanismos de remediação para os impactos adversos sobre os direitos humanos aos quais a empresa causou ou contribuiu?',
      options: ['Sim', 'Não']
    },
  ],
  ambiental: [
    {
      question: 'A empresa possui políticas ambientais formalizadas e divulgadas publicamente que abordem os seguintes temas?',
      options: ['Mudanças climáticas', 'Gestão de recursos hídricos','Proteção dos oceanos', 'Preservação de florestas e biodiversidade', 'Uso responsável do solo', 'Poluição do ar', 'Gestão de resíduos (incluindo resíduos tecnológicos)']
    },
    {
      question: 'A empresa possui licenças ambientais e está em conformidade com as normas ambientais aplicáveis?',
      options: ['Sim', 'Não']
    },
    {
      question: 'A empresa monitora e mede seu consumo de água e energia, buscando a otimização e o uso de fontes renováveis?',
      options: ['Sim', 'Não']
    },
  ]
};

const categories = ['governanca', 'social', 'ambiental'];

const Quiz = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem('quizAnswers')) || {});

  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
  }, [answers]);

  const handleAnswer = (answer) => {
    const category = categories[currentCategoryIndex];
    const newAnswers = {
      ...answers,
      [category]: {
        ...(answers[category] || {}),
        [currentQuestionIndex]: answer,
      },
    };
    setAnswers(newAnswers);

    if (currentQuestionIndex < quizQuestions[category].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      console.log('Quiz finished', newAnswers);
    }
  };

  const currentCategory = categories[currentCategoryIndex];
  const currentQuestion = quizQuestions[currentCategory][currentQuestionIndex];

  // Verificação para exibir a mensagem final
  const isQuizFinished = currentCategoryIndex >= categories.length;

  return (
    <div className={styles.quizContainer}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.quizTitle}>
        <img src={assignmentIcon} style={{width: "2rem"}}  alt="Assignment Icon" />
        <h2>Questionário</h2>
      </div>
      {!isQuizFinished ? (
        <Question
          question={currentQuestion.question}
          options={currentQuestion.options}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={quizQuestions[currentCategory].length}
          handleAnswer={handleAnswer}
        />
      ) : (
        
        <div className={styles.successMessage}> { alert('Quiz concluído!') }Obrigado por completar o questionário!</div>
      )}
    </div>
  );
};

export default Quiz;
