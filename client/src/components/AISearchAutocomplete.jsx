import React, { useState, useCallback } from 'react';
import { fetchAutocomplete } from '../api/autocompleteAPI';
import { debounce } from 'lodash';

const AISearchAutocomplete = ({ placeholder = 'Type your query...', onSelect, className = '', showButton = true }) => {
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [aiAnswer, setAiAnswer] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const debouncedFetch = useCallback(
    debounce(async (value) => {
      if (value.length > 2) {
        setIsLoading(true);
        try {
          const suggestion = await fetchAutocomplete(value);
          setSuggestion(suggestion);
          setShowDropdown(!!suggestion);
        } catch (error) {
          setSuggestion('');
          setShowDropdown(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestion('');
        setShowDropdown(false);
      }
    }, 300),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    debouncedFetch(value);
  };

  const handleSuggestionClick = () => {
    if (suggestion) {
      setInput(suggestion);
      setShowDropdown(false);
      setAiAnswer(suggestion);
      onSelect?.(suggestion);
    }
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setIsSearching(true);
    setAiAnswer('');
    try {
      const answer = await fetchAutocomplete(input);
      setAiAnswer(answer);
      setShowDropdown(false);
    } catch (error) {
      setAiAnswer('Error fetching answer.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSearch} className="flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-1 px-6 py-3 rounded-xl text-lg font-roboto shadow-lg focus:ring-4 focus:ring-blue-400 outline-none text-black placeholder:text-black border border-gray-300"
          onFocus={() => suggestion && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        />
        {showButton && (
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition text-lg"
            disabled={isSearching}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        )}
      </form>
      {isLoading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      )}
      {showDropdown && suggestion && !isLoading && (
        <div
          onClick={handleSuggestionClick}
          className="absolute left-0 right-0 mt-2 px-6 py-4 bg-white border border-gray-200 rounded-xl shadow-xl cursor-pointer hover:bg-gray-50 z-50"
        >
          <span className="text-gray-700 font-semibold">AI Suggestion: </span>
          <span className="text-blue-700 font-bold">{suggestion}</span>
        </div>
      )}
      {aiAnswer && (
        <div className="mt-6 p-6 bg-white/90 rounded-xl shadow-xl text-lg text-black font-inter border border-blue-100">
          <span className="font-semibold text-blue-700">AI Answer:</span> {aiAnswer}
        </div>
      )}
    </div>
  );
};

export default AISearchAutocomplete; 