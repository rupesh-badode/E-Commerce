"use client"
import { use, useEffect,useState } from "react";
import {motion,AnimatePresence} from "framer-motion";

export default function Menu({onCategoryChange,onSortChange}){

    const[categories,setCategorise] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(()=>{
      fetch("https://fakestoreapi.com/products/categories")
      .then(res=>res.json())
      .then(data=>setCategorise(data))
      .catch(err => console.err("Failed to fetch",err))
      },[]);
  
    useEffect(() => {
      console.log("Selected Category:", selectedCategory);
    }, [selectedCategory]);

    const handleSortChange = (e)=>{
      const value = e.target.value;
      console.log("Selected sort option:",value);
      onSortChange(value);
    }

    return(
    <div className="">
      <motion.div className="p-4 bg-white shadow rounded text-dark"  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <ul className="nav flex-column">
          <li className="nav-item">
            <div className="mb-3">
            <label className="form-label">Select Category</label>
            <select className="form-select" onChange={(e) => onCategoryChange(e.target.value)}>
              <option value="">All</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
             </select>
             </div>
          </li>
          <li className="nav-item">
            <label className="form-label">Sort By</label>
            <select className="form-select"  onChange={handleSortChange}>
              <option value="">None</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="rating-asc">Rating (Low to High)</option>
              <option value="rating-desc">Rating (High to Low)</option>
            </select>
          </li>
       </ul>
      </motion.div>
    </div>
        
    )
}