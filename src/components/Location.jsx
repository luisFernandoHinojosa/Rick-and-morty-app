import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { SuggestionCard } from "./SuggestionCard";
import { orderWords } from "../utils/orderWords";

export const Location = ({ location, setLocation }) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);

  const input = useRef(null);

  useEffect(() => {
    if (searchText.trim() === "") {
      setSuggestions([]);
      setSuggestionIndex(-1);
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

  const handleKeySuggestions = (e) => {
    if (e.key === "ArrowDown" && suggestionIndex < suggestions.length - 1) {
      setSuggestionIndex((prevIndex) => prevIndex + 1);
    } else if (e.key === "ArrowUp" && suggestionIndex > 0) {
      setSuggestionIndex((prevIndex) => prevIndex - 1);
    } else if (e.key === "Enter" && suggestionIndex !== -1) {
      e.preventDefault();
      setSearchText(suggestions[suggestionIndex].name);
      setLocation(suggestions[suggestionIndex]);
      setSuggestionIndex(-1);
      setSearchText("");
    }
  };

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [suggestionIndex]);

  return (
    <section className="relative bg1 text-white flex flex-col items-center justify-end gap-10 px-5 overflow-hidden w-full h-[450px]">
      <div className="fixed w-[300px] h-[200px] top-0 ">
        <img src="/public/portal.png" alt="portal" className="animation" />
        <div className="absolute top-5 ">
        <img src="/public/logo2.png" alt="rm" />
        </div>
        <div className="absolute h-full top-24 grid items-center px-6 ">
          <img src="/public/logo.png" alt="title" />
        </div>
      </div>

      <section className="relative grid w-[250px]  md:w-1/2 lg:w-1/3 ">
        <div>
          <form
            className="absolute flex border-2 border-green-400  overflow-hidden w-full h-10 bottom-0"
            onKeyDown={handleKeySuggestions}
          >
            <input
              placeholder="Search Name Dimension"
              className="text-lg text-green-900 w-full focus:outline-none text-center  font-semibold"
              type="text"
              value={searchText}
              autoComplete="off"
              ref={input}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
        </div>
        {suggestions.length > 0 && (
          <ul className="absolute bg-[#376952] text-center  w-full max-h-36 overflow-y-auto scrollbar-thumb-green-800 scrollbar-track-green-400 scrollbar-w-2 scrollbar-thumb-rounded-md text-white z-10">
            {suggestions.map((suggestion, index) => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                setSearchText={setSearchText}
                setLocation={setLocation}
                currentSuggeSelect={index === suggestionIndex}
              />
            ))}
          </ul>
        )}
      </section>

      <section className="relative text-center bg-black/60 grid gap-3 border-2  border-green-400 py-5 px-8 md:px-14  z-0 ">
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
