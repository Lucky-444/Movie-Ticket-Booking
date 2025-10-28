
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminNavbar = () => {
  return (
    <div className='flex items-center justify-between px-8 
      md:px-15 h-16 border-b border-gray-300/30'>
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-56 h-auto"/>
      </Link>
    </div>
  )
}

export default AdminNavbar
