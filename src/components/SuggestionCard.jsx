export const SuggestionCard = ({ suggestion, setSearchText, setLocation }) => {
  return (
    <li
      onClick={() => {
        setSearchText(suggestion.name);
        setLocation(suggestion);
      }}
      className="cursor-pointer border-2 border-red-200"
    >
      {suggestion.name}
    </li>
  );
};
