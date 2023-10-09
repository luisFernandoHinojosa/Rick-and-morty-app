import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { SuggestionCard } from "./SuggestionCard";
import { orderWords } from "../utils/orderWords";

export const Location = ({ location, setLocation }) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1)
  
  const input = useRef(null)

  useEffect(() => {
    if (searchText.trim() === "") {
      setSuggestions([])
      setSuggestionIndex(-1)
      return;
    }
    axios
      .get(`https://rickandmortyapi.com/api/location/?name=${searchText}`)
      .then(({ data }) => {
        setSuggestions(orderWords(data.results, searchText));
      setSuggestionIndex(0);
      })
      .catch((err) => console.log(err));
  }, [searchText]);

  const handleKeySuggestions = (e)=>{
    if(e.key === "ArrowDown" && suggestionIndex < suggestions.length-1){
      setSuggestionIndex((prevIndex)=>prevIndex +1)
    }else if(e.key === "ArrowUp" && suggestionIndex > 0){
      setSuggestionIndex((prevIndex)=> prevIndex -1)
    }else if(e.key === "Enter" && suggestionIndex !==-1){
      e.preventDefault()
      setSearchText(suggestions[suggestionIndex].name)
      setLocation(suggestions[suggestionIndex])
      setSuggestionIndex(-1)
      setSearchText("")
    }
  }

  useEffect(()=>{
    if(input.current){
      input.current.focus()
    }
  },[suggestionIndex])
 

  return (
    <section className="bg1 text-white flex flex-col items-center  gap-10 px-5">
      <div className="w-[400px] bottom-[20px] relative">
      <img src="/public/portal.png" alt="" className="animate-pulse"/>
      </div>
      <form className="flex border-2 border-green-400  overflow-hidden w-auto md:w-1/2 lg:w-1/4 h-10" onKeyDown={handleKeySuggestions}>
        <input
        placeholder="Search Name Dimension"
          className="text-green-900 w-full focus:outline-none text-center  font-semibold"
          type="text"
          value={searchText}
          autoComplete="off"
          ref={input}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <span className="flex gap-2 items-center bg-green-700 px-1">Serch <IconSearch size={20} />{" "}
        </span>
      </form>

      {suggestions.length > 0 && (
        <ul className="text-center border-2 border-green-400 w-auto md:w-1/2 lg:w-1/4  max-h-36 overflow-y-auto scrollbar-thumb-green-700 scrollbar-track-green-300 scrollbar-w-2 scrollbar-thumb-rounded-md text-green-200">
          {suggestions.map((suggestion, index) => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              setSearchText={setSearchText}
              setLocation={setLocation}
              currentSuggeSelect ={index === suggestionIndex}
            />
          ))}
        </ul>
      )}

      <section className="text-center grid gap-3 border-2 border-green-400 py-5 px-14 ">
        <h3 className=" font-semibold text-xl text-green-400">
          !Welcome to {location?.name}
        </h3>
        <ul className="flex gap-5 text-green-200">
          <li>
            Type:{" "}
            <span className="font-semibold text-white">{location?.type}</span>
          </li>
          <li>
            Dimension:{" "}
            <span className="font-semibold text-white">
              {location?.dimension}
            </span>
          </li>
          <li>
            Poblation:{" "}
            <span className="font-semibold text-white">
              {location?.residents.length}
            </span>
          </li>
        </ul>
      </section>
    </section>
  );
};
