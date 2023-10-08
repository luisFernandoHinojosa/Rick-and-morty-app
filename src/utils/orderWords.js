export const orderWords = (locationSuggestions,searchText) => {
    const filteredSuggestions = locationSuggestions.filter((suggestion) =>
          suggestion.name.toLowerCase().startsWith(searchText.toLowerCase())
        );
    const sortedSuggestions = filteredSuggestions.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
    return sortedSuggestions
}