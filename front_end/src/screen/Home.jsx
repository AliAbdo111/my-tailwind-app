import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import NotFound from '../component/NotFound';
import { Link } from 'react-router-dom';




const Home = () => {

    // hookes used
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterSelected, setFilterSelected] = useState('');


    // handler method used
    const fetchData = async () => {
        setSearchQuery('')
        axios.get('http://localhost:3001/product')
            .then(res => {
                setFilteredProducts(res.data.data);
                setProduct(res.data.data)
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }

    const handleSearch= (event)=>{
        const query = event.target.value;
        setSearchQuery(query);

        // Use regex to perform a case-insensitive search by product name
        const regex = new RegExp(query, 'i');
        setFilteredProducts(product.filter(item=>regex.test(item.name)))
    }
  
    useEffect(() => {
        fetchData()
    }, [])

    const filterItem = (event) => {
        const selectedValue = event.target.value;
        setFilterSelected(selectedValue);

        if (selectedValue ==='All') {
          setFilteredProducts(product)
        } else {
 
          setFilteredProducts(product.filter(product => product.category === selectedValue));
        }
      };

    return (
        <div>
            <div className='flex pt-10 justify-evenly mb-2 '>
                <div class="relative">
                    <input
                        class="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400 focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Search..."
                        onChange={handleSearch}
                        value={searchQuery}
                    />
                    <div onClick={fetchData} class="absolute right-2 inset-y-0 flex items-center text-green-400">
                    <MdOutlineClose size={24} />
                    </div>
                    <div class="absolute left-3 inset-y-0 flex items-center text-green-400">
                    <FaSearch />
                    </div>

                </div>
                <div className='flex flex-col w-[40%] items-center '>
                    <select name="" id=""
                   value={filterSelected}
                    onChange={filterItem}
                    className='w-[50%] h-10 px-12 py-1 text-md font-medium text-green-400 border border-gray-300 rounded hover:bg-green-400 hover:text-white active:bg-gray-300 focus:outline-none focus:ring'>
                        <option selected value="All">All</option>
                        <option value="2beds">2beds</option>
                        <option value="3beds">3beds</option>
                        <option value="4beds">4beds</option>
                        <option value="5beds">5beds</option>
                    </select>
                </div>
                <div>
                <Link to='/AddPorduct' class="inline-block px-12 py-2 text-sm font-medium text-green-400 border bordergreen-400 rounded hover:bg-green-400 hover:text-white active:bg-white focus:outline-none focus:ring" href="/download">
                    Add New
                </Link>
                </div>
            </div>
            {!loading ?
                (
                    filteredProducts.length > 0 ?(<div className='flex flex-wrap justify-evenly bg-gray-100'>

            {filteredProducts?.map((item,index)=>(
        <div key={index} className="p-2 max-w-[27rem]  border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col "
        >
    <Link to={`/${item._id}`}>
      <img src={item.imgUrl[0]}  alt="product img" className="w-[333px] h-[268px] shadow rounded-xl overflow-hidden border" />
      <div className="mt-2">
          <h4 className="font-bold text-xl">2972 {item.name}  </h4>

          <p className="mt-2 text-gray-600 text-xl">{item.location}</p>
          <div className='flex justify-between'>
              <p className='font-bold'>{item.price}+$/night</p>
              <div className='flex'>
                  <p className='font-bold mr-2'><span className='text-xl'>2</span>beds</p>
                  <p className='font-bold'> <span className='text-xl'>124</span>m²</p>
              </div>
          </div>

      </div>
      </Link>
  </div>
           ))}        
                    
                </div>):(<NotFound /> )):(
                // sponecer 
                <div class="min-h-screen dark:bg-slate-800 gap-6 flex items-center justify-center">
                    <div class="w-36 h-36 border-8 border-dashed rounded-full border-t-lime-400 animate-spin">
                    </div>
                </div>)}
        </div>
    )
}

export default Home;