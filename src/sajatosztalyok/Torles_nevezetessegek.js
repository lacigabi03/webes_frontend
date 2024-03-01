import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, TouchableOpacity} from 'react-native';
const IP=require('./Ipcim')

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const nevezetessegek = async () => {
    try {
      const response = await fetch(IP.Ipcim+'nevezetesseg_get');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    nevezetessegek();
  }, []);

  const torles=(szam)=>{
    alert (szam)
    var bemenet={
        bevitel1:szam
    }
    fetch(IP.Ipcim + "torles_Nevezetessegek", {
      method: "DELETE",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => {
   alert(y)
   nevezetessegek()
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
          keyExtractor={({Nevezetesseg_id}) => Nevezetesseg_id}
          renderItem={({item}) => (
           <View>
            <Text
            style={{fontWeight:"bold",fontSize:20}}
            >
              {item.Nevezetesseg_id}, {item.Nevezetesseg_nev}, {item.Nevezetesseg_szoveg}, {item.Nevezetesseg_video} 
            </Text>
            <TouchableOpacity
         style={{backgroundColor: "#0d3f8f"}}
        onPress={()=>torles(item.Nevezetesseg_id)}
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
