import { createContext, useContext, useState } from 'react';

const ParkContext = createContext({
  parkedCars: [],
  maxCars: '',
  handleMaxCarsChange: () => {},
  costPerHour: '',
  handleCostPerHourChange: () => {},
  occupancy: '',
  handleSearch: () => {},
  searchLength: '',
  curPage: '',
  carsPerPage: '',
  loadedContent: [],
  handleChangePage: () => {},
  handleParkedCarsData: () => {},
  addCar: (carObj) => {},
  removeCar: (carId) => {},
});

export function ParkContextProvider({ children }) {
  const [parkedCars, setParkedCars] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [searchString, setSearchString] = useState(null);
  const [costPerHour, setCostPerHour] = useState(2);
  const [maxCars, setMaxCars] = useState(50);

  const handleParkedCarsData = (parkedCars) => {
    setParkedCars(parkedCars);
  };

  const handleCostPerHourChange = (newCost) => {
    setCostPerHour(newCost);
  };

  const handleMaxCarsChange = (newMax) => {
    setMaxCars(newMax);
  };

  const addCar = (carObj) => {
    setParkedCars((prevState) => {
      return [...prevState, carObj];
    });
  };

  const removeCar = (carId) => {
    setParkedCars((prevState) => {
      return prevState.filter((car) => car.id !== carId);
    });
  };

  const handleChangePage = (page) => {
    setCurPage(page);
  };

  const handleSearch = (search) => {
    setSearchString(search);
  };

  let loadedContent;
  let searchLength;

  const carsPerPage = 10;
  const offset = curPage * carsPerPage;

  if (searchString && searchString !== '') {
    loadedContent = parkedCars.filter((car) => {
      return (
        car.model.toLowerCase().includes(searchString.toLowerCase()) ||
        car.plate.toLowerCase().includes(searchString.toLowerCase()) ||
        car.color.toLowerCase().includes(searchString.toLowerCase())
      );
    });
    searchLength = loadedContent.length;
  } else {
    loadedContent = parkedCars;
    searchLength = parkedCars.length;
  }

  loadedContent = loadedContent.slice(offset, offset + carsPerPage);

  const initialState = {
    parkedCars,
    maxCars,
    isFull: parkedCars.length >= maxCars,
    handleMaxCarsChange,
    costPerHour,
    handleCostPerHourChange,
    occupancy: parkedCars.length,
    handleSearch,
    searchLength,
    curPage,
    loadedContent,
    carsPerPage,
    handleChangePage,
    handleParkedCarsData,
    addCar,
    removeCar,
  };

  return (
    <ParkContext.Provider value={initialState}>{children}</ParkContext.Provider>
  );
}

export function useParkContext() {
  return useContext(ParkContext);
}
