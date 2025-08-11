const { useState, useEffect, useRef } = React;

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timeLeft === 0) {
      document.getElementById('beep').play();
      if (timerLabel === 'Session') {
        setTimerLabel('Break');
        setTimeLeft(breakLength * 60);
      } else {
        setTimerLabel('Session');
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [timeLeft, timerLabel, breakLength, sessionLength]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerLabel('Session');
    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) setBreakLength(prev => prev + 1);
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) setBreakLength(prev => prev - 1);
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(prev => prev + 1);
      if (!isRunning) setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(prev => prev - 1);
      if (!isRunning) setTimeLeft((sessionLength - 1) * 60);
    }
  };

  return (
    <div className="container" style={{textAlign: 'center', marginTop: '20px'}}>
      <h1>25 + 5 Clock</h1>
      <div className="length-controls">
        <div id="break-label">
          Break Length
          <div>
            <button id="break-decrement" onClick={handleBreakDecrement}>-</button>
            <span id="break-length">{breakLength}</span>
            <button id="break-increment" onClick={handleBreakIncrement}>+</button>
          </div>
        </div>
        <div id="session-label">
          Session Length
          <div>
            <button id="session-decrement" onClick={handleSessionDecrement}>-</button>
            <span id="session-length">{sessionLength}</span>
            <button id="session-increment" onClick={handleSessionIncrement}>+</button>
          </div>
        </div>
      </div>

      <div className="timer" style={{marginTop: '20px'}}>
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left" style={{fontSize: '40px'}}>{formatTime(timeLeft)}</div>
      </div>

      <div className="controls" style={{marginTop: '20px'}}>
        <button id="start_stop" onClick={handleStartStop}>Start/Stop</button>
        <button id="reset" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
