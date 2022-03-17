const Button = ({letter, onClick}) => {
  // Button's passed 'letter' props and makes it the butto ID, value etc. Also allocate onClick event
  return <button className='btn' id={letter} value={letter} onClick={(e) =>onClick(e.target)}>{letter}</button>;
};

export default Button