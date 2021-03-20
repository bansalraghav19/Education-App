import * as React from "react";
import { List } from "react-native-paper";

const MyComponent = ({ navigation }) => {
  const [expanded, setExpanded] = React.useState(0);

  const handlePress = (id) => setExpanded(id);
  const listData = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <List.Section title="Accordions">
      {listData.map((data, i) => (
        <List.Accordion
          title="Controlled Accordion"
          left={(props) => <List.Icon {...props} icon="star" />}
          expanded={expanded == data?.id}
          onPress={() => handlePress(data?.id)}
          key={i + "list"}
        >
          <List.Item
            title="First item"
            onPress={() => navigation.push("Video",{id:data?.id})}
          />
          <List.Item title="Second item" />
        </List.Accordion>
      ))}
    </List.Section>
  );
};

export default MyComponent;
