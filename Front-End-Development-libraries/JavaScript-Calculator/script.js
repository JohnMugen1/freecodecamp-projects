const { useState } = React;

const Calculator = () => {
  const [formula, setFormula] = useState('');
  const [currentInput, setCurrentInput] = useState('0');
  const [evaluated, setEvaluated] = useState(false);

  const handleNumber = (num) => {
    if (evaluated) {
      setEvaluated(false);
      setFormula('');
      setCurrentInput(num);
    } else {
      setCurrentInput(prev => {
        if (prev === '0') return num;
        if (prev === '-0') return `-${num}`;
        return prev + num;
      });
    }
  };

  const handleOperator = (op) => {
    if (evaluated) {
      setFormula(currentInput + op);
      setEvaluated(false);
    } else {
      let newFormula = formula;
      const lastChar = formula.slice(-1);
      
      // Handle negative numbers
      if (op === '-' && (lastChar === '' || ['+', '*', '/', '-'].includes(lastChar))) {
        setCurrentInput('-0');
        return;
      }

      if (currentInput !== '') {
        newFormula += currentInput;
      }

      // Replace consecutive operators (except for negative)
      if (['+', '*', '/'].includes(lastChar)) {
        newFormula = newFormula.slice(0, -1) + op;
      } else {
        newFormula += op;
      }

      setFormula(newFormula);
    }
    setCurrentInput('');
  };

  const handleDecimal = () => {
    if (evaluated) {
      setEvaluated(false);
      setFormula('');
      setCurrentInput('0.');
    } else if (!currentInput.includes('.')) {
      setCurrentInput(prev => prev === '' ? '0.' : prev + '.');
    }
  };

  const handleClear = () => {
    setCurrentInput('0');
    setFormula('');
    setEvaluated(false);
  };

  const handleEquals = () => {
    let expression = formula + currentInput;
    // Remove trailing operators
    expression = expression.replace(/[+\-*/]$/, '');
    
    try {
      let result = eval(expression);
      result = Number(result.toFixed(4)); // Round to 4 decimal places
      setCurrentInput(result.toString());
      setFormula(expression + '=');
      setEvaluated(true);
    } catch (e) {
      setCurrentInput('Error');
      setFormula('');
      setEvaluated(true);
    }
  };

  return (
    <div id="calculator">
      <div id="display">
        {!evaluated && <span className="formula">{formula}</span>}
        {currentInput}
      </div>
      <button id="clear" onClick={handleClear}>AC</button>
      <button id="divide" onClick={() => handleOperator('/')}>/</button>
      <button id="multiply" onClick={() => handleOperator('*')}>x</button>
      <button id="subtract" onClick={() => handleOperator('-')}>-</button>
      <button id="add" onClick={() => handleOperator('+')}>+</button>
      <button id="equals" onClick={handleEquals}>=</button>
      <button id="decimal" onClick={handleDecimal}>.</button>
      <button id="zero" onClick={() => handleNumber('0')}>0</button>
      <button id="one" onClick={() => handleNumber('1')}>1</button>
      <button id="two" onClick={() => handleNumber('2')}>2</button>
      <button id="three" onClick={() => handleNumber('3')}>3</button>
      <button id="four" onClick={() => handleNumber('4')}>4</button>
      <button id="five" onClick={() => handleNumber('5')}>5</button>
      <button id="six" onClick={() => handleNumber('6')}>6</button>
      <button id="seven" onClick={() => handleNumber('7')}>7</button>
      <button id="eight" onClick={() => handleNumber('8')}>8</button>
      <button id="nine" onClick={() => handleNumber('9')}>9</button>
    </div>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Calculator />);
