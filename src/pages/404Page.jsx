import {Link} from 'react-router-dom';
import gif from '../assets/Images/404-error-dribbble-800x600.gif';
const Page404 = () => {
    return (
        <div className='my-20 text-center'>
            <p className='text-4xl'>Please Back To The <Link to='/' className='text-blue-800 font-bold'>Home</Link> </p>
            <img src={gif} alt="" className='mx-auto' />
            
        </div>
    );
};

export default Page404;