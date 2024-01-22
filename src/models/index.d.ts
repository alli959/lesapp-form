import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum PrefVoice {
  DORA = "DORA",
  KARL = "KARL"
}

export enum Schools {
  SCHOOL1 = "School1",
  SCHOOL2 = "School2",
  SCHOOL3 = "School3",
  SCHOOL4 = "School4",
  SCHOOL5 = "School5",
  SCHOOL6 = "School6",
  SCHOOL7 = "School7",
  SCHOOL8 = "School8",
  SCHOOL9 = "School9",
  SCHOOL10 = "School10",
  SCHOOL11 = "School11",
  SCHOOL12 = "School12",
  SCHOOL13 = "School13",
  SCHOOL14 = "School14",
  SCHOOL15 = "School15",
  SCHOOL16 = "School16",
  SCHOOL17 = "School17",
  SCHOOL18 = "School18",
  SCHOOL19 = "School19",
  SCHOOL20 = "School20",
  SCHOOL21 = "School21",
  SCHOOL22 = "School22",
  SCHOOL23 = "School23",
  SCHOOL24 = "School24",
  SCHOOL25 = "School25",
  SCHOOL26 = "School26",
  SCHOOL27 = "School27",
  SCHOOL28 = "School28",
  SCHOOL29 = "School29",
  SCHOOL30 = "School30",
  SCHOOL31 = "School31",
  SCHOOL32 = "School32",
  SCHOOL33 = "School33",
  SCHOOL34 = "School34",
  SCHOOL35 = "School35",
  SCHOOL36 = "School36",
  SCHOOL37 = "School37",
  SCHOOL38 = "School38",
  SCHOOL39 = "School39",
  SCHOOL40 = "School40",
  SCHOOL41 = "School41",
  SCHOOL42 = "School42",
  SCHOOL43 = "School43",
  SCHOOL44 = "School44",
  SCHOOL45 = "School45",
  SCHOOL46 = "School46",
  SCHOOL47 = "School47",
  SCHOOL48 = "School48",
  SCHOOL49 = "School49",
  SCHOOL50 = "School50",
  SCHOOL51 = "School51",
  SCHOOL52 = "School52",
  SCHOOL53 = "School53",
  SCHOOL54 = "School54",
  SCHOOL55 = "School55",
  SCHOOL56 = "School56",
  SCHOOL57 = "School57",
  SCHOOL58 = "School58",
  SCHOOL59 = "School59",
  SCHOOL60 = "School60",
  SCHOOL61 = "School61",
  SCHOOL62 = "School62",
  SCHOOL63 = "School63",
  SCHOOL64 = "School64",
  SCHOOL65 = "School65",
  SCHOOL66 = "School66",
  SCHOOL67 = "School67",
  SCHOOL68 = "School68",
  SCHOOL69 = "School69",
  SCHOOL70 = "School70",
  SCHOOL71 = "School71",
  SCHOOL72 = "School72",
  SCHOOL73 = "School73",
  SCHOOL74 = "School74",
  SCHOOL75 = "School75",
  SCHOOL76 = "School76",
  SCHOOL77 = "School77",
  SCHOOL78 = "School78",
  SCHOOL79 = "School79",
  SCHOOL80 = "School80",
  SCHOOL81 = "School81",
  SCHOOL82 = "School82",
  SCHOOL83 = "School83",
  SCHOOL84 = "School84",
  SCHOOL85 = "School85",
  SCHOOL86 = "School86",
  SCHOOL87 = "School87",
  SCHOOL88 = "School88",
  SCHOOL89 = "School89",
  SCHOOL90 = "School90",
  SCHOOL91 = "School91",
  SCHOOL92 = "School92",
  SCHOOL93 = "School93",
  SCHOOL94 = "School94",
  SCHOOL95 = "School95",
  SCHOOL96 = "School96",
  SCHOOL97 = "School97",
  SCHOOL98 = "School98",
  SCHOOL99 = "School99",
  SCHOOL100 = "School100",
  SCHOOL101 = "School101",
  SCHOOL102 = "School102",
  SCHOOL103 = "School103",
  SCHOOL104 = "School104",
  SCHOOL105 = "School105",
  SCHOOL106 = "School106",
  SCHOOL107 = "School107",
  SCHOOL108 = "School108",
  SCHOOL109 = "School109",
  SCHOOL110 = "School110",
  SCHOOL111 = "School111",
  SCHOOL112 = "School112",
  SCHOOL113 = "School113",
  SCHOOL114 = "School114",
  SCHOOL115 = "School115",
  SCHOOL116 = "School116",
  SCHOOL117 = "School117",
  SCHOOL118 = "School118",
  SCHOOL119 = "School119",
  SCHOOL120 = "School120",
  SCHOOL121 = "School121",
  SCHOOL122 = "School122",
  SCHOOL123 = "School123",
  SCHOOL124 = "School124",
  SCHOOL125 = "School125",
  SCHOOL126 = "School126",
  SCHOOL127 = "School127",
  SCHOOL128 = "School128",
  SCHOOL129 = "School129",
  SCHOOL130 = "School130",
  SCHOOL131 = "School131",
  SCHOOL132 = "School132",
  SCHOOL133 = "School133",
  SCHOOL134 = "School134",
  SCHOOL135 = "School135",
  SCHOOL136 = "School136",
  SCHOOL137 = "School137",
  SCHOOL138 = "School138",
  SCHOOL139 = "School139",
  SCHOOL140 = "School140",
  SCHOOL141 = "School141",
  SCHOOL142 = "School142",
  SCHOOL143 = "School143",
  SCHOOL144 = "School144",
  SCHOOL145 = "School145",
  SCHOOL146 = "School146",
  SCHOOL147 = "School147",
  SCHOOL148 = "School148",
  SCHOOL149 = "School149",
  SCHOOL150 = "School150",
  SCHOOL151 = "School151",
  SCHOOL152 = "School152",
  SCHOOL153 = "School153",
  SCHOOL154 = "School154",
  SCHOOL155 = "School155",
  SCHOOL156 = "School156",
  SCHOOL157 = "School157",
  SCHOOL158 = "School158",
  SCHOOL159 = "School159",
  SCHOOL160 = "School160",
  SCHOOL161 = "School161",
  SCHOOL162 = "School162",
  SCHOOL163 = "School163",
  SCHOOL164 = "School164",
  SCHOOL165 = "School165",
  SCHOOL166 = "School166",
  SCHOOL167 = "School167",
  SCHOOL168 = "School168",
  SCHOOL169 = "School169",
  SCHOOL170 = "School170",
  SCHOOL171 = "School171",
  SCHOOL172 = "School172",
  SCHOOL173 = "School173",
  SCHOOL174 = "School174",
  SCHOOL175 = "School175",
  SCHOOL176 = "School176",
  SCHOOL177 = "School177",
  SCHOOL178 = "School178",
  SCHOOL179 = "School179",
  SCHOOL180 = "School180",
  SCHOOL181 = "School181",
  SCHOOL182 = "School182",
  SCHOOL183 = "School183",
  SCHOOL184 = "School184",
  SCHOOL185 = "School185",
  SCHOOL186 = "School186",
  SCHOOL187 = "School187",
  SCHOOL188 = "School188",
  SCHOOL189 = "School189",
  SCHOOL190 = "School190",
  SCHOOL191 = "School191",
  SCHOOL192 = "School192",
  SCHOOL193 = "School193",
  SCHOOL194 = "School194",
  SCHOOL195 = "School195",
  SCHOOL196 = "School196",
  SCHOOL197 = "School197",
  SCHOOL198 = "School198",
  SCHOOL199 = "School199",
  SCHOOL200 = "School200",
  SCHOOL201 = "School201",
  SCHOOL202 = "School202",
  SCHOOL203 = "School203",
  SCHOOL204 = "School204",
  SCHOOL205 = "School205",
  SCHOOL206 = "School206",
  SCHOOL207 = "School207",
  SCHOOL208 = "School208",
  SCHOOL209 = "School209",
  SCHOOL210 = "School210",
  SCHOOL211 = "School211",
  SCHOOL212 = "School212",
  SCHOOL213 = "School213",
  SCHOOL214 = "School214",
  SCHOOL215 = "School215",
  SCHOOL216 = "School216",
  SCHOOL217 = "School217",
  SCHOOL218 = "School218",
  SCHOOL219 = "School219",
  SCHOOL220 = "School220",
  SCHOOL221 = "School221",
  SCHOOL222 = "School222",
  SCHOOL223 = "School223",
  SCHOOL224 = "School224",
  SCHOOL225 = "School225",
  SCHOOL226 = "School226",
  SCHOOL227 = "School227",
  SCHOOL228 = "School228",
  SCHOOL229 = "School229",
  SCHOOL230 = "School230",
  SCHOOL231 = "School231",
  SCHOOL232 = "School232",
  SCHOOL233 = "School233",
  SCHOOL234 = "School234",
  SCHOOL235 = "School235",
  SCHOOL236 = "School236",
  SCHOOL237 = "School237",
  SCHOOL238 = "School238",
  SCHOOL239 = "School239",
  SCHOOL240 = "School240",
  SCHOOL241 = "School241",
  SCHOOL242 = "School242",
  SCHOOL243 = "School243",
  SCHOOL244 = "School244",
  SCHOOL245 = "School245",
  SCHOOL246 = "School246",
  SCHOOL247 = "School247",
  SCHOOL248 = "School248",
  SCHOOL249 = "School249",
  SCHOOL250 = "School250",
  SCHOOL251 = "School251",
  SCHOOL252 = "School252",
  SCHOOL253 = "School253"
}

type UserScoreMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserDataMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerUserScore = {
  readonly id: string;
  readonly userdataID: string;
  readonly lvlOneCapsScore?: number | null;
  readonly lvlOneScore?: number | null;
  readonly lvlOneVoiceScore?: number | null;
  readonly lvlThreeMediumScore?: number | null;
  readonly lvlThreeVoiceScore?: number | null;
  readonly lvlThreeVoiceMediumScore?: number | null;
  readonly lvlTwoEasyScore?: number | null;
  readonly lvlTwoMediumScore?: number | null;
  readonly lvlThreeEasyScore?: number | null;
  readonly lvlTwoVoiceScore?: number | null;
  readonly lvlTwoVoiceMediumScore?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserScore = {
  readonly id: string;
  readonly userdataID: string;
  readonly lvlOneCapsScore?: number | null;
  readonly lvlOneScore?: number | null;
  readonly lvlOneVoiceScore?: number | null;
  readonly lvlThreeMediumScore?: number | null;
  readonly lvlThreeVoiceScore?: number | null;
  readonly lvlThreeVoiceMediumScore?: number | null;
  readonly lvlTwoEasyScore?: number | null;
  readonly lvlTwoMediumScore?: number | null;
  readonly lvlThreeEasyScore?: number | null;
  readonly lvlTwoVoiceScore?: number | null;
  readonly lvlTwoVoiceMediumScore?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserScore = LazyLoading extends LazyLoadingDisabled ? EagerUserScore : LazyUserScore

export declare const UserScore: (new (init: ModelInit<UserScore, UserScoreMetaData>) => UserScore) & {
  copyOf(source: UserScore, mutator: (draft: MutableModel<UserScore, UserScoreMetaData>) => MutableModel<UserScore, UserScoreMetaData> | void): UserScore;
}

type EagerUserData = {
  readonly id: string;
  readonly school?: Schools | keyof typeof Schools | null;
  readonly classname?: string | null;
  readonly agreement?: boolean | null;
  readonly readingStage?: string | null;
  readonly prefVoice?: PrefVoice | keyof typeof PrefVoice | null;
  readonly saveRecord?: boolean | null;
  readonly manualFix?: boolean | null;
  readonly name: string;
  readonly age?: string | null;
  readonly UserScores?: (UserScore | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserData = {
  readonly id: string;
  readonly school?: Schools | keyof typeof Schools | null;
  readonly classname?: string | null;
  readonly agreement?: boolean | null;
  readonly readingStage?: string | null;
  readonly prefVoice?: PrefVoice | keyof typeof PrefVoice | null;
  readonly saveRecord?: boolean | null;
  readonly manualFix?: boolean | null;
  readonly name: string;
  readonly age?: string | null;
  readonly UserScores: AsyncCollection<UserScore>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserData = LazyLoading extends LazyLoadingDisabled ? EagerUserData : LazyUserData

export declare const UserData: (new (init: ModelInit<UserData, UserDataMetaData>) => UserData) & {
  copyOf(source: UserData, mutator: (draft: MutableModel<UserData, UserDataMetaData>) => MutableModel<UserData, UserDataMetaData> | void): UserData;
}