import React, { useState, useEffect } from 'react';
import { Header } from './Components/Header';
import { Tiles } from "./Components/Tiles";
import GlobalContext from "./GlobalContext";
import { fetchData } from "./fetch"

function App() {
  const [month, setMonth] = useState("Jan")
  const [posts, setPosts] = useState({
    "posts": []
  });

  useEffect(() => {
    const reqObject = {
      "requestobjects": [
        {
          "posts": {
            "operationtype": "read",        
            "id": {
              "return": true
            },
            "userid": {
                "searchvalues": ["adbef521-7cf6-4344-af48-a9480df46549"],
                "return": true
            },
            "iscalendarentry": {
                "searchvalues" : ["true"],
              "return": true
            },        
            "media": {
              "return": true
            },
            "rating": {
              "return": true
            },
            "text": {
              "return": true
            },
            "privacy": {
              "searchvalues": [
                18
              ],
              "return": true
            },
            "typeofday": {
              "return": true
            },
            "calendardatetime": { 
              "return": true  ,
              "sort" : "descending" 
            },
            "maxitemcount": "20",   
            "continuationtoken": null
          }
        }
      ]
    }
    fetchData(`https://api.quinn.care/grap`, "POST", JSON.stringify(reqObject))
      .then((res) => res.responseobjects?.length > 0 && setPosts({
        posts: res.responseobjects[0].posts
      }))
  }, [])


  const changeMonth = (m: string) => setMonth(m);

  return (
    <GlobalContext.Provider value={{ month, changeMonth, posts }}>
      <div className="App">
        <Header />
        <Tiles />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
