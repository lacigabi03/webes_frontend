import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, TouchableOpacity} from 'react-native';
const IP=require('./Ipcim')

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const erdekesseg = async () => {
    try {
      const response = await fetch(IP.Ipcim+'erdekessegek');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    erdekesseg();
  }, []);

  const torles=(szam)=>{
    alert (szam)
    var bemenet={
        bevitel1:szam
    }
    fetch(IP.Ipcim + "torles_erd", {
      method: "DELETE",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => {
   alert(y)
   erdekesseg()
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
          keyExtractor={({erd_id}) => erd_id}
          renderItem={({item}) => (
           <View>
            <Text
            style={{fontWeight:"bold",fontSize:20}}
            >
              {item.erd_id}, {item.erd_szoveg}
            </Text>
            <TouchableOpacity
         style={{backgroundColor: "#0d3f8f"}}
        onPress={()=>torles(item.erd_id)}
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
