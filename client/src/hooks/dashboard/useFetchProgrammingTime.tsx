import { useDuration } from "@/store/useDuration";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { toZonedTime } from "date-fns-tz";
import {useGetFromToDate} from "@hooks/shared/useIntervalDate";
import {useFetch} from "@utils/shared/fetch/extendedFetch";
import {IProgramData} from "@/models/programming-info/entity/programData.entity";

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

    const data = (await response.json()) as { data: IProgramData[] };
    const convertedData = data.data.map((d) => {
      const zonedTime = toZonedTime(
        new Date(d.programmingTime).toISOString(),
        localTimeZone
      );

      return {
        ...d,
        programDuration: d.programDuration / 1000,
        programmingTime: format(zonedTime, "yyyy-MM-dd HH:mm:ss"),
      };
    });
    return convertedData;
  };

  return useQuery({
    queryKey: ["programmingTime", duration],
    queryFn: fetchDate,
    staleTime: 1000 * 60 * 10, // 10분
  });
}
