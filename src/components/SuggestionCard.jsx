export const SuggestionCard = ({ suggestion, setSearchText, setLocation,currentSuggeSelect }) => {
  return (
    <li
      onClick={() => {
        setSearchText("");//suggestion.name
        setLocation(suggestion);
      }}
      className={`cursor-pointer  ${currentSuggeSelect&&"bg-green-950"}`}
    >
      {suggestion.name}
    </li>
  );
};
