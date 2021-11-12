import './App.css';
import { useEffect, useState } from 'react';
import Modal from "./Components/Modal";
import { averageColor } from "./Utilities/Util";

function App() {
  const [searchKey, setSearchKey] = useState('')
  const [colorList, setColourList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setColourList([])
    setIsLoading(false)
  }, [isError])

  const handleChange = (e) => {
    setSearchKey(e.target.value)
  }

  const onSearch = async () => {
    if (!searchKey){
      setIsError(true)
      return
    }
    setIsLoading(true)
    try {
      let res = await fetch(`https://imsea.herokuapp.com/api/1?q=${searchKey}`)
      res = await res.json()
      let imgUrls = res?.results.slice(0, 5)
      let imgElements = imgUrls?.map(image => {
        let img = document.createElement('img')
        img.src = image
        img.crossOrigin = "Anonymous"
        return img
      })
      setTimeout(() => {
        let colorList = imgUrls.map((image, i) => {
          let hexValue = averageColor(imgElements[i])
          !hexValue && setIsError(true)
          return { hexValue, image }
        })
        console.log(colorList);
        setIsLoading(false)
        setColourList(colorList)
      }, 100)
    } catch (error) {
      console.log(error.message);
      setIsError(true)
    }
  }

  return (
    <div className="App">
      <div className="Header" >Colour Finder</div>
      <div className="AppContainer">
        <div className="search">
          <div className="searchBox">
            <input className="input" type='text' name='searchKey' value={searchKey} onChange={handleChange} placeholder="Please enter a word to find matching colour" />
          </div>
          <button onClick={onSearch}>Search</button>
        </div>
        <div className="resultSection">
          <div className="grid-container">
            {!isLoading && colorList.map((color, index) => {
              return (
                <div className="card" key={index}>
                  <div className="bg-img" style={{ backgroundColor: color.hexValue }}></div>
                  <div className="content">
                    <h6>Hex Value</h6>
                    <h4>{color.hexValue}</h4>
                    <img src={color.image} className="or-img" alt = {searchKey} />
                  </div>
                </div>)
            })}
          </div>
        </div>
      </div>
      {isLoading && <div className="loader"></div>}
      <Modal
        isError={isError}
        setIsError={setIsError}
      />
    </div>
  );
}

export default App;
