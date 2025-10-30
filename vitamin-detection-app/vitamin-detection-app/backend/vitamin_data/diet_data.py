    # backend/vitamin_data/diet_data.py
# 7-day progressive meal plans for common vitamin deficiencies.
# Day intake_percent gradually improves from ~60% -> ~100% across the week.

vitamin_diets = {
    "VitaminA": {
        "fact": "Vitamin A supports healthy vision, skin, and immune function.",
        "rda": 900,  # µg
        "intake_percent": 60,  # top-level defaults to Day 1
        "plan": [
            {
                "day": "Day 1",
                "intake_percent": 60,
                "meals": [
                    {"type": "Breakfast", "food": "Carrot Juice 🥕", "nutrients": "Vitamin A 35%", "alternatives": ["Papaya Smoothie 🥭", "Spinach Omelette 🥬"]},
                    {"type": "Lunch", "food": "Sweet Potato Curry 🍠 with 1 chapati", "nutrients": "Vitamin A 40%", "alternatives": ["Pumpkin Soup 🎃", "Egg Salad 🥚"]},
                    {"type": "Dinner", "food": "Palak Paneer (Spinach & cheese) with brown rice", "nutrients": "Vitamin A 30%", "alternatives": ["Grilled Salmon 🐟", "Moong Dal Khichdi 🍛"]},
                ]
            },
            {
                "day": "Day 2",
                "intake_percent": 68,
                "meals": [
                    {"type": "Breakfast", "food": "Sweet potato cheela with yogurt", "nutrients": "Vitamin A 38%", "alternatives": ["Carrot paratha", "Papaya bowl"]},
                    {"type": "Lunch", "food": "Mixed vegetable curry (carrot, pumpkin) + roti", "nutrients": "Vitamin A 35%", "alternatives": ["Methi dal", "Paneer bhurji"]},
                    {"type": "Dinner", "food": "Fish curry with spinach side", "nutrients": "Vitamin A 30%", "alternatives": ["Lentil soup", "Tofu stir-fry"]},
                ]
            },
            {
                "day": "Day 3",
                "intake_percent": 74,
                "meals": [
                    {"type": "Breakfast", "food": "Oats with grated carrot & nuts", "nutrients": "Vitamin A 25%", "alternatives": ["Vegetable upma", "Papaya smoothie"]},
                    {"type": "Lunch", "food": "Rajma with spinach salad", "nutrients": "Vitamin A 30%", "alternatives": ["Chole with pumpkin"]},
                    {"type": "Dinner", "food": "Grilled salmon with sautéed kale", "nutrients": "Vitamin A 45%", "alternatives": ["Palak dal", "Paneer wrap"]},
                ]
            },
            {
                "day": "Day 4",
                "intake_percent": 78,
                "meals": [
                    {"type": "Breakfast", "food": "Mango lassi (seasonal) + boiled egg", "nutrients": "Vitamin A 30%", "alternatives": ["Carrot juice", "Papaya bowl"]},
                    {"type": "Lunch", "food": "Baked sweet potato & mixed greens", "nutrients": "Vitamin A 40%", "alternatives": ["Pumpkin curry","Soya curry"]},
                    {"type": "Dinner", "food": "Chicken tikka with spinach raita", "nutrients": "Vitamin A 30%", "alternatives": ["Grilled fish", "Dal with greens"]},
                ]
            },
            {
                "day": "Day 5",
                "intake_percent": 84,
                "meals": [
                    {"type": "Breakfast", "food": "Besan chilla stuffed with carrot & peas", "nutrients": "Vitamin A 35%", "alternatives": ["Sprout dosa","Spinach omelette"]},
                    {"type": "Lunch", "food": "Mixed veg curry (bright orange/yellow vegs) + roti", "nutrients": "Vitamin A 35%", "alternatives": ["Fish curry","Paneer bhaji"]},
                    {"type": "Dinner", "food": "Moong dal khichdi with ghee & carrot salad", "nutrients": "Vitamin A 30%", "alternatives": ["Grilled tofu","Lentil soup"]},
                ]
            },
            {
                "day": "Day 6",
                "intake_percent": 92,
                "meals": [
                    {"type": "Breakfast", "food": "Papaya and mango fruit bowl", "nutrients": "Vitamin A 45%", "alternatives": ["Carrot smoothie","Pumpkin porridge"]},
                    {"type": "Lunch", "food": "Palak paneer with millet roti", "nutrients": "Vitamin A 30%", "alternatives": ["Fish curry", "Egg bhurji"]},
                    {"type": "Dinner", "food": "Vegetable stew with sweet potato", "nutrients": "Vitamin A 25%", "alternatives": ["Dal with greens"]},
                ]
            },
            {
                "day": "Day 7",
                "intake_percent": 100,
                "meals": [
                    {"type": "Breakfast", "food": "Mango smoothie + boiled egg", "nutrients": "Vitamin A 50%", "alternatives": ["Papaya smoothie","Carrot paratha"]},
                    {"type": "Lunch", "food": "Grilled salmon + spinach salad", "nutrients": "Vitamin A 30%", "alternatives": ["Paneer palak","Sweet potato curry"]},
                    {"type": "Dinner", "food": "Light khichdi with ghee and carrot raita", "nutrients": "Vitamin A 20%", "alternatives": ["Lentil soup","Stir-fried greens"]},
                ]
            }
        ]
    },

    "VitaminB1": {
        "fact": "Thiamine (B1) supports energy metabolism and nervous system function.",
        "rda": 1.2,  # mg
        "intake_percent": 60,
        "plan": [
            {"day":"Day 1","intake_percent":60,"meals":[
                {"type":"Breakfast","food":"Oats porridge with seeds","nutrients":"B1 30%","alternatives":["Whole wheat toast","Besan chilla"]},
                {"type":"Lunch","food":"Brown rice + rajma","nutrients":"B1 20%","alternatives":["Sattu paratha","Lentil curry"]},
                {"type":"Dinner","food":"Grilled chicken with mixed veg","nutrients":"B1 10%","alternatives":["Paneer bhurji","Tofu stir-fry"]}
            ]},
            {"day":"Day 2","intake_percent":66,"meals":[
                {"type":"Breakfast","food":"Whole wheat upma with peanuts","nutrients":"B1 28%","alternatives":["Ragi porridge","Sprouts salad"]},
                {"type":"Lunch","food":"Chickpea curry + brown rice","nutrients":"B1 25%","alternatives":["Lentil soup","Quinoa pulao"]},
                {"type":"Dinner","food":"Egg curry with roti","nutrients":"B1 13%","alternatives":["Fish curry","Tofu curry"]}
            ]},
            {"day":"Day 3","intake_percent":72,"meals":[
                {"type":"Breakfast","food":"Peanut butter on whole wheat toast","nutrients":"B1 30%","alternatives":["Oats","Sprouts sandwich"]},
                {"type":"Lunch","food":"Methi dal + bajra roti","nutrients":"B1 25%","alternatives":["Rajma","Chole"]},
                {"type":"Dinner","food":"Grilled fish + steamed broccoli","nutrients":"B1 17%","alternatives":["Paneer tikka","Lentil stew"]}
            ]},
            {"day":"Day 4","intake_percent":78,"meals":[
                {"type":"Breakfast","food":"Millet idli with chutney","nutrients":"B1 30%","alternatives":["Oats dosa","Poha"]},
                {"type":"Lunch","food":"Sattu drink + vegetable sabzi","nutrients":"B1 30%","alternatives":["Brown rice bowl","Lentil curry"]},
                {"type":"Dinner","food":"Chicken stew with root veg","nutrients":"B1 18%","alternatives":["Fish curry","Tofu stir fry"]}
            ]},
            {"day":"Day 5","intake_percent":85,"meals":[
                {"type":"Breakfast","food":"Sprouted moong with lemon","nutrients":"B1 35%","alternatives":["Peanut chutney sandwich","Upma"]},
                {"type":"Lunch","food":"Quinoa pulao with peas","nutrients":"B1 30%","alternatives":["Rajma bowl","Chole"]},
                {"type":"Dinner","food":"Dal tadka with millet roti","nutrients":"B1 20%","alternatives":["Grilled fish","Paneer bhurji"]}
            ]},
            {"day":"Day 6","intake_percent":92,"meals":[
                {"type":"Breakfast","food":"Fortified cereals with milk","nutrients":"B1 40%","alternatives":["Oats","Ragi dosa"]},
                {"type":"Lunch","food":"Chicken biryani (small) + salad","nutrients":"B1 30%","alternatives":["Fish fry","Paneer curry"]},
                {"type":"Dinner","food":"Mixed vegetable sambar with brown rice","nutrients":"B1 22%","alternatives":["Lentil soup","Tofu curry"]}
            ]},
            {"day":"Day 7","intake_percent":100,"meals":[
                {"type":"Breakfast","food":"Peanut chutney dosa + banana","nutrients":"B1 45%","alternatives":["Sprouted salad","Oats bowl"]},
                {"type":"Lunch","food":"Brown rice with mushroom curry","nutrients":"B1 30%","alternatives":["Rajma","Chole"]},
                {"type":"Dinner","food":"Light chicken soup + roti","nutrients":"B1 25%","alternatives":["Paneer stew","Lentil khichdi"]}
            ]}
        ]
    },

    "VitaminB2": {
        "fact": "Riboflavin (B2) helps energy production and skin/eye health.",
        "rda": 1.3,  # mg
        "intake_percent": 60,
        "plan": [
            {"day":"Day 1","intake_percent":60,"meals":[
                {"type":"Breakfast","food":"Milk + fortified cereal","nutrients":"B2 30%","alternatives":["Curd with fruit","Paneer sandwich"]},
                {"type":"Lunch","food":"Spinach paneer + brown rice","nutrients":"B2 20%","alternatives":["Dal with greens"]},
                {"type":"Dinner","food":"Grilled fish with sautéed mushrooms","nutrients":"B2 10%","alternatives":["Egg curry","Tofu stir-fry"]}
            ]},
            {"day":"Day 2","intake_percent":66,"meals":[
                {"type":"Breakfast","food":"Idli with sambar (fermented)","nutrients":"B2 28%","alternatives":["Dosa with chutney","Oats porridge"]},
                {"type":"Lunch","food":"Egg salad + multigrain bread","nutrients":"B2 30%","alternatives":["Paneer bhurji","Chole"]},
                {"type":"Dinner","food":"Lentil soup with greens","nutrients":"B2 8%","alternatives":["Fish curry","Paneer curry"]}
            ]},
            {"day":"Day 3","intake_percent":72,"meals":[
                {"type":"Breakfast","food":"Yogurt bowl with nuts","nutrients":"B2 30%","alternatives":["Milk smoothie","Fortified cereal"]},
                {"type":"Lunch","food":"Mutton or chicken curry (lean) + roti","nutrients":"B2 30%","alternatives":["Fish curry","Tofu curry"]},
                {"type":"Dinner","food":"Mixed veg stir fry with mushrooms","nutrients":"B2 12%","alternatives":["Dal","Paneer tikka"]}
            ]},
            {"day":"Day 4","intake_percent":78,"meals":[
                {"type":"Breakfast","food":"Boiled eggs + whole wheat toast","nutrients":"B2 35%","alternatives":["Milk bowl","Paneer sandwich"]},
                {"type":"Lunch","food":"Spinach dal + millet roti","nutrients":"B2 30%","alternatives":["Grilled fish","Chole"]},
                {"type":"Dinner","food":"Mushroom soup + salad","nutrients":"B2 13%","alternatives":["Tofu stew","Lentil khichdi"]}
            ]},
            {"day":"Day 5","intake_percent":85,"meals":[
                {"type":"Breakfast","food":"Paneer bhurji + roti","nutrients":"B2 35%","alternatives":["Yogurt + fruit","Cottage cheese toast"]},
                {"type":"Lunch","food":"Mixed bean salad + brown rice","nutrients":"B2 30%","alternatives":["Egg curry","Chicken salad"]},
                {"type":"Dinner","food":"Grilled fish with steamed greens","nutrients":"B2 20%","alternatives":["Paneer stir-fry","Lentil soup"]}
            ]},
            {"day":"Day 6","intake_percent":92,"meals":[
                {"type":"Breakfast","food":"Fortified milkshake with banana","nutrients":"B2 40%","alternatives":["Yogurt parfait","Eggs"]},
                {"type":"Lunch","food":"Tofu stir-fry with broccoli","nutrients":"B2 30%","alternatives":["Fish curry","Paneer curry"]},
                {"type":"Dinner","food":"Vegetable stew with mushrooms","nutrients":"B2 22%","alternatives":["Lentil khichdi","Grilled chicken"]}
            ]},
            {"day":"Day 7","intake_percent":100,"meals":[
                {"type":"Breakfast","food":"Boiled eggs + milk + whole grain toast","nutrients":"B2 45%","alternatives":["Paneer sandwich","Yogurt bowl"]},
                {"type":"Lunch","food":"Grilled salmon + spinach salad","nutrients":"B2 30%","alternatives":["Mutton curry","Tofu bowl"]},
                {"type":"Dinner","food":"Light dal with steamed greens","nutrients":"B2 25%","alternatives":["Vegetable soup","Paneer tikka"]}
            ]}
        ]
    },

    "VitaminB3": {
        "fact": "Niacin (B3) supports metabolism, skin health, and nervous system.",
        "rda": 16,  # mg
        "intake_percent": 60,
        "plan": [
            {"day":"Day 1","intake_percent":60,"meals":[
                {"type":"Breakfast","food":"Peanut butter on whole grain toast","nutrients":"B3 30%","alternatives":["Oats with nuts","Sprout salad"]},
                {"type":"Lunch","food":"Chicken or chickpea salad with brown rice","nutrients":"B3 20%","alternatives":["Mutton stew","Lentil curry"]},
                {"type":"Dinner","food":"Grilled fish with veg","nutrients":"B3 10%","alternatives":["Paneer bhurji","Tofu stir-fry"]}
            ]},
            {"day":"Day 2","intake_percent":66,"meals":[
                {"type":"Breakfast","food":"Fortified cereals + milk","nutrients":"B3 28%","alternatives":["Upma","Ragi porridge"]},
                {"type":"Lunch","food":"Peanut curry + brown rice","nutrients":"B3 30%","alternatives":["Chole","Rajma"]},
                {"type":"Dinner","food":"Egg curry + roti","nutrients":"B3 8%","alternatives":["Grilled fish","Paneer curry"]}
            ]},
            {"day":"Day 3","intake_percent":72,"meals":[
                {"type":"Breakfast","food":"Sprouted moong + nuts","nutrients":"B3 30%","alternatives":["Peanut dosa","Oats bowl"]},
                {"type":"Lunch","food":"Tuna or salmon salad + quinoa","nutrients":"B3 30%","alternatives":["Chicken salad","Lentil soup"]},
                {"type":"Dinner","food":"Vegetable stew with nuts","nutrients":"B3 12%","alternatives":["Paneer tikka","Tofu curry"]}
            ]},
            {"day":"Day 4","intake_percent":78,"meals":[
                {"type":"Breakfast","food":"Banana and peanut smoothie","nutrients":"B3 30%","alternatives":["Peanut butter toast","Yogurt bowl"]},
                {"type":"Lunch","food":"Grilled chicken with brown rice","nutrients":"B3 35%","alternatives":["Fish curry","Chole"]},
                {"type":"Dinner","food":"Lentil dal with millet roti","nutrients":"B3 13%","alternatives":["Tofu stir-fry","Paneer bhurji"]}
            ]},
            {"day":"Day 5","intake_percent":85,"meals":[
                {"type":"Breakfast","food":"Fortified cereals with fruits","nutrients":"B3 35%","alternatives":["Oats","Sprout salad"]},
                {"type":"Lunch","food":"Rajma with quinoa","nutrients":"B3 30%","alternatives":["Chickpea curry","Mutton stew"]},
                {"type":"Dinner","food":"Grilled salmon + veggies","nutrients":"B3 20%","alternatives":["Paneer curry","Lentil soup"]}
            ]},
            {"day":"Day 6","intake_percent":92,"meals":[
                {"type":"Breakfast","food":"Peanut chutney dosa","nutrients":"B3 40%","alternatives":["Oats bowl","Sprouted salad"]},
                {"type":"Lunch","food":"Chicken biryani (small) with raita","nutrients":"B3 30%","alternatives":["Fish fry","Paneer bhurji"]},
                {"type":"Dinner","food":"Vegetable stew with nuts and seeds","nutrients":"B3 22%","alternatives":["Tofu curry","Lentil khichdi"]}
            ]},
            {"day":"Day 7","intake_percent":100,"meals":[
                {"type":"Breakfast","food":"Peanut butter + banana + milk","nutrients":"B3 45%","alternatives":["Oats","Yogurt bowl"]},
                {"type":"Lunch","food":"Grilled tuna/saalmon with salad","nutrients":"B3 30%","alternatives":["Chicken","Paneer"]},
                {"type":"Dinner","food":"Light lentil soup + roti","nutrients":"B3 25%","alternatives":["Vegetable stew","Paneer wrap"]}
            ]}
        ]
    },

    "VitaminB6": {
        "fact": "Vitamin B6 (pyridoxine) supports metabolism, red blood cell production, and nervous system.",
        "rda": 1.3,  # mg
        "intake_percent": 60,
        "plan": [
            {"day":"Day 1","intake_percent":60,"meals":[
                {"type":"Breakfast","food":"Banana + peanut butter on toast","nutrients":"B6 30%","alternatives":["Oats with banana","Eggs"]},
                {"type":"Lunch","food":"Chickpea curry with brown rice","nutrients":"B6 20%","alternatives":["Chicken salad","Tofu bowl"]},
                {"type":"Dinner","food":"Grilled fish with sweet potato","nutrients":"B6 10%","alternatives":["Paneer bhurji","Dal tadka"]}
            ]},
            {"day":"Day 2","intake_percent":66,"meals":[
                {"type":"Breakfast","food":"Sprouts salad and yogurt","nutrients":"B6 28%","alternatives":["Banana smoothie","Boiled egg"]},
                {"type":"Lunch","food":"Methi dal with millet roti","nutrients":"B6 30%","alternatives":["Chicken biryani (small)","Rajma"]},
                {"type":"Dinner","food":"Stir-fried tofu with bell peppers","nutrients":"B6 8%","alternatives":["Grilled fish","Paneer curry"]}
            ]},
            {"day":"Day 3","intake_percent":72,"meals":[
                {"type":"Breakfast","food":"Oats with almonds and banana","nutrients":"B6 30%","alternatives":["Peanut butter toast","Sprouted salad"]},
                {"type":"Lunch","food":"Chicken salad with avocado","nutrients":"B6 30%","alternatives":["Tuna salad","Lentil curry"]},
                {"type":"Dinner","food":"Vegetable stew with potatoes","nutrients":"B6 12%","alternatives":["Paneer tikka","Dal"]}
            ]},
            {"day":"Day 4","intake_percent":78,"meals":[
                {"type":"Breakfast","food":"Boiled eggs + whole wheat toast","nutrients":"B6 35%","alternatives":["Banana smoothie","Oats"]},
                {"type":"Lunch","food":"Soya chunks curry with brown rice","nutrients":"B6 30%","alternatives":["Chole","Rajma"]},
                {"type":"Dinner","food":"Grilled fish + sautéed spinach","nutrients":"B6 13%","alternatives":["Paneer curry","Lentil soup"]}
            ]},
            {"day":"Day 5","intake_percent":85,"meals":[
                {"type":"Breakfast","food":"Avocado toast + boiled egg","nutrients":"B6 35%","alternatives":["Oats bowl","Sprouts"]},
                {"type":"Lunch","food":"Quinoa salad with chickpeas","nutrients":"B6 30%","alternatives":["Chicken salad","Paneer bhurji"]},
                {"type":"Dinner","food":"Mixed veg curry + roti","nutrients":"B6 20%","alternatives":["Grilled salmon","Tofu"]}
            ]},
            {"day":"Day 6","intake_percent":92,"meals":[
                {"type":"Breakfast","food":"Fortified cereals + milk","nutrients":"B6 40%","alternatives":["Banana and nuts","Eggs"]},
                {"type":"Lunch","food":"Chicken stew + brown rice","nutrients":"B6 30%","alternatives":["Fish curry","Paneer curry"]},
                {"type":"Dinner","food":"Lentil khichdi with potato","nutrients":"B6 22%","alternatives":["Vegetable soup","Tofu stir fry"]}
            ]},
            {"day":"Day 7","intake_percent":100,"meals":[
                {"type":"Breakfast","food":"Banana pancakes with almond butter","nutrients":"B6 45%","alternatives":["Oats bowl","Yogurt parfait"]},
                {"type":"Lunch","food":"Grilled salmon + sweet potato mash","nutrients":"B6 30%","alternatives":["Chicken salad","Paneer"]},
                {"type":"Dinner","food":"Vegetable stew + millet roti","nutrients":"B6 25%","alternatives":["Dal","Lentil soup"]}
            ]}
        ]
    },

    "VitaminB7": {
        "fact": "Biotin (B7) is important for hair, skin, nails and carbohydrate/fat metabolism.",
        "rda": 30,  # µg
        "intake_percent": 60,
        "plan": [
            {"day":"Day 1","intake_percent":60,"meals":[
                {"type":"Breakfast","food":"Egg (yolk) + oats with seeds","nutrients":"B7 30%","alternatives":["Almond smoothie","Paneer"]},
                {"type":"Lunch","food":"Lentil stew with spinach","nutrients":"B7 20%","alternatives":["Chicken salad","Tofu bowl"]},
                {"type":"Dinner","food":"Mushroom curry + brown rice","nutrients":"B7 10%","alternatives":["Fish curry","Paneer bhurji"]}
            ]},
            {"day":"Day 2","intake_percent":66,"meals":[
                {"type":"Breakfast","food":"Almond butter on toast","nutrients":"B7 28%","alternatives":["Yogurt with seeds","Eggs"]},
                {"type":"Lunch","food":"Chickpea salad with nuts","nutrients":"B7 30%","alternatives":["Lentil bowl","Paneer tikka"]},
                {"type":"Dinner","food":"Grilled fish + veggies","nutrients":"B7 8%","alternatives":["Tofu curry","Dal"]}
            ]},
            {"day":"Day 3","intake_percent":72,"meals":[
                {"type":"Breakfast","food":"Banana + peanut butter + oats","nutrients":"B7 30%","alternatives":["Fortified cereal","Sprouts salad"]},
                {"type":"Lunch","food":"Paneer bhurji + roti","nutrients":"B7 30%","alternatives":["Chicken curry","Tofu stir fry"]},
                {"type":"Dinner","food":"Vegetable stew with almonds","nutrients":"B7 12%","alternatives":["Lentil soup","Fish"]}
            ]},
            {"day":"Day 4","intake_percent":78,"meals":[
                {"type":"Breakfast","food":"Yogurt parfait with seeds & nuts","nutrients":"B7 35%","alternatives":["Eggs","Oats"]},
                {"type":"Lunch","food":"Spinach and mushroom curry + millet roti","nutrients":"B7 30%","alternatives":["Chickpea salad","Grilled fish"]},
                {"type":"Dinner","food":"Tofu stir-fry with sesame seeds","nutrients":"B7 13%","alternatives":["Paneer","Lentil stew"]}
            ]},
            {"day":"Day 5","intake_percent":85,"meals":[
                {"type":"Breakfast","food":"Sprouted moong salad + nuts","nutrients":"B7 35%","alternatives":["Almond smoothie","Egg white omelette"]},
                {"type":"Lunch","food":"Quinoa bowl with beans & seeds","nutrients":"B7 30%","alternatives":["Rajma","Chole"]},
                {"type":"Dinner","food":"Grilled salmon with greens","nutrients":"B7 20%","alternatives":["Paneer","Tofu"]}
            ]},
            {"day":"Day 6","intake_percent":92,"meals":[
                {"type":"Breakfast","food":"Fortified cereal + milk + banana","nutrients":"B7 40%","alternatives":["Yogurt parfait","Eggs"]},
                {"type":"Lunch","food":"Chicken salad with avocado & nuts","nutrients":"B7 30%","alternatives":["Fish","Paneer"]},
                {"type":"Dinner","food":"Vegetable stew with seeds & nuts","nutrients":"B7 22%","alternatives":["Dal","Tofu stir fry"]}
            ]},
            {"day":"Day 7","intake_percent":100,"meals":[
                {"type":"Breakfast","food":"Almond and banana smoothie with oats","nutrients":"B7 45%","alternatives":["Eggs","Yogurt bowl"]},
                {"type":"Lunch","food":"Grilled fish + quinoa salad","nutrients":"B7 30%","alternatives":["Chicken","Paneer"]},
                {"type":"Dinner","food":"Light khichdi with ghee and seeds","nutrients":"B7 25%","alternatives":["Vegetable stew","Lentil soup"]}
            ]}
        ]
    },

    "VitaminB12": {
        "fact": "Vitamin B12 is essential for red blood cell formation and neurological function.",
        "rda": 2.4,  # µg
        "intake_percent": 60,
        "plan": [
            {"day":"Day 1","intake_percent":60,"meals":[
                {"type":"Breakfast","food":"Fortified cereal + milk","nutrients":"B12 30%","alternatives":["Eggs","Yogurt with nuts"]},
                {"type":"Lunch","food":"Grilled fish + salad","nutrients":"B12 20%","alternatives":["Chicken","Paneer"]},
                {"type":"Dinner","food":"Paneer curry + brown rice","nutrients":"B12 10%","alternatives":["Lentil soup","Tofu stew"]}
            ]},
            {"day":"Day 2","intake_percent":66,"meals":[
                {"type":"Breakfast","food":"Boiled eggs + multigrain toast","nutrients":"B12 28%","alternatives":["Fortified milk","Yogurt"]},
                {"type":"Lunch","food":"Tuna salad + whole grain bread","nutrients":"B12 30%","alternatives":["Chicken salad","Paneer"]},
                {"type":"Dinner","food":"Mutton curry (lean) + roti","nutrients":"B12 8%","alternatives":["Fish curry","Paneer curry"]}
            ]},
            {"day":"Day 3","intake_percent":72,"meals":[
                {"type":"Breakfast","food":"Yogurt parfait + seeds","nutrients":"B12 30%","alternatives":["Eggs","Fortified cereal"]},
                {"type":"Lunch","food":"Grilled salmon + veggies","nutrients":"B12 35%","alternatives":["Tuna","Chicken"]},
                {"type":"Dinner","food":"Dal with spinach + roti","nutrients":"B12 7%","alternatives":["Paneer","Tofu"]}
            ]},
            {"day":"Day 4","intake_percent":78,"meals":[
                {"type":"Breakfast","food":"Egg omelette + toast","nutrients":"B12 35%","alternatives":["Yogurt bowl","Fortified cereal"]},
                {"type":"Lunch","food":"Chicken stew + millet roti","nutrients":"B12 30%","alternatives":["Fish","Paneer"]},
                {"type":"Dinner","food":"Light fish curry + rice","nutrients":"B12 13%","alternatives":["Paneer bhurji","Lentil soup"]}
            ]},
            {"day":"Day 5","intake_percent":85,"meals":[
                {"type":"Breakfast","food":"Fortified milkshake + banana","nutrients":"B12 40%","alternatives":["Eggs","Yogurt"]},
                {"type":"Lunch","food":"Grilled tuna + salad","nutrients":"B12 35%","alternatives":["Chicken","Paneer"]},
                {"type":"Dinner","food":"Dal khichdi with ghee","nutrients":"B12 10%","alternatives":["Fish curry","Tofu"]}
            ]},
            {"day":"Day 6","intake_percent":92,"meals":[
                {"type":"Breakfast","food":"Eggs + avocado toast","nutrients":"B12 45%","alternatives":["Fortified cereal","Yogurt bowl"]},
                {"type":"Lunch","food":"Grilled salmon + quinoa","nutrients":"B12 35%","alternatives":["Chicken salad","Paneer"]},
                {"type":"Dinner","food":"Light dal + steamed veg","nutrients":"B12 12%","alternatives":["Tofu","Paneer"]}
            ]},
            {"day":"Day 7","intake_percent":100,"meals":[
                {"type":"Breakfast","food":"Poached eggs + whole grain toast","nutrients":"B12 50%","alternatives":["Fortified milkshake","Yogurt bowl"]},
                {"type":"Lunch","food":"Tuna/Salmon bowl + greens","nutrients":"B12 35%","alternatives":["Chicken","Mutton"]},
                {"type":"Dinner","food":"Light soup with lentils and veggies","nutrients":"B12 15%","alternatives":["Paneer stew","Tofu"]}
            ]}
        ]
    },

    "VitaminC": {
        "fact": "Vitamin C strengthens the immune system and promotes collagen production.",
        "rda": 90,  # mg
        "intake_percent": 60,
        "plan": [
            {"day":"Day 1","intake_percent":60,"meals":[
                {"type":"Breakfast","food":"Orange juice 🍊 + fruit salad","nutrients":"Vitamin C 40%","alternatives":["Amla juice","Kiwi shake"]},
                {"type":"Lunch","food":"Broccoli salad + tomato chutney","nutrients":"Vitamin C 35%","alternatives":["Bell pepper curry","Guava salad"]},
                {"type":"Dinner","food":"Tomato soup + grilled veggies","nutrients":"Vitamin C 15%","alternatives":["Citrus salad","Strawberry smoothie"]}
            ]},
            {"day":"Day 2","intake_percent":68,"meals":[
                {"type":"Breakfast","food":"Strawberry banana oats","nutrients":"Vitamin C 35%","alternatives":["Papaya bowl","Orange smoothie"]},
                {"type":"Lunch","food":"Spinach & bell pepper curry + roti","nutrients":"Vitamin C 35%","alternatives":["Citrus salad","Broccoli pulao"]},
                {"type":"Dinner","food":"Grilled fish with lemon + salad","nutrients":"Vitamin C 18%","alternatives":["Tomato soup","Vegetable stew"]}
            ]},
            {"day":"Day 3","intake_percent":74,"meals":[
                {"type":"Breakfast","food":"Amla juice + idli","nutrients":"Vitamin C 35%","alternatives":["Orange juice","Kiwi shake"]},
                {"type":"Lunch","food":"Chickpea salad with bell pepper","nutrients":"Vitamin C 30%","alternatives":["Tomato-cucumber salad"]},
                {"type":"Dinner","food":"Vegetable stir fry with citrus dressing","nutrients":"Vitamin C 9%","alternatives":["Fruit chaat","Lentil soup"]}
            ]},
            {"day":"Day 4","intake_percent":78,"meals":[
                {"type":"Breakfast","food":"Papaya and pineapple bowl","nutrients":"Vitamin C 45%","alternatives":["Orange juice","Guava"]},
                {"type":"Lunch","food":"Tomato dal + brown rice","nutrients":"Vitamin C 25%","alternatives":["Bell pepper curry","Broccoli salad"]},
                {"type":"Dinner","food":"Light fish curry + salad","nutrients":"Vitamin C 8%","alternatives":["Citrus salad","Strawberry dessert"]}
            ]},
            {"day":"Day 5","intake_percent":85,"meals":[
                {"type":"Breakfast","food":"Kiwi & mango smoothie bowl","nutrients":"Vitamin C 50%","alternatives":["Orange smoothie","Amla shot"]},
                {"type":"Lunch","food":"Paneer & bell pepper stir-fry","nutrients":"Vitamin C 25%","alternatives":["Citrus salad","Broccoli pulao"]},
                {"type":"Dinner","food":"Lentil soup with tomato & coriander","nutrients":"Vitamin C 10%","alternatives":["Grilled fish","Vegetable stew"]}
            ]},
            {"day":"Day 6","intake_percent":92,"meals":[
                {"type":"Breakfast","food":"Mixed berry oatmeal","nutrients":"Vitamin C 55%","alternatives":["Guava bowl","Papaya smoothie"]},
                {"type":"Lunch","food":"Chole with fresh coriander salad","nutrients":"Vitamin C 25%","alternatives":["Broccoli salad","Bell pepper curry"]},
                {"type":"Dinner","food":"Tomato & spinach pasta (light)","nutrients":"Vitamin C 12%","alternatives":["Grilled fish","Dal"]}
            ]},
            {"day":"Day 7","intake_percent":100,"meals":[
                {"type":"Breakfast","food":"Citrus fruit platter (orange, kiwi, guava)","nutrients":"Vitamin C 70%","alternatives":["Mixed berry bowl","Amla juice"]},
                {"type":"Lunch","food":"Grilled fish + tomato salad","nutrients":"Vitamin C 20%","alternatives":["Paneer salad","Chole"]},
                {"type":"Dinner","food":"Light vegetable soup + citrus garnish","nutrients":"Vitamin C 10%","alternatives":["Fruit chaat","Lentil soup"]}
            ]}
        ]
    },

    "VitaminD": {
        "fact": "Vitamin D helps in calcium absorption and strengthens bones; sunlight exposure is a key source.",
        "rda": 20,  # µg
        "intake_percent": 60,
        "plan": [
            {"day":"Day 1","intake_percent":60,"meals":[
                {"type":"Breakfast","food":"Fortified milk + oats","nutrients":"Vitamin D 30%","alternatives":["Yogurt","Fortified orange juice"]},
                {"type":"Lunch","food":"Grilled salmon + salad","nutrients":"Vitamin D 45%","alternatives":["Tuna salad","Mushroom curry"]},
                {"type":"Dinner","food":"Tofu curry + steamed greens","nutrients":"Vitamin D 25%","alternatives":["Paneer tikka","Egg curry"]}
            ]},
            {"day":"Day 2","intake_percent":68,"meals":[
                {"type":"Breakfast","food":"Egg omelette + whole grain toast","nutrients":"Vitamin D 30%","alternatives":["Fortified cereal","Yogurt bowl"]},
                {"type":"Lunch","food":"Mushroom stir-fry + brown rice","nutrients":"Vitamin D 30%","alternatives":["Grilled fish","Tofu bowl"]},
                {"type":"Dinner","food":"Grilled chicken + salad","nutrients":"Vitamin D 8%","alternatives":["Paneer curry","Lentil soup"]}
            ]},
            {"day":"Day 3","intake_percent":74,"meals":[
                {"type":"Breakfast","food":"Fortified milkshake + banana","nutrients":"Vitamin D 35%","alternatives":["Yogurt parfait","Eggs"]},
                {"type":"Lunch","food":"Tuna salad + whole grain bread","nutrients":"Vitamin D 35%","alternatives":["Grilled salmon","Chicken salad"]},
                {"type":"Dinner","food":"Mushroom soup + toast","nutrients":"Vitamin D 4%","alternatives":["Tofu curry","Paneer bhurji"]}
            ]},
            {"day":"Day 4","intake_percent":78,"meals":[
                {"type":"Breakfast","food":"Poached eggs + spinach toast","nutrients":"Vitamin D 35%","alternatives":["Fortified cereal","Yogurt"]},
                {"type":"Lunch","food":"Grilled fish with avocado salad","nutrients":"Vitamin D 35%","alternatives":["Tuna","Chicken"]},
                {"type":"Dinner","food":"Light dal with mushrooms","nutrients":"Vitamin D 8%","alternatives":["Paneer","Tofu"]}
            ]},
            {"day":"Day 5","intake_percent":85,"meals":[
                {"type":"Breakfast","food":"Mushroom omelette + whole wheat toast","nutrients":"Vitamin D 40%","alternatives":["Fortified milkshake","Yogurt bowl"]},
                {"type":"Lunch","food":"Grilled salmon + quinoa","nutrients":"Vitamin D 35%","alternatives":["Tuna salad","Chicken"]},
                {"type":"Dinner","food":"Tofu stir-fry with greens","nutrients":"Vitamin D 10%","alternatives":["Paneer","Lentil soup"]}
            ]},
            {"day":"Day 6","intake_percent":92,"meals":[
                {"type":"Breakfast","food":"Fortified orange juice + muesli","nutrients":"Vitamin D 45%","alternatives":["Eggs","Yogurt"]},
                {"type":"Lunch","food":"Chicken salad with mushrooms","nutrients":"Vitamin D 35%","alternatives":["Fish","Paneer"]},
                {"type":"Dinner","food":"Light fish curry + steamed veg","nutrients":"Vitamin D 12%","alternatives":["Tofu","Lentils"]}
            ]},
            {"day":"Day 7","intake_percent":100,"meals":[
                {"type":"Breakfast","food":"Poached eggs + fortified milkshake","nutrients":"Vitamin D 50%","alternatives":["Mushroom toast","Yogurt bowl"]},
                {"type":"Lunch","food":"Grilled salmon + roasted vegetables","nutrients":"Vitamin D 35%","alternatives":["Tuna","Chicken"]},
                {"type":"Dinner","food":"Light soup with mushrooms and tofu","nutrients":"Vitamin D 15%","alternatives":["Paneer","Lentil stew"]}
            ]}
        ]
    },

    "VitaminE": {
        "fact": "Vitamin E is an antioxidant that protects cells and supports immune function.",
        "rda": 15,  # mg
        "intake_percent": 60,
        "plan": [
            {"day":"Day 1","intake_percent":60,"meals":[
                {"type":"Breakfast","food":"Almond milk smoothie + seeds","nutrients":"Vitamin E 30%","alternatives":["Avocado toast","Peanut butter oats"]},
                {"type":"Lunch","food":"Spinach salad with sunflower seeds","nutrients":"Vitamin E 30%","alternatives":["Paneer salad","Soya bowl"]},
                {"type":"Dinner","food":"Grilled fish with greens","nutrients":"Vitamin E 10%","alternatives":["Tofu","Lentil soup"]}
            ]},
            {"day":"Day 2","intake_percent":66,"meals":[
                {"type":"Breakfast","food":"Avocado smoothie + nuts","nutrients":"Vitamin E 35%","alternatives":["Almond porridge","Yogurt bowl"]},
                {"type":"Lunch","food":"Paneer stir-fry with seeds","nutrients":"Vitamin E 30%","alternatives":["Chicken salad","Fish"]},
                {"type":"Dinner","food":"Grilled veggies with olive oil","nutrients":"Vitamin E 5%","alternatives":["Lentil soup","Tofu curry"]}
            ]},
            {"day":"Day 3","intake_percent":72,"meals":[
                {"type":"Breakfast","food":"Flaxseed porridge + almonds","nutrients":"Vitamin E 35%","alternatives":["Avocado toast","Peanut butter toast"]},
                {"type":"Lunch","food":"Quinoa salad with seeds & nuts","nutrients":"Vitamin E 30%","alternatives":["Paneer","Chicken"]},
                {"type":"Dinner","food":"Grilled fish + salad with olive oil","nutrients":"Vitamin E 7%","alternatives":["Tofu","Lentil stew"]}
            ]},
            {"day":"Day 4","intake_percent":78,"meals":[
                {"type":"Breakfast","food":"Smoothie with almond butter","nutrients":"Vitamin E 40%","alternatives":["Avocado bowl","Yogurt parfait"]},
                {"type":"Lunch","food":"Spinach & mushroom curry with seeds","nutrients":"Vitamin E 30%","alternatives":["Paneer","Fish"]},
                {"type":"Dinner","food":"Stir-fried tofu with broccoli & olive oil","nutrients":"Vitamin E 8%","alternatives":["Lentil soup","Grilled chicken"]}
            ]},
            {"day":"Day 5","intake_percent":85,"meals":[
                {"type":"Breakfast","food":"Almond and banana porridge","nutrients":"Vitamin E 45%","alternatives":["Avocado smoothie","Yogurt bowl"]},
                {"type":"Lunch","food":"Paneer salad with sunflower seeds","nutrients":"Vitamin E 30%","alternatives":["Fish salad","Chicken"]},
                {"type":"Dinner","food":"Grilled salmon + olive oil dressing","nutrients":"Vitamin E 10%","alternatives":["Tofu","Lentil stew"]}
            ]},
            {"day":"Day 6","intake_percent":92,"meals":[
                {"type":"Breakfast","food":"Fortified cereal with almond milk","nutrients":"Vitamin E 50%","alternatives":["Avocado toast","Oats"]},
                {"type":"Lunch","food":"Grilled fish + seed salad","nutrients":"Vitamin E 30%","alternatives":["Paneer","Chicken"]},
                {"type":"Dinner","food":"Vegetable stew with olive oil","nutrients":"Vitamin E 12%","alternatives":["Tofu","Lentils"]}
            ]},
            {"day":"Day 7","intake_percent":100,"meals":[
                {"type":"Breakfast","food":"Avocado & almond smoothie","nutrients":"Vitamin E 55%","alternatives":["Yogurt bowl","Eggs"]},
                {"type":"Lunch","food":"Grilled salmon + nuts & greens","nutrients":"Vitamin E 30%","alternatives":["Paneer","Chicken"]},
                {"type":"Dinner","food":"Light vegetable stew with olive oil","nutrients":"Vitamin E 15%","alternatives":["Lentil soup","Tofu"]}
            ]}
        ]
    },

    "VitaminK": {
        "fact": "Vitamin K is crucial for blood clotting and bone health; leafy greens are excellent sources.",
        "rda": 120,  # µg (adult male typical; varies)
        "intake_percent": 60,
        "plan": [
            {"day":"Day 1","intake_percent":60,"meals":[
                {"type":"Breakfast","food":"Spinach & tomato omelette","nutrients":"Vitamin K 35%","alternatives":["Green smoothie","Methi paratha"]},
                {"type":"Lunch","food":"Kale salad with seeds","nutrients":"Vitamin K 30%","alternatives":["Palak dal","Cabbage sabzi"]},
                {"type":"Dinner","food":"Broccoli stir-fry + tofu","nutrients":"Vitamin K 10%","alternatives":["Green beans","Methi rice"]}
            ]},
            {"day":"Day 2","intake_percent":66,"meals":[
                {"type":"Breakfast","food":"Methi paratha + curd","nutrients":"Vitamin K 30%","alternatives":["Spinach omelette","Green smoothie"]},
                {"type":"Lunch","food":"Palak paneer + roti","nutrients":"Vitamin K 35%","alternatives":["Kale salad","Broccoli pulao"]},
                {"type":"Dinner","food":"Stir-fried greens with garlic","nutrients":"Vitamin K 10%","alternatives":["Tofu curry","Lentil soup"]}
            ]},
            {"day":"Day 3","intake_percent":72,"meals":[
                {"type":"Breakfast","food":"Green smoothie (spinach, banana, seeds)","nutrients":"Vitamin K 40%","alternatives":["Methi paratha","Oats with spinach"]},
                {"type":"Lunch","food":"Broccoli & mushroom curry + millet roti","nutrients":"Vitamin K 25%","alternatives":["Palak dal","Kale stew"]},
                {"type":"Dinner","food":"Light salad with kale and nuts","nutrients":"Vitamin K 7%","alternatives":["Steamed greens","Tofu stir-fry"]}
            ]},
            {"day":"Day 4","intake_percent":78,"meals":[
                {"type":"Breakfast","food":"Poha with spinach and peas","nutrients":"Vitamin K 35%","alternatives":["Green smoothie","Spinach omelette"]},
                {"type":"Lunch","food":"Kale & quinoa bowl","nutrients":"Vitamin K 30%","alternatives":["Palak paneer","Broccoli salad"]},
                {"type":"Dinner","food":"Grilled fish with steamed greens","nutrients":"Vitamin K 13%","alternatives":["Tofu","Lentil soup"]}
            ]},
            {"day":"Day 5","intake_percent":85,"meals":[
                {"type":"Breakfast","food":"Methi & spinach paratha with curd","nutrients":"Vitamin K 40%","alternatives":["Green smoothie","Oats"]},
                {"type":"Lunch","food":"Mixed green salad with seeds & beans","nutrients":"Vitamin K 30%","alternatives":["Palak dal","Kale bowl"]},
                {"type":"Dinner","food":"Stir-fry greens with garlic and tofu","nutrients":"Vitamin K 15%","alternatives":["Broccoli soup","Paneer bhurji"]}
            ]},
            {"day":"Day 6","intake_percent":92,"meals":[
                {"type":"Breakfast","food":"Avocado spinach toast","nutrients":"Vitamin K 45%","alternatives":["Green smoothie","Oats"]},
                {"type":"Lunch","food":"Kale salad with walnuts and feta (or paneer)","nutrients":"Vitamin K 30%","alternatives":["Palak paneer","Grilled fish"]},
                {"type":"Dinner","food":"Light vegetable soup with greens","nutrients":"Vitamin K 17%","alternatives":["Tofu curry","Lentil soup"]}
            ]},
            {"day":"Day 7","intake_percent":100,"meals":[
                {"type":"Breakfast","food":"Large green smoothie (kale, spinach, banana)","nutrients":"Vitamin K 60%","alternatives":["Methi paratha","Spinach omelette"]},
                {"type":"Lunch","food":"Grilled fish + kale salad","nutrients":"Vitamin K 25%","alternatives":["Palak dal","Broccoli salad"]},
                {"type":"Dinner","food":"Light khichdi with greens","nutrients":"Vitamin K 15%","alternatives":["Vegetable stew","Tofu stir-fry"]}
            ]}
        ]
    }
}
