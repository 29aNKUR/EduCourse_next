import { useSession } from 'next-auth/react';
import Header from './header'
import Home from './home'


const index = () => {
  return (
    <div>

      <Home/>
    </div>
  )
}

export default index