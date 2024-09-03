"use client";


import {useDuration} from "@/store/duration/useDuration";
import {useQueryClient} from "@tanstack/react-query";
import PieChartContainer from "@components/shared/charts/PieChartContainer";
import {UserProgrammingInfoResponseDTO} from "@/models/programming-info/dto/response/programData.entity";
import {convertProgramDataToLanguageProportion} from "@/models/programming-info/formatModel";


export default function ProgrammingLanguageProportionChart() {
  const queryClient = useQueryClient();
  const {duration} = useDuration();
  const programData =
      queryClient.getQueryData<UserProgrammingInfoResponseDTO[]>(["programmingTime", duration]) ||
      [];

  const programmingLanguageProportionVOs = convertProgramDataToLanguageProportion(programData);

  return <PieChartContainer data={programmingLanguageProportionVOs}/>;
}

