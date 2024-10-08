import { useDuration } from "@/store/duration/useDuration";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { toZonedTime } from "date-fns-tz";
import {useGetFromToDate} from "@hooks/shared/useIntervalDate";


import {useFetch} from "@hooks/shared/useFetch";
import {UserProgrammingInfoResponseDTO} from "@/models/programming-info/dto/response/programData.entity";

export default function useFetchProgrammingTime() {
  const { duration } = useDuration();
  const { from, to } = useGetFromToDate();
  const { data: session } = useSession();
  const { fetch } = useFetch();
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // "Asia/Seoul"

  const fetchDate = async () => {
    const email = session?.user.email;
    if (!email) return;
    const response = await fetch(
      `api/v1/time/overall/${email}/from/${from}/to/${to}`
    );

    const data = (await response.json()) as { data: UserProgrammingInfoResponseDTO[] };

    const convertedData = data.data.map((d) => {

      console.log("zonedTime", d)
      const zonedTime = toZonedTime(
        new Date(d.programmingTime).toISOString(),
        localTimeZone
      );
      console.log("zonedTime", zonedTime)

      return {
        ...d,
        programDuration: d.programDuration / 1000,
        programmingTime: format(zonedTime, "yyyy-MM-dd HH:mm:ss"),
      };

    });

    console.log('convertedData', convertedData);
    return convertedData;
  };

  return useQuery({
    queryKey: ["programmingTime", duration],
    queryFn: fetchDate,
    staleTime: 1000 * 60 * 10, // 10분
  });
}
