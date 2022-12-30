import React, { useCallback, useState } from "react";

//icons
import { AntDesign } from "@expo/vector-icons";
import { LogoWatermark } from "../../../assets/svg/logo-watermark";

//components
import {
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  View,
} from "react-native";
import { Card } from "../card";
import { Text } from "../text";

//styles
import { styles } from "./styles";

//services
import { fetchList } from "../../services/list-service";

//hooks
import { useListStore } from "../../store/list-store";
import { useModalStore } from "../../store/modal-store";

interface ListProps {
  data: any;
  parent: "attendance" | "pending" | "visited" | "beneficiaries" | "order";
}

export const List: React.FC<ListProps> = ({ data, parent }) => {
  const [selectedID, setSelectedID] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const modalStore = useModalStore((state) => state);
  const listStore = useListStore((state) => state);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchList(listStore[parent].setListData, listStore[parent].endpoint);
    setRefreshing(false);
  }, []);

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};
