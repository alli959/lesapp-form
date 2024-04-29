// app/src/models/schema.js

export const schema = {
    "models": {
        "UserScore": {
            "name": "UserScore",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "userdataID": {
                    "name": "userdataID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "lvlOneCapsScore": {
                    "name": "lvlOneCapsScore",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "lvlOneScore": {
                    "name": "lvlOneScore",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "lvlOneVoiceScore": {
                    "name": "lvlOneVoiceScore",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "lvlThreeMediumScore": {
                    "name": "lvlThreeMediumScore",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "lvlThreeVoiceScore": {
                    "name": "lvlThreeVoiceScore",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "lvlThreeVoiceMediumScore": {
                    "name": "lvlThreeVoiceMediumScore",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "lvlTwoEasyScore": {
                    "name": "lvlTwoEasyScore",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "lvlTwoMediumScore": {
                    "name": "lvlTwoMediumScore",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "lvlThreeEasyScore": {
                    "name": "lvlThreeEasyScore",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "lvlTwoVoiceScore": {
                    "name": "lvlTwoVoiceScore",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "lvlTwoVoiceMediumScore": {
                    "name": "lvlTwoVoiceMediumScore",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "UserScores",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byUserData",
                        "fields": [
                            "userdataID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "UserData": {
            "name": "UserData",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "school": {
                    "name": "school",
                    "isArray": false,
                    "type": {
                        "enum": "Schools"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "classname": {
                    "name": "classname",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "agreement": {
                    "name": "agreement",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "readingStage": {
                    "name": "readingStage",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "prefVoice": {
                    "name": "prefVoice",
                    "isArray": false,
                    "type": {
                        "enum": "PrefVoice"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "saveRecord": {
                    "name": "saveRecord",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "manualFix": {
                    "name": "manualFix",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "age": {
                    "name": "age",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "UserScores": {
                    "name": "UserScores",
                    "isArray": true,
                    "type": {
                        "model": "UserScore"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "userdataID"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "UserData",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "operations": [
                                    "create",
                                    "delete",
                                    "update",
                                    "read"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "PrefVoice": {
            "name": "PrefVoice",
            "values": [
                "DORA",
                "KARL"
            ]
        },
        "Schools": {
            "name": "Schools",
            "values": [
                "School1",
                "School2",
                "School3",
                "School4",
                "School5",
                "School6",
                "School7",
                "School8",
                "School9",
                "School10",
                "School11",
                "School12",
                "School13",
                "School14",
                "School15",
                "School16",
                "School17",
                "School18",
                "School19",
                "School20",
                "School21",
                "School22",
                "School23",
                "School24",
                "School25",
                "School26",
                "School27",
                "School28",
                "School29",
                "School30",
                "School31",
                "School32",
                "School33",
                "School34",
                "School35",
                "School36",
                "School37",
                "School38",
                "School39",
                "School40",
                "School41",
                "School42",
                "School43",
                "School44",
                "School45",
                "School46",
                "School47",
                "School48",
                "School49",
                "School50",
                "School51",
                "School52",
                "School53",
                "School54",
                "School55",
                "School56",
                "School57",
                "School58",
                "School59",
                "School60",
                "School61",
                "School62",
                "School63",
                "School64",
                "School65",
                "School66",
                "School67",
                "School68",
                "School69",
                "School70",
                "School71",
                "School72",
                "School73",
                "School74",
                "School75",
                "School76",
                "School77",
                "School78",
                "School79",
                "School80",
                "School81",
                "School82",
                "School83",
                "School84",
                "School85",
                "School86",
                "School87",
                "School88",
                "School89",
                "School90",
                "School91",
                "School92",
                "School93",
                "School94",
                "School95",
                "School96",
                "School97",
                "School98",
                "School99",
                "School100",
                "School101",
                "School102",
                "School103",
                "School104",
                "School105",
                "School106",
                "School107",
                "School108",
                "School109",
                "School110",
                "School111",
                "School112",
                "School113",
                "School114",
                "School115",
                "School116",
                "School117",
                "School118",
                "School119",
                "School120",
                "School121",
                "School122",
                "School123",
                "School124",
                "School125",
                "School126",
                "School127",
                "School128",
                "School129",
                "School130",
                "School131",
                "School132",
                "School133",
                "School134",
                "School135",
                "School136",
                "School137",
                "School138",
                "School139",
                "School140",
                "School141",
                "School142",
                "School143",
                "School144",
                "School145",
                "School146",
                "School147",
                "School148",
                "School149",
                "School150",
                "School151",
                "School152",
                "School153",
                "School154",
                "School155",
                "School156",
                "School157",
                "School158",
                "School159",
                "School160",
                "School161",
                "School162",
                "School163",
                "School164",
                "School165",
                "School166",
                "School167",
                "School168",
                "School169",
                "School170",
                "School171",
                "School172",
                "School173",
                "School174",
                "School175",
                "School176",
                "School177",
                "School178",
                "School179",
                "School180",
                "School181",
                "School182",
                "School183",
                "School184",
                "School185",
                "School186",
                "School187",
                "School188",
                "School189",
                "School190",
                "School191",
                "School192",
                "School193",
                "School194",
                "School195",
                "School196",
                "School197",
                "School198",
                "School199",
                "School200",
                "School201",
                "School202",
                "School203",
                "School204",
                "School205",
                "School206",
                "School207",
                "School208",
                "School209",
                "School210",
                "School211",
                "School212",
                "School213",
                "School214",
                "School215",
                "School216",
                "School217",
                "School218",
                "School219",
                "School220",
                "School221",
                "School222",
                "School223",
                "School224",
                "School225",
                "School226",
                "School227",
                "School228",
                "School229",
                "School230",
                "School231",
                "School232",
                "School233",
                "School234",
                "School235",
                "School236",
                "School237",
                "School238",
                "School239",
                "School240",
                "School241",
                "School242",
                "School243",
                "School244",
                "School245",
                "School246",
                "School247",
                "School248",
                "School249",
                "School250",
                "School251",
                "School252",
                "School253"
            ]
        }
    },
    "nonModels": {},
    "codegenVersion": "3.4.4",
    "version": "48e6febdfa10363644dde40501affccc"
};
