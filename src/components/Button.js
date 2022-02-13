const Button = ({letter, onClick}) => {
  return <button className='btn' id={letter} value={letter} onClick={(e) =>onClick(e.target)}>{letter}</button>;
};

export default Button