import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiLocationOn } from "react-icons/ci";
import { useParams } from "react-router-dom";



const HotelDetailes = () => {

    const {
        register,
        handleSubmit,
        reset ,
        watch,
        formState: { errors },
    } = useForm()
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [comments, setComments] = useState([])
    const [product, setProduct] = useState([]);
    const [imgFirst,setImageFirst]=useState([]);
    const {id} = useParams();
    const [_id, secondPart] = id.split(':');

    const fetchData = async () => {
        axios.get('http://localhost:3001/product/'+_id)
            .then(res => {
                setTimeout(() => {
                    setLoading(false)
                    setProduct(res.data.data[0])
                setImageFirst(res.data.data[0].imgUrl)
                }, 1000);
                
            })
            .catch(error => {
                setLoading(false);
                setNotFound(true)
            });
    }
    const fetchComment = async () => {
        axios.get('http://localhost:3001/comment/')
            .then(res => {
                console.log(res)
                setComments(res.data.data)
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                setNotFound(true)
            });
    }
    const sendComment = async (data) => {
        setLoading(true)
        axios.post('http://localhost:3001/comment/',data)
            .then(res => {    
                fetchComment()
                reset()
            })
            .catch(error => {     
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData()
        fetchComment()
    }, [])
    
    return (
        <div className="p-4 bg-gray-100 ml-10 flex flex-col justify-center">
       {loading ?   
          <div class="min-h-screen dark:bg-slate-800 gap-6 flex items-center justify-center">
                    <div class="w-36 h-36 border-8 border-dashed rounded-full border-t-lime-400 animate-spin">
                    </div>
                </div>:
                <>
                     <div className="flex justify-evenly items-center">
                     <div className="h-[590px] flex flex-col justify-evenly items-center ">
                     <img src={imgFirst[0]} alt="image product" className="shadow border-4 border-white h-[500px] w-[330px] rounded-2xl overflow-hidden" />
                 <div className="flex justify-evenly space-x-2 mt-4" >
                 <img src={imgFirst[1]} className="shadow r border border-white h-[80px] w-[90px] rounded-2xl overflow-hidden border" />
                 <img src={imgFirst[2]} className="shadow r border border-white h-[80px] w-[90px] rounded-2xl overflow-hidden border" />
                 <img src={imgFirst[2]} className="shadow r border border-white h-[80px] w-[90px] rounded-2xl overflow-hidden border" />
     
     
                 </div>
                     </div>
                 <div className="flex items-stretch space-y-3 flex-col justify-end ml-10">
                     <p className="font-bold text-xl">{product.name}</p>
                     <p className=" w-[40%]">Lorem ipsum dolor sit amet consectetur. Nunc sed sed posuere sed sapien. Mattis arcu vel mauris lacinia molestie id quis. Nunc odio.</p>
                     <div className="flex space-x-2 align-middle items-center">
                         <CiLocationOn size={26}/>
                         <p className="textt-xl font-bold"> {product.location}</p></div>
                     <p className="text-lg font-medium">Price:<span className="font-bold text-2xl"> {product.price}</span> /night</p>
                 </div>
                 </div>
                  
                 <div className="bg-">
                     <h1 className="font-bold text-xl text-center">Comments</h1>
                  
     
                         <div class="flex flex-col">
     
                            {comments.map((item)=>
                             <div class=" rounded-md p-1 ml-1 my-1">
                             <div class="flex gap-3 items-center">
                                 <img src="https://avatars.githubusercontent.com/u/22263436?v=4"
                                     class="object-cover w-10 h-10 rounded-xl 
                                     border-2 border-white  shadow-emerald-400
                                     "/>
     
                             <div>
                             <h3 class="font-bold">
                                     User name
                                 </h3>
                                 <p class="text-gray-600 mt-0">
                                 {item.comment}
                             </p>
                             </div>
                             </div>
     
     
                             
     
                         </div>
                        
                            )}
                         </div>
                         <form  onSubmit={handleSubmit(sendComment)}>
                         <div class="w-full px-3 my-2">
                             
                             <textarea
                                 class="bg-white rounded-lg border leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                 name="body" placeholder='Type Your Comment'  {...register("comment", { required: true })}></textarea >
                                 {errors.comment && <span className='text-red-600'>This field is required</span>}
                         </div>
     
                         <div class="w-full flex justify-end px-3">
                             <input type='submit' class="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500" value='Post Comment' />
                         </div>
                     </form>
                 </div>
                 </>}
 
        </div>
    )

}
export default HotelDetailes;