import { useState, useEffect } from 'react';
import "./ApiData.css"
import axios from 'axios'
import Card from "./Card";
import { FaAngleRight } from 'react-icons/fa';
import { FaAngleLeft } from 'react-icons/fa';


const ApiData = () => {
  const [data, setData] = useState([]);
  const [BaseUrl, setBaseUrl] = useState("https://rickandmortyapi.com/api/character/")
  const [BaseEpisode, setBaseEpisode] = useState("https://rickandmortyapi.com/api/episode")
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");


  const takeData = () => {
    axios.get(BaseUrl)
      .then((response) => {
        setData(response.data.results)
        setNextUrl(response.data.info.next)
        setPrevUrl(response.data.info.prev)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const takeEpisode = () => {
    axios.get(BaseEpisode)
      .then((response) => {
        setBaseEpisode(response.data.results)
        console.log(BaseEpisode)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    takeData()
  }, [BaseUrl])

  useEffect(() => {
    takeEpisode()
  })

function nextPage(){
  setBaseUrl(nextUrl)
}
function prevPage(){
  setBaseUrl(prevUrl)
}


  return(
    <div className="ApiCardContent">
        {data.map((item) => {
          return(
            <div className={"absolute"}>
              <button onClick={nextPage}>
                <FaAngleRight className={"NextIcon"}/>
              </button>
              <button onClick={prevPage}>
                <FaAngleLeft className={"PrevIcon"}/>
              </button>
            </div>
          )
        })}
    {data.map((item) => {
        return((
          <div className={"Card"}>
            <Card Img={item.image}
                  Nome={item.name}
                  status={item.status}
                  Especie={item.species}
                  Localizacao={item.location.name}
                  Episodio={item.episode}
            />
          </div>
        ))
      })}
    </div>
  )
}
export default ApiData