import { IconSearch } from "@tabler/icons-react"
import axios from "axios"
import { useState } from "react"

export const Location = ({location, setLocation}) => {

  //const [first, setfirst] = useState(second)

  const handleSubmit = (e) =>{
    e.preventDefault()
    const number = e.target.idLocation.value

    axios.get(`https://rickandmortyapi.com/api/location/${number}`).then(({data})=>setLocation(data)).catch((err)=>console.log(err))
  }
   console.log(location)
  return (
    <section>
      <form action="" className="flex" onSubmit={handleSubmit} >
        <input placeholder="number location" name="idLocation" className="text-black" type="number" />
        <button type="submit" className="flex gap-2 items-center">Serch <IconSearch size={20}/> </button>
      </form>
    <section>
        <h3>{location?.name}</h3>
        <ul>
            <li>Type {location?.type}</li>
            <li>Dimension {location?.dimension}</li>
            <li>Poblation {location?.residents.length}</li>
        </ul>
    </section>
  </section>
  )
}