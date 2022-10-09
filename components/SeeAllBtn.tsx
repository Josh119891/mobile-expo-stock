import { StyleSheet, Text, View, Pressable, PressableProps } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function SeeAllBtn(props: PressableProps) {
  return (
    <Pressable
      {...props}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text style={{ color: 'blue' }}>See all</Text>
      <AntDesign name="arrowright" size={24} color="blue" />
    </Pressable>
  );
}

const styles = StyleSheet.create({});
