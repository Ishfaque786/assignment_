// import logo from './logo.svg';
import './App.css';

import {React, useState, useEffect, useCallback} from 'react';
import PostUI from './PostUI';

function App() {
  // const APP_ID = "af90f48f";
  const APP_KEY = 'gLD6KjIsQ32E00l1NWq9fjrpNNYgnIkH';

  const [gif, setGif] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('tranding');
  const [postText, setpostText] = useState('')
  const [selectedGif, setselectedGif] = useState('')
  const [posts, setposts] = useState([])
  
  const getGifdata = useCallback( async() => {
    const request = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${APP_KEY}&limit=10`;
    fetch(request)
    .then(res => res.json())
      .then((data) => {
        console.log(data.data);
        setGif(data.data);
      })
  
  
  },[query])
  useEffect(() => {
    window.addEventListener('mouseup',function(event){
      var gifSearchBox = document.getElementById('gifSearchBox');
      if(event.target !== gifSearchBox && event.target.parentNode !== gifSearchBox){
        gifSearchBox.style.display = 'none';
      }
});  

    getGifdata();
  }, [getGifdata, query]);

const updateSearch = event =>{
  setSearch(event.target.value);
  setQuery(event.target.value);

};

  const updatePostText = (event) => {
    setpostText(event.target.value);
  };
  const addPost = event => {
    event.preventDefault();
    let postsTemp = posts
    postsTemp.push({ "postText": postText, "gifUrl": selectedGif })
    setposts(postsTemp)
    setpostText('');
    setselectedGif('');
    document.getElementById('gifSearchBox').style.display='none'
   
}

  return (
    <div className="App">
      
      <div className='postInputBox'>
        <div className="postHeader">
          <text>
Add Post
</text>
      </div>
      <form onSubmit={addPost} className="search-form">
        <input className="textInput" type="text" required placeholder="Write something here" value={postText} onChange={updatePostText}></input>
        {selectedGif?<img alt="gif" src={selectedGif}/>:<div></div>}
        <button className="gifButton" type='button' onClick={()=>{document.getElementById('gifSearchBox').style.display='block'}} >GIF</button>
        
         <div className="postFooter">
            <button className='postButton' type="submit">Post</button>
          </div>
          </form>
      <div id="gifSearchBox" style={{ display: "none"}}>
      
      <input className="search-bar" placeholder="Search" type="text" value={search} onChange={updateSearch}></input>
      
    
    <div className="row recipecontainer" >
{gif.map(gif =>(
<img onClick={()=>{setselectedGif(gif.images.fixed_width.url)}} style={{display:'block', margin:'auto'}} alt="imager" src={gif.images.fixed_width.url}/>))}
        </div>
        </div>
        </div>
      <div>
          {posts.map((post, index) => (
            <div>
             
              <PostUI post={post} index={index} />
              </div>
        ))}
        </div>
        
    </div>
  );
}

export default  App;
