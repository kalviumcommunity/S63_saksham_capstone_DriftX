import { useState, useEffect, useCallback } from 'react';
import { fetchAutocomplete } from '../api/autocompleteAPI';
import { debounce } from 'lodash';

const AutocompleteInput = ({ onSelect, className = '' }) => {
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Debounced function to fetch suggestions
  const debouncedFetchSuggestion = useCallback(
    debounce(async (value) => {
      if (value.length > 2) {
        setIsLoading(true);
        try {
          const suggestion = await fetchAutocomplete(value);
          setSuggestion(suggestion);
        } catch (error) {
          console.error('Error fetching suggestion:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestion('');
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFetchSuggestion(input);
    return () => debouncedFetchSuggestion.cancel();
  }, [input, debouncedFetchSuggestion]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSuggestionClick = () => {
    if (suggestion) {
      setInput(suggestion);
      setSuggestion('');
      onSelect?.(suggestion);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search products..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      )}
      {suggestion && !isLoading && (
        <div
          onClick={handleSuggestionClick}
          className="absolute w-full mt-1 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:bg-gray-50"
        >
          <span className="text-gray-600">Did you mean: </span>
          <span className="text-blue-600 font-medium">{suggestion}</span>
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput; 