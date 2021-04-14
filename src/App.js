import { useState } from 'react';
import './App.css';
import { parse, functionDisplay, functionCall, functionName } from './plumbing';

const Param = props => {
  return (
    <div>
      <input
        className="param"
        value={props.value}
        onChange={e => props.onChange(e.target.value)} 
       />
      <button
        className="delete-button"
        onClick={props.onDelete}>
          Delete
      </button>
    </div>
  )
}

const stringDisplay = s => (
  <>
    <span className="func-string">'</span>
    <span className="func-string">{s}</span>
    <span className="func-string">'</span>
  </>
)
const numDisplay = n => (
  <span className="func-num">{n}</span>
)
const boolDisplay = b => (
  <span className="func-bool">{b}</span>
)
const nullDisplay = () => (
  <span className="func-null">null</span> 
)
const undefinedDisplay = () => (
  <span className="func-undefined">undefined</span> 
)



const FunctionDisplay = props => {
  const withBreaks = props.funcString.split("\n")
  return (
    <div className="func-display">
      {withBreaks.map(line => <><span>{line}</span><br/></>)}
    </div>
  )
}

function App() {
  const [values, setValues] = useState([])
  const [shouldDisplayFunc, setShouldDisplayFunc] = useState(false)
  const [shouldDisplayResult, setShouldDisplayResult] = useState(false)

  return (
    <div className="App">

      <div className="App-section">
        <div className="arg-input-area">
          <button onClick={() => { setValues(values.concat('')) }}>Add argument</button>
          {values.map((val, outerIndex) => (
            <Param
              key={`param${outerIndex}`}
              value={val}
              onChange={newVal => {
                setValues(values.map((v, innerIndex) => {
                  if (innerIndex === outerIndex) {
                    return newVal
                  }
                  return v
                }))
              }}
              onDelete={() => {
                setValues(values.reduce((acc, val, innerIndex) => {
                  if (innerIndex !== outerIndex) {
                    acc.push(val)
                  }
                  return acc
                }, []))
              }}
            />
          ))}
        </div>
        Your function call will be:
        <div className="function-call">
            <span>{functionName()}(</span>
            {values.map((val, i) => {
              const parsed = parse(val)
              let component = null
              switch (typeof parsed) {
                case 'number':
                  component = numDisplay(val)
                  break;
                case 'boolean':
                  component = boolDisplay(val)
                  break;
                case 'string':
                  component = stringDisplay(val)
                  break;
                case 'object':
                  component = nullDisplay()  
                  break;
                default:
                  component = undefinedDisplay()   
                  break;      
              }
              return <>{component}{i === values.length - 1 ? null : <span>, </span>}</>
            })}
            <span>)</span>
          </div>
      </div>
        
      <div className="App-section">
          <button onClick={() => setShouldDisplayFunc(!shouldDisplayFunc)}>Toggle show function</button>
          <FunctionDisplay funcString={shouldDisplayFunc ? functionDisplay(values) : ''} />
      </div>
    
      <div className="App-section">
        <button onClick={() => setShouldDisplayResult(!shouldDisplayResult)}>Toggle show result</button>
        {shouldDisplayResult ? functionCall(values.map(parse)) : null}
      </div>

    </div>
  );
}

export default App;
