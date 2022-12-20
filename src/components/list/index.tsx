import { AntDesign } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FlatList, Pressable, SafeAreaView, View } from "react-native";
import { LogoWatermark } from "../../../assets/svg/logo-watermark";
import { useModalStore } from "../../store/modal-store";
import { Card } from "../card";
import { Text } from "../text";
import { styles } from "./styles";

interface ListProps {
  data: any;
  parent: "attendance" | "pending";
}

export const List: React.FC<ListProps> = ({ data, parent }) => {
  const [selectedID, setSelectedID] = useState("");
  const modalStore = useModalStore((state) => state);

  const ListItem = ({ item }: any) => (
    <Pressable
      onPress={() => {
        modalStore[parent].show(item);
        setSelectedID(item.id);
      }}
    >
      <Card
        width={368}
        height={75}
        px={20}
        mb={10}
        borderRadius={13}
        bgColor={selectedID === item.id ? "secondary" : "background"}
        style={styles.cardFlexStyles}
      >
        <View>
          <Text variant="subtitle">{item.name}</Text>
          {item.muntahaID ? (
            <Text variant="body">{item.muntahaID}</Text>
          ) : (
            <>
              <Text variant="body">{item.address}</Text>
              <Text variant="body">{item.phone}</Text>
            </>
          )}
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
