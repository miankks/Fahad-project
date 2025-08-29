import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosEyeOff, IoMdEye } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';


const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false)
  const [passwordType, setPasswordType ] = useState("password");

  // old states for error and loading
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  // through redux
  const {loading, error } = useSelector((state) => state.user)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      // old set loading
      // setLoading(true);

      // through redux
      dispatch(signInStart())
  
      const res = await fetch('/api/auth/signin', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        })
        const data = await res.json();
        if (data.success === false) {
          // direct method
          // setLoading(false);
          // setError(data.message);

          // through redux
          dispatch(signInFailure(data.message))
          return;
        }
        // direct method
        // setLoading(false)
        // setError(null)

        // through redux
        dispatch(signInSuccess(data))
        navigate('/profile')
    } catch (error) {
      // direct method
      // setLoading(false);
      // setError(error.message);

      // through redux
      dispatch(signInFailure(error.message))
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
    setPasswordType(showPassword ? 'password' : 'text' )    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email'
              onChange={handleChange}/>
        <input type={passwordType} placeholder='Password' className='border p-3 rounded-lg' id='password'
              onChange={handleChange}/>
          <span onClick={handleShowPassword} className='flex relative justify-end items-center'>
            {showPassword ? <IoMdEye className='absolute justify-center mb-20 mr-1'/> :
             <IoIosEyeOff className='absolute justify-center mb-20 mr-1' />}
          </span>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95
              disabled:opacity-80 hover:cursor-pointer' disabled={loading}>
                {loading? 'Loading': 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Do not have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn