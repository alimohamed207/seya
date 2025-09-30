import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gauge, 
  Globe, 
  Target, 
  Shield, 
  BarChart3,
  ArrowRight
} from 'lucide-react';
import './Home.css';

interface HomeProps {
  onNavigate?: (view: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [showQuizResults, setShowQuizResults] = useState(false);

  const navigationCards = [
    {
      id: 'dashboard',
      title: 'Mission Control Dashboard',
      description: 'Real-time monitoring and threat assessment of near-Earth objects',
      icon: Gauge,
      color: '#00D4FF',
      gradient: 'linear-gradient(135deg, #00D4FF, #0099CC)'
    },
    {
      id: 'analysis',
      title: 'Data Analysis',
      description: 'Advanced analytics and statistical insights on asteroid data',
      icon: BarChart3,
      color: '#9B59B6',
      gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)'
    },
    {
      id: 'impact',
      title: 'Impact Simulation',
      description: 'Scenario modeling and impact assessment tools',
      icon: Target,
      color: '#FF6B35',
      gradient: 'linear-gradient(135deg, #FF6B35, #E55A2B)'
    },
    {
      id: 'orbit',
      title: 'Orbit Visualization',
      description: '3D visualization of asteroid trajectories and orbital mechanics',
      icon: Globe,
      color: '#2ECC71',
      gradient: 'linear-gradient(135deg, #2ECC71, #27AE60)'
    },
    {
      id: 'mitigation',
      title: 'Mitigation Strategies',
      description: 'Planetary defense and response strategy planning',
      icon: Shield,
      color: '#E74C3C',
      gradient: 'linear-gradient(135deg, #E74C3C, #C0392B)'
    }
  ];

