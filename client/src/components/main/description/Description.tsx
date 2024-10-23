

import Image from "next/image";
import DescriptionCard from "@components/main/description/DescriptionCard";
import {AnimatedText} from "@components/shared/animatedText/AnimatedText";
// min-h-96
export default function Description() {
  return (
    <section className="relative flex flex-col items-center gap-[10vh] py-[10vh]">
      <DescriptionCard>
        <article className="flex flex-col items-center justify-between gap-y-4 px-2 py-2 w-full h-full">
          <h1 className="py-10 font-bold text-3xl flex justify-center">
            StudyLog는 다음과 같은 기능이 있어요
          </h1>
          <div className="flex-[1_0_auto] w-[90%] flex flex-col items-center justify-center gap-y-12">
            <AnimatedText
              className="text-[24px] font-semibold"
              text={
                "1. VSCode에서 여러분들의 프로그래밍 기록을 가져올 수 있어요"
              }
              // once={true}
            />
            <AnimatedText
              className="text-[24px] font-semibold"
              text={
                "2. 저장된 프로그래밍 기록을 통해 데이터를 시각화해줄 수 있어요"
              }
              // once={true}
            />
            <AnimatedText
              className="text-[24px] font-semibold"
              text={"3. 목표를 티켓으로 관리할 수 있도록 도와줘요"}
              // once={true}
            />
          </div>
        </article>
      </DescriptionCard>
      <DescriptionCard>
        <article className="flex flex-col items-center justify-between gap-y-4 px-2 py-2 w-full h-full">
          <h2 className="font-bold text-2xl py-4">
            1. 시간을 기록하여 시각적인 대시보드를 제작해줍니다.
          </h2>
          <div className="flex-[1_0_auto] w-[90%]">
            <div className="relative h-full pb-4">
              <Image
                src={"/assets/image/main_image_1.png"}
                alt={"랭킹사진"}
                fill
                className="object-fill rounded-xl"
              />
            </div>
          </div>
        </article>
      </DescriptionCard>
      <DescriptionCard>
        <article className="flex flex-col items-center justify-between gap-y-4 px-2 py-2 w-full h-full">
          <h2 className="font-bold text-2xl py-4">
            2. 목표를 기록하고, 달성하는 것을 눈으로 측정할 수 있습니다.
          </h2>
          <div className="flex-[1_0_auto] w-[90%]">
            <div className="relative h-full pb-4">
              <Image
                src={"/assets/image/main_image_2.png"}
                alt={"랭킹사진"}
                fill
                className="object-fill rounded-xl"
              />
            </div>
          </div>
        </article>
      </DescriptionCard>
      <DescriptionCard>
        <article className="flex flex-col items-center justify-between gap-y-4 px-2 py-2 w-full h-full">
          <h2 className="font-bold text-2xl py-4">
            3. 랭킹을 통해 성취감을 고취시킬 수 있습니다.
          </h2>
          <div className="flex-[1_0_auto] w-[90%]">
            <div className="relative h-full pb-4">
              <Image
                src={"/assets/image/main_image_3.png"}
                alt={"랭킹사진"}
                fill
                className="object-fill rounded-xl"
              />
            </div>
          </div>
        </article>
      </DescriptionCard>
      <DescriptionCard>
        <article className="flex flex-col items-center justify-between gap-y-4 px-2 py-2 w-full h-full">
          <h2 className="font-bold text-2xl py-4">
            어서 StudyLog 에 가입하고, 개발 시간을 기록해보세요!
          </h2>
          <div className="flex-[1_0_auto] w-[90%]">
            <div className="relative h-full pb-4">
              <Image
                src={"/assets/image/main_image_4.png"}
                alt={"랭킹사진"}
                fill
                className="object-fill rounded-xl"
              />
            </div>
          </div>
        </article>
      </DescriptionCard>
    </section>
  );
}
