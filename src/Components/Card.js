import "./Card.css"
import {useEffect, useState} from "react";
import axios from "axios";
import { GrStatusGoodSmall } from 'react-icons/gr';


const Card = (props) => {

  const [data, setData] = useState([]);
  const BaseUrl =  "https://rickandmortyapi.com/api/character/361"

  const isAlive = //Verifica se o personagem está vivo ou morto
    props.status === "Alive"

  useEffect(() => {
    axios.get(BaseUrl)
      .then((response) => {
        setData(response.data.results)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return(
    <div className="CardContainer">
      <img className={"ImgCard"} src={props.Img} />
      <div className={"DescCard"}>
        <span className={"NomeCard"}>{props.Nome}</span>
        <span className={"StatusDesc"}>
          <GrStatusGoodSmall className={ isAlive ? "StatusAlive" : "StatusDead"}/>
          {props.status} - {props.Especie}
        </span>
        <span className={"LocalDesc"}>
          <h3 className={"LocalTittle"}>Last know location: </h3>
          <p> {props.Localizacao}</p>
        </span>
        <span className={"EpisodeDesc"}>
          <h3 className={"LocalTittle"}>First seen in: </h3>
          {props.Episodio.name}
        </span>
      </div>

    </div>
  )
}
export default Card