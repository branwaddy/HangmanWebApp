const Image = (props) => {
    const location = props.location;

  return (
    // Render image and pass image location as props
    <div>
        <img src={location} alt='hangman' className='hangman'/>
    </div>
    
  )
}

export default Image