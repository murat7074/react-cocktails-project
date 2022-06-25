import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  // useCallback sonsuz döngüye girmemizi engelliyor. çünkü useEffect de dependency olarak "fetchDrinks" i ekleyebilmek için "useCallback" i kullanmalıyız
 // bir değişiklik olursa useCallback en baştan fonksiyonu çalıştırıcak.
  const fetchDrinks = useCallback  (  async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;

        // Api den gelen bilgi isimleri biraz karışık. kendi anlayacağımız şekilde isimlendireceğiz

      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = item

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })
        setCocktails(newCocktails) // nihayet bilgiyi aktardık
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]   );

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  return (
    <AppContext.Provider
      value={{        loading,        cocktails,        setSearchTerm,      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };






