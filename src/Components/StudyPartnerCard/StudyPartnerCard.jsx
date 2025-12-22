import React from 'react';
import { Link } from 'react-router';

const StudyPartnerCard = ({ partner }) => {
    

    return (
        <div className=" card bg-base-200 w-full md:w-70  shadow-md p-1 rounded-2xl border-primary ">
            <figure className="px-1 pt-1">

                <img
                    src={partner.profileimage}

                    className="bg-primary  rounded-t-xl w-full object-cover"
                />
                
                
            </figure>


            <div className=' card-body  text-black relative'>
                <img src="https://i.postimg.cc/qMy87WLD/vecteezy-gold-medal-for-victory-and-achievement-67388379.png"
                    className='h-3/7 absolute top-5 right-5'
                    alt="" />
                <h2 className="card-title text-xl font-semibold">{partner.name}</h2>
                <p className='text-sm'>{partner.subject}</p>

                <div className='grid grid-cols-2'>
                    <div className="flex justify-start items-center text-sm text-gray-600">


                        <span className="font-semibold text-black text-xl">{partner.rating} <span className='text-blue-700 text-lg'>★</span></span>
                    </div>


                    <div className="card-actions mt-2 w-full">
                        {/* <Link to={`/product-details/${_id}`} className="btn btn-primary px-8">View Details</Link> */}
                        <Link to={`/find-partners/${partner._id}`} 
                            className='btn btn-secondary rounded-4xl w-full' >View Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudyPartnerCard;









// <div className=" card bg-base-100 w-70 border  shadow-md p-1 rounded-2xl border-primary">
//     <figure className="px-2 pt-2">
//         <img
//             src='https://i.postimg.cc/3wyctVG2/pharma-hemp-complex-QTQscp2q-Q-Y-unsplash.jpg'

//             className="stamp bg-primary rounded-xl w-full object-cover"
//         />
//     </figure>

//     <div className="card-body ">


//         <h2 className="card-title text-xl font-semibold">Mohammed Abdullah</h2>
//         <p className='text-sm'>physics,chemistry,Math</p>
//         <p className="text-sm text-gray-600  mt-5">


//             <span className="font-semibold text-red-600 text-xl">4.9 <span className='text-yellow-400'>★</span></span>
//         </p>


//         <div className="card-actions mt-2 w-full">
//             {/* <Link to={`/product-details/${_id}`} className="btn btn-primary px-8">View Details</Link> */}
//             <button className='btn btn-primary w-full' >View Details</button>
//         </div>
//     </div>
// </div>