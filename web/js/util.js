var util = {
    hexToRgb : function(hex) {            // #rrggbb (no shorthand)
        var result = [hex.substr(1,2), hex.substr(3, 2), hex.substr(5,2)];
        return [parseInt(result[0], 16), parseInt(result[1], 16), parseInt(result[2], 16)];
    },

    getColor : function(baseColor, i, max){
        var amt = (0.5 / max)*i;
        return "rgb("+Math.round(baseColor[0]-(baseColor[0]*amt))+", "+Math.round(baseColor[1]-(baseColor[1]*amt))+", "+Math.round(baseColor[2]-(baseColor[2]*amt))+")";
    }
};