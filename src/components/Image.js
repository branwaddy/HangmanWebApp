const Image = (props) => {
    const location = props.location;

  return (
      
    <div>
        <img src={location} alt='hangman' className='hangman'/>
    </div>
    
  )
}

export default Image