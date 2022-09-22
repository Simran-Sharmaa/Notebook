
import Notes from './Notes';
// const contextValue= require('../Context/notes/noteContext')
const Home = (props) => {
  const {showAlert}=props
  return (
  <>
   
  <Notes showAlert={showAlert}/>
    
    
    </>
  )
}

export default Home