  const quizQuestions = [
    {
      question: "When did the Tunguska meteor event occur?",
      options: ["1906", "1908", "1910", "1912"],
      correct: 1,
      explanation: "The Tunguska event occurred on June 30, 1908, when an asteroid exploded above Siberia, flattening forests for miles."
    },
    {
      question: "What effect did the Tunguska meteor have on the environment?",
      options: ["Created a crater", "Flattened forests for miles", "Caused tsunamis", "Started wildfires"],
      correct: 1,
      explanation: "NASA highlights that the Tunguska event flattened forests for miles, inspiring the formation of the Planetary Defense Coordination Office."
    },
    {
      question: "In what year did the Chelyabinsk meteor explode over Russia?",
      options: ["2011", "2012", "2013", "2014"],
      correct: 2,
      explanation: "On February 15, 2013, a house-sized asteroid entered over Chelyabinsk, Russia, exploding about 14 miles above ground."
    },
    {
      question: "Approximately how many people were injured by the Chelyabinsk meteor blast?",
      options: ["800", "1,200", "1,600", "2,000"],
      correct: 2,
      explanation: "The Chelyabinsk meteor's shockwave injured about 1,600 people according to NASA data."
    },
    {
      question: "What was the estimated explosive yield of the Chelyabinsk meteor?",
      options: ["220,000 tons of TNT", "440,000 tons of TNT", "660,000 tons of TNT", "880,000 tons of TNT"],
      correct: 1,
      explanation: "NASA reports the Chelyabinsk meteor released roughly 440,000 tons of TNT equivalent energy."
    }
  ];

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuizQuestion] = answerIndex.toString();
    setQuizAnswers(newAnswers);

    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      setShowQuizResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizQuestion(0);
    setQuizAnswers([]);
    setShowQuizResults(false);
  };

  const getScore = () => {
    return quizAnswers.reduce((score, answer, index) => {
      return score + (parseInt(answer) === quizQuestions[index].correct ? 1 : 0);
    }, 0);
  };

  return (
    <div className="home-container">
      {/* Animated Background */}
      <div className="space-background">
        <div className="stars"></div>
        <div className="shooting-stars"></div>
        <div className="nebula"></div>
      </div>

      {/* Hero Introduction Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Defending Earth from Impactor-2025 Threats
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            NASA describes meteors as "bright lights streaking across the sky" - but some pose real threats to our planet. 
            Our advanced dashboard monitors near-Earth objects and provides real-time analysis of potential asteroid impacts.
          </motion.p>
          <motion.div 
            className="hero-features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="feature-card">
              <h3>Real-Time Tracking</h3>
              <p>Monitor shooting stars, fireballs, and potentially hazardous asteroids</p>
            </div>
            <div className="feature-card">
              <h3>Impact Analysis</h3>
              <p>Advanced simulations of meteor impacts and their effects</p>
            </div>
            <div className="feature-card">
              <h3>Planetary Defense</h3>
              <p>Mitigation strategies based on NASA's Planetary Defense Office</p>
            </div>
          </motion.div>
        </div>
        
        {/* Animated Space Images */}
        <div className="space-images">
          <motion.div 
            className="astronaut-container"
            initial={{ opacity: 0, x: 100, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
          >
            <motion.img 
              src="/images/as2.png" 
              alt="NASA Astronaut in Space"
              className="astronaut-image"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          <motion.div 
            className="asteroid-container"
            initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
          >
            <motion.img 
              src="/images/nyzk.png" 
              alt="Asteroid Impact Visualization"
              className="asteroid-image"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Navigation Section */}
      <motion.section 
        className="navigation-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Explore Mission Tools</h2>
        <p className="navigation-intro">
          Access our comprehensive suite of asteroid monitoring and planetary defense tools
        </p>
        
        <div className="navigation-grid">
          {navigationCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                className="navigation-card"
                style={{ '--card-color': card.color, '--card-gradient': card.gradient } as React.CSSProperties}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate && onNavigate(card.id)}
              >
                <div className="card-icon-container">
                  <IconComponent className="card-icon" size={32} />
                </div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <div className="card-arrow">
                  <ArrowRight size={20} />
                </div>
                <div className="card-glow"></div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Space Exploration Section */}
      <motion.section 
        className="space-exploration-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Space Exploration</h2>
        
        {/* Solar System Subsection */}
        <div className="subsection solar-system-subsection">
          <motion.div 
            className="subsection-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>Interactive Solar System Explorer</h3>
            <p>
              Explore our solar system in real time with an interactive 3D simulation. 
              NASA's Eyes on the Solar System "allows you to explore the planets, their moons, 
              asteroids, comets...in 3D" using real mission data. Track spacecraft like Voyager 
              and Cassini, or fast-forward time to see orbital mechanics in action.
            </p>
            <motion.a 
              href="https://eyes.nasa.gov/apps/solar-system/#/home" 
              target="_blank" 
              rel="noopener noreferrer"
              className="explore-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Explore the Solar System
            </motion.a>
            <p className="citation">Source: NASA Eyes on the Solar System - science.nasa.gov</p>
          </motion.div>
          <div className="solar-system-visual">
            <div className="planet-orbit">
              <div className="planet earth"></div>
            </div>
            <div className="planet-orbit orbit-2">
              <div className="planet mars"></div>
            </div>
            <div className="planet-orbit orbit-3">
              <div className="planet jupiter"></div>
            </div>
          </div>
        </div>

        {/* Meteor Threat History Subsection */}
        <div className="subsection meteor-history-subsection">
          <h3>Meteor Threat History</h3>
          <p className="history-intro">
            These historical cases show why we track near-Earth objects and study potential impacts.
          </p>
          
          <div className="timeline">
            <motion.div 
              className="timeline-event"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="event-date">1908</div>
              <div className="event-content">
                <h4>Tunguska Event - Siberia</h4>
                <p>
                  On June 30, 1908, an asteroid exploded above Siberia, flattening forests for miles. 
                  NASA highlights this as a historic airburst that inspired the agency to form its 
                  Planetary Defense Coordination Office. The explosion was equivalent to 10-15 megatons 
                  of TNT and knocked down an estimated 80 million trees over 2,150 square kilometers.
                </p>
                <div className="event-image tunguska-image">
                <div className="image-placeholder">
  <img 
    src="https://www.nasa.gov/wp-content/uploads/2023/07/tunguska-8-chelaybinsk-meteor-2013-the-planetary-society.jpg?w=768"
    alt="NASA Image: Tunguska Forest Devastation"
    style={{ width: "100%", height: "auto", borderRadius: "12px" }}
  />
</div>

                </div>
                <p className="citation">Source: NASA Planetary Defense - nasa.gov</p>
              </div>
            </motion.div>

            <motion.div 
              className="timeline-event"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="event-date">2013</div>
              <div className="event-content">
                <h4>Chelyabinsk Meteor - Russia</h4>
                <p>
                  On February 15, 2013, a house-sized asteroid entered over Chelyabinsk, Russia. 
                  NASA reports it exploded about 14 miles above ground and released roughly 440,000 tons 
                  of TNT equivalent energy, creating a shockwave that injured about 1,600 people. 
                  The meteor's vapor trail was visible for hundreds of kilometers.
                </p>
                <div className="event-image chelyabinsk-image">
                <div className="image-placeholder">
  <img 
    src="https://i.ytimg.com/vi/aCEC4EaY00Q/maxresdefault.jpg"
    alt="NASA Image: Chelyabinsk Meteor Trail" 
    style={{ width: "100%", height: "auto", borderRadius: "12px" }}
  />
</div>

                </div>
                <p className="citation">Source: NASA Asteroid and Comet Watch - nasa.gov</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quiz Section */}
      <motion.section 
        className="quiz-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Test Your Knowledge</h2>
        <p className="quiz-intro">
          Test what you've learned about meteor threats with this 5-question quiz based on NASA data.
        </p>

        {!showQuizResults ? (
          <motion.div 
            className="quiz-container"
            key={currentQuizQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="quiz-progress">
              Question {currentQuizQuestion + 1} of {quizQuestions.length}
            </div>
            <h3 className="quiz-question">{quizQuestions[currentQuizQuestion].question}</h3>
            <div className="quiz-options">
              {quizQuestions[currentQuizQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  className="quiz-option"
                  onClick={() => handleQuizAnswer(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="quiz-results"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3>Quiz Complete!</h3>
            <p className="score">You scored {getScore()} out of {quizQuestions.length}</p>
            <div className="results-breakdown">
              {quizQuestions.map((question, index) => (
                <div key={index} className="result-item">
                  <div className={`result-indicator ${parseInt(quizAnswers[index]) === question.correct ? 'correct' : 'incorrect'}`}>
                    {parseInt(quizAnswers[index]) === question.correct ? '✓' : '✗'}
                  </div>
                  <div className="result-content">
                    <p className="result-question">{question.question}</p>
                    <p className="result-explanation">{question.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
            <motion.button 
              className="retry-button"
              onClick={resetQuiz}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Take Quiz Again
            </motion.button>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};

export default Home;
