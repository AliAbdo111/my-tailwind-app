import React, { useState } from 'react';
import {
    useNavigate,
    useLocation
    ,
} from "react-router-dom";
import { FiCamera } from "react-icons/fi";
import axios from 'axios';
import { IoIosArrowForward } from "react-icons/io";


const AddProductNext = () => {
    const navigate = useNavigate();
    const { state } = useLocation()
    const [image, setIamge] = useState([])
    const [loading, setLoading] = useState(false);
    const [erroImage, setErrorImage] = useState(false)

    // hundelr
    const handleFileInput = (e) => {
        e.preventDefault()
        const formData = new FormData()
        Array.from(e.target.files).forEach(element => {
            formData.append('image-file', element, element.name);
        });
        setIamge(formData);

    }

    const hundelNavigationBack = () => {
        navigate('/AddPorduct')
    }
    const hundelNavigation = (e) => {
        e.preventDefault();
   
        setLoading(true);

        const formData = image
        formData.append('name', state?.name);
        formData.append('category', state?.category);
        formData.append('location', state?.location);
        formData.append('discreption', state?.discreption);
        formData.append('price', state?.price);
        axios.post('http://localhost:3001/product', formData).then(res => {
            setTimeout(() => {
                setLoading(false)
                navigate('/')
            }
                , 1000)
        })
    }

    return (
        <div className='h-[100vh] p-10'>
            {!loading ? <div>
                <h1 className='text-2xl font-bold mt-2 mb-2'>Add product</h1>
                <div className='flex items-center space-x-1 mb-4'>
                    <p className='font-bold'>product</p>
                    <IoIosArrowForward />
                    <p className='font-bold'> pictures</p>
                </div>
                <form className='ml-10 flex flex-col justify-center items-center  py-4 px-3  rounded-md'>
                    <div className='p-[6rem] mb-4 flex flex-col items-center cursor-pointer bg-white rounded-lg'>
                        <FiCamera size={40} />
                        <input type="file" class="h-full w-full opacity-0" onChange={handleFileInput} multiple />
                        <p className='text-xl'>Drag or select files to upload</p>

                    </div>
                    {/* {erroImage&& <aspan className='text-red-500'>Please select exactly 4 images.</span>} */}

                    <div className="flex justify-evenly space-x-2 mt-4" >
                        <img src="https://loremflickr.com/800/600/girl" className="shadow r border border-white h-[80px] w-[80px] rounded-2xl overflow-hidden border" />
                        <img src="https://loremflickr.com/800/600/girl" className="shadow r border border-white h-[80px] w-[80px] rounded-2xl overflow-hidden border" />
                        <img src="https://loremflickr.com/800/600/girl" className="shadow r border border-white h-[80px] w-[80px] rounded-2xl overflow-hidden border" />
                        <img src="https://loremflickr.com/800/600/girl" className="shadow r border border-white h-[80px] w-[80px] rounded-2xl overflow-hidden border" />
                    </div>
                    <div className='space-y-2 space-x-2'>
                        <button onClick={hundelNavigationBack} className='bg-gray-300 p-1 w-20 rounded-md'>Back</button>
                        <button

                            onClick={hundelNavigation} className='bg-green-600 p-1 px-2 w-[100px] rounded-md '>Publich</button>
                    </div>
                </form>
            </div>
                : <div class="min-h-screen dark:bg-slate-800 gap-6 flex items-center justify-center"><div class="w-36 h-36 border-8 border-dashed rounded-full border-t-lime-400 animate-spin">

                </div></div>}
        </div>
    )
}
export default AddProductNext;