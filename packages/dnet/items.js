let items = exports;

items.recipes = [
    {
        id: 0, name: "Didelis pirmosios pagalbos rinkinys", desc: `Šis pirmosios pagalbos rinkinys atkuria iki 100 % sveikatos.~br~Medžiagos gamybai: tvarsčiai 2 vnt., maža pirmosios pagalbos vaistinėlė`,
        craft: ['215', '216', '216'], craft_time: 5000
    },
    {
        id: 1, name: "Mažas pirmosios pagalbos rinkinys", desc: `Šis pirmosios pagalbos rinkinys atkuria iki 60 % jūsų sveikatos.~br~Medžiagos gamybai: tvarsčiai 3 vnt.`,
        craft: ['216', '216', '216'], craft_time: 5000
    },
    {
        id: 2, name: "Tvarsčiai (2 vnt.)", desc: `Medžiagos gamybai: audinys`,
        craft: ['475'], craft_time: 5000
    },
    {
        id: 3, name: "Patobulinta meškerė", desc: `Gebėjimas gaudyti retas žuvis.~br~Pagaminimo ištekliai: Tvirtas lynas, Patobulintas kabliukas, Lazda`,
        craft: ['478', '479', '251'], craft_time: 5000
    },
    {
        id: 4, name: "Laužas", desc: `Medžiagos gamybai: malkos, žiebtuvėlis`,
        craft: ['482', '484'], craft_time: 5000
    },
    {
        id: 5, name: "Neperšaunama liemenė", desc: `Gamybos ištekliai: audinys 2 vnt., plieno plokštė`,
        craft: ['475', '475', '476'], craft_time: 5000
    },
    {
        id: 6, name: "Kamufliažinė neperšaunama liemenė", desc: `Gamybos priemonės: audinys (2 vnt.), plieninė plokštė, purškiamų dažų skardinė`,
        craft: ['475', '475', '476', '477'], craft_time: 5000
    },
    {
        id: 7, name: "Žalia kamufliažinė neperšaunama liemenė", desc: `Gamybos priemonės: audinys (2 vnt), plieninė plokštė, purškiamų dažų skardinė`,
        craft: ['475', '475', '476', '477'], craft_time: 5000
    },
    {
        id: 8, name: "Žalia neperšaunama liemenė", desc: `Gamybos priemonės: audinys (2 vnt.), plieninė plokštė, purškiamų dažų skardinė`,
        craft: ['475', '475', '476', '477'], craft_time: 5000
    },
    {
        id: 9, name: "Orandžinė neperšaunama liemenė", desc: `Gamybos priemonės: audinys (2 vnt.), plieninė plokštė, purškiamų dažų skardinė`,
        craft: ['475', '475', '476', '477'], craft_time: 5000
    },
    {
        id: 10, name: "Violetinė neperšaunama liemenė", desc: `Gamybos priemonės: audinys (2 vnt.), plieninė plokštė, purškiamų dažų skardinė`,
        craft: ['475', '475', '476', '477'], craft_time: 5000
    },
    {
        id: 11, name: "Rožinė neperšaunama liemenė", desc: `Gamybos priemonės: audinys (2 vnt.), plieninė plokštė, purškiamų dažų skardinė`,
        craft: ['475', '475', '476', '477'], craft_time: 5000
    },
    {
        id: 12, name: "Raudona neperšaunama liemenė", desc: `Gamybos priemonės: audinys (2 vnt.), plieninė plokštė, purškiamų dažų skardinė`,
        craft: ['475', '475', '476', '477'], craft_time: 5000
    },
    {
        id: 13, name: "Mėlyna neperšaunama liemenė", desc: `Gamybos priemonės: audinys (2 vnt.), plieninė plokštė, purškiamų dažų skardinė`,
        craft: ['475', '475', '476', '477'], craft_time: 5000
    },
    {
        id: 14, name: "Pilka neperšaunama liemenė", desc: `Gamybos priemonės: audinys (2 vnt.), plieninė plokštė, purškiamų dažų skardinė`,
        craft: ['475', '475', '476', '477'], craft_time: 5000
    },
    {
        id: 15, name: "Ruda neperšaunama liemenė", desc: `Gamybos priemonės: audinys (2 vnt.), plieninė plokštė, purškiamų dažų skardinė`,
        craft: ['475', '475', '476', '477'], craft_time: 5000
    },
    {
        id: 16, name: "Balta neperšaunama liemenė", desc: `Gamybos priemonės: audinys (2 vnt.), plieninė plokštė, purškiamų dažų skardinė`,
        craft: ['475', '475', '476', '477'], craft_time: 5000
    },
    {
        id: 17, name: "Juoda neperšaunama liemenė", desc: `Gamybos priemonės: audinys (2 vnt.), plieninė plokštė, purškiamų dažų skardinė`,
        craft: ['475', '475', '476', '477'], craft_time: 5000
    },
    {
        id: 18, name: "Raging Bull Mk II", desc: `Kūrimo ištekliai: Raging Bull 2 vnt., plieninė plokštė 4 vnt. su dažais`,
        craft: ['476', '476', '476', '476', '74', '74'], craft_time: 10000
    },
    {
        id: 19, name: "Raging Bull Mk I", desc: `Gamybos ištekliai: plieninė plokštė 6 vnt.`,
        craft: ['476', '476', '476', '476', '476', '476'], craft_time: 10000
    },
];

