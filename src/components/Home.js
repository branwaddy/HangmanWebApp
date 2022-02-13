import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Link to='/game'><button name = 'start'>START</button></Link>
    </div>
  )
}

export default Home