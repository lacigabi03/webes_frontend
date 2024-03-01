import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
const IP=require('./Ipcim')

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const letolt_film = async () => {
    try {
      const response = await fetch(IP.Ipcim+'film');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    letolt_film();
  }, []);

const torles=(szam)=>{
    alert (szam)
    var bemenet={
        bevitel1:szam
    }
}

fetch (IP.Ipcim + "torles_film"),{
    method: "DELETE",
    body:JSON.stringify(bemenet),
    Headers:{"Content-type": "application/json; charset=UTF-8"}
}




  return (
    <View style={{flex: 1, padding: 24}}>
      
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />


      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({film_id}) => film_id}
          renderItem={({item}) => (
            <Text>
              {item.film_cim}, {item.darabszam}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default App;