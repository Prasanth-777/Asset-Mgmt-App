import React, { createContext, useReducer, useContext } from 'react';


const AssetContext = createContext();

const initialState = {
  assets: [],
  categories: ['Electronics', 'Furniture'],
  statuses: ['Available', 'In Use'],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ASSET':
      return { ...state, assets: [...state.assets, action.payload] };
    case 'UPDATE_ASSET':
      return {
        ...state,
        assets: state.assets.map((a) =>
          a.id === action.payload.id ? action.payload : a
        ),
      };
    case 'DELETE_ASSET':
      return {
        ...state,
        assets: state.assets.filter((a) => a.id !== action.payload),
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case 'ADD_STATUS':
      return {
        ...state,
        statuses: [...state.statuses, action.payload],
      };
    default:
      return state;
  }
}

export const AssetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AssetContext.Provider value={{ state, dispatch }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => useContext(AssetContext);