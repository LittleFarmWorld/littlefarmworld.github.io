/* ===== monsters.js : รายชื่อมอนสเตอร์ทั้งหมด (แก้ไฟล์นี้ไฟล์เดียวเพื่อเพิ่ม/ลด/เปลี่ยนมอน) =====
   MON[k] = [ชื่ออังกฤษ, ชื่อสายพันธุ์ไทย (ไม่แสดงในเกม ไว้ให้คนแก้ดู), ชนิดสกิล, อาชีพ, ความหายาก 1-5]
   - k เริ่มที่ 0 ->  No.001 ... No.568 (ลำดับ = ลำดับในสไปรต์ชีต: ชีตเลข n เก็บมอน k = (n-1)*4 ถึง (n-1)*4+3)
   - ชนิดสกิล: burn guard thorn crit boss steal stun multi splash heal hp (ค่าพลังอยู่ใน skills.js)
   - อาชีพ: mage rogue thief archer merchant swordsman priest knight brawler bard alchemist (ใช้แสดงผล)
   - ความหายาก: 1 พบบ่อย ... 5 หายากมาก (ใช้สุ่มตอนปลูก ดู RW)
   ชื่อที่แสดงในเกม: ร่าง 1 = No.001, ร่าง 2 = No.001/v.2, ร่างสุดท้าย = No.001/Max */