items.itemList = [
    /*Имя, хеш объекта, может экипировать, вес, объем (ширина * на длинну * на высоту), цены */
    ['Pritraukėjas', '', 0, -1145063624, 50, 100, 25], //0
    ['Maišas', '', 0, -1194335261, 100, 2400, 50], //1

    ['Kokainas', '', 0, 1808635348, 1, 1, 111111], //2
    ['Marihuana', '', 0, 671777952, 1, 5, 111111], //3

    ['Lockpick', '', 0, -1803909274, 50, 6, 100], //4
    ['Specialus  lockpick', '', 0, -1803909274, 50, 6, 100], //5
    ['Įrankių rinkinys', '', 0, 648185618, 4500, 12800, 250], //6

    ['Elektroniniai laikrodžiai "IFruit"', '', 0, 1169295068, 190, 110, 620], //7

    ['Kanistra (Aviacinis kuras)', 'weapon_petrolcan', 0, 1069395324, 10000, 11300, 30], //8
    ['Kanistra (Benzinas)', 'weapon_petrolcan', 0, 1069395324, 10000, 11300, 15], //9
    ['Kanistras (Dyzelinas)', 'weapon_petrolcan', 0, 1069395324, 10000, 11300, 11], //10

    ["Phat Chips sūrio skonio", "", 0, 1108364521, 225, 600, 20], //11
    ["Pomidorų sriubos indelis No. 1", "", 0, 910205311, 300, 400, 40], //12
    ["Šokoladukas Zebra", "", 0, -1803909274, 50, 100, 10], //13
    ["Guma su mėta Release", "", 0, -1803909274, 20, 70, 5], //14
    ["Makaronai Noodles su vištiena", "", 0, 910205311, 150, 450, 20], //15
    ["Makaronai Noodles su jūros gėrybėmis", "", 0, 910205311, 150, 450, 20], //16
    ["Spurga Rusty Brown`s ", "", 0, -1803909274, 60, 100, 15], //17
    ["Saldainiai Sweet Nothings", "", 0, -1803909274, 25, 70, 18], //18
    ["Jogurtas Biotic Life", "", 0, 936464539, 200, 300, 8], //19
    ["Dėžutė dribsnių Rails", "", 0, 910205311, 500, 2000, 30], //20
    ["Pastilė P`s & Q`s", "", 0, -1803909274, 50, 100, 5], //21
    ["Obuolys", "", 0, 910205311, 200, 350, 10], //22
    ["Apelsinas", "", 0, 910205311, 150, 300, 10], //23
    ["Kriaušė", "", 0, 910205311, 180, 320, 10], //24
    ["Bananas", "", 0, 1108364521, 250, 500, 10], //25
    ["Cigarečių pakelis RedWood", "", 0, -593364948, 40, 200, 20], //26

    ['Telefonas IFruit', '', 0, -1038739674, 120, 156, 2600], //27
    ['Telefonas Facade', '', 0, 1907022252, 120, 156, 550], //28
    ['Telefonas IPhone', '', 0, -1038739674, 120, 156, 1200], //29
    ['Telefonas BitterSweet', '', 0, -2017357667, 120, 156, 1200], //30

    ['Adrenalinas', '', 0, -1282296755, 50, 6, 350], //31
    ['Maisto davinys', '', 0, 9168982, 2000, 5800, 270], //32
    ['Anglis', '', 0, -756465278, 40, 6, 100], //33
    ['Sirupas', '', 0, -756465278, 75, 3, 120], //34
    ['Vazokonstriktoriaus tabletė', '', 0, -756465278, 30, 6, 200], //35
    ['Tabletės nuo kosulio', '', 0, -756465278, 40, 6, 150], //36
    ['Vitaminai', '', 0, -756465278, 55, 6, 80], //37
    ['Karščiavimą mažinantis vaistas', '', 0, -756465278, 35, 6, 100], //38
    ['Antibiotikai', '', 0, -756465278, 35, 6, 250], //39

    ['Antrankiai', '', 0, -1281059971, 340, 120, 500], //40

    ['Tr. priemonės raktas', '', 0, 977923025, 6, 3, 111111], //41
    ['Ofiso raktas', '', 0, -331172978, 6, 3, 111111], //42
    ['Namo raktas', '', 0, -331172978, 6, 3, 111111], //43
    ['Buto raktas', '', 0, -331172978, 6, 3, 111111], //44

    ['Slotas', '', 0, 9168982, 650, 2800, 111111], //45
    ['Slotas', '', 0, 9168982, 650, 3800, 111111], //46

    ['Nuotolinės prieigos modulis', '', 0, -1964402432, 250, 170, 990], //47
    ['Piniginė', '', 0, -34897201, 120, 150, 400], //48
    ['Dokumentai', '', 0, 406712611, 80, 410, 20000], //49
    ['Banko kortelė', '', 0, -1282513796, 15, 8, 111111], //50
    ['Pasas', '', 0, -1750183478, 40, 16, 111111], //51
    ['Licencija', '', 0, -925658112, 30, 116, 111111], //52
    ['Sertifikatas', '', 0, -1595369626, 15, 8, 111111], //53

    ['Kavalerijos durklas', 'weapon_dagger', 0, 601713565, 400, 450, 250], //54
    ['Beisbolo lazda', 'weapon_bat', 0, 32653987, 1500, 2000, 50], //55
    ['Kovinis kirvis', 'weapon_battleaxe', 0, 3406411762, 2200, 2400, 500], //56
    ['Stiklo šukė', 'weapon_bottle', 0, 1150762982, 110, 540, 5], //57
    ['Laužtuvas', 'weapon_crowbar', 0, 1862268168, 3200, 1050, 70], //58
    ['Žibintuvėlis', 'weapon_flashlight', 0, 2278481040, 340, 400, 70], //59
    ['Golfo lazda', 'weapon_golfclub', 0, 3714771050, 2900, 1150, 100], //60
    ['Plaktukas', 'weapon_hammer', 0, 64104227, 860, 430, 50], //61
    ['Kirvis', 'weapon_hatchet', 0, 1653948529, 930, 860, 400], //62
    ['Peilis', 'weapon_knife', 0, 2312523967, 560, 520, 110], //63
    ['Kastetas', 'weapon_knuckle', 0, 3005998612, 450, 80, 100], //64
    ['Mačetė', 'weapon_machete', 0, 2581077369, 1120, 525, 230], //65
    ['Policijos lazda', 'weapon_nightstick', 0, 2659989060, 880, 970, 300], //66
    ['Veržliaraktis', 'weapon_wrench', 0, 3149643023, 1760, 1490, 99], //67
    ['Biliardo lazda', 'weapon_poolcue', 0, 559432947, 470, 160, 150], //68
    ['Peilis su atlenkiamaisiais ašmenimis', 'weapon_switchblade', 0, 3331136096, 130, 60, 130], //69

    ['Сolt SCAMP', 'weapon_appistol', 0, 905830540, 1500, 950, 1700], //70
    ['P99', 'weapon_combatpistol', 0, 403140669, 800, 660, 1100], //71
    ['Signalinis pistoletas', 'weapon_flaregun', 0, 1349014803, 440, 270, 700], //72
    ['Remington 1911', 'weapon_heavypistol', 0, 1927398017, 1120, 850, 2500], //73
    ['Raging Bull', 'weapon_revolver', 0, 914615883, 1440, 1080, 1700], //74
    ['Raging Bull Mk II', 'weapon_revolver_mk2', 0, 4065179617, 1990, 1080, 2200], //75
    ['Contender G2', 'weapon_marksmanpistol', 0, 4191177435, 1360, 1800, 1800], //76
    ['Taurus PT92', 'weapon_pistol', 0, 1467525553, 950, 1230, 560], //77
    ['Beretta 90Two', 'weapon_pistol_mk2', 0, 995074671, 920, 1050, 840], //78
    ['Desert Eagle', 'weapon_pistol50', 0, 4116483281, 1700, 1720, 1800], //79
    ['HK P7M10', 'weapon_snspistol', 0, 339962010, 785, 660, 340], //80
    ['Colt Junior', 'weapon_snspistol_mk2', 0, 4221916961, 365, 310, 900], //81
    ['Tazeris', 'weapon_stungun', 0, 1609356763, 760, 680, 500], //82
    ['FN Model 1922', 'weapon_vintagepistol', 0, 3170921020, 700, 720, 800], //83
    ['Colt New Service', 'weapon_doubleaction', 0, 2050882666, 1450, 1170, 1300], //84

    ['UTS-15', 'weapon_assaultshotgun', 0, 1255410010, 2800, 11500, 3000], //85
    ['KSG 12', 'weapon_bullpupshotgun', 0, 2696754462, 3100, 9500, 2600], //86
    ['Šautuvas', 'weapon_dbshotgun', 0, 222483357, 1410, 1800, 1500], //87
    ['Saiga-12К', 'weapon_heavyshotgun', 0, 3085098415, 3500, 10900, 2000], //88
    ['Land Pattern Musket', 'weapon_musket', 0, 1652015642, 4300, 14400, 1300], //89
    ['Benelli M3', 'weapon_pumpshotgun', 0, 689760839, 4500, 16100, 1700], //90
    ['Benelli M4', 'weapon_pumpshotgun_mk2', 0, 3194406291, 3500, 17600, 1900], //91
    ['Mossberg 500', 'weapon_sawnoffshotgun', 0, 3619125910, 2100, 3800, 1400], //92
    ['Protecta', 'weapon_autoshotgun', 0, 1380588314, 2900, 6800, 2200], //93

    ['P-90', 'weapon_assaultsmg', 0, 3821393119, 2800, 8800, 1700], //94
    ['Mk 48', 'weapon_combatmg', 0, 3555572849, 8000, 16000, 20000], //95
    ['HK MG4', 'weapon_combatmg_mk2', 0, 2969831089, 8150, 17600, 25000], //96
    ['SIG MPX-SD', 'weapon_combatpdw', 0, 2901952492, 2700, 5000, 1700], //97
    ['Thompson M1918A1', 'weapon_gusenberg', 0, 574348740, 8400, 18400, 2700], //98
    ['Intratec TEC-9', 'weapon_machinepistol', 0, 3963421467, 1500, 1660, 1300], //99
    ['PKP «Pechenegas»', 'weapon_mg', 1, 2238602894, 8200, 17250, 18000], //100
    ['Mini Uzi', 'weapon_microsmg', 0, 3238253642, 2650, 2500, 1500], //101
    ['Scorpion vz.61', 'weapon_minismg', 0, 3322144245, 2000, 1900, 1400], //102
    ['MP5A3', 'weapon_smg', 0, 3794909300, 3200, 7800, 1800], //103
    ['MP5K', 'weapon_smg_mk2', 0, 2547423399, 3350, 8100, 2300], //104

    ['TAR-21', 'weapon_advancedrifle', 0, 2587382322, 3270, 12400, 2000], //105
    ['AK-102', 'weapon_assaultrifle', 0, 273925117, 3200, 14700, 2700], //106
    ['AK-103', 'weapon_assaultrifle_mk2', 0, 1762764713, 3600, 16200, 3200], //107
    ['QBZ-97', 'weapon_bullpuprifle', 0, 3006407723, 3250, 13500, 2200], //108
    ['QBZ-95', 'weapon_bullpuprifle_mk2', 0, 1415744902, 3350, 13900, 2800], //109
    ['HK-416', 'weapon_carbinerifle', 0, 1026431720, 3490, 14200, 2500], //110
    ['HK-416A5', 'weapon_carbinerifle_mk2', 0, 1520780799, 3560, 14900, 3000], //111
    ['AKS-74u', 'weapon_compactrifle', 0, 1931114084, 2400, 5700, 3000], //112
    ['G36C', 'weapon_specialcarbine', 0, 2549323539, 2980, 12000, 2500], //113
    ['G36KV', 'weapon_specialcarbine_mk2', 0, 2379721761, 3370, 13900, 3000], //114

    ['M107', 'weapon_heavysniper', 0, 3548001216, 13500, 21000, 27000], //115
    ['XM109', 'weapon_heavysniper_mk2', 0, 619715967, 14000, 24500, 35000], //116
    ['M14 EBR', 'weapon_marksmanrifle', 0, 2583718658, 5100, 17800, 21000], //117
    ['SOCOM 16', 'weapon_marksmanrifle_mk2', 0, 2436666926, 5900, 18200, 24000], //118
    ['L115A3', 'weapon_sniperrifle', 0, 346403307, 6600, 14400, 23000], //119

    ['M79', 'weapon_compactlauncher', 0, 2771413813, 50, 2050, 35000], //120
    ['Pirotechnikos įrengimas', 'weapon_firework', 0, 491091384, 8500, 29000, 40000], //121
    ['M32 MGL', 'weapon_grenadelauncher', 0, 3688284050, 5300, 19500, 50000], //122
    ['FIM 92 Stinger', 'weapon_hominglauncher', 0, 1901887007, 13500, 29000, 65000], //123
    ['M134', 'weapon_minigun', 0, 422658457, 30000, 50000, 120000], //124
    ['Geležinkelio ginklai', 'weapon_railgun', 0, 2418461061, 14900, 22500, 170000], //125
    ['RPG-7', 'weapon_rpg', 0, 4076109223, 6000, 46000, 45000], //126

    ['Kamuolys', 'weapon_ball', 0, 3911017173, 250, 310, 20], //127
    ['Dūminė granata', 'weapon_smokegrenade', 0, 1591549914, 690, 485, 500], //128
    ['Signalinė ugnis', 'weapon_flare', 0, 2730774144, 250, 180, 250], //129
    ['Granata', 'weapon_grenade', 0, 290600267, 890, 410, 800], //130
    ['Molotovo kokteilis', 'weapon_molotov', 0, 3414357965, 660, 720, 800], //131
    ['Bekontaktė mina', 'weapon_proxmine', 0, 1876445962, 850, 1200, 2500], //132
    ['Savadarbė bomba', 'weapon_pipebomb', 0, 4121513285, 430, 180, 3500], //133
    ['Sniego gniūžtė', 'weapon_snowball', 0, 1297482736, 250, 310, 1], //134
    ['Velcro bomba', 'weapon_stickybomb', 0, 3184763647, 750, 1200, 4500], //135
    ['Ašarinės dujos', 'weapon_bzgas', 0, 1591549914, 690, 485, 4000], //136

    ['Parašiutas', 'gadget_parachute', 0, -1679378668, 3200, 7500, 50], //137

    ['1€ kupiūra', '', 0, 1814532926, 1, 1, 1], //138
    ['100€ kupiūra', '', 0, 1597489407, 1, 1, 100], //139
    ['100€ nedidelis paketas', '', 0, -1170050911, 100, 100, 111111], //140
    ['100€ didelis paketas', '', 0, -1448063107, 300, 300, 111111], //141

    ['Kokaino pakuotė', '', 0, 525896218, 1000, 1000, 111111], //142
    ['Marihuanos pakuotė', '', 0, -395076527, 200, 1000, 111111], //143
    ['Kokaino pakuotė (Didelė)', '', 0, -1688127, 5000, 5000, 111111], //144
    ['Marihuanos pakuotė (Didelė)', '', 0, -680115871, 800, 4000, 111111], //145

    ['Glock 17', 'weapon_ceramicpistol', 0, 1430410579, 1990, 1080, 1300], //146
    ['Colt 1851 Navy Revolver', 'weapon_navyrevolver', 0, 1430410579, 1990, 1080, 2200], //147

    ['Banko Fleeca brėžinys #2', '', 0, 406712611, 80, 410, 111111], //148
    ['Banko Fleeca brėžinys #4', '', 0, 406712611, 80, 410, 111111], //149
    ['Banko Pacific brėžinys', '', 0, 406712611, 80, 410, 111111], //150
    ['Humane Labs brėžinys', '', 0, 1843823183, 3800, 1568, 111111], //151
    ['Diamond Casino saugyklos brėžinys', '', 0, 1843823183, 1500, 1568, 111111], //152
    ['Union Depository saugyklos brėžinys', '', 0, 190687980, 1140, 432, 111111], //153

    ['Kokainas (10 gr.)', '', 0, 1808635348, 10, 10, 111111], //154
    ['Marihuana (10 gr.)', '', 0, 671777952, 10, 50, 111111], //155
    ['Kokainas (50 gr.)', '', 0, 1808635348, 50, 50, 111111], //156
    ['Marihuana (50 gr.)', '', 0, 671777952, 50, 250, 111111], //157

    ['Amfetaminas', '', 0, 1808635348, 1, 1, 111111], //158
    ['DMT', '', 0, 1808635348, 1, 1, 111111], //159
    ['Mefedronas', '', 0, 1808635348, 1, 1, 111111], //160
    ['Ketaminas', '', 0, 671777952, 1, 5, 111111], //161
    ['LSD', '', 0, 671777952, 1, 5, 111111], //162

    ['Amfetamino pakuotė', '', 0, 525896218, 1000, 1000, 111111], //163
    ['Amfetamino pakuotė (Didelė)', '', 0, -1688127, 5000, 5000, 111111], //164

    ['DMT pakuotė', '', 0, 525896218, 1000, 1000, 111111], //165
    ['DMT pakuotė (Didelė)', '', 0, -1688127, 5000, 5000, 111111], //166

    ['Mefedrono pakuotė', '', 0, 525896218, 1000, 1000, 111111], //167
    ['Mefedrono pakuotė (Didelė)', '', 0, -1688127, 5000, 5000, 111111], //168

    ['Ketamino pakuotė', '', 0, 1430410579, 1000, 3000, 111111], //169
    ['LSD pakuotė', '', 0, 1430410579, 1000, 3000, 111111], //170

    ['Amfetaminas (10 gr.)', '', 0, 1808635348, 10, 10, 111111], //171
    ['DMT (10 gr.)', '', 0, 1808635348, 10, 10, 111111], //172
    ['Mefedronas (10 gr.)', '', 0, 1808635348, 10, 10, 111111], //173
    ['Ketaminas (10 gr.)', '', 0, 671777952, 10, 50, 111111], //174
    ['LSD (10 gr.)', '', 0, 671777952, 10, 50, 111111], //175

    ['Amfetaminas (50 gr.)', '', 0, 1808635348, 50, 50, 111111], //176
    ['DMT (50 gr.)', '', 0, 1808635348, 50, 50, 111111], //177
    ['Mefedronas (50 gr.)', '', 0, 1808635348, 50, 50, 111111], //178
    ['Ketaminas (50 gr.)', '', 0, 671777952, 50, 250, 111111], //179
    ['LSD (50 gr.)', '', 0, 671777952, 50, 250, 111111], //180

    ['Medinė dėžutė Gray Tea', '', 0, -1147461795, 15000, 500000, 111111], //181
    ['Lapų A4 dėžutė', '', 0, 1465830963, 2500, 40000, 111111], //182
    ['Dėžutė Redwood', '', 0, 1465830963, 2500, 35000, 111111], //183
    ['Dėžutė Clucking Bell', '', 0, 250374685, 15000, 70000, 111111], //184
    ['Dėžutė Jo Jo diet Cola', '', 0, -1244905398, 8000, 25000, 111111], //185
    ['Dėžutė Craft', '', 0, -517243780, 40000, 70000, 111111], //186
    ['Dėžutė Fish and Roll', '', 0, -1563678327, 60000, 450000, 111111], //187
    ['Medinė dėžutė GoPostal', '', 0, -1649986476, 19000, 300000, 111111], //188
    ['Didžiulė medinė dėžė', '', 0, 1955876122, 420000, 5000000, 111111], //189
    ['Svarbi medinė dėžutė', '', 0, 307713837, 120000, 1250000, 111111], //190
    ['Dėžė iš Kinijos', '', 0, -1513883840, 35000, 450000, 111111], //191
    ['Svarbi dėžutė', '', 0, -1438964996, 12000, 250000, 111111], //192
    ['Maža dėžutė', '', 0, -721895765, 4000, 55000, 111111], //193

    ['Dryžuota statinė', '', 0, 546252211, 30000, 5000, 2000], //194
    ['Tvora su strėle', '', 0, 1867879106, 8000, 5000, 2000], //195
    ['Ilga tvora', '', 0, -205311355, 10000, 5000, 2000], //196
    ['Medinė tvora', '', 0, 1072616162, 5000, 5000, 2000], //197
    ['Medinė tvora su ugnimi', '', 0, 1329951119, 5000, 5000, 2000], //198
    ['Policijos tvora', '', 0, -143315610, 9000, 5000, 2000], //199
    ['Ilgas dryžuotas kūgis', '', 0, 939377219, 1000, 3000, 2000], //200
    ['Dryžuotas kūgis', '', 0, 1245865676, 1000, 3000, 2000], //201
    ['Raudonas kūgis', '', 0, 862664990, 1000, 3000, 2000], //202
    ['Ilgas kūgis su lemputėmis', '', 0, -1587301201, 1000, 3000, 2000], //203

    ['Tablečių kapsulė', '', 0, -2127785247, 50, 25, 111111], //204
    ['Didžiulis stiklinis butelis', '', 0, -1382355819, 3000, 6750, 111111], //205
    ['Tablečių kapsulė', '', 0, -756465278, 50, 30, 111111], //206
    ['Butelis', '', 0, 393961710, 250, 250, 111111], //207
    ['Sirupas', '', 0, 1648892290, 120, 170, 111111], //208
    ['Didelis stiklinis indas', '', 0, 566302905, 1500, 4200, 111111], //209
    ['Stiklinis indas', '', 0, -2034834785, 500, 1400, 111111], //210
    ['Konteineris su mėgintuvėliais', '', 0, -330775550, 4500, 6000, 111111], //211
    ['Mėgintuvėlių talpykla', '', 0, -192665395, 2000, 6000, 111111], //212
    ['Mėgintuvėlis', '', 0, -2022085894, 500, 60, 111111], //213
    ['Švirkštas', '', 0, -61966571, 50, 6, 111111], //214
    ['Pirmosios pagalbos rinkinys', '', 0, 678958360, 500, 1880, 410], //215
    ['Tvarstis', '', 0, 546339338, 70, 280, 40], //216
    ['Didelis tvarstis', '', 0, 580223600, 120, 410, 111111], //217
    ['Tabletės', '', 0, -1129328507, 20, 10, 111111], //218
    ['Buteliukas su vandenilio peroksidu', '', 0, 1254553771, 3000, 8000, 111111], //219
    ['Tablečių pakuotė', '', 0, 1787587532, 50, 130, 111111], //220
    ['Vaistai nuo pagirių', '', 0, 1547095841, 12, 130, 80], //221
    ['Tablečių pakuotė', '', 0, 1174512311, 50, 130, 111111], //222

    ['Žalia tuno mėsa', '', 0, 936464539, 1000, 3000, 111111], //223
    ['Žalia ešerių mėsa', '', 0, 936464539, 300, 800, 111111], //224
    ['Žalia krabo mėsa', '', 0, 936464539, 600, 4000, 111111], //225
    ['Žalia lašišos mėsa', '', 0, 936464539, 290, 1000, 111111], //226
    ['Žalia krevečių mėsa', '', 0, 936464539, 290, 600, 111111], //227
    ['Žalia žuvies mėsa', '', 0, 936464539, 300, 800, 111111], //228
    ['Žalia žuvies mėsa', '', 0, 936464539, 300, 800, 111111], //229
    ['Žalia žuvies mėsa', '', 0, 936464539, 300, 800, 111111], //230
    ['Žalia žuvies mėsa', '', 0, 936464539, 300, 800, 111111], //231

    ['Tuno mėsa', '', 0, 936464539, 1000, 3000, 111111], //232
    ['Ešerio mėsa', '', 0, 936464539, 300, 800, 111111], //233
    ['Krabo mėsa', '', 0, 936464539, 600, 4000, 111111], //234
    ['Lašišos mėsa', '', 0, 936464539, 290, 1000, 111111], //235
    ['Krevečių mėsa', '', 0, 936464539, 290, 600, 111111], //236
    ['Žuvies mėsa', '', 0, 936464539, 300, 800, 111111], //237
    ['Žuvies mėsa', '', 0, 936464539, 300, 800, 111111], //238
    ['Žuvies mėsa', '', 0, 936464539, 300, 800, 111111], //239
    ['Žuvies mėsa', '', 0, 936464539, 300, 800, 111111], //240

    ["E-Cola dėžė", "", 0, 144995201, 340, 400, 15], //241
    ["Vandens Rainé buteliukas", "", 0, 724797387, 500, 650, 10], //242
    ["Alaus A.M. butelis", "", 0, -1301244203, 700, 600, 31], //243
    ["Alaus Stronzo butelis", "", 0, -1301244203, 700, 600, 32], //244
    ["Alaus Pißwasser butelis", "", 0, -1301244203, 700, 600, 28], //245
    ["Alaus Patriot butelis", "", 0, -1301244203, 700, 600, 29], //246
    ["Degtinės Nogo butelis", "", 0, 1925761914, 1200, 1100, 150], //247
    ["Vyno Rockford Hill Reserve butelis", "", 0, -1756838334, 1400, 1100, 2500], //248
    ["Romo Ragga butelis", "", 0, -154609122, 700, 700, 1320], //249
    ["Konjako Bourgeoix butelis", "", 0, 1404018125, 700, 700, 5500], //250

    ['Meškerė', '', 0, 1338703913, 3560, 4900, 800], //251
    ['Neperšaunama liemenė', '', 0, 701173564, 3560, 14900, 200], //252
    ['Kauliukai', '', 0, -1803909274, 50, 6, 10], //253

    ['Maža rožinė varpa', '', 0, -422877666, 250, 195, 850], //254
    ['Raudonas vibratorius ', '', 0, -463441113, 450, 440, 1000], //255
    ['Violetinė varpa', '', 0, -731262150, 330, 290, 1000], //256
    ['Odinė varpa', '', 0, -1980613044, 320, 285, 1500], //257
    ['Paauksuota varpa', '', 0, 2009373169, 390, 180, 3000], //258
    ['Metalinė varpa', '', 0, -1921596075, 390, 180, 2000], //259
    ['Didelė guminė varpa', '', 0, 1333481871, 950, 2100, 2000], //260
    ['Analinis lubrikantas', '', 0, 1553232197, 250, 540, 800], //261

    ['C4', 'StickyBomb', 0, -1110203649, 750, 1200, 111111], //262

    ['Kuprinė', '', 0, -1158162337, 2000, 20000, 20], //263
    ['Krepšys', '', 0, -1158162337, 2000, 50000, 50], //264
    ['Drabužiai', '', 0, -1158162337, 2000, 4500, 10], //265
    ['Kelnės', '', 0, -1158162337, 2000, 4500, 10], //266
    ['Batai', '', 0, 101151147, 1500, 3000, 10], //267
    ['Aksesuarai', '', 0, 1267833770, 400, 1200, 10], //268
    ['Galvos apdangalai', '', 0, 1267833770, 500, 1500, 10], //269
    ['Akiniai', '', 0, 1298569174, 200, 350, 10], //270
    ['Auskarai', '', 1, 1267833770, 150, 90, 10], //271
    ['Laikrodžiai', '', 0, 1267833770, 250, 300, 10], //272
    ['Apyrankės', '', 0, 1267833770, 250, 300, 10], //273
    ['Kaukės', '', 0, 1267833770, 400, 1200, 10], //274
    ['Pirštinės', '', 0, 1267833770, 500, 60, 10], //275

    ['Specialių spynų laužiklių dėžutė', '', 0, 1267833770, 1500, 180, 111111], //276

    ['Defibriliatorius', '', 0, 678958360, 500, 4880, 1750], //277
    ['Didelis pirmosios pagalbos rinkinys', '', 0, 678958360, 500, 2880, 1000], //278

    ['Dėžutė su šaudmenimis', '', 0, 1843823183, 3800, 1568, 111111], //279
    ['Dėžutė su 9mm šaudmenimis', '', 0, 190687980, 1140, 432, 370], //280
    ['Dėžutė su 12 kalibro šaudmenimis', '', 0, 1560006187, 2420, 1024, 500], //281
    ['Dėžutė su 7.62mm šaudmenimis', '', 0, 669213687, 2580, 686, 400], //282
    ['Dėžutė su 5.45mm šaudmenimis', '', 0, 1843823183, 3620, 1568, 390], //283
    ['Dėžutė su 5.56mm šaudmenimis', '', 0, 1843823183, 3620, 1568, 390], //284
    ['Dėžutė su 12.7mm šaudmenimis', '', 0, 1843823183, 8900, 1568, 450], //285
    ['Dėžutė su .45 ACP šaudmenimis', '', 0, 1843823183, 8900, 1568, 390], //286
    ['Dėžutė su .44 Magnum šaudmenimis', '', 0, 1843823183, 8900, 1568, 390], //287
    ['Dėžutė su signaliniu pistoletu', '', 0, 1843823183, 1600, 1568, 400], //288
    ['Dėžutė su fejerverkais', '', 0, 1843823183, 1600, 1568, 550], //289
    ['Dėžutė granatų iš po vamzdžio', '', 0, 1843823183, 3800, 1568, 2000], //290
    ['Dėžutė su RPG', '', 0, 1843823183, 2200, 1568, 1500], //291
    ['Dėžutė su Stinger šaudmenimis', '', 0, 1843823183, 1500, 1568, 1500], //292

    ['Žibintas', 'weapon_pistol', 899381934, 1130912089, 999, 999, 70], //293
    ['Duslintuvas', 'weapon_pistol', 1709866683, 2961024780, 999, 999, 320], //294

    ['Žibintas', 'weapon_combatpistol', 899381934, 1130912089, 999, 999, 70], //295
    ['Duslintuvas', 'weapon_combatpistol', -1023114086, 3269753630, 999, 999, 320], //296

    ['Žibintas', 'weapon_appistol', 899381934, 1130912089, 999, 999, 70], //297
    ['Duslintuvas', 'weapon_appistol', -1023114086, 3269753630, 999, 999, 320], //298

    ['Žibintas', 'weapon_pistol50', 899381934, 1130912089, 999, 999, 70], //299
    ['Duslintuvas', 'weapon_pistol50', -1489156508, 3861759304, 999, 999, 320], //300

    ['Žibintas', 'weapon_heavypistol', 899381934, 1130912089, 999, 999, 70], //301
    ['Duslintuvas', 'weapon_heavypistol', -1023114086, 3269753630, 999, 999, 320], //302

    ['Holografinis taikiklis', 'weapon_revolver_mk2', 1108334355, 2829113236, 999, 999, 500], //303
    ['Mažo didinimo taikiklis', 'weapon_revolver_mk2', 77277509, 3146158889, 999, 999, 250], //304
    ['Žibintas', 'weapon_revolver_mk2', 899381934, 1130912089, 999, 999, 70], //305
    ['Kompensatorius', 'weapon_revolver_mk2', 654802123, 3669642320, 999, 999, 400], //306

    ['Žibintas', 'weapon_snspistol_mk2', 1246324211, 3006720319, 999, 999, 70], //307
    ['Optinis taikiklis', 'weapon_snspistol_mk2', 2112431491, 3995252072, 999, 999, 250], //308
    ['Kompensatorius', 'weapon_snspistol_mk2', -1434287169, 2097516772, 999, 999, 400], //309
    ['Duslintuvas', 'weapon_snspistol_mk2', 1709866683, 2961024780, 999, 999, 320], //310
    ['Žibintas', 'weapon_pistol_mk2', 1140676955, 1009734661, 999, 999, 70], //311
    ['Optinis taikiklis', 'weapon_pistol_mk2', -1898661008, 4293187820, 999, 999, 250], //312
    ['Duslintuvas', 'weapon_pistol_mk2', 1709866683, 2961024780, 999, 999, 320], //313
    ['Kompensatorius', 'weapon_pistol_mk2', 568543123, 2384474905, 999, 999, 400], //314

    ['Duslintuvas', 'weapon_vintagepistol', -1023114086, 3269753630, 999, 999, 320], //315

    ['Duslintuvas', 'weapon_ceramicpistol', -1828202758, 3458054605, 999, 999, 320], //316

    ['Žibintas', 'weapon_microsmg', 899381934, 1130912089, 999, 999, 70], //317
    ['Taikiklis', 'weapon_microsmg', -1657815255, 3146158889, 999, 999, 440], //318
    ['Duslintuvas', 'weapon_microsmg', -1489156508, 3861759304, 999, 999, 320], //319

    ['Taikiklis', 'weapon_smg', 1019656791, 1234627046, 999, 999, 440], //320
    ['Duslintuvas', 'weapon_smg', -1023114086, 3269753630, 999, 999, 320], //321

    ['Žibintas', 'weapon_assaultsmg', 2076495324, 2722601028, 999, 999, 70], //322
    ['Taikiklis', 'weapon_assaultsmg', -1657815255, 3146158889, 999, 999, 440], //323
    ['Duslintuvas', 'weapon_assaultsmg', -1489156508, 3861759304, 999, 999, 320], //324

    ['Žibintas', 'weapon_smg_mk2', 2076495324, 2722601028, 999, 999, 70], //325
    ['Holografinis taikiklis', 'weapon_smg_mk2', -1613015470, 2644166869, 999, 999, 500], //326
    ['Mažo didinimo taikiklis', 'weapon_smg_mk2', -452809877, 440096355, 999, 999, 250], //327
    ['Vidutinio didinimo taikiklis', 'weapon_smg_mk2', 1038927834, 1041503532, 999, 999, 250], //328
    ['Duslintuvas', 'weapon_smg_mk2', -1023114086, 3269753630, 999, 999, 320], //329
    ['Plokščias buožės stabdis', 'weapon_smg_mk2', -1181482284, 3296361608, 999, 999, 390], //330
    ['Taktinis buožės stabdis', 'weapon_smg_mk2', -932732805, 2924171306, 999, 999, 390], //331
    ['Storo galo duslintuvo stabdis', 'weapon_smg_mk2', -569259057, 415999277, 999, 999, 390], //332
    ['Didelio tikslumo duslintuvo stabdis', 'weapon_smg_mk2', -326080308, 1132722845, 999, 999, 390], //333
    ['Stiprus duslintuvo stabdis', 'weapon_smg_mk2', 48731514, 4248432134, 999, 999, 390], //334
    ['Pakreiptas duslintuvo stabdis', 'weapon_smg_mk2', 880736428, 3892626332, 999, 999, 390], //335
    ['Padalytas duslintuvo stabdis', 'weapon_smg_mk2', 1303784126, 1373968223, 999, 999, 390], //336

    ['Duslintuvas', 'weapon_machinepistol', -1023114086, 3269753630, 999, 999, 320], //337

    ['Žibintas', 'weapon_combatpdw', 2076495324, 2722601028, 999, 999, 70], //338
    ['Rankena', 'weapon_combatpdw', 202788691, 3745179589, 999, 999, 250], //339
    ['Taikiklis', 'weapon_combatpdw', -1439939148, 3205897199, 999, 999, 440], //340

    ['Žibintas', 'weapon_pumpshotgun', 2076495324, 2722601028, 999, 999, 70], //341
    ['Duslintuvas', 'weapon_pumpshotgun', -435637410, 2918601495, 999, 999, 320], //342

    ['Žibintas', 'weapon_assaultshotgun', 2076495324, 2722601028, 999, 999, 70], //343
    ['Rankena', 'weapon_assaultshotgun', 202788691, 3745179589, 999, 999, 250], //344
    ['Duslintuvas', 'weapon_assaultshotgun', -2089531990, 2127522061, 999, 999, 320], //345

    ['Žibintas', 'weapon_bullpupshotgun', 2076495324, 2722601028, 999, 999, 70], //346
    ['Rankena', 'weapon_bullpupshotgun', 202788691, 3745179589, 999, 999, 250], //347
    ['Duslintuvas', 'weapon_bullpupshotgun', -1489156508, 3861759304, 999, 999, 320], //348

    ['Holografinis taikiklis', 'weapon_pumpshotgun_mk2', 1108334355, 2829113236, 999, 999, 500], //349
    ['Mažo didinimo taikiklis', 'weapon_pumpshotgun_mk2', 77277509, 3146158889, 999, 999, 250], //350
    ['Vidutinio didinimo taikiklis', 'weapon_pumpshotgun_mk2', 1060929921, 3205897199, 999, 999, 250], //351
    ['Žibintas', 'weapon_pumpshotgun_mk2', 2076495324, 2722601028, 999, 999, 70], //352
    ['Duslintuvas', 'weapon_pumpshotgun_mk2', -1404903567, 2042625932, 999, 999, 320], //353
    ['Buožės stabdis', 'weapon_pumpshotgun_mk2', 1602080333, 1548334207, 999, 999, 390], //354

    ['Žibintas', 'weapon_heavyshotgun', 2076495324, 2722601028, 999, 999, 70], //355
    ['Rankena', 'weapon_heavyshotgun', 202788691, 3745179589, 999, 999, 250], //356
    ['Duslintuvas', 'weapon_heavyshotgun', -1489156508, 3861759304, 999, 999, 320], //357

    ['Žibintas', 'weapon_assaultrifle', 2076495324, 2722601028, 999, 999, 70], //358
    ['Rankena', 'weapon_assaultrifle', 202788691, 3745179589, 999, 999, 250], //359
    ['Duslintuvas', 'weapon_assaultrifle', -1489156508, 3861759304, 999, 999, 320], //360
    ['Taikiklis', 'weapon_assaultrifle', -1657815255, 3146158889, 999, 999, 440], //361

    ['Žibintas', 'weapon_carbinerifle', 2076495324, 2722601028, 999, 999, 70], //362
    ['Rankena', 'weapon_carbinerifle', 202788691, 3745179589, 999, 999, 250], //363
    ['Duslintuvas', 'weapon_carbinerifle', -2089531990, 2127522061, 999, 999, 320], //364
    ['Taikiklis', 'weapon_carbinerifle', -1596416958, 4294868463, 999, 999, 440], //365

    ['Žibintas', 'weapon_advancedrifle', 2076495324, 2722601028, 999, 999, 70], //366
    ['Duslintuvas', 'weapon_advancedrifle', -2089531990, 2127522061, 999, 999, 320], //367
    ['Taikiklis', 'weapon_advancedrifle', -1439939148, 3205897199, 999, 999, 440], //368

    ['Žibintas', 'weapon_specialcarbine', 2076495324, 2722601028, 999, 999, 70], //369
    ['Rankena', 'weapon_specialcarbine', 202788691, 3745179589, 999, 999, 250], //370
    ['Duslintuvas', 'weapon_specialcarbine', -1489156508, 3861759304, 999, 999, 320], //371
    ['Taikiklis', 'weapon_specialcarbine', -1596416958, 999, 999, 999, 440], //372

    ['Žibintas', 'weapon_bullpuprifle', 2076495324, 2722601028, 999, 999, 70], //373
    ['Rankena', 'weapon_bullpuprifle', 202788691, 3745179589, 999, 999, 250], //374
    ['Duslintuvas', 'weapon_bullpuprifle', -2089531990, 2127522061, 999, 999, 320], //375
    ['Taikiklis', 'weapon_bullpuprifle', -1439939148, 3205897199, 999, 999, 440], //376

    ['Žibintas', 'weapon_bullpuprifle_mk2', 2076495324, 2722601028, 999, 999, 70], //377
    ['Holografinis taikiklis', 'weapon_bullpuprifle_mk2', 1108334355, 2829113236, 999, 999, 500], //378
    ['Mažo didinimo taikiklis', 'weapon_bullpuprifle_mk2', -944910075, 1234627046, 999, 999, 250], //379
    ['Vidutinio didinimo taikiklis', 'weapon_bullpuprifle_mk2', 1060929921, 3205897199, 999, 999, 250], //380
    ['Duslintuvas', 'weapon_bullpuprifle_mk2', -2089531990, 2127522061, 999, 999, 320], //381
    ['Plokščias buožės stabdis', 'weapon_bullpuprifle_mk2', -1181482284, 3296361608, 999, 999, 390], //382
    ['Taktinis buožės stabdis', 'weapon_bullpuprifle_mk2', -932732805, 2924171306, 999, 999, 390], //383
    ['Storo galo duslintuvo stabdys', 'weapon_bullpuprifle_mk2', -569259057, 415999277, 999, 999, 390], //384
    ['Didelio tikslumo duslintuvo stabdis', 'weapon_bullpuprifle_mk2', -326080308, 1132722845, 999, 999, 390], //385
    ['Stiprus duslintuvo stabdis', 'weapon_bullpuprifle_mk2', 48731514, 4248432134, 999, 999, 390], //386
    ['Pakreiptas duslintuvo stabdis', 'weapon_bullpuprifle_mk2', 880736428, 3892626332, 999, 999, 390], //387
    ['Padalytas duslintuvo stabdis', 'weapon_bullpuprifle_mk2', 1303784126, 1373968223, 999, 999, 390], //388
    ['Rankena', 'weapon_bullpuprifle_mk2', -1654288262, 3058873326, 999, 999, 250], //389

    ['Žibintas', 'weapon_specialcarbine_mk2', 2076495324, 2722601028, 999, 999, 70], //390
    ['Holografinis taikiklis', 'weapon_specialcarbine_mk2', 1108334355, 2829113236, 999, 999, 500], //391
    ['Mažo didinimo taikiklis', 'weapon_specialcarbine_mk2', 77277509, 3146158889, 999, 999, 250], //392
    ['Didelio didinimo taikiklis', 'weapon_specialcarbine_mk2', -966040254, 465859895, 999, 999, 4000], //393
    ['Duslintuvas', 'weapon_specialcarbine_mk2', -1489156508, 3861759304, 999, 999, 320], //394
    ['Plokščias buožės stabdis', 'weapon_specialcarbine_mk2', -1181482284, 3296361608, 999, 999, 390], //395
    ['Taktinis buožės stabdis', 'weapon_specialcarbine_mk2', -932732805, 2924171306, 999, 999, 390], //396
    ['Storo galo duslintuvo stabdys', 'weapon_specialcarbine_mk2', -569259057, 415999277, 999, 999, 390], //397
    ['Didelio tikslumo duslintuvo stabdis', 'weapon_specialcarbine_mk2', -326080308, 1132722845, 999, 999, 390], //398
    ['Stiprus duslintuvo stabdis', 'weapon_specialcarbine_mk2', 48731514, 4248432134, 999, 999, 390], //399
    ['Pakreiptas duslintuvo stabdis', 'weapon_specialcarbine_mk2', 880736428, 3892626332, 999, 999, 390], //400
    ['Padalytas duslintuvo stabdis', 'weapon_specialcarbine_mk2', 1303784126, 1373968223, 999, 999, 390], //401
    ['Rankena', 'weapon_specialcarbine_mk2', -1654288262, 3058873326, 999, 999, 250], //402

    ['Žibintas', 'weapon_assaultrifle_mk2', 2076495324, 2722601028, 999, 999, 70], //403
    ['Holografinis taikiklis', 'weapon_assaultrifle_mk2', 1108334355, 2829113236, 999, 999, 500], //404
    ['Mažo didinimo taikiklis', 'weapon_assaultrifle_mk2', 77277509, 3146158889, 999, 999, 250], //405
    ['Didelio didinimo taikiklis', 'weapon_assaultrifle_mk2', -966040254, 465859895, 999, 999, 4000], //406
    ['Duslintuvas', 'weapon_assaultrifle_mk2', -1489156508, 3861759304, 999, 999, 320], //407
    ['Plokščias buožės stabdis', 'weapon_assaultrifle_mk2', -1181482284, 3296361608, 999, 999, 390], //408
    ['Taktinis buožės stabdis', 'weapon_assaultrifle_mk2', -932732805, 2924171306, 999, 999, 390], //409
    ['Storo galo duslintuvo stabdys', 'weapon_assaultrifle_mk2', -569259057, 415999277, 999, 999, 390], //410
    ['Didelio tikslumo duslintuvo stabdis', 'weapon_assaultrifle_mk2', -326080308, 1132722845, 999, 999, 390], //411
    ['Stiprus duslintuvo stabdis', 'weapon_assaultrifle_mk2', 48731514, 4248432134, 999, 999, 390], //412
    ['Pakreiptas duslintuvo stabdis', 'weapon_assaultrifle_mk2', 880736428, 3892626332, 999, 999, 390], //413
    ['Padalytas duslintuvo stabdis', 'weapon_assaultrifle_mk2', 1303784126, 1373968223, 999, 999, 390], //414
    ['Rankena', 'weapon_assaultrifle_mk2', -1654288262, 3058873326, 999, 999, 250], //415

    ['Žibintas', 'weapon_carbinerifle_mk2', 2076495324, 2722601028, 999, 999, 70], //416
    ['Holografinis taikiklis', 'weapon_carbinerifle_mk2', 1108334355, 2829113236, 999, 999, 500], //417
    ['Mažo didinimo taikiklis', 'weapon_carbinerifle_mk2', 77277509, 3146158889, 999, 999, 250], //418
    ['Didelio didinimo taikiklis', 'weapon_carbinerifle_mk2', -966040254, 465859895, 999, 999, 4000], //419
    ['Duslintuvas', 'weapon_carbinerifle_mk2', -2089531990, 2127522061, 999, 999, 320], //420
    ['Plokščias buožės stabdis', 'weapon_carbinerifle_mk2', -1181482284, 3296361608, 999, 999, 390], //421
    ['Taktinis buožės stabdis', 'weapon_carbinerifle_mk2', -932732805, 2924171306, 999, 999, 390], //422
    ['Storo galo duslintuvo stabdys', 'weapon_carbinerifle_mk2', -569259057, 415999277, 999, 999, 390], //423
    ['Didelio tikslumo duslintuvo stabdis', 'weapon_carbinerifle_mk2', -326080308, 1132722845, 999, 999, 390], //424
    ['Stiprus duslintuvo stabdis', 'weapon_carbinerifle_mk2', 48731514, 4248432134, 999, 999, 390], //425
    ['Pakreiptas duslintuvo stabdis', 'weapon_carbinerifle_mk2', 880736428, 3892626332, 999, 999, 390], //426
    ['Padalytas duslintuvo stabdis', 'weapon_carbinerifle_mk2', 1303784126, 1373968223, 999, 999, 390], //427
    ['Rankena', 'weapon_carbinerifle_mk2', -1654288262, 3058873326, 999, 999, 250], //428

    ['Taikiklis', 'weapon_mg', 1006677997, 1517447672, 999, 999, 440], //429

    ['Taikiklis', 'weapon_combatmg', -1596416958, 4294868463, 999, 999, 440], //430
    ['Rankena', 'weapon_combatmg', 202788691, 3745179589, 999, 999, 250], //431

    ['Holografinis taikiklis', 'weapon_combatmg_mk2', 1108334355, 2829113236, 999, 999, 500], //432
    ['Vidutinio didinimo taikiklis', 'weapon_combatmg_mk2', 1060929921, 3205897199, 999, 999, 250], //433
    ['Didelio didinimo taikiklis', 'weapon_combatmg_mk2', -966040254, 465859895, 999, 999, 4000], //434
    ['Plokščias buožės stabdis', 'weapon_combatmg_mk2', -1181482284, 3296361608, 999, 999, 390], //435
    ['Taktinis buožės stabdis', 'weapon_combatmg_mk2', -932732805, 2924171306, 999, 999, 390], //436
    ['Storo galo duslintuvo stabdys', 'weapon_combatmg_mk2', -569259057, 415999277, 999, 999, 390], //437
    ['Didelio tikslumo duslintuvo stabdis', 'weapon_combatmg_mk2', -326080308, 1132722845, 999, 999, 390], //438
    ['Stiprus duslintuvo stabdis', 'weapon_combatmg_mk2', 48731514, 4248432134, 999, 999, 390], //439
    ['Pakreiptas duslintuvo stabdis', 'weapon_combatmg_mk2', 880736428, 3892626332, 999, 999, 390], //440
    ['Padalytas duslintuvo stabdis', 'weapon_combatmg_mk2', 1303784126, 1373968223, 999, 999, 390], //441
    ['Rankena', 'weapon_combatmg_mk2', -1654288262, 3058873326, 999, 999, 250], //442

    ['Taikiklis', 'weapon_sniperrifle', -767279652, 902783233, 999, 999, 440], //443
    ['Atnaujintas taikiklis', 'weapon_sniperrifle', -1135289737, 514930793, 999, 999, 250], //444

    ['Taikiklis', 'weapon_heavysniper', -767279652, 902783233, 999, 999, 440], //445
    ['Atnaujintas taikiklis', 'weapon_heavysniper', -1135289737, 514930793, 999, 999, 250], //446

    ['Žibintas', 'weapon_marksmanrifle_mk2', 2076495324, 2722601028, 999, 999, 70], //447
    ['Holografinis taikiklis', 'weapon_marksmanrifle_mk2', 1108334355, 2829113236, 999, 999, 500], //448
    ['Daugkartinis taikiklis', 'weapon_marksmanrifle_mk2', 1528590652, 902783233, 999, 999, 2750], //449
    ['Didelio didinimo taikiklis', 'weapon_marksmanrifle_mk2', -966040254, 465859895, 999, 999, 4000], //450
    ['Duslintuvas', 'weapon_marksmanrifle_mk2', -2089531990, 2127522061, 999, 999, 320], //451
    ['Plokščias buožės stabdis', 'weapon_marksmanrifle_mk2', -1181482284, 3296361608, 999, 999, 390], //452
    ['Taktinis buožės stabdis', 'weapon_marksmanrifle_mk2', -932732805, 2924171306, 999, 999, 390], //453
    ['Storo galo duslintuvo stabdys', 'weapon_marksmanrifle_mk2', -569259057, 415999277, 999, 999, 390], //454
    ['Didelio tikslumo duslintuvo stabdis', 'weapon_marksmanrifle_mk2', -326080308, 1132722845, 999, 999, 390], //455
    ['Stiprus duslintuvo stabdis', 'weapon_marksmanrifle_mk2', 48731514, 4248432134, 999, 999, 390], //456
    ['Pakreiptas duslintuvo stabdis', 'weapon_marksmanrifle_mk2', 880736428, 3892626332, 999, 999, 390], //457
    ['Padalytas duslintuvo stabdis', 'weapon_marksmanrifle_mk2', 1303784126, 1373968223, 999, 999, 390], //458
    ['Rankena', 'weapon_marksmanrifle_mk2', -1654288262, 3058873326, 999, 999, 250], //459

    ['Termovizorius', 'weapon_heavysniper_mk2', 776198721, 3033675491, 999, 999, 5000], //460
    ['Naktinio matymo taikiklis', 'weapon_heavysniper_mk2', -1233121104, 3033675491, 999, 999, 4500], //461
    ['Daugkartinis taikiklis', 'weapon_heavysniper_mk2', -2101279869, 902783233, 999, 999, 2750], //462
    ['Atnaujintas taikiklis', 'weapon_heavysniper_mk2', -1135289737, 514930793, 999, 999, 250], //463
    ['Duslintuvas', 'weapon_heavysniper_mk2', -1404903567, 2042625932, 999, 999, 320], //464
    ['Duslintuvo stabdis', 'weapon_heavysniper_mk2', 1602080333, 999, 999, 999, 390], //465
    ['Kulkos smaigalio stabdys', 'weapon_heavysniper_mk2', 1764221345, 999, 999, 999, 390], //466

    ['Žibintas', 'weapon_marksmanrifle', 2076495324, 2722601028, 999, 999, 70], //467
    ['Rankena', 'weapon_marksmanrifle', 202788691, 3745179589, 999, 999, 250], //468
    ['Duslintuvas', 'weapon_marksmanrifle', -2089531990, 2127522061, 999, 999, 320], //469
    ['Taikiklis', 'weapon_marksmanrifle', 471997210, 902783233, 999, 999, 440], //470

    ['Žibintas', 'weapon_grenadelauncher', 2076495324, 2722601028, 999, 999, 70], //471
    ['Rankena', 'weapon_grenadelauncher', 202788691, 3745179589, 999, 999, 250], //472
    ['Taikiklis', 'weapon_grenadelauncher', -1439939148, 3205897199, 999, 999, 440], //473

    ['Receptas', '', 0, 1830344521, 50, 400, 5000], //474

    ['Audinys', '', 0, 667595401, 400, 1100, 10], //475
    ['Plieno plokštė', '', 0, -1806890273, 4000, 6000, 100], //476
    ['Purškimo skardinė', '', 0, 1749718958, 700, 1500, 250], //477
    ['Tvirtas žvejybos lynas', '', 0, 1443647253, 300, 700, 1500], //478
    ['Patobulintas kablys', '', 0, 1373634352, 90, 150, 800], //479
    ['Masalas', '', 0, -1803909274, 300, 500, 111111], //480
    ['Lazda', '', 0, 1167949327, 1200, 1800, 111111], //481
    ['Malkos', '', 0, 1167949327, 3100, 3600, 100], //482
    ['Laužas', '', 0, -1065766299, 6000, 8000, 111111], //483
    ['Žiebtuvėlis', '', 0, -680040094, 100, 400, 2], //484
    ['Grilis', '', 0, 977744387, 25000, 24000, 800], //485
    ['Palapinė', '', 0, -1076837943, 19000, 21000, 1500], //486

    ['Amerikos eunuchas', '', 0, -1803909274, 70, 150, 25], //487  Очень частая - 0
    ['Amerikos Baltijos jūra', '', 0, 910205311, 1200, 1500, 45], //488 Частая - 1
    ['Amerikinis šamas', '', 0, 910205311, 650, 1800, 30], //489 Очень частая - 0
    ['Arktinė karklė', '', 0, 1108364521, 12000, 9500, 220], //490 Очень редкая - 4
    ['Baltieji eršketai', '', 0, 1108364521, 16000, 10000, 500], //491 Невероятно редкая - 5
    ['Didieji ešeriai', '', 0, 1108364521, 8000, 6250, 35], //492 Редкая - 3
    ['Hiodonai', '', 0, -1803909274, 110, 950, 35], //493 Очень частая - 0
    ['Nelegalios žuvys', '', 0, 910205311, 4900, 3400, 65], //494 Немного редкая - 2
    ['Lopatinės', '', 0, 1108364521, 8500, 7000, 115], //495 Редкая - 3
    ['Malma', '', 0, 910205311, 500, 1300, 65], //496 Частая - 1
    ['Mikiža', '', 0, 910205311, 1900, 1900, 75], //497 Частая - 1
    ['Paprastoji gambusia', '', 0, -1803909274, 15, 40, 15], //498 Очень частая - 0
    ['Dykumos karpis', '', 0, -1803909274, 20, 50, 15], //499 Очень частая - 0
    ['Ramiojo vandenyno smeltės', '', 0, -1803909274, 15, 45, 20], //500 Очень частая - 0
    ['Juodieji šamai', '', 0, 910205311, 1250, 1150, 45], //501 Частая - 1
    ['Maskinong lydekos', '', 0, 1108364521, 17000, 10000, 515], //502 Невероятно редкая - 5
    ['Astyanax jordani', '', 0, -1803909274, 20, 60, 30], //503 Очень частая - 0
    ['Catostomus occidentalis', '', 0, 910205311, 850, 1600, 60], //504 Частая - 1
    ['Amerikos hidrolagas', '', 0, 910205311, 2100, 1900, 75], //505 Частая - 1
    ['Amerikinis strėlinis paltusas', '', 0, 910205311, 2800, 2300, 80], //506 Частая - 1
    ['Amerikietiškas terpentinas', '', 0, 910205311, 2100, 2100, 70], //507 Частая - 1
    ['Amerikietiškieji upėtakiai', '', 0, 910205311, 5600, 4700, 90], //508 Немного редкая - 2
    ['Agonomalės', '', 0, -1803909274, 120, 260, 30], //509 Очень частая - 0
    ['Aleutų jūros ešerys', '', 0, 1108364521, 5700, 6500, 135], //510 Редкая - 3
    ['Albula', '', 0, 1108364521, 5300, 5500, 140], //511 Редкая - 3
    ['Bokačo', '', 0, -1803909274, 340, 810, 35], //512 Очень частая - 0
    ['Garibaldija', '', 0, -1803909274, 410, 940, 35], //513 Очень частая - 0
    ['Rausvoji lašiša', '', 0, 910205311, 1700, 2100, 65], //514 Частая - 1
    ['Grunionas', '', 0, -1803909274, 65, 180, 25], //515 Очень частая - 0
    ['Ilgapelekės stauridės', '', 0, 910205311, 2900, 3500, 80], //516 Немного редкая - 2
    ['Ilgapelekis tunas', '', 0, 1108364521, 17000, 10000, 500], //517 Невероятно редкая - 5
    ['Ilgauodegiai tunai', '', 0, 1108364521, 14000, 9400, 255], //518 Очень редкая - 4
    ['Geltonuodegiai tunai', '', 0, 1108364521, 20000, 10000, 500], //519 Невероятно редкая - 5
    ['Zaprora', '', 0, 910205311, 3200, 4200, 90], //520 Немного редкая - 2
    ['Žvaigždžių plekšnės', '', 0, 1108364521, 7700, 7500, 155], //521 Редкая - 3
    ['Veidrodinė saulė', '', 0, 910205311, 2100, 2600, 75], //522 Немного редкая - 2
    ['Žieminės plekšnės', '', 0, 910205311, 1400, 1800, 65], //523 Частая - 1
    ['Dantytas terpentinas', '', 0, 910205311, 4300, 3800, 85], //524 Немного редкая - 2
    ['San Andreas barakuda', '', 0, 1108364521, 18000, 10000, 520], //525 Невероятно редкая - 5
    ['San Andreas bulius ryklys', '', 0, 1108364521, 6200, 5500, 130], //526 Редкая - 3
    ['San Andreas katė ryklys parmatuirus', '', 0, 1108364521, 7700, 6000, 135], //527 Редкая - 3
    ['San Andreas makrelis', '', 0, 910205311, 3200, 4000, 85], //528 Немного редкая - 2
    ['Išsipūtęs San Andreas ryklys', '', 0, 1108364521, 20000, 10000, 510], //529 Невероятно редкая - 5
    ['San Andreas ančiuviai', '', 0, -1803909274, 90, 260, 30], //530 Очень частая - 0
    ['Typhlogobius San Andreas', '', 0, 1108364521, 18900, 10000, 550], //531 Невероятно редкая - 5
    ['Kanariniai jūrų ešeriai', '', 0, 910205311, 2100, 2300, 75], //532 Частая - 1
    ['Chum lašiša', '', 0, 1108364521, 9200, 8000, 275], //533 Очень редкая - 4
    ['Sidabrinė lašiša', '', 0, 1108364521, 12000, 9000, 285], //534 Очень редкая - 4
    ['Dygliuotas arootronas', '', 0, 910205311, 2700, 3200, 75], //535 Немного редкая - 2
    ['Rudasis sraigės ryklys', '', 0, 1108364521, 14500, 9200, 290], //536 Очень редкая - 4
];

