import { Select } from "../ui/Select";
import { Input } from "../ui/Input";
import { useEffect, useState } from "react";
import { parsePhoneNumber, buildPhoneNumber } from "../../utils/phone.helper";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { COUNTRY_CODES } from "../../constants/phone";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;

  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
}

export default function PhoneInput({
  value,
  onChange,
  name,
  onBlur,
  disabled,
  placeholder,
}: PhoneInputProps) {
  const { countryCode, localNumber } = parsePhoneNumber(value);

  function handleCountryChange(code: string) {
    onChange(buildPhoneNumber({ countryCode: code, localNumber: localNumber }));
  }

  function handlePhoneNumberChange(phoneNumber: string) {
    phoneNumber = phoneNumber.replace(/\D/g, "");
    onChange(
      buildPhoneNumber({ countryCode: countryCode, localNumber: phoneNumber }),
    );
  }

  return (
    <div className="flex gap-2">
      <Select
        value={countryCode}
        onValueChange={(code) => handleCountryChange(code)}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Country Codes" />
        </SelectTrigger>
        <SelectContent>
          {COUNTRY_CODES.map((country) => (
            <SelectItem value={country.code} key={country.code}>
              {country.flag} ({country.code})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        value={localNumber}
        onChange={(e) => handlePhoneNumberChange(e.target.value)}
        className="flex-1"
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
