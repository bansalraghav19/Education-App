import React from 'react'; 
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity } 
from 'react-native'; 

function Settings(){
    return (
      <View style={styles.container}>
          <View>
              <TouchableOpacity style={styles.commandButton}>
                  <Text style={styles.panelButtonTitle}>Prenium</Text>
              </TouchableOpacity>
          </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    }, 
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    }
});

export default Settings;