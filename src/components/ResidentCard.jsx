import axios from "axios";
import { useEffect, useState } from "react";

export const ResidentCard = ({ residentEndpoint }) => {
  const [resident, setResident] = useState(null);

  //console.log(residentEndpoint)
  const status = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    unknown :"bg-slate-500"

  }

  useEffect(() => {
    axios
      .get(residentEndpoint)
      .then(({ data }) => setResident(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <article>
      <header className="relative">
        <img src={resident?.image} alt="" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white px-5 py-2 rounded-md bg-black/60 flex items-center gap-2">
          <div className={`h-3 w-3 ${status[resident?.status]} rounded-full `}></div>
          <span>{resident?.status}</span>
        </div>
      </header>

      <div>
        <h4>{resident?.name}</h4>
        <ul>
          <li>
            {" "}
            <span>Species:</span> {resident?.species}
          </li>
          <li>
            {" "}
            <span>Origin:</span> {resident?.origin.name}
          </li>
          <li>
            {" "}
            <span>Times appear:</span>
            {resident?.episode.length}{" "}
          </li>
        </ul>
      </div>
    </article>
  );
};
