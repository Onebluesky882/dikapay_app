import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../../src/store/auth-store";

export default function user() {
  const user = useAuthStore((state) => state.user);

  const login = () => {
    router.push("/sign-in");
  };
  return (
    <SafeAreaView>
      <View>
        {user ? (
          <Text>{user.name}</Text>
        ) : (
          <View>
            <Text>profile</Text>
            <Button title="login" onPress={login} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
