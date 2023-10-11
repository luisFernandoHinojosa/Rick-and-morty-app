import { IconArrowsLeftRight } from "@tabler/icons-react";
//import { data } from "autoprefixer";
import axios from "axios";
import { useEffect, useState } from "react";

export const ResidentCard = ({ residentEndpoint }) => {
  const [resident, setResident] = useState(null);
  const [episodeDetails, setEpisodeDetails] = useState(null);
  const [rotateCard, setRotateCard] = useState(false);

  console.log("re",resident)
  console.log("roool",episodeDetails)
  const status = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    unknown: "bg-slate-500",
  };

  useEffect(() => {
    axios
      .get(residentEndpoint)
      .then(({ data }) => {
        setResident(data);
  
        if (data.episode.length > 0) {
          axios.get(data.episode[0])
            .then(({ data }) => setEpisodeDetails(data))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRotateCard = ()=>{
    setRotateCard(!rotateCard)
  }

  return (
    <section className="relative container">
      <button onClick={handleRotateCard} className="relative left-1/2 
      -translate-x-1/2 text-orange-600 hover:bg-slate-300/20"><IconArrowsLeftRight/></button>
      <section className={`cursor-pointer card ${rotateCard&&("rotate")}`}>
      <article className="relative border-2 border-green-400 text-white card-front">
        <header className="relative">
          <img src={resident?.image} alt="" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white px-5 py-2 rounded-md bg-black/60 flex items-center gap-2">
            <div
              className={`h-3 w-3 ${status[resident?.status]} rounded-full `}
            ></div>
            <span>{resident?.status}</span>
          </div>
        </header>

        <div className="pl-1 grid gap-2 pt-1 items-center">
          <h4 className="text-xl font-semibold">{resident?.name}</h4>
          <ul className="grid text-sm gap-2 pb-1">
            <li className="">
              {" "}
              <span className="text-teal-100">Species:</span>{" "}
              <span className="font-semibold">{resident?.species}</span>
            </li>
            <li>
              {" "}
              <span className="text-teal-100">Origin: </span>
              <span className="font-semibold">{resident?.origin.name}</span>
            </li>
            <li>
              {" "}
              <span className="text-teal-100">Times appear: </span>
              <span className="font-semibold">{resident?.episode.length} </span>
            </li>
          </ul>
        </div>
      </article>
      <article className="absolute w-full h-full top-0 grid text-center items-center card-back text-white border-2 border-green-400 ">
        <div>
          <ul>
             <li>
                {" "}
                <span className="text-orange-500 font-bold">Name: </span>
                <span>{episodeDetails?.name}</span>
             </li>
             <li>
                {" "}
                <span className="text-orange-500 font-bold">Air Date: </span>
                <span>{episodeDetails?.air_date}</span>
             </li>
             <li>
                {" "}
                <span className="text-orange-500 font-bold">Episode: </span>
                <span>{episodeDetails?.episode}</span>
             </li>
          </ul>
        </div>
        </article>
        </section>
    </section>
  );
};
