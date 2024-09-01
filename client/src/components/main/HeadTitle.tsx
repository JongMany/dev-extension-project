import MainText from "@components/main/MainText";
import TypingCarousel from "@components/main/TypingCarousel";


export default function HeadTitle() {
  return (
    <section className="flex flex-col items-center pt-10 pb-20 border-b-2 h-[90vh]">
      <h1 className="py-6 font-bold text-2xl flex justify-center">
        Study Log | 당신의 개발 시간을 관리해드립니다.
      </h1>
      <p className="flex flex-col items-center text-center font-bold text-lg mt-8 mb-6">
        The Extension for Developers. <br />
        Collect and organize your development time.
      </p>
      <div className="flex-1 w-[80%] pb-4">
        <div className="relative h-full flex flex-col items-center">
          {/* <Image
            src={"/assets/image/main_image_0.webp"}
            alt={"소개 이미지"}
            fill
            className="object-fill rounded-xl"
          /> */}
          <div className="h-[300px] w-[400px]">
            <MainText />
          </div>
          <h3 className="font-bold text-[32px] w-[440px]">
            <span className="font-bold text-[32px]">StudyLog is</span>
            <br />
            <span className="font-normal text-[22px]">
              <TypingCarousel
                id="id"
                textArray={[
                  "Time Logger Extension For Developer.",
                  "Helpful For Your Time Management.",
                  "Easy To Use.",
                  "Free And Open Source.",
                ]}
              />
            </span>
          </h3>
        </div>
      </div>
    </section>
  );
}
