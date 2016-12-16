var ctx = document.getElementById("ctx").getContext("2d");
    var HEIGHT = 600;
    var WIDTH = 600;
    
    
    jkhkjhlh;h;kjkj
    Tank_List = {};
    Bullet_List = {};
    Wall_List = {};
    Large_Block_wall_List={};
    Information_list ={};
    Information_list['count_small_wall'] = 0;
    Information_list['count_big_wall'] = 0;
    Information_list['Game_Interval'] = 0;
    Information_list['Tank_give_brith_period'] = 100;
    Information_list['tank_move_this_interval'] = new Array();

    Information_list['json_length'] = function(json){
        var jsonLength = 0;
        for(var key in json){
            jsonLength++;
        }
        return jsonLength;
    }
    
    Information_list['square'] = function(x_1,x_2,y_1,y_2){
        return Math.abs((x_1-x_2))+Math.abs((y_1 - y_2));
    }