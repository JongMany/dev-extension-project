import {languageMapper} from "@/constants/languageMapper";

export type ProgrammingLanguageExt =  keyof typeof languageMapper;
export type ProgrammingLanguage = typeof languageMapper[ProgrammingLanguageExt];
export type ProgrammingLanguageProportionVO = {language: ProgrammingLanguage, duration: number};
// export type ProgrammingLanguageProportionVO = {language: ProgrammingLanguageExt, duration: number};
