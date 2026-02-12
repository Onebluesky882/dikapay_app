import React from "react";
import { Text, View } from "./Primitives";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-slate-700 mb-1.5">{label}</Text>
      <View className="relative">
        {icon && (
          <View className="absolute inset-y-0 left-0 pl-3 justify-center pointer-events-none text-slate-400">
            {icon}
          </View>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 shadow-sm`}
        />
      </View>
    </View>
  );
};

export default InputField;
