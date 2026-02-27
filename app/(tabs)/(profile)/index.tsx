import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../../src/store/auth-store";

export default function user() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <SafeAreaView>
      <View>
        {user ? (
          <View>
            <Text>{user.name}</Text>
            <Button title="logout" onPress={logout} />
          </View>
        ) : (
          <View>
            <Text>profile</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
