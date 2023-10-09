import axios from "axios";
import { useEffect, useState } from "react";

export const ResidentCard = ({ residentEndpoint }) => {
  const [resident, setResident] = useState(null);

  //console.log(residentEndpoint)
  const status = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    unknown: "bg-slate-500",
  };

  useEffect(() => {
    axios
      .get(residentEndpoint)
      .then(({ data }) => setResident(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="relative card">
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
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          expedita, iste, odio omnis laborum qui asperiores deleniti facilis
          voluptates excepturi hic ab molestias dolorum rem laboriosam autem.
          Voluptates, vitae nam.
        </article>
    </section>
  );
};
