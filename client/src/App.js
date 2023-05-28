import React, { useEffect, useState } from "react";
import {getImages} from './api'
import './App.css'
const App=()=>{
  const [imageList,setImageList]=useState([]);
  const [nextCursor,setNextCursor]=useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const fetchData=async()=>{
      const responseJson=await getImages();
      setImageList(responseJson.resources);
      setNextCursor(responseJson.next_cursor);
      setLoading(false);
    }
    fetchData();
  },[]);
  const handleLoadMoreButtonClick=async()=>{
    const responseJson=await getImages(nextCursor);
    setImageList((currentImageList)=>[
      ...currentImageList,
      ...responseJson.resources,
    ]);
    setNextCursor(responseJson.next_cursor);
  }
   return (
    <>
   {loading && <h1 id="loading-text">loading...</h1>}
   <div className="image-grid"> 
   {
   imageList.map((image)=>(<img src={image.url} alt={image.public_id}></img>
   ))}
    </div>
    <div className="footer">
      {nextCursor&&<button onClick={handleLoadMoreButtonClick}>Load More</button>}
      {!loading&&<a className="custom-link" href="https://www.buymeacoffee.com/sixheart62T">Support Me☕</a>}
       {!loading&&<a className="custom-link" href="https://flowus.cn/680d1c09-acb0-4e67-9d89-c20d8b3f26b4">WeChat appreciated</a>}
    </div>weixin
    </>
);
};
export default App;
