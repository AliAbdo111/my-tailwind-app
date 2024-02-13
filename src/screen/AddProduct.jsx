import React from 'react';
import {
    useNavigate,

} from "react-router-dom";
import { useForm } from "react-hook-form"
import { IoIosArrowForward } from "react-icons/io";


const AddPorduct = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate();


    const hundelNavigationBack = () => {
        navigate('/')
    }
    const hundelNavigation = (data) => {
        navigate(`/AddProductNext/${data}`, { state: data })
        reset()
    }

    return (
        <div className='h-[100vh] p-10'>
            <div>
                <h1 className='text-2xl font-bold mt-2 mb-2'>Add product</h1>
                <div className='flex items-center space-x-1 mb-4'>
                    <p className='font-bold'>product</p>
                    <IoIosArrowForward />
                    <p className='font-bold'> pictures</p>
                </div>
                <form className='ml-10 space-y-2 ' onSubmit={handleSubmit(hundelNavigation)}>
                    <div className='flex items-center  '>
                        <div className='flex flex-col w-[40%] '>
                            <label className='font-bold mb-1' htmlFor="title">Title:</label>
                            <input type="text" placeholder='NIssan GTR 2022' className='py-2 '{...register("name", { required: true })} />
                            {errors.name && <span className='text-red-600'>This field is required</span>}
                        </div>
                        <div className='flex flex-col w-[40%] ml-10 '>
                            <label className='font-bold mb-1' htmlFor="title">Category:
                                :</label>
                            <select name="" id="" className='w-[50%] h-10' {...register("category", { required: true })}>
                                <option value="2beds">2beds</option>
                                <option value="3beds">3beds</option>
                                <option value="4beds">4beds</option>
                                <option value="5beds">5beds</option>
                            </select>
                            {errors.category && <span className='text-red-600'>This field is required</span>}
                        </div>
                    </div>
                    <div className='flex items-center '>
                        <div className='flex flex-col w-[40%]  '>
                         <label className='font-bold mb-1' htmlFor="title">Location:</label>
                        <input type="text" placeholder='NIssan GTR 2022' className='py-2' {...register("location", { required: true })} />
                        {errors.location && <span className='text-red-600'>This field is required</span>}
                        </div>
                        <div className='flex flex-col w-[10%] ml-10 '>
                         <label className='font-bold mb-1' htmlFor="title">Price:</label>
                        <input type="number" placeholder='$10,000' className='py-2' {...register("price", { required: true })} />
                        {errors.price && <span className='text-red-600'>This field is required</span>}
                        </div>
                    </div>
                    <div className='flex flex-col w-[40%] '>
                        <label className='font-bold mb-1' htmlFor="title">Description:</label>
                        <input type="text" placeholder='NIssan GTR 2022' className='py-6'{...register("discreption", { required: true })} />
                        {errors.discreption && <span className='text-red-600'>This field is required</span>}

                    </div>
                    <div className='space-y-2 space-x-2'>
                        <button onClick={hundelNavigationBack} className='bg-gray-300 p-1 w-20 rounded-md'>Back</button>
                        <button type='submit' className='bg-green-600 p-1 w-[80px] rounded-md '>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddPorduct;