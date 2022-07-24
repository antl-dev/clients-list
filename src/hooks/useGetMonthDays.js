import dayjs from "dayjs";
export const useGetMonthDays = (month) => {
  const temp = new Array(dayjs().month(month).daysInMonth())
    .fill(dayjs().month(month).startOf("month"))
    .map((day, idx) => {
      const temp = day.add(idx, "day");
      return {
        day: temp.format("D"),
        dateFull: temp.format("DD.MM.YYYY"),
        month: temp.format("MM"),
        monthText: temp.format("MMMM"),
        nameShort: temp.format("dd"),
        nameFull: temp.format("dddd"),
        client: [
          { hour: "11", minute: "00" },
          { hour: "14", minute: "30" },
          { hour: "10", minute: "00" },
        ],
      };
    });
  return temp;
};
