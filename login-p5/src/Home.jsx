/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    navigate('/login')
  }

  const onSignupClick = () => {
    navigate('/signup')
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>MultiStore</div>
        <img src="assets/logo.png" alt="website logo" />
      </div>
      <div>Bienvenidx a tu espacio</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Cerrar Sesión' : 'Ingresa a tu cuenta'}
        />
        
        {!loggedIn && <input
          className={'inputButton'}
          type="button"
          onClick={onSignupClick}
          value={'Regístrate'}
        />}
        
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  )
}

export default Home