const CSS_COLOR_NAMES = [
    "Aqua",
    "Beige",
    "Bisque",
    "Black",
    "Blue",
    "Brown",
    "Gold",
    "Gray",
    "Grey",
    "Green",
    "Magenta",
    "Orange",
    "Pink",
    "Purple",
    "Red",
    "Silver",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "Yellow",
];

const CAR_BRANDS = [
    "Abarth",
    "Alfa Romeo",
    "Aston Martin",
    "Audi",
    "Bentley",
    "BMW",
    "Bugatti",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Dacia",
    "Daewoo",
    "Daihatsu",
    "Dodge",
    "Donkervoort",
    "DS",
    "Ferrari",
    "Fiat",
    "Fisker",
    "Ford",
    "Honda",
    "Hummer",
    "Hyundai",
    "Infiniti",
    "Iveco",
    "Jaguar",
    "Jeep",
    "Kia",
    "KTM",
    "Lada",
    "Lamborghini",
    "Lancia",
    "Land Rover",
    "Landwind",
    "Lexus",
    "Lotus",
    "Maserati",
    "Maybach",
    "Mazda",
    "McLaren",
    "Mercedes-Benz",
    "MG",
    "Mini",
    "Mitsubishi",
    "Morgan",
    "Nissan",
    "Opel",
    "Peugeot",
    "Porsche",
    "Renault",
    "Rolls-Royce",
    "Rover",
    "Saab",
    "Seat",
    "Skoda",
    "Smart",
    "SsangYong",
    "Subaru",
    "Suzuki",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo"
  ];

const mapDayToHour = new Map();

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const carType = ["Private", "Truck", "Bus", "Van"];
const SectionNames = ["Mahlef KiryatGat", "Mahlef Shorek", "Mahlef Nahshonim", "Mahlef Nizanei Oz", "Mahlef Eron", "Mahlef Tut"];

for (let i = 1; i < 6; i++) {
    mapDayToHour.set(i, normalDay)
}
mapDayToHour.set(6, Friday)
mapDayToHour.set(7, Saturday)

//const normalDay = []

function randomInOut() {
    var inSection = -1
    var outSection = -1
    while (inSection == outSection) {
        inSection = Math.floor(Math.random() * (SectionNames.length))
        outSection = Math.floor(Math.random() * (SectionNames.length))
    }
    return [inSection, outSection]
}
function fillInOut(prcnt, otherwayP, in1, out1, in2, out2) {
    var inSection = -1;
    var outSection = -1;
    var randomNum = Math.floor(Math.random() * 100)
    if (randomNum < prcnt) {
        if (randomNum < otherwayP) {
            inSection = in1
            outSection = out1
        }
        else {
            inSection = in2
            outSection = out2
        }
    }
    else {
        randomarr = randomInOut()
        inSection = randomarr[0]
        outSection = randomarr[1]
    }
    return [inSection, outSection]
}

function normalDay(hour, carType) {
    if (hour >= 0 && hour < 6) {
        //50% truck bus 0% 50% (uniformly rest)
        // const distribution = [carType[1],carType[1],carType[0],carType[3]]
        var inSection = 0;
        var outSection = 0;
        switch (carType) {
            case "Private":
                var arr = fillInOut(80, 40, 2, 3, 3, 2)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Truck":
                var arr = fillInOut(80, 40, 0, 5, 5, 1)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Bus": var arr = fillInOut(80, 40, 0, 3, 1, 4)
            inSection = arr[0]
            outSection = arr[1]
            break;;
            case "Van": var arr = fillInOut(80, 80, 2, 3, 1, 5)
                inSection = arr[0]
                outSection = arr[1]
                break;
        }
        return [inSection, outSection]
    }
    else if (hour >= 6 && hour < 12) {
        //20% truck 30% bus 30% private 20% Van
        // const distribution = [carType[0],carType[0],carType[0],carType[1],carType[1],carType[2],carType[2],carType[2],carType[3],carType[3]]
        var inSection = 0;
        var outSection = 0;
        switch (carType) {
            case "Private":
                var arr = fillInOut(100, 40, 2, 3, 3, 2)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Truck":
                var arr = fillInOut(80, 40, 2, 3, 3, 2)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Bus": var arr = fillInOut(80, 50, 0, 5, 5, 0)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Van": var arr = fillInOut(80, 20, 0, 3, 1, 5)
                inSection = arr[0]
                outSection = arr[1]
                break;
        }
        return [inSection, outSection]
    }
    else if (hour >= 12 && hour < 18) {
        //10% truck 30% bus 20% private 40% Van
        var inSection = 0;
        var outSection = 0;
        switch (carType) {
            case "Private":
                var arr = fillInOut(50, 40, 5, 1, 4, 0)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Truck":
                var arr = fillInOut(80, 10, 5, 0, 2, 3)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Bus": var arr = fillInOut(80, 80, 5, 0, 2, 3)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Van": var arr = fillInOut(80, 20, 1, 2, 3, 2)
                inSection = arr[0]
                outSection = arr[1]
                break;
        }
        return [inSection, outSection]
    }
    else {
        // 30% truck 20% bus 30% private 20% Van
        var inSection = 0;
        var outSection = 0;
        switch (carType) {
            case "Private":
                var arr = fillInOut(80, 40, 5, 1, 4, 2)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Truck":
                var arr = fillInOut(80, 20, 5, 2, 2, 1)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Bus": var arr = fillInOut(80, 20, 5, 0, 0, 5)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Van": var arr = fillInOut(80, 20, 2, 4, 4, 1)
                inSection = arr[0]
                outSection = arr[1]
                break;
        }
        return [inSection, outSection]
    }
}
function Friday(hour, carType) {
    if (hour >= 0 && hour < 6) {
        //20% truck bus 0% 80% (uniformly rest)
        var inSection = 0;
        var outSection = 0;
        switch (carType) {
            case "Private":
                var arr = fillInOut(80, 40, 1, 2, 3, 4)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Truck":
                var arr = fillInOut(80, 20, 1, 2, 3, 4)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Bus": var arr = fillInOut(80, 20, 2, 1, 4, 5)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Van": var arr = fillInOut(80, 20, 1, 5, 4, 1)
                inSection = arr[0]
                outSection = arr[1]
                break;
        }
        return [inSection, outSection]
    }
    else if (hour >= 6 && hour < 12) {
        //        10% truck  20% bus 50% private 20% Van
        var inSection = 0;
        var outSection = 0;
        switch (carType) {
            case "Private":
                var arr = fillInOut(80, 40, 5, 1, 4, 2)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Truck":
                var arr = fillInOut(80, 20, 5, 2, 2, 1)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Bus": var arr = fillInOut(80, 20, 5, 0, 0, 5)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Van": var arr = fillInOut(80, 20, 2, 4, 4, 1)
                inSection = arr[0]
                outSection = arr[1]
                break;
        }
        return [inSection, outSection]
    }
    else if (hour >= 12 && hour < 18) {
        //  10% truck // 10% bus // 40% private // 40% Van
        var inSection = 0;
        var outSection = 0;
        switch (carType) {
            case "Private":
                var arr = fillInOut(80, 40, 2, 1, 2, 1)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Truck":
                var arr = fillInOut(80, 20, 1, 3, 0, 5)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Bus": var arr = fillInOut(80, 20, 1, 3, 0, 2)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Van": var arr = fillInOut(80, 20, 1, 5, 2, 1)
                inSection = arr[0]
                outSection = arr[1]
                break;
        }
        return [inSection, outSection]
    }
    else {
        //  0% truck  // 0% bus // 80% private // 20% Van
        var inSection = 0;
        var outSection = 0;
        switch (carType) {
            case "Private":
                var arr = fillInOut(80, 40, 0, 1, 1, 3)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Truck":
                var arr = fillInOut(80, 20, 1, 2, 5, 4)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Bus": var arr = fillInOut(80, 20, 2, 0, 1, 0)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Van": var arr = fillInOut(80, 20, 5, 2, 2, 1)
                inSection = arr[0]
                outSection = arr[1]
                break;
        }
        return [inSection, outSection]
    }
}
function Saturday(hour, carType) {
    if (hour >= 0 && hour < 19) {
        //         0% bus // 10% truck // 70 private // 20% Van
        var inSection = 0;
        var outSection = 0;
        switch (carType) {
            case "Private":
                var arr = fillInOut(80, 40, 5, 4, 4, 3)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Truck":
                var arr = fillInOut(80, 20, 3, 1, 2, 5)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Bus": var arr = fillInOut(80, 20, 0, 3, 1, 2)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Van": var arr = fillInOut(80, 20, 0, 5, 1, 5)
                inSection = arr[0]
                outSection = arr[1]
                break;
        }
        return [inSection, outSection]
    }
    else {
        //   10% bus // 20% truck // 50% private // 20% Van
        var inSection = 0;
        var outSection = 0;
        switch (carType) {
            case "Private":
                var arr = fillInOut(80, 40, 3, 2, 4, 1)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Truck":
                var arr = fillInOut(80, 20, 2, 3, 3, 5)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Bus": var arr = fillInOut(80, 20, 3, 4, 4, 3)
                inSection = arr[0]
                outSection = arr[1]
                break;
            case "Van": var arr = fillInOut(80, 20, 2, 1, 4, 2)
                inSection = arr[0]
                outSection = arr[1]
                break;
        }
        return [inSection, outSection]
    }
}


module.exports.carBrandArray = CAR_BRANDS
module.exports.colorArray = CSS_COLOR_NAMES
module.exports.daysArray = days
module.exports.carTypeArray = carType
module.exports.SectionNamesArray = SectionNames
module.exports.dayFunctionHourGetDistArray = mapDayToHour