import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, TouchableOpacity} from 'react-native';
const IP=require('./Ipcim')

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const orszag = async () => {
    try {
      const response = await fetch(IP.Ipcim+'orszag');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    orszag();
  }, []);

  const torles=(szam)=>{
    alert (szam)
    var bemenet={
        bevitel1:szam
    }
    fetch(IP.Ipcim + "torles_orszag", {
      method: "DELETE",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => {
   alert(y)
   orszag()
  }
  );

  }

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({Orszag_id}) => Orszag_id}
          renderItem={({item}) => (
           <View>
            <Text
            style={{fontWeight:"bold",fontSize:20}}
            >
              {item.Orszag_id}, {item.Orszag_nev}, {item.Orszag_zaszlo}, {item.Orszag_szoveg}, {item.Orszag_link} 
            </Text>
            <TouchableOpacity
         style={{backgroundColor: "#0d3f8f"}}
        onPress={()=>torles(item.Orszag_id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:25,width:100,marginLeft:"auto",marginRight:"auto"}}  >Törlés</Text>
        </TouchableOpacity>
           </View>
           
          )}
        />
      )}
    </View>
  );
};

export default App;
