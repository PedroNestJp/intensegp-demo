import React, { useState, useEffect } from 'react';
import Question from '../../components/Question';
import styles from './Quiz.module.css';
import { socialIcon, environmentIcon, governanceIcon, checkIcon } from '../../assets/img';
import { Check, CheckCircle } from '@mui/icons-material';

const quizQuestions = {
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
      options: ['Mudanças climáticas', 'Gestão de recursos hídricos', 'Proteção dos oceanos', 'Preservação de florestas e biodiversidade', 'Uso responsável do solo', 'Poluição do ar', 'Gestão de resíduos (incluindo resíduos tecnológicos)']
    },
    {
      question: 'A empresa possui licenças ambientais e está em conformidade com as normas ambientais aplicáveis?',
      options: ['Sim', 'Não']
    },
    {
      question: 'A empresa monitora e mede seu consumo de água e energia, buscando a otimização e o uso de fontes renováveis?',
      options: ['Sim', 'Não']
    },
  ],
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
};

const categories = ['social', 'ambiental', 'governanca'];

const categoryDetails = {
  social: {
    name: 'Social',
    icon: socialIcon,
    color: '#05ABAB',
    backgroundCompletion: 'linear-gradient(90deg, #05ABAB 0%, #F5F5F5 75.5%)'
  },
  ambiental: {
    name: 'Meio Ambiente',
    icon: environmentIcon,
    color: '#D5FD30',
    backgroundCompletion: 'linear-gradient(90deg, #D5FD30 0%, #F5F5F5 75.5%)'
  },
  governanca: {
    name: 'Governança',
    icon: governanceIcon,
    color: '#FF8C00',
    backgroundCompletion: "linear-gradient(90deg, #FFD414 0%, #F5F5F5 66%)"
  }
};

const Quiz = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showCategoryCompletion, setShowCategoryCompletion] = useState(false);
  const [showFinalCompletion, setShowFinalCompletion] = useState(false);

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
      setShowCategoryCompletion(true);
    } else {
      setShowFinalCompletion(true);
      localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
    }
  };

  const handleContinue = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentQuestionIndex(0);
      setShowCategoryCompletion(false);
    } else {
      // Redirecionar para a página de resultados
      window.location.href = '/dashboard';
    }
  };

  const currentCategory = categories[currentCategoryIndex];
  const currentQuestion = quizQuestions[currentCategory] ? quizQuestions[currentCategory][currentQuestionIndex] : null;
  const totalQuestions = categories.reduce((total, category) => total + quizQuestions[category].length, 0);
  const answeredQuestions = categories.reduce((total, category, index) => {
    if (index < currentCategoryIndex) {
      return total + quizQuestions[category].length;
    } else if (index === currentCategoryIndex) {
      return total + currentQuestionIndex;
    }
    return total;
  }, 0);

  const progressPercentage = (answeredQuestions / totalQuestions) * 100;
  const { name: sectionName, icon: sectionIcon, color: sectionColor, backgroundCompletion: sectionBackground } = categoryDetails[currentCategory];

  return (
    <>
      {showFinalCompletion ? (
        <div className={styles.categoryCompletionMessage} style={{ background: sectionBackground }}>
          <img src={sectionIcon} alt="Check Icon" />
          <h2>{`Questionário ${sectionName} Concluído`}</h2>
          <h3>Parabéns!</h3>
          <p>Você concluiu todos os questionários.</p>
          <button onClick={handleContinue}>Continuar</button>
        </div>
      ) : showCategoryCompletion ? (
        <div className={styles.categoryCompletionMessage}>
          <img src={sectionIcon} alt={`${sectionName} Icon`} />
          <h2>{`Questionário ${sectionName} Concluído`}</h2>
          <button onClick={handleContinue}>Continuar</button>
        </div>
      ) : currentQuestion ? (
        <Question
          progressPercentage={progressPercentage}
          question={currentQuestion.question}
          options={currentQuestion.options}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={quizQuestions[currentCategory].length}
          handleAnswer={handleAnswer}
          sectionName={sectionName}
          sectionIcon={sectionIcon}
          sectionColor={sectionColor}
        />
      ) : (
        <div className={styles.successMessage}>Obrigado por completar o questionário!</div>
      )}
    </>
  );
};

export default Quiz;
