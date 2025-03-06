const InputForm = ({ question, onChange }) => {
    return (
      <div>
        <h2>{question}</h2>
        <input type="number" onChange={onChange} />
      </div>
    );
  };