const MON=[
 ['strawberry','สตรอว์เบอร์รี','heal','priest',2],//001
 ['banana','กล้วย','stun','bard',1],//002
 ['mango','มะม่วง','crit','swordsman',1],//003
 ['durian','ทุเรียน','thorn','brawler',1],//004
 ['pineapple','สับปะรด','guard','knight',1],//005
 ['grape','องุ่น','splash','alchemist',2],//006
 ['orange','ส้ม','heal','bard',1],//007
 ['apple','แอปเปิล','guard','priest',1],//008
 ['coconut','มะพร้าว','hp','knight',2],//009
 ['mangosteen','มังคุด','boss','brawler',4],//010
 ['rambutan','เงาะ','thorn','swordsman',2],//011
 ['lychee','ลิ้นจี่','burn','mage',1],//012
 ['papaya','มะละกอ','heal','priest',1],//013
 ['dragon fruit','แก้วมังกร','thorn','brawler',1],//014
 ['peach','พีช','crit','swordsman',2],//015
 ['cherry','เชอร์รี','multi','bard',1],//016
 ['kiwi','กีวี','guard','knight',3],//017
 ['blueberry','บลูเบอร์รี','splash','alchemist',1],//018
 ['pomegranate','ทับทิม','splash','archer',2],//019
 ['jackfruit','ขนุน','hp','priest',3],//020
 ['watermelon','แตงโม','splash','mage',1],//021
 ['lime','มะนาว','burn','alchemist',1],//022
 ['bell pepper','พริกหวาน','guard','knight',1],//023
 ['winter melon','ฟักเขียว','hp','priest',1],//024
 ['spinach','ผักโขม','crit','rogue',3],//025
 ['morning glory','ผักบุ้ง','multi','brawler',2],//026
 ['yardlong bean','ถั่วฝักยาว','multi','swordsman',2],//027
 ['pea','ถั่วลันเตา','multi','bard',3],//028
 ['luffa','บวบ','thorn','knight',1],//029
 ['bitter melon','มะระ','stun','bard',4],//030
 ['ginger','ขิง','multi','swordsman',2],//031
 ['turmeric','ขมิ้น','heal','priest',1],//032
 ['lemongrass','ตะไคร้','crit','rogue',1],//033
 ['holy basil','กะเพรา','heal','alchemist',1],//034
 ['bamboo shoot','หน่อไม้','crit','swordsman',1],//035
 ['taro','เผือก','stun','mage',1],//036
 ['okra','กระเจี๊ยบเขียว','boss','swordsman',2],//037
 ['lettuce','ผักกาดหอม','guard','swordsman',1],//038
 ['cauliflower','กะหล่ำดอก','stun','alchemist',2],//039
 ['coriander','ผักชี','crit','rogue',2],//040
 ['ladybug','เต่าทอง','guard','knight',1],//041
 ['honeybee','ผึ้ง','multi','brawler',1],//042
 ['rhinoceros beetle','ด้วงกว่าง','boss','knight',4],//043
 ['butterfly','ผีเสื้อ','heal','priest',2],//044
 ['dragonfly','แมลงปอ','crit','rogue',1],//045
 ['praying mantis','ตั๊กแตนตำข้าว','crit','archer',3],//046
 ['firefly','หิ่งห้อย','burn','archer',1],//047
 ['ant','มด','steal','merchant',2],//048
 ['snail','หอยทาก','guard','knight',1],//049
 ['grasshopper','ตั๊กแตน','multi','brawler',1],//050
 ['cricket','จิ้งหรีด','stun','alchemist',1],//051
 ['eggplant','มะเขือม่วง','hp','priest',1],//052
 ['pear','ลูกแพร์','guard','knight',1],//053
 ['stag beetle','ด้วงคีม','boss','brawler',2],//054
 ['cucumber','แตงกวา','heal','bard',2],//055
 ['sunflower','ทานตะวัน','burn','mage',1],//056
 ['plum','พลัม','crit','rogue',1],//057
 ['cicada','จักจั่น','stun','bard',4],//058
 ['cabbage','กะหล่ำปลี','hp','merchant',3],//059
 ['wasp','ต่อ','multi','bard',1],//060
 ['fig','มะเดื่อ','heal','priest',1],//061
 ['chili','พริก','burn','alchemist',2],//062
 ['spider','แมงมุม','stun','alchemist',1],//063
 ['avocado','อะโวคาโด','hp','priest',1],//064
 ['scorpion','แมงป่อง','thorn','knight',1],//065
 ['asparagus','หน่อไม้ฝรั่ง','crit','archer',1],//066
 ['persimmon','พลับ','guard','knight',1],//067
 ['silkworm','หนอนไหม','steal','merchant',1],//068
 ['leek','กุยช่าย','multi','archer',1],//069
 ['moth','ผีเสื้อกลางคืน','steal','merchant',2],//070
 ['pomelo','ส้มโอ','hp','merchant',1],//071
 ['radish','หัวไชเท้าแดง','crit','rogue',1],//072
 ['stick insect','ตั๊กแตนกิ่งไม้','guard','knight',2],//073
 ['guava','ฝรั่ง','heal','alchemist',1],//074
 ['lotus','บัว','heal','bard',3],//075
 ['earthworm','ไส้เดือน','hp','priest',1],//076
 ['artichoke','อาร์ติโช้ก','thorn','knight',1],//077
 ['cactus','กระบองเพชร','thorn','brawler',2],//078
 ['longan','ลำไย','crit','swordsman',2],//079
 ['pillbug','กุ้งไม้ม้วนตัว','guard','priest',1],//080
 ['four-leaf clover','โคลเวอร์','crit','rogue',1],//081
 ['zucchini','บวบฝรั่ง','multi','brawler',1],//082
 ['venus flytrap','ต้นกาบหอยแครง','steal','rogue',2],//083
 ['rice','ข้าว','hp','priest',1],//084
 ['edamame','ถั่วแระ','multi','archer',2],//085
 ['lotus root','รากบัว','guard','swordsman',1],//086
 ['tamarind','มะขาม','burn','archer',1],//087
 ['mulberry','มัลเบอร์รี','splash','mage',3],//088
 ['bumblebee','ผึ้งบัมเบิล','hp','knight',2],//089
 ['dung beetle','ด้วงมูลสัตว์','steal','merchant',1],//090
 ['jewel beetle','ด้วงทับ','guard','knight',1],//091
 ['termite','ปลวก','multi','bard',5],//092
 ['locust','ตั๊กแตนปาทังกา','multi','archer',1],//093
 ['katydid','ตั๊กแตนใบไม้','guard','swordsman',4],//094
 ['mayfly','แมลงเม่า','crit','swordsman',3],//095
 ['caterpillar','หนอนผีเสื้อ','hp','priest',4],//096
 ['cocoon','รังดักแด้','guard','knight',1],//097
 ['atlas moth','ผีเสื้อยักษ์แอตลาส','steal','merchant',2],//098
 ['orchid mantis','ตั๊กแตนตำข้าวกล้วยไม้','crit','swordsman',1],//099
 ['leaf insect','แมลงใบไม้','guard','priest',2],//100
 ['army ant','มดทหาร','multi','archer',2],//101
 ['bullet ant','มดกระสุน','stun','bard',5],//102
 ['water strider','แมลงเดินน้ำ','crit','swordsman',1],//103
 ['diving beetle','ด้วงน้ำ','multi','bard',2],//104
 ['centipede','ตะขาบ','burn','mage',3],//105
 ['millipede','กิ้งกือ','thorn','brawler',3],//106
 ['tarantula','ทารันทูลา','boss','knight',1],//107
 ['jumping spider','แมงมุมกระโดด','crit','rogue',2],//108
 ['hercules beetle','ด้วงเฮอร์คิวลิส','boss','swordsman',2],//109
 ['goliath beetle','ด้วงโกลิอัท','hp','brawler',1],//110
 ['weevil','ด้วงงวง','crit','swordsman',1],//111
 ['mosquito','ยุง','steal','merchant',2],//112
 ['hornet','แตนยักษ์','multi','archer',2],//113
 ['earwig','แมลงหางหนีบ','thorn','brawler',4],//114
 ['cockroach','แมลงสาบ','hp','merchant',1],//115
 ['housefly','แมลงวัน','stun','mage',3],//116
 ['lacewing','แมลงปีกใส','heal','priest',5],//117
 ['aphid','เพลี้ยอ่อน','heal','alchemist',2],//118
 ['ruby','ทับทิม','crit','swordsman',2],//119
 ['sapphire','ไพลิน','guard','priest',1],//120
 ['emerald','มรกต','heal','priest',1],//121
 ['diamond','เพชร','crit','archer',2],//122
 ['amethyst','อะเมทิสต์','stun','alchemist',1],//123
 ['topaz','โทแพซ','burn','mage',4],//124
 ['opal','โอปอล','multi','archer',1],//125
 ['pearl','มุก','heal','alchemist',1],//126
 ['jade','หยก','guard','knight',4],//127
 ['garnet','การ์เน็ต','hp','priest',3],//128
 ['aquamarine','อความารีน','heal','priest',1],//129
 ['turquoise','เทอร์ควอยซ์','guard','swordsman',4],//130
 ['onyx','โอนิกซ์','boss','knight',2],//131
 ['obsidian','ออบซิเดียน','thorn','brawler',1],//132
 ['moonstone','มูนสโตน','heal','priest',5],//133
 ['sunstone','ซันสโตน','burn','alchemist',3],//134
 ['citrine','ซิทริน','crit','swordsman',1],//135
 ['peridot','เพอริดอต','steal','merchant',5],//136
 ['tanzanite','แทนซาไนต์','stun','mage',1],//137
 ['tourmaline','ทัวร์มาลีน','multi','brawler',2],//138
 ['lapis lazuli','ลาพิส ลาซูลี','crit','swordsman',4],//139
 ['amber','อำพัน','guard','priest',1],//140
 ['coral','ปะการังแดง','heal','priest',2],//141
 ['alexandrite','อเล็กซานไดรต์','multi','brawler',1],//142
 ['spinel','สปิเนล','hp','merchant',1],//143
 ['zircon','เพทาย','crit','rogue',1],//144
 ['morganite','มอร์แกไนต์','heal','priest',3],//145
 ['malachite','มาลาไคต์','thorn','brawler',1],//146
 ['rose quartz','โรสควอตซ์','heal','bard',2],//147
 ['bloodstone','บลัดสโตน','burn','mage',4],//148
 ['granite','หินแกรนิต','hp','knight',1],//149
 ['marble','หินอ่อน','guard','swordsman',2],//150
 ['basalt','หินบะซอลต์','thorn','swordsman',1],//151
 ['sandstone','หินทราย','stun','mage',2],//152
 ['limestone','หินปูน','heal','priest',3],//153
 ['slate','หินชนวน','guard','swordsman',1],//154
 ['quartz crystal','ผลึกควอตซ์','crit','swordsman',3],//155
 ['geode','จีโอด','splash','mage',1],//156
 ['lava rock','หินลาวา','burn','mage',1],//157
 ['iron ore','แร่เหล็ก','guard','swordsman',3],//158
 ['gold nugget','ก้อนทอง','steal','rogue',3],//159
 ['silver ore','แร่เงิน','crit','rogue',3],//160
 ['copper ore','แร่ทองแดง','multi','archer',2],//161
 ['coal','ถ่านหิน','burn','alchemist',1],//162
 ['salt crystal','ผลึกเกลือ','stun','alchemist',3],//163
 ['sulfur','กำมะถัน','burn','mage',1],//164
 ['meteorite','อุกกาบาต','boss','swordsman',1],//165
 ['ice crystal','ผลึกน้ำแข็ง','stun','bard',2],//166
 ['stalactite','หินงอก','thorn','swordsman',1],//167
 ['magma rock','หินแมกมา','burn','mage',5],//168
 ['maple leaf','ใบเมเปิล','crit','rogue',1],//169
 ['ginkgo leaf','ใบแป๊ะก๊วย','heal','alchemist',1],//170
 ['oak tree','ต้นโอ๊ก','hp','merchant',1],//171
 ['pine tree','ต้นสน','thorn','brawler',1],//172
 ['cherry blossom','ซากุระ','heal','priest',2],//173
 ['willow','ต้นหลิว','multi','brawler',2],//174
 ['banyan','ต้นไทร','hp','merchant',1],//175
 ['palm tree','ต้นปาล์ม','multi','bard',1],//176
 ['bonsai','บอนไซ','guard','knight',1],//177
 ['rose','กุหลาบ','thorn','brawler',1],//178
 ['tulip','ทิวลิป','crit','swordsman',1],//179
 ['lily','ลิลลี่','heal','priest',5],//180
 ['orchid','กล้วยไม้','crit','rogue',4],//181
 ['jasmine','มะลิ','heal','alchemist',3],//182
 ['hibiscus','ชบา','burn','archer',1],//183
 ['daisy','เดซี่','heal','priest',1],//184
 ['lavender','ลาเวนเดอร์','stun','mage',1],//185
 ['marigold','ดาวเรือง','burn','alchemist',1],//186
 ['poppy','ป๊อปปี้','stun','alchemist',2],//187
 ['iris','ไอริส','multi','bard',3],//188
 ['camellia','คามิเลีย','guard','knight',1],//189
 ['magnolia','แมกโนเลีย','hp','brawler',1],//190
 ['peony','ดอกโบตั๋น','hp','merchant',5],//191
 ['chrysanthemum','เบญจมาศ','burn','mage',1],//192
 ['dandelion','ดอกแดนดิไลออน','splash','mage',3],//193
 ['fern','เฟิร์น','heal','alchemist',3],//194
 ['moss','มอส','guard','knight',2],//195
 ['ivy','ไอวี่','multi','bard',2],//196
 ['mistletoe','มิสเซิลโท','steal','thief',1],//197
 ['aloe','ว่านหางจระเข้','heal','alchemist',4],//198
 ['mimosa','ต้นไมยราบ','guard','knight',5],//199
 ['bluebell','บลูเบลล์','stun','mage',2],//200
 ['wisteria','วิสทีเรีย','multi','archer',2],//201
 ['cosmos flower','คอสมอส','crit','archer',1],//202
 ['poinsettia','พอยน์เซตเทีย','burn','archer',1],//203
 ['water lily','บัวสาย','heal','priest',3],//204
 ['baobab','เบาบับ','hp','knight',1],//205
 ['cedar','ต้นซีดาร์','guard','swordsman',2],//206
 ['redwood','เรดวูด','hp','merchant',1],//207
 ['birch','ต้นเบิร์ช','crit','rogue',2],//208
 ['lion','สิงโต','boss','swordsman',1],//209
 ['tiger','เสือโคร่ง','crit','archer',1],//210
 ['wolf','หมาป่า','multi','swordsman',2],//211
 ['fox','จิ้งจอก','steal','merchant',1],//212
 ['bear','หมี','hp','knight',2],//213
 ['panda','แพนด้า','guard','swordsman',1],//214
 ['rabbit','กระต่าย','crit','swordsman',3],//215
 ['deer','กวาง','heal','priest',1],//216
 ['elephant','ช้าง','hp','knight',2],//217
 ['rhinoceros','แรด','boss','brawler',2],//218
 ['hippo','ฮิปโป','hp','merchant',1],//219
 ['giraffe','ยีราฟ','crit','rogue',1],//220
 ['zebra','ม้าลาย','multi','archer',1],//221
 ['monkey','ลิง','steal','merchant',2],//222
 ['gorilla','กอริลลา','hp','merchant',3],//223
 ['kangaroo','จิงโจ้','multi','bard',1],//224
 ['koala','โคอาล่า','heal','priest',5],//225
 ['sloth','สลอธ','guard','swordsman',3],//226
 ['hedgehog','เม่นแคระ','thorn','swordsman',3],//227
 ['squirrel','กระรอก','steal','merchant',5],//228
 ['mouse','หนู','steal','thief',1],//229
 ['wild boar','หมูป่า','boss','brawler',4],//230
 ['buffalo','ควาย','hp','merchant',1],//231
 ['camel','อูฐ','hp','priest',1],//232
 ['horse','ม้า','multi','archer',5],//233
 ['goat','แพะ','thorn','brawler',1],//234
 ['sheep','แกะ','guard','knight',1],//235
 ['cat','แมว','crit','rogue',1],//236
 ['dog','สุนัข','multi','archer',4],//237
 ['armadillo','อาร์มาดิลโล','guard','swordsman',1],//238
 ['pangolin','ตัวนิ่ม','guard','knight',1],//239
 ['cobra','งูเห่า','stun','mage',1],//240
 ['chameleon','กิ้งก่าคาเมเลี่ยน','steal','thief',1],//241
 ['tortoise','เต่าบก','guard','swordsman',3],//242
 ['frog','กบ','heal','bard',1],//243
 ['crocodile','จระเข้','boss','brawler',3],//244
 ['bat','ค้างคาว','steal','thief',3],//245
 ['tapir','สมเสร็จ','heal','alchemist',1],//246
 ['leopard','เสือดาว','crit','swordsman',3],//247
 ['shark','ฉลาม','boss','brawler',4],//248
 ['whale','ปลาวาฬ','hp','knight',3],//249
 ['dolphin','โลมา','multi','brawler',1],//250
 ['octopus','ปลาหมึกยักษ์','multi','swordsman',1],//251
 ['squid','ปลาหมึกกล้วย','stun','mage',1],//252
 ['jellyfish','แมงกะพรุน','stun','mage',3],//253
 ['crab','ปู','guard','swordsman',3],//254
 ['lobster','กุ้งมังกร','thorn','swordsman',2],//255
 ['shrimp','กุ้ง','crit','rogue',2],//256
 ['seahorse','ม้าน้ำ','heal','priest',1],//257
 ['starfish','ปลาดาว','heal','alchemist',1],//258
 ['sea urchin','เม่นทะเล','thorn','swordsman',1],//259
 ['clam','หอยกาบ','guard','priest',2],//260
 ['pufferfish','ปลาปักเป้า','thorn','knight',3],//261
 ['clownfish','ปลาการ์ตูน','multi','brawler',2],//262
 ['goldfish','ปลาทอง','heal','bard',2],//263
 ['koi','ปลาคาร์ฟ','crit','rogue',1],//264
 ['eel','ปลาไหล','stun','mage',1],//265
 ['anglerfish','ปลาตกเบ็ด','steal','merchant',3],//266
 ['swordfish','ปลาดาบ','crit','swordsman',5],//267
 ['manta ray','กระเบนราหู','multi','bard',1],//268
 ['sea turtle','เต่าทะเล','guard','knight',4],//269
 ['seal','แมวน้ำ','heal','alchemist',1],//270
 ['walrus','วอลรัส','boss','knight',2],//271
 ['otter','นากน้ำ','steal','merchant',2],//272
 ['narwhal','นาร์วาล','crit','rogue',2],//273
 ['orca','วาฬเพชฌฆาต','boss','brawler',1],//274
 ['hermit crab','ปูเสฉวน','guard','knight',2],//275
 ['nautilus','หอยงวงช้าง','multi','bard',2],//276
 ['sea cucumber','ปลิงทะเล','heal','priest',5],//277
 ['salmon','ปลาแซลมอน','crit','archer',2],//278
 ['catfish','ปลาดุก','steal','rogue',1],//279
 ['piranha','ปลาปิรันย่า','multi','bard',2],//280
 ['axolotl','ซาลาแมนเดอร์แอกโซลอเทิล','heal','priest',2],//281
 ['sunfish','ปลาหมอทะเล','hp','brawler',1],//282
 ['eagle','นกอินทรี','crit','swordsman',1],//283
 ['owl','นกฮูก','stun','mage',2],//284
 ['parrot','นกแก้ว','multi','archer',1],//285
 ['penguin','เพนกวิน','guard','swordsman',1],//286
 ['flamingo','นกฟลามิงโก','heal','bard',2],//287
 ['peacock','นกยูง','splash','mage',1],//288
 ['swan','หงส์','heal','priest',2],//289
 ['duck','เป็ด','multi','brawler',1],//290
 ['chicken','ไก่','hp','merchant',2],//291
 ['rooster','ไก่ชน','crit','rogue',1],//292
 ['crow','อีกา','steal','thief',1],//293
 ['sparrow','นกกระจอก','multi','brawler',1],//294
 ['hummingbird','นกฮัมมิงเบิร์ด','crit','swordsman',3],//295
 ['woodpecker','นกหัวขวาน','multi','bard',1],//296
 ['toucan','นกทูแคน','splash','mage',3],//297
 ['pelican','นกกระทุง','steal','merchant',4],//298
 ['ostrich','นกกระจอกเทศ','multi','swordsman',3],//299
 ['kingfisher','นกกระเต็น','crit','rogue',2],//300
 ['crane','นกกระเรียน','heal','priest',2],//301
 ['falcon','เหยี่ยว','crit','archer',1],//302
 ['vulture','แร้ง','steal','rogue',2],//303
 ['dove','นกพิราบ','heal','priest',2],//304
 ['stork','นกกระสา','heal','priest',1],//305
 ['magpie','นกกางเขน','steal','merchant',1],//306
 ['seagull','นกนางนวล','multi','swordsman',1],//307
 ['kiwi bird','นกกีวี','hp','priest',2],//308
 ['cockatoo','นกกระตั้ว','stun','mage',4],//309
 ['hornbill','นกเงือก','boss','brawler',1],//310
 ['albatross','นกอัลบาทรอส','crit','swordsman',3],//311
 ['turkey','ไก่งวง','hp','priest',3],//312
 ['carpenter bee','ผึ้งช่างไม้','crit','rogue',3],//313
 ['fire ant','มดไฟ','burn','alchemist',3],//314
 ['leafcutter ant','มดตัดใบไม้','multi','swordsman',3],//315
 ['tiger beetle','ด้วงเสือ','crit','rogue',2],//316
 ['longhorn beetle','ด้วงหนวดยาว','boss','swordsman',1],//317
 ['antlion','มดสิงห์','stun','bard',1],//318
 ['mole cricket','จิ้งหรีดตัวตุ่น','thorn','swordsman',1],//319
 ['assassin bug','แมลงนักฆ่า','steal','merchant',1],//320
 ['shield bug','มวนโล่','guard','knight',1],//321
 ['harvestman','แมงมุมขายาว','multi','brawler',2],//322
 ['black widow','แมงมุมแม่ม่ายดำ','stun','alchemist',2],//323
 ['huntsman spider','แมงมุมฮันต์สแมน','multi','bard',3],//324
 ['trapdoor spider','แมงมุมประตูกล','stun','mage',1],//325
 ['bombardier beetle','ด้วงระเบิด','splash','alchemist',1],//326
 ['hamster','แฮมสเตอร์','hp','merchant',1],//327
 ['velvet ant','มดกำมะหยี่','burn','mage',1],//328
 ['snow leopard','เสือดาวหิมะ','crit','rogue',2],//329
 ['jaguar','จากัวร์','boss','brawler',1],//330
 ['cheetah','เสือชีตาห์','multi','swordsman',1],//331
 ['lynx','แมวป่าลิงซ์','crit','rogue',5],//332
 ['hyena','ไฮยีนา','steal','thief',1],//333
 ['jackal','หมาจิ้งจอกทอง','steal','merchant',1],//334
 ['polar bear','หมีขาว','guard','knight',3],//335
 ['sun bear','หมีหมา','thorn','brawler',1],//336
 ['mongoose','พังพอน','crit','rogue',1],//337
 ['skunk','สกั๊งค์','stun','bard',2],//338
 ['ferret','เฟอร์เรต','multi','swordsman',3],//339
 ['lemur','ลีเมอร์','multi','bard',2],//340
 ['orangutan','อุรังอุตัง','hp','knight',3],//341
 ['baboon','ลิงบาบูน','boss','brawler',1],//342
 ['chimpanzee','ชิมแปนซี','steal','rogue',1],//343
 ['bison','ควายไบซัน','hp','priest',2],//344
 ['yak','จามรี','guard','knight',2],//345
 ['llama','ลามะ','stun','bard',4],//346
 ['alpaca','อัลปากา','heal','bard',3],//347
 ['donkey','ลา','hp','priest',1],//348
 ['reindeer','กวางเรนเดียร์','multi','archer',1],//349
 ['moose','กวางมูส','boss','brawler',5],//350
 ['antelope','แอนทีโลป','crit','swordsman',1],//351
 ['okapi','โอคาปี','guard','priest',2],//352
 ['wombat','วอมแบต','hp','knight',2],//353
 ['platypus','ตุ่นปากเป็ด','stun','bard',5],//354
 ['echidna','อีคิดนา','thorn','swordsman',1],//355
 ['tasmanian devil','ปีศาจแทสเมเนียน','boss','brawler',1],//356
 ['anteater','ตัวกินมด','steal','thief',1],//357
 ['capybara','คาปิบารา','heal','alchemist',1],//358
 ['chinchilla','ชินชิลล่า','guard','knight',1],//359
 ['komodo dragon','มังกรโคโมโด','burn','mage',1],//360
 ['iguana','อีกัวนา','thorn','knight',1],//361
 ['gecko','ตุ๊กแก','multi','brawler',2],//362
 ['python','งูหลาม','stun','alchemist',3],//363
 ['toad','คางคก','thorn','brawler',1],//364
 ['great white shark','ฉลามขาว','boss','swordsman',3],//365
 ['hammerhead shark','ฉลามหัวค้อน','crit','archer',3],//366
 ['whale shark','ฉลามวาฬ','hp','merchant',4],//367
 ['beluga','วาฬเบลูก้า','heal','priest',1],//368
 ['sperm whale','วาฬสเปิร์ม','boss','swordsman',2],//369
 ['sea lion','สิงโตทะเล','multi','brawler',1],//370
 ['manatee','พะยูนทะเล','heal','bard',4],//371
 ['stingray','กระเบนหางพิษ','thorn','brawler',1],//372
 ['moray eel','ปลาไหลมอเรย์','boss','swordsman',4],//373
 ['electric eel','ปลาไหลไฟฟ้า','stun','bard',2],//374
 ['barracuda','ปลาบาราคูด้า','crit','swordsman',2],//375
 ['tuna','ปลาทูน่า','hp','priest',2],//376
 ['flying fish','ปลาบิน','multi','archer',1],//377
 ['sailfish','ปลาใบเรือ','crit','archer',4],//378
 ['lionfish','ปลาสิงโต','thorn','swordsman',1],//379
 ['flounder','ปลาลิ้นหมา','steal','merchant',1],//380
 ['oarfish','ปลาริบบิ้น','heal','priest',1],//381
 ['giant squid','ปลาหมึกยักษ์ใหญ่','boss','brawler',2],//382
 ['cuttlefish','ปลาหมึกกระดอง','steal','rogue',3],//383
 ['nudibranch','ทากทะเลสีสัน','burn','mage',2],//384
 ['blue-ringed octopus','ปลาหมึกวงน้ำเงิน','stun','mage',2],//385
 ['horseshoe crab','แมงดาทะเล','guard','swordsman',4],//386
 ['king crab','ปูอลาสก้า','boss','knight',1],//387
 ['coconut crab','ปูมะพร้าว','hp','priest',2],//388
 ['oyster','หอยนางรม','guard','knight',1],//389
 ['scallop','หอยเชลล์','multi','brawler',2],//390
 ['sea anemone','ดอกไม้ทะเล','heal','bard',1],//391
 ['sea dragon','มังกรทะเลใบไม้','multi','bard',2],//392
 ['mudskipper','ปลาตีน','steal','thief',2],//393
 ['betta fish','ปลากัด','crit','archer',1],//394
 ['arowana','ปลามังกร','boss','knight',3],//395
 ['sturgeon','ปลาสเตอร์เจียน','guard','priest',1],//396
 ['snapping turtle','เต่าล่า','thorn','knight',4],//397
 ['giant salamander','ซาลาแมนเดอร์ยักษ์','hp','brawler',2],//398
 ['dugong','พะยูน','heal','bard',3],//399
 ['bald eagle','นกอินทรีหัวขาว','crit','rogue',2],//400
 ['harpy eagle','นกอินทรีฮาร์ปี','boss','swordsman',1],//401
 ['snowy owl','นกฮูกหิมะ','stun','bard',3],//402
 ['barn owl','นกแสก','steal','rogue',1],//403
 ['roadrunner','นกวิ่งเร็ว','multi','bard',4],//404
 ['cassowary','นกคาสโซแวรี','boss','swordsman',2],//405
 ['emu','นกอีมู','multi','brawler',2],//406
 ['kookaburra','นกกระเต็นหัวเราะ','stun','alchemist',1],//407
 ['lyrebird','นกพิณ','multi','bard',2],//408
 ['bird of paradise','นกสวรรค์','splash','mage',3],//409
 ['macaw','นกมาคอว์','crit','archer',2],//410
 ['lovebird','นกเลิฟเบิร์ด','heal','bard',1],//411
 ['canary','นกคีรีบูน','stun','mage',2],//412
 ['cardinal','นกคาร์ดินัล','burn','mage',1],//413
 ['blue jay','นกเจย์สีน้ำเงิน','steal','merchant',1],//414
 ['robin','นกโรบิน','heal','bard',3],//415
 ['swallow','นกนางแอ่น','crit','rogue',5],//416
 ['nightingale','นกไนติงเกล','heal','priest',1],//417
 ['heron','นกยาง','guard','swordsman',1],//418
 ['ibis','นกช้อนหอย','crit','swordsman',4],//419
 ['spoonbill','นกปากช้อน','steal','merchant',1],//420
 ['puffin','นกพัฟฟิน','multi','archer',3],//421
 ['cormorant','นกกาน้ำ','steal','merchant',4],//422
 ['pheasant','ไก่ฟ้า','splash','archer',1],//423
 ['quail','นกกระทา','multi','bard',4],//424
 ['grouse','ไก่ป่าเกราะ','guard','knight',1],//425
 ['black swan','หงส์ดำ','crit','archer',1],//426
 ['secretary bird','นกเลขานุการ','multi','swordsman',4],//427
 ['shoebill','นกปากรองเท้า','boss','brawler',1],//428
 ['finch','นกฟินช์','multi','archer',2],//429
 ['owl butterfly','ผีเสื้อตาเค้าแมว','stun','bard',1],//430
 ['swallowtail','ผีเสื้อหางติ่ง','crit','swordsman',1],//431
 ['luna moth','ผีเสื้อกลางคืนลูน่า','heal','priest',3],//432
 ['scarab beetle','ด้วงสคารับ','guard','knight',1],//433
 ['glowworm','หนอนเรืองแสง','burn','alchemist',2],//434
 ['paper wasp','แตนกระดาษ','multi','swordsman',2],//435
 ['wolf spider','แมงมุมหมาป่า','crit','rogue',1],//436
 ['orb weaver','แมงมุมใยกลม','stun','mage',1],//437
 ['camel spider','แมงมุมอูฐ','boss','brawler',1],//438
 ['giant water bug','แมงดานา','steal','rogue',1],//439
 ['cave cricket','จิ้งหรีดถ้ำ','multi','bard',1],//440
 ['giraffe weevil','ด้วงงวงยีราฟ','crit','rogue',2],//441
 ['cuckoo wasp','ต่อกาเหว่า','thorn','brawler',4],//442
 ['flea','หมัด','steal','rogue',3],//443
 ['leaf beetle','ด้วงใบไม้','splash','mage',2],//444
 ['aardvark','อาร์ดวาร์ก','steal','thief',2],//445
 ['pika','พิกา','multi','brawler',3],//446
 ['binturong','บินตุรง','stun','alchemist',1],//447
 ['fossa','ฟอสซา','crit','rogue',3],//448
 ['fire stone','หินไฟ','burn','mage',3],//449
 ['water stone','หินน้ำ','heal','alchemist',3],//450
 ['wind stone','หินลม','multi','swordsman',1],//451
 ['earth stone','หินดิน','hp','priest',4],//452
 ['thunder stone','หินสายฟ้า','stun','mage',2],//453
 ['frost stone','หินน้ำแข็ง','stun','bard',1],//454
 ['light stone','หินแสง','heal','bard',2],//455
 ['shadow stone','หินเงา','steal','merchant',1],//456
 ['poison stone','หินพิษ','burn','mage',5],//457
 ['steel stone','หินเหล็กกล้า','guard','swordsman',2],//458
 ['forest stone','หินป่า','heal','bard',1],//459
 ['magnet stone','หินแม่เหล็ก','steal','merchant',1],//460
 ['steam stone','หินไอน้ำ','burn','mage',1],//461
 ['mud stone','หินโคลน','stun','bard',2],//462
 ['dream stone','หินความฝัน','stun','alchemist',1],//463
 ['spirit stone','หินวิญญาณ','heal','priest',2],//464
 ['rune stone','หินอักขระ','crit','rogue',1],//465
 ['soul stone','หินวิญญาณแดง','boss','brawler',4],//466
 ['time stone','หินกาลเวลา','multi','swordsman',3],//467
 ['gravity stone','หินแรงโน้มถ่วง','boss','brawler',4],//468
 ['sound stone','หินเสียง','stun','mage',2],//469
 ['rainbow stone','หินสายรุ้ง','splash','alchemist',3],//470
 ['ember stone','หินถ่านแดง','burn','archer',1],//471
 ['tide stone','หินคลื่น','multi','bard',2],//472
 ['storm stone','หินพายุ','splash','mage',2],//473
 ['ash stone','หินเถ้า','steal','merchant',1],//474
 ['echo stone','หินเสียงสะท้อน','multi','swordsman',1],//475
 ['mirror stone','หินกระจก','thorn','brawler',1],//476
 ['aurora stone','หินแสงเหนือ','crit','rogue',4],//477
 ['dust stone','หินฝุ่น','stun','bard',1],//478
 ['cloud','เมฆ','heal','bard',1],//479
 ['rain cloud','เมฆฝน','heal','priest',3],//480
 ['storm cloud','เมฆพายุ','splash','mage',1],//481
 ['rainbow','สายรุ้ง','splash','alchemist',2],//482
 ['tornado','พายุหมุน','multi','swordsman',1],//483
 ['snowflake','เกล็ดหิมะ','stun','mage',5],//484
 ['fog','หมอก','steal','thief',5],//485
 ['sunrise','อรุณรุ่ง','heal','alchemist',1],//486
 ['sunset','อัสดง','burn','archer',1],//487
 ['full moon','จันทร์เพ็ญ','crit','rogue',1],//488
 ['crescent moon','จันทร์เสี้ยว','crit','rogue',2],//489
 ['sun','ดวงอาทิตย์','burn','alchemist',1],//490
 ['solar eclipse','สุริยุปราคา','boss','knight',1],//491
 ['aurora','แสงเหนือ','heal','priest',3],//492
 ['lightning bolt','สายฟ้าฟาด','crit','rogue',3],//493
 ['hailstone','ลูกเห็บ','thorn','brawler',2],//494
 ['dewdrop','หยดน้ำค้าง','heal','bard',1],//495
 ['typhoon','ไต้ฝุ่น','splash','mage',4],//496
 ['breeze','สายลมเบา','multi','archer',2],//497
 ['icicle','หยดน้ำแข็ง','thorn','brawler',2],//498
 ['raindrop','หยดฝน','multi','swordsman',1],//499
 ['sandstorm','พายุทราย','stun','mage',2],//500
 ['blizzard','พายุหิมะ','splash','mage',4],//501
 ['twilight','พลบค่ำ','steal','merchant',2],//502
 ['night sky','ท้องฟ้ายามค่ำ','crit','swordsman',2],//503
 ['dawn','รุ่งสาง','heal','priest',1],//504
 ['monsoon','มรสุม','hp','knight',1],//505
 ['sky lantern','โคมลอย','burn','alchemist',2],//506
 ['wind chime','กระดิ่งลม','stun','alchemist',2],//507
 ['mercury planet','ดาวพุธ','crit','rogue',3],//508
 ['venus planet','ดาวศุกร์','burn','mage',1],//509
 ['mars planet','ดาวอังคาร','boss','brawler',3],//510
 ['jupiter planet','ดาวพฤหัส','hp','merchant',1],//511
 ['saturn planet','ดาวเสาร์','guard','priest',1],//512
 ['uranus planet','ดาวยูเรนัส','stun','mage',2],//513
 ['neptune planet','ดาวเนปจูน','multi','brawler',2],//514
 ['pluto','ดาวพลูโต','steal','rogue',1],//515
 ['comet','ดาวหาง','multi','bard',4],//516
 ['shooting star','ดาวตก','crit','rogue',4],//517
 ['north star','ดาวเหนือ','heal','alchemist',1],//518
 ['binary star','ดาวคู่','multi','swordsman',3],//519
 ['supernova','ซูเปอร์โนวา','splash','mage',1],//520
 ['black hole','หลุมดำ','boss','swordsman',1],//521
 ['nebula','เนบิวลา','splash','alchemist',1],//522
 ['galaxy','กาแล็กซี','hp','merchant',1],//523
 ['asteroid','ดาวเคราะห์น้อย','thorn','brawler',4],//524
 ['aries','ราศีเมษ','boss','swordsman',2],//525
 ['taurus','ราศีพฤษภ','hp','brawler',1],//526
 ['gemini','ราศีเมถุน','multi','swordsman',1],//527
 ['cancer','ราศีกรกฎ','thorn','brawler',2],//528
 ['virgo','ราศีกันย์','heal','priest',1],//529
 ['libra','ราศีตุลย์','guard','swordsman',3],//530
 ['sagittarius','ราศีธนู','crit','swordsman',2],//531
 ['capricorn','ราศีมังกร','hp','priest',1],//532
 ['aquarius','ราศีกุมภ์','heal','priest',1],//533
 ['pisces','ราศีมีน','multi','brawler',1],//534
 ['orion','กลุ่มดาวนายพราน','crit','swordsman',1],//535
 ['big dipper','กลุ่มดาวจตุรทิศ','guard','priest',1],//536
 ['southern cross','กลุ่มดาวกางเขนใต้','heal','priest',5],//537
 ['cypress','ต้นไซเปรส','guard','swordsman',2],//538
 ['fir','ต้นเฟอร์','thorn','swordsman',3],//539
 ['spruce','ต้นสปรูซ','guard','priest',1],//540
 ['elm','ต้นเอล์ม','hp','knight',5],//541
 ['ash tree','ต้นแอช','multi','brawler',1],//542
 ['beech','ต้นบีช','hp','merchant',2],//543
 ['poplar','ต้นป็อปลาร์','multi','bard',2],//544
 ['aspen','ต้นแอสเพน','heal','priest',1],//545
 ['acacia','ต้นอะคาเซีย','thorn','brawler',1],//546
 ['eucalyptus','ต้นยูคาลิปตัส','heal','bard',1],//547
 ['mangrove','ต้นโกงกาง','guard','priest',3],//548
 ['teak','ต้นสัก','hp','knight',1],//549
 ['mahogany','ต้นมะฮอกกานี','hp','brawler',3],//550
 ['ebony','ต้นมะเกลือ','boss','knight',1],//551
 ['sandalwood','ต้นจันทน์หอม','heal','priest',1],//552
 ['cinnamon tree','ต้นอบเชย','burn','mage',1],//553
 ['olive tree','ต้นมะกอก','crit','archer',1],//554
 ['rubber tree','ต้นยางพารา','steal','rogue',2],//555
 ['plumeria','ต้นลีลาวดี','heal','priest',1],//556
 ['jacaranda','ต้นแจ็กกาแรนดา','stun','mage',2],//557
 ['flame tree','ต้นหางนกยูงแดง','burn','alchemist',1],//558
 ['camphor tree','ต้นการบูร','stun','alchemist',1],//559
 ['dragon blood tree','ต้นเลือดมังกร','boss','brawler',3],//560
 ['joshua tree','ต้นโจชัว','thorn','knight',2],//561
 ['monkey puzzle','ต้นลิงปีน','thorn','brawler',5],//562
 ['cork oak','ต้นโอ๊กคอร์ก','guard','knight',3],//563
 ['linden','ต้นลินเดน','heal','priest',2],//564
 ['holly','ต้นฮอลลี่','thorn','knight',3],//565
 ['yew','ต้นยิว','steal','merchant',2],//566
 ['hawthorn','ต้นฮอว์ธอร์น','thorn','swordsman',2],//567
 ['leo','ราศีสิงห์','burn','mage',1],//568
];
const NSP=MON.length,ST=['ร่าง 1','ร่าง 2','ร่าง 3'],KEY='veggie_v2';
/* น้ำหนักสุ่มตอนปลูก ตามความหายาก 1..5 */
const RW=[0,50,26,14,7,3];
const JOB={mage:'นักเวท',rogue:'โจร',thief:'หัวขโมย',archer:'นักธนู',merchant:'พ่อค้า',swordsman:'นักดาบ',priest:'นักบวช',knight:'อัศวิน',brawler:'นักสู้หมัด',bard:'นักดนตรี',alchemist:'นักเล่นแร่แปรธาตุ'};
/* ชื่อที่แสดง: no(k) = "No.001", no(k,1) = "No.001/v.2", no(k,2) = "No.001/Max" */
const no=(k,s)=>'No.'+String(k+1).padStart(3,'0')+(s===1?'/v.2':s===2?'/Max':'');
const sheetOf=k=>Math.floor(k/4)+1;
