Tank_AI = function(key){
    if(Tank_List[key].type == 'T'){
        AI_start_move(key);
        AI_move_in_game(key);
    }
}

//电脑坦克刚开始的动作
AI_start_move = function(key){
    if(Tank_List[key].prepare_to_fight_long ==(Information_list['Tank_give_brith_period']-1)){
        AI_random_direction(key);
    }  
}

//从新寻找方位
AI_random_direction = function(key){
     var direction = Math.random();
        if(direction <0.25){
            Tank_List[key].move_top = true;
        }else if(direction >= 0.25 && direction <0.5){
            Tank_List[key].move_down = true;
        }else if(direction >= 0.5 && direction <0.75){
            Tank_List[key].move_left = true;
        }else if(direction >= 0.75 && direction <1){
            Tank_List[key].move_right = true;
        }
}

//在游戏里电脑坦克的动作
AI_move_in_game = function(key){
    if(AI_track_player(key) === true){
        
        AI_track_player_move_with_interval(key);
        
        if(Tank_List[key].tank_wall_or_tank_collision === true){
                Reset_move(key);
                AI_random_direction(key);
                Tank_List[key].tank_wall_or_tank_collision = false;
        }
    }else if(AI_track_player(key) === false){
        if(Math.random() <0.005){
            Tank_List[key].shoot = true;
        }
         if(Tank_List[key].tank_wall_or_tank_collision === true){
                Reset_move(key);
                AI_random_direction(key);
                Tank_List[key].tank_wall_or_tank_collision = false;
        }else{
                if(Math.random()<0.002){
                    Reset_move(key);
                    AI_random_direction(key);
                }
        }
        
        if(Tank_List[key].shoot == true){
            if(Tank_List[key].prepare_to_fight_long%10 == 0){
               Tank_List[key].shoot =false;
            }
        }
        
    }
    
    
    Tank_List[key].prepare_to_fight_long++;
    if(Tank_List[key].prepare_to_fight_long > 10000){
        Tank_List[key].prepare_to_fight_long = 101;
    }
}



AI_track_player = function(key){
    var x_1 = Tank_List[key].x;
    var x_2 = Tank_List['P'].x;
    var y_1 = Tank_List[key].y;
    var y_2 = Tank_List['P'].y;
    var distance = Information_list['square'](x_1,x_2,y_1,y_2);
    if(distance <150){
        return true;
    }else if(distance >=150){
        return false;
    }
}

AI_track_player_move_with_interval = function(key){
        if(Tank_List[key].prepare_to_fight_long >Information_list['Tank_give_brith_period']){
            var x_1 = Tank_List[key].x;
            var x_2 = Tank_List['P'].x;
            var y_1 = Tank_List[key].y;
            var y_2 = Tank_List['P'].y;
            if(x_1 == x_2){
                if(y_2> y_1){
                    Reset_move(key);
                    Tank_List[key].move_down = true;
                    Tank_List[key].shoot = true;
                    Tank_List[key].prepare_to_fight_long = 101;
                }else if(y_2< y_1){
                   Reset_move(key);
                    Tank_List[key].move_top = true;
                    Tank_List[key].shoot = true;
                     Tank_List[key].prepare_to_fight_long = 101;
                }
            }else if(y_1 = y_2){
                if(x_2 > x_1){
                   Reset_move(key);
                    Tank_List[key].move_right = true;
                    Tank_List[key].shoot = true;
                }else if(x_1 > x_2){
                    Reset_move(key);
                    Tank_List[key].move_left = true;
                    Tank_List[key].shoot = true;
                }
            }
            if(Tank_List[key].prepare_to_fight_long%100 == 0){
            AI_track_player_move(key);
           
        }
    }
   
}

AI_track_player_move = function(key){  
    var x_1 = Tank_List[key].x;
    var x_2 = Tank_List['P'].x;
    var y_1 = Tank_List[key].y;
    var y_2 = Tank_List['P'].y;
    if(x_2 - x_1 > 0 ){
        if(y_2 - y_1 > 0){
            var direction = Math.random();
             Reset_move(key);
            if(direction < 0.5){
                Tank_List[key].move_right = true;
            }else{
                Tank_List[key].move_down = true;
            }
            
        }else if(y_1 - y_2 > 0){
            var direction = Math.random();
             Reset_move(key);
            if(direction < 0.5){
                Tank_List[key].move_right = true;
            }else{
                Tank_List[key].move_top = true;
            }
        }else if(y_1 = y_2){
            Tank_List[key].move_right = true;
        }
        
    } else if(x_1 - x_2 > 0){
        if(y_2 - y_1 > 0){
            var direction = Math.random();
             Reset_move(key);
            if(direction < 0.5){
                Tank_List[key].move_left = true;
            }else{
                Tank_List[key].move_down = true;
            }
        }else if(y_1 - y_2 > 0){
            var direction = Math.random();
             Reset_move(key);
            if(direction < 0.5){
                Tank_List[key].move_left = true;
            }else{
                Tank_List[key].move_top = true;
            }
        }else if(y_1 = y_2){
            Tank_List[key].move_left = true;
        }
    }else if(x_1 = x_2){
        if(y_2 - y_1 > 0){
            Reset_move(key);
             Tank_List[key].move_down = true;
        }else if(y_1 - y_2 > 0){
            Reset_move(key);
             Tank_List[key].move_top = true;
        }
    }
}


Reset_move = function(key){
    Tank_List[key].move_top = false;
    Tank_List[key].move_down = false;
    Tank_List[key].move_left = false;
    Tank_List[key].move_right = false;
    
}