items.isWeapon = function(itemId) {
    return itemId >= 54 && itemId <= 138 || itemId == 146 || itemId == 147;
};

items.isComponent = function(itemId) {
    return itemId >= 293 && itemId <= 473;
};

items.isAmmo = function(itemId) {
    return itemId >= 279 && itemId <= 292;
};

items.getAmmoCount = function(itemId) {
    switch (itemId) {
        case 279:
        case 288:
        case 290:
            return 20;
        case 280:
            return 280;
        case 281:
            return 240;
        case 282:
            return 500;
        case 283:
        case 284:
            return 480;
        case 285:
        case 286:
        case 287:
            return 180;
        case 289:
        case 291:
        case 292:
            return 1;
    }
    return 10;
};

items.canEquipById = function(id)
{
    try
    {
        return items.itemList[id][2];
    }
    catch
    {
        return false;
    }
};

items.getItemNameById = function(id)
{
    try
    {
        return items.itemList[id][0];
    }
    catch
    {
        return "UNKNOWN";
    }
};

items.getItemNameHashById = function(id)
{
    try
    {
        return items.itemList[id][1];
    }
    catch
    {
        return "UNKNOWN";
    }
};

items.getItemHashModiferById = function(id)
{
    try
    {
        return items.itemList[id][2];
    }
    catch
    {
        return "UNKNOWN";
    }
};

items.getItemHashById = function(id)
{
    try
    {
        return items.itemList[id][3];
    }
    catch
    {
        return 1108364521;
    }
};

items.getItemWeightById = function(id)
{
    try
    {
        return items.itemList[id][4];
    }
    catch
    {
        return -1;
    }
};

items.getItemWeightKgById = function(id)
{
    try
    {
        return Math.Round(items.itemList[id][4] / 1000.0);
    }
    catch
    {
        return -1;
    }
};

items.getItemAmountById = function(id)
{
    try
    {
        return items.itemList[id][5];
    }
    catch
    {
        return -1;
    }
};

items.getItemPrice = function(id) {
    try
    {
        return items.itemList[id][6];
    }
    catch
    {
        return 0;
    }
};
