import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { SuggestionCard } from "./SuggestionCard";
import { orderWords } from "../utils/orderWords";

export const Location = ({ location, setLocation }) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchText.trim() === "") {
      setSuggestions([]);
      return;
    }
    axios
      .get(`https://rickandmortyapi.com/api/location/?name=${searchText}`)
      .then(({ data }) =>  
        setSuggestions(orderWords(data.results, searchText))
      )
      .catch((err) => console.log(err));
  }, [searchText]);
  console.log("texto inout", searchText);
  return (

    <section className="bg1 text-white flex flex-col items-center  gap-10 px-5">
      <img src="/public/portal.png" alt="" />
      <form className="flex gap-3 border-2 border-green-400 w-auto md:w-1/2 lg:w-1/4">
        <input
          name="idLocation"
          className="text-black w-full"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <span className="flex gap-2 items-center">
          Serch <IconSearch size={20} />{" "}
        </span>
      </form>

      {suggestions.length > 0 && (
        <ul className="text-center border-2 border-green-400 py-2 w-auto md:w-1/2 lg:w-1/4 px-1 max-h-36 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              setSearchText={setSearchText}
              setLocation={setLocation}
            />
          ))}
        </ul>
      )}

      <section className="text-center grid gap-3 border-2 border-green-400 py-5 px-14 ">
        <h3>{location?.name}</h3>
        <ul className="flex gap-5">
          <li>Type: {location?.type}</li>
          <li>Dimension: {location?.dimension}</li>
          <li>Poblation: {location?.residents.length}</li>
        </ul>
      </section>
    </section>
  );
};
