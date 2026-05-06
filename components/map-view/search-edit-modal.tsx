import { useEffect, useState } from "react";
import { Modal, Pressable, View } from "react-native";

import DateInput from "@/components/shared/date-input";
import ModalButton from "@/components/shared/modal-button";
import ModalHeader from "@/components/shared/modal-header";
import TimeInput from "@/components/shared/time-input";
import { useAppTheme } from "@/hooks/use-app-theme";

interface Props {
  visible: boolean;
  initialDate: string;
  initialTime: string;
  minDate?: string;
  minTime?: string;
  onApply: (next: { date: string; time: string }) => void;
  onCancel: () => void;
}

function clampDateTime(
  date: string,
  time: string,
  minDate?: string,
  minTime?: string,
): { date: string; time: string } {
  let nextDate = date;
  let nextTime = time;
  if (minDate && nextDate < minDate) {
    nextDate = minDate;
  }
  if (minTime && minDate && nextDate === minDate && nextTime < minTime) {
    nextTime = minTime;
  }
  return { date: nextDate, time: nextTime };
}

export default function SearchEditModal({
  visible,
  initialDate,
  initialTime,
  minDate,
  minTime,
  onApply,
  onCancel,
}: Props) {
  const { colors } = useAppTheme();
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (visible) {
      const clamped = clampDateTime(initialDate, initialTime, minDate, minTime);
      setDate(clamped.date);
      setTime(clamped.time);
    }
  }, [visible, initialDate, initialTime, minDate, minTime]);

  const effectiveTimeMin =
    minDate && minTime && date === minDate ? minTime : undefined;

  const handleDateChange = (next: string) => {
    const clamped = clampDateTime(next, time, minDate, minTime);
    setDate(clamped.date);
    setTime(clamped.time);
  };

  const handleTimeChange = (next: string) => {
    const clamped = clampDateTime(date, next, minDate, minTime);
    setDate(clamped.date);
    setTime(clamped.time);
  };

  const handleApply = () => {
    const clamped = clampDateTime(date, time, minDate, minTime);
    onApply(clamped);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable
        onPress={onCancel}
        className="flex-1 items-center justify-center px-6"
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      >
        <Pressable
          onPress={() => undefined}
          className="w-full rounded-3xl p-5"
          style={{
            backgroundColor: colors.backgroundSecondary,
            borderWidth: 1,
            borderColor: colors.border,
            maxWidth: 420,
          }}
        >
          <ModalHeader title="Edit departure" />

          <DateInput value={date} onChange={handleDateChange} min={minDate} />
          <TimeInput
            value={time}
            onChange={handleTimeChange}
            min={effectiveTimeMin}
          />

          <View className="flex-row gap-3 mt-2">
            <ModalButton
              label="Cancel"
              variant="secondary"
              onPress={onCancel}
            />
            <ModalButton
              label="Apply"
              variant="primary"
              onPress={handleApply}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
