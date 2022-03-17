import { Link } from 'react-router-dom';

const Home = ({startGame}) => {

  return (
    // Home page only contains a start button which links to game route and triggers start function
    <div>
        <Link to='/game'><button  name = 'start' onClick={startGame}>START</button></Link>
    </div>
  )
}

export default Home