import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, SafeAreaView, View } from "react-native";
import { LogoWatermark } from "../../../assets/svg/logo-watermark";
import { Card } from "../card";
import { Text } from "../text";
import { styles } from "./styles";

interface ListProps {
  data: any;
}

export const List: React.FC<ListProps> = ({ data }) => {
  const ListItem = ({ item }: any) => (
    <Pressable onPress={() => console.log("pressed")}>
      <Card
        width={368}
        height={66}
        px={20}
        mb={10}
        borderRadius={13}
        style={styles.cardFlexStyles}
      >
        <View>
          <Text variant="subtitle">{item.name}</Text>
          <Text variant="body">{item.muntahaID}</Text>
        </View>
        <AntDesign name="right" size={24} color="black" />
      </Card>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.watermark}>
        <LogoWatermark />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ListItem}
        contentContainerStyle={{ paddingBottom: 500 }}
        //   refreshControl={
        //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        //   }
      />
    </SafeAreaView>
  );
};
