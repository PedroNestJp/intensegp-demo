import React, { useState, useEffect } from 'react';
import Question from '../../components/Question';
import styles from './Quiz.module.css';
import { socialIcon, environmentIcon, governanceIcon } from '../../assets/img';

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
    icon: socialIcon
  },
  ambiental: {
    name: 'Meio Ambiente',
    icon: environmentIcon
  },
  governanca: {
    name: 'Governança',
    icon: governanceIcon
  }
};

const Quiz = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

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
      // Quiz concluído
      console.log('Quiz concluído');
      console.log(newAnswers);
      localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));

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
  const { name: sectionName, icon: sectionIcon } = categoryDetails[currentCategory];

  const isQuizFinished = currentCategoryIndex >= categories.length;

  return (
    <div className={styles.quizContainer}>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${progressPercentage}%` }}></div>
      </div>
      {!isQuizFinished && currentQuestion ? (
        <Question
          question={currentQuestion.question}
          options={currentQuestion.options}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={quizQuestions[currentCategory].length}
          handleAnswer={handleAnswer}
          sectionName={sectionName}
          sectionIcon={sectionIcon}
        />
      ) : (
        <div className={styles.successMessage}>Obrigado por completar o questionário!</div>
      )}
    </div>
  );
};

export default Quiz